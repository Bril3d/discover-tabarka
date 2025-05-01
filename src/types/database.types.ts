export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          is_local: boolean
          role: 'user' | 'admin' | 'moderator' | 'contributor'
          status: 'active' | 'suspended' | 'pending'
          last_active: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          is_local?: boolean
          role?: 'user' | 'admin' | 'moderator' | 'contributor'
          status?: 'active' | 'suspended' | 'pending'
          last_active?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          is_local?: boolean
          role?: 'user' | 'admin' | 'moderator' | 'contributor'
          status?: 'active' | 'suspended' | 'pending'
          last_active?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          user_id: string
          location_id: string | null
          category_id: string
          media_url: string | null
          media_type: 'image' | 'video' | 'text'
          is_featured: boolean
          is_approved: boolean
          status: 'draft' | 'published' | 'scheduled'
          published_at: string | null
          views_count: number
          likes_count: number
          comments_count: number
          type: 'post' | 'guide' | 'event' | 'location' | 'review'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          user_id: string
          location_id?: string | null
          category_id: string
          media_url?: string | null
          media_type: 'image' | 'video' | 'text'
          is_featured?: boolean
          is_approved?: boolean
          status?: 'draft' | 'published' | 'scheduled'
          published_at?: string | null
          views_count?: number
          likes_count?: number
          comments_count?: number
          type?: 'post' | 'guide' | 'event' | 'location' | 'review'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          user_id?: string
          location_id?: string | null
          category_id?: string
          media_url?: string | null
          media_type?: 'image' | 'video' | 'text'
          is_featured?: boolean
          is_approved?: boolean
          status?: 'draft' | 'published' | 'scheduled'
          published_at?: string | null
          views_count?: number
          likes_count?: number
          comments_count?: number
          type?: 'post' | 'guide' | 'event' | 'location' | 'review'
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          content: string
          user_id: string
          post_id: string
          is_approved: boolean
          reported_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          content: string
          user_id: string
          post_id: string
          is_approved?: boolean
          reported_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          content?: string
          user_id?: string
          post_id?: string
          is_approved?: boolean
          reported_count?: number
        }
      }
      locations: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          latitude: number
          longitude: number
          image_url: string | null
          address: string | null
          visits_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          latitude: number
          longitude: number
          image_url?: string | null
          address?: string | null
          visits_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          latitude?: number
          longitude?: number
          image_url?: string | null
          address?: string | null
          visits_count?: number
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          icon: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          icon?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          icon?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          rating: number
          comment: string | null
          user_id: string
          location_id: string
          is_approved: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          rating: number
          comment?: string | null
          user_id: string
          location_id: string
          is_approved?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          rating?: number
          comment?: string | null
          user_id?: string
          location_id?: string
          is_approved?: boolean
        }
      }
      user_permissions: {
        Row: {
          id: string
          user_id: string
          permission_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          permission_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          permission_id?: string
          created_at?: string
        }
      }
      permissions: {
        Row: {
          id: string
          name: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          type: string
          title: string
          message: string
          priority: 'low' | 'medium' | 'high'
          created_at: string
          read: boolean
          user_id: string | null
          action_url: string | null
          content_type: string | null
          content_id: string | null
          sender_id: string | null
        }
        Insert: {
          id?: string
          type: string
          title: string
          message: string
          priority?: 'low' | 'medium' | 'high'
          created_at?: string
          read?: boolean
          user_id?: string | null
          action_url?: string | null
          content_type?: string | null
          content_id?: string | null
          sender_id?: string | null
        }
        Update: {
          id?: string
          type?: string
          title?: string
          message?: string
          priority?: 'low' | 'medium' | 'high'
          created_at?: string
          read?: boolean
          user_id?: string | null
          action_url?: string | null
          content_type?: string | null
          content_id?: string | null
          sender_id?: string | null
        }
      }
      notification_settings: {
        Row: {
          id: string
          user_id: string
          setting_type: string
          email_enabled: boolean
          push_enabled: boolean
          in_app_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          setting_type: string
          email_enabled?: boolean
          push_enabled?: boolean
          in_app_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          setting_type?: string
          email_enabled?: boolean
          push_enabled?: boolean
          in_app_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          event_type: string
          event_data: Json
          user_id: string | null
          session_id: string | null
          created_at: string
          page_url: string | null
          device_type: string | null
        }
        Insert: {
          id?: string
          event_type: string
          event_data: Json
          user_id?: string | null
          session_id?: string | null
          created_at?: string
          page_url?: string | null
          device_type?: string | null
        }
        Update: {
          id?: string
          event_type?: string
          event_data?: Json
          user_id?: string | null
          session_id?: string | null
          created_at?: string
          page_url?: string | null
          device_type?: string | null
        }
      }
    }
  }
} 