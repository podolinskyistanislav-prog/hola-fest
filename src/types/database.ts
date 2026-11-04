export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      claims: {
        Row: {
          id: string;
          issued_at: string;
          offer_id: string;
          redeemed_at: string | null;
          redeemed_by: string | null;
          status: string;
          token_hash: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          issued_at?: string;
          offer_id: string;
          redeemed_at?: string | null;
          redeemed_by?: string | null;
          status?: string;
          token_hash: string;
          user_id: string;
        };
        Update: {
          id?: string;
          issued_at?: string;
          offer_id?: string;
          redeemed_at?: string | null;
          redeemed_by?: string | null;
          status?: string;
          token_hash?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          cover_path: string | null;
          created_at: string;
          description: string | null;
          ends_at: string | null;
          id: string;
          lineup: string[];
          price_from_uah: number | null;
          starts_at: string;
          status: string;
          title: string;
          venue_id: string;
        };
        Insert: {
          cover_path?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          lineup?: string[];
          price_from_uah?: number | null;
          starts_at: string;
          status?: string;
          title: string;
          venue_id: string;
        };
        Update: {
          cover_path?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          lineup?: string[];
          price_from_uah?: number | null;
          starts_at?: string;
          status?: string;
          title?: string;
          venue_id?: string;
        };
        Relationships: [];
      };
      offers: {
        Row: {
          event_id: string;
          id: string;
          is_active: boolean;
          max_claims: number | null;
          per_user_limit: number;
          terms: string | null;
          title: string;
          valid_until: string | null;
        };
        Insert: {
          event_id: string;
          id?: string;
          is_active?: boolean;
          max_claims?: number | null;
          per_user_limit?: number;
          terms?: string | null;
          title: string;
          valid_until?: string | null;
        };
        Update: {
          event_id?: string;
          id?: string;
          is_active?: boolean;
          max_claims?: number | null;
          per_user_limit?: number;
          terms?: string | null;
          title?: string;
          valid_until?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          is_superadmin: boolean;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          is_superadmin?: boolean;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          is_superadmin?: boolean;
        };
        Relationships: [];
      };
      venue_members: {
        Row: {
          role: string;
          user_id: string;
          venue_id: string;
        };
        Insert: {
          role: string;
          user_id: string;
          venue_id: string;
        };
        Update: {
          role?: string;
          user_id?: string;
          venue_id?: string;
        };
        Relationships: [];
      };
      venues: {
        Row: {
          address: string | null;
          cover_path: string | null;
          created_at: string;
          description: string | null;
          has_shelter: boolean;
          id: string;
          instagram_url: string | null;
          is_published: boolean;
          lat: number | null;
          lng: number | null;
          name: string;
          slug: string;
        };
        Insert: {
          address?: string | null;
          cover_path?: string | null;
          created_at?: string;
          description?: string | null;
          has_shelter?: boolean;
          id?: string;
          instagram_url?: string | null;
          is_published?: boolean;
          lat?: number | null;
          lng?: number | null;
          name: string;
          slug: string;
        };
        Update: {
          address?: string | null;
          cover_path?: string | null;
          created_at?: string;
          description?: string | null;
          has_shelter?: boolean;
          id?: string;
          instagram_url?: string | null;
          is_published?: boolean;
          lat?: number | null;
          lng?: number | null;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
