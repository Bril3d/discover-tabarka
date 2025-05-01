import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';

export type User = Database['public']['Tables']['users']['Row'];
export type Permission = Database['public']['Tables']['permissions']['Row'];
export type UserPermission = Database['public']['Tables']['user_permissions']['Row'];

export const userService = {
  /**
   * Get all users with pagination
   */
  getUsers: async (page = 1, limit = 10, filters?: { role?: string; status?: string; search?: string }) => {
    let query = supabase.from('users').select('*', { count: 'exact' });
    
    // Apply filters
    if (filters?.role && filters.role !== 'all') {
      query = query.eq('role', filters.role);
    }
    
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
      
    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
    
    return {
      users: data || [],
      count: count || 0,
      totalPages: count ? Math.ceil(count / limit) : 0,
      currentPage: page
    };
  },
  
  /**
   * Get a user by ID
   */
  getUserById: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Update a user
   */
  updateUser: async (userId: string, userData: Partial<User>) => {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Delete a user
   */
  deleteUser: async (userId: string) => {
    // First delete all user permissions
    const { error: permError } = await supabase
      .from('user_permissions')
      .delete()
      .eq('user_id', userId);
    
    if (permError) {
      console.error('Error deleting user permissions:', permError);
      throw permError;
    }
    
    // Then delete the user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
      
    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
    
    return true;
  },
  
  /**
   * Get all permissions
   */
  getAllPermissions: async () => {
    const { data, error } = await supabase
      .from('permissions')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
    
    return data || [];
  },
  
  /**
   * Get permissions for a user
   */
  getUserPermissions: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_permissions')
      .select(`
        *,
        permissions:permission_id(*)
      `)
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching user permissions:', error);
      throw error;
    }
    
    // Extract the permission objects from the join
    return data?.map(item => item.permissions) || [];
  },
  
  /**
   * Update permissions for a user
   */
  updateUserPermissions: async (userId: string, permissionIds: string[]) => {
    // First delete all existing permissions for this user
    const { error: deleteError } = await supabase
      .from('user_permissions')
      .delete()
      .eq('user_id', userId);
      
    if (deleteError) {
      console.error('Error deleting user permissions:', deleteError);
      throw deleteError;
    }
    
    // If no permissions to add, return
    if (!permissionIds.length) {
      return [];
    }
    
    // Add the new permissions
    const permissionsToInsert = permissionIds.map(permissionId => ({
      user_id: userId,
      permission_id: permissionId,
    }));
    
    const { data, error } = await supabase
      .from('user_permissions')
      .insert(permissionsToInsert)
      .select();
      
    if (error) {
      console.error('Error adding user permissions:', error);
      throw error;
    }
    
    return data || [];
  }
}; 