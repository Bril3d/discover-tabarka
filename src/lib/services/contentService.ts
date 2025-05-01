import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

export type Post = Database['public']['Tables']['posts']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];

export type ContentType = 'post' | 'guide' | 'event' | 'location' | 'review';
export type ContentStatus = 'draft' | 'published' | 'scheduled';

export interface ContentFilters {
  status?: ContentStatus | 'all';
  type?: ContentType | 'all';
  category?: string;
  featured?: boolean;
  search?: string;
}

export const contentService = {
  /**
   * Get content items with pagination and filtering
   */
  getContent: async (page = 1, limit = 10, filters?: ContentFilters) => {
    let query = supabase
      .from('posts')
      .select(`
        *,
        categories:category_id(*),
        users:user_id(id, full_name, avatar_url)
      `, { count: 'exact' });
    
    // Apply filters
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }
    
    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }
    
    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured);
    }
    
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
    }
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await query
      .order('updated_at', { ascending: false })
      .range(from, to);
      
    if (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
    
    return {
      content: data || [],
      count: count || 0,
      totalPages: count ? Math.ceil(count / limit) : 0,
      currentPage: page
    };
  },
  
  /**
   * Get a content item by ID
   */
  getContentById: async (contentId: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories:category_id(*),
        users:user_id(id, full_name, avatar_url)
      `)
      .eq('id', contentId)
      .single();
      
    if (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Create a new content item
   */
  createContent: async (contentData: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'views_count' | 'likes_count' | 'comments_count'>) => {
    const now = new Date().toISOString();
    
    // Handle publishing date for scheduled posts
    let publishedAt = null;
    if (contentData.status === 'published') {
      publishedAt = now;
    } else if (contentData.status === 'scheduled' && contentData.published_at) {
      publishedAt = contentData.published_at;
    }
    
    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...contentData,
        created_at: now,
        updated_at: now,
        published_at: publishedAt,
        views_count: 0,
        likes_count: 0,
        comments_count: 0
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating content:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Update a content item
   */
  updateContent: async (contentId: string, contentData: Partial<Post>) => {
    const now = new Date().toISOString();
    const updates: Partial<Post> = {
      ...contentData,
      updated_at: now
    };
    
    // Handle publishing date for status changes
    if (contentData.status === 'published' && !contentData.published_at) {
      updates.published_at = now;
    } else if (contentData.status === 'draft') {
      updates.published_at = null;
    }
    
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', contentId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating content:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Delete a content item
   */
  deleteContent: async (contentId: string) => {
    // First delete all comments
    const { error: commentsError } = await supabase
      .from('comments')
      .delete()
      .eq('post_id', contentId);
    
    if (commentsError) {
      console.error('Error deleting content comments:', commentsError);
      throw commentsError;
    }
    
    // Then delete the content
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', contentId);
      
    if (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
    
    return true;
  },
  
  /**
   * Get all categories
   */
  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    
    return data || [];
  },
  
  /**
   * Generate a unique slug from a title
   */
  generateSlug: async (title: string, contentId?: string) => {
    // Create a base slug from the title
    const baseSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
    
    // Check if the slug already exists (excluding the current content if updating)
    let query = supabase
      .from('posts')
      .select('slug')
      .eq('slug', baseSlug);
    
    if (contentId) {
      query = query.neq('id', contentId);
    }
    
    const { data } = await query;
    
    // If the slug already exists, add a number to make it unique
    if (data && data.length > 0) {
      // Find all similar slugs to determine the next number
      const { data: similarSlugs } = await supabase
        .from('posts')
        .select('slug')
        .like('slug', `${baseSlug}-%`);
      
      if (similarSlugs && similarSlugs.length > 0) {
        // Extract numbers from existing slugs
        const numbers = similarSlugs
          .map(item => {
            const match = item.slug.match(new RegExp(`${baseSlug}-(\\d+)$`));
            return match ? parseInt(match[1], 10) : 0;
          })
          .filter(n => n > 0);
        
        // Get the highest number and increment
        const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
        return `${baseSlug}-${nextNumber}`;
      }
      
      return `${baseSlug}-1`;
    }
    
    return baseSlug;
  },
  
  /**
   * Increment the view count for a content item
   */
  incrementViews: async (contentId: string) => {
    const { error } = await supabase.rpc('increment_content_views', {
      content_id: contentId
    });
    
    if (error) {
      console.error('Error incrementing views:', error);
      // Don't throw, just log the error - views are not critical
    }
  },
  
  /**
   * Get content analytics
   */
  getContentAnalytics: async (timeRange: '7d' | '30d' | '90d' | '12m' = '30d') => {
    // Calculate the start date based on time range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '12m':
        startDate.setMonth(now.getMonth() - 12);
        break;
    }
    
    // Format dates for SQL
    const startDateStr = startDate.toISOString();
    
    // Get content views from analytics_events table
    const { data: viewsData, error: viewsError } = await supabase
      .from('analytics_events')
      .select('event_data, created_at')
      .eq('event_type', 'content_view')
      .gte('created_at', startDateStr)
      .order('created_at');
      
    if (viewsError) {
      console.error('Error fetching content views:', viewsError);
      throw viewsError;
    }
    
    // Get popular content types
    const { data: contentTypes, error: typesError } = await supabase
      .from('posts')
      .select('type, id')
      .order('created_at');
      
    if (typesError) {
      console.error('Error fetching content types:', typesError);
      throw typesError;
    }
    
    // Process the data for charts and statistics
    const typeDistribution = contentTypes?.reduce((acc: Record<string, number>, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});
    
    return {
      viewsData,
      typeDistribution
    };
  }
}; 