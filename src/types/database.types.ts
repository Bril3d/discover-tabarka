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
          role: 'user' | 'admin'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          is_local?: boolean
          role?: 'user' | 'admin'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          is_local?: boolean
          role?: 'user' | 'admin'
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string | null
          user_id: string
          location_id: string | null
          category_id: string
          media_url: string | null
          media_type: 'image' | 'video' | 'text'
          is_featured: boolean
          is_approved: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content?: string | null
          user_id: string
          location_id?: string | null
          category_id: string
          media_url?: string | null
          media_type: 'image' | 'video' | 'text'
          is_featured?: boolean
          is_approved?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string | null
          user_id?: string
          location_id?: string | null
          category_id?: string
          media_url?: string | null
          media_type?: 'image' | 'video' | 'text'
          is_featured?: boolean
          is_approved?: boolean
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
        }
        Insert: {
          id?: string
          created_at?: string
          content: string
          user_id: string
          post_id: string
          is_approved?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          content?: string
          user_id?: string
          post_id?: string
          is_approved?: boolean
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
    }
  }
} 