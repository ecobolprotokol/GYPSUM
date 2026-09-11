export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          pin_hash: string;
          display_name: string;
          force_change_pin: boolean;
          failed_login_attempts: number;
          locked_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          pin_hash: string;
          display_name?: string;
          force_change_pin?: boolean;
          failed_login_attempts?: number;
          locked_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          pin_hash?: string;
          display_name?: string;
          force_change_pin?: boolean;
          failed_login_attempts?: number;
          locked_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      business_settings: {
        Row: {
          id: string;
          business_name: string;
          tagline: string | null;
          description: string | null;
          highlights_json: Json | null;
          faq_json: Json | null;
          about_json: Json | null;
          address: string | null;
          google_maps_embed_url: string | null;
          google_maps_link: string | null;
          whatsapp_number: string;
          instagram_url: string | null;
          facebook_url: string | null;
          tiktok_url: string | null;
          email: string | null;
          operating_hours: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          tagline?: string | null;
          description?: string | null;
          highlights_json?: Json | null;
          faq_json?: Json | null;
          about_json?: Json | null;
          address?: string | null;
          google_maps_embed_url?: string | null;
          google_maps_link?: string | null;
          whatsapp_number: string;
          instagram_url?: string | null;
          facebook_url?: string | null;
          tiktok_url?: string | null;
          email?: string | null;
          operating_hours?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          updated_at?: string;
        };
        Update: {
          [key: string]: unknown;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          cover_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          cover_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          [key: string]: unknown;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          short_description: string | null;
          full_description: string | null;
          specification_json: Json | null;
          price_mode: 'exact' | 'start';
          price: number | null;
          price_start: number | null;
          unit: string;
          min_order: number | null;
          min_order_note: string | null;
          is_pickup_only: boolean;
          delivery_available: boolean;
          cover_url: string;
          gallery_urls: string[];
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          slug: string;
          short_description?: string | null;
          full_description?: string | null;
          specification_json?: Json | null;
          price_mode: 'exact' | 'start';
          price?: number | null;
          price_start?: number | null;
          unit: string;
          min_order?: number | null;
          min_order_note?: string | null;
          is_pickup_only?: boolean;
          delivery_available?: boolean;
          cover_url: string;
          gallery_urls?: string[];
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          [key: string]: unknown;
        };
      };
      borringan_services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          cover_url: string | null;
          price_min: number;
          price_max: number;
          unit: string;
          includes: string | null;
          notes: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          cover_url?: string | null;
          price_min: number;
          price_max: number;
          unit?: string;
          includes?: string | null;
          notes?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          [key: string]: unknown;
        };
      };
      calculator_presets: {
        Row: {
          id: string;
          service_id: string | null;
          label: string;
          multiplier: number;
          description: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          service_id?: string | null;
          label: string;
          multiplier?: number;
          description?: string | null;
          sort_order?: number;
        };
        Update: {
          [key: string]: unknown;
        };
      };
      gallery_projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          cover_url: string;
          external_link: string | null;
          external_link_label: string;
          location: string | null;
          completed_at: string | null;
          description: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          cover_url: string;
          external_link?: string | null;
          external_link_label?: string;
          location?: string | null;
          completed_at?: string | null;
          description?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          [key: string]: unknown;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'])
    | { schema: keyof Database },
 TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> =
  PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Row: infer R,
      }
      ? R
      : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Row: infer R,
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> =
  PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer R,
      }
      ? R
      : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer R,
      }
      ? R
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> =
  PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer R,
      }
      ? R
      : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer R,
      }
      ? R
      : never
    : never;
