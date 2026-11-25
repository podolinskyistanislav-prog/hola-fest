export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: { extensions?: Json; operationName?: string; query?: string; variables?: Json };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
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
        ComputedFields: never;
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
        Relationships: [
          {
            foreignKeyName: 'claims_offer_id_fkey';
            columns: ['offer_id'];
            isOneToOne: false;
            referencedRelation: 'offers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'claims_redeemed_by_fkey';
            columns: ['redeemed_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'claims_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
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
          tags: string[];
          title: string;
          venue_id: string;
        };
        ComputedFields: never;
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
          tags?: string[];
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
          tags?: string[];
          title?: string;
          venue_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
      };
      offers: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          is_active: boolean;
          max_claims: number | null;
          per_user_limit: number;
          terms: string | null;
          title: string;
          valid_until: string | null;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
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
          created_at?: string;
          event_id?: string;
          id?: string;
          is_active?: boolean;
          max_claims?: number | null;
          per_user_limit?: number;
          terms?: string | null;
          title?: string;
          valid_until?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'offers_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      post_comments: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          hidden_at: string | null;
          hidden_reason: string | null;
          id: string;
          parent_id: string | null;
          post_id: string;
        };
        ComputedFields: never;
        Insert: {
          author_id: string;
          body: string;
          created_at?: string;
          hidden_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          parent_id?: string | null;
          post_id: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          hidden_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          parent_id?: string | null;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_comments_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_comments_parent_id_fkey';
            columns: ['parent_id'];
            isOneToOne: false;
            referencedRelation: 'post_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'feed_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      post_likes: {
        Row: {
          created_at: string;
          post_id: string;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'feed_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      post_reports: {
        Row: {
          comment_id: string | null;
          created_at: string;
          id: string;
          post_id: string | null;
          reason: string;
          reporter_id: string;
        };
        ComputedFields: never;
        Insert: {
          comment_id?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          reason: string;
          reporter_id: string;
        };
        Update: {
          comment_id?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          reason?: string;
          reporter_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_reports_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'post_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_reports_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'feed_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_reports_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_reports_reporter_id_fkey';
            columns: ['reporter_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      posts: {
        Row: {
          as_venue_id: string | null;
          author_id: string;
          body: string;
          created_at: string;
          edited_at: string | null;
          hidden_at: string | null;
          hidden_reason: string | null;
          id: string;
          image_paths: string[];
        };
        ComputedFields: never;
        Insert: {
          as_venue_id?: string | null;
          author_id: string;
          body?: string;
          created_at?: string;
          edited_at?: string | null;
          hidden_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          image_paths?: string[];
        };
        Update: {
          as_venue_id?: string | null;
          author_id?: string;
          body?: string;
          created_at?: string;
          edited_at?: string | null;
          hidden_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          image_paths?: string[];
        };
        Relationships: [
          {
            foreignKeyName: 'posts_as_venue_id_fkey';
            columns: ['as_venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'posts_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_path: string | null;
          created_at: string;
          display_name: string | null;
          handle: string | null;
          id: string;
          is_banned: boolean;
          is_dj: boolean;
          is_superadmin: boolean;
        };
        ComputedFields: never;
        Insert: {
          avatar_path?: string | null;
          created_at?: string;
          display_name?: string | null;
          handle?: string | null;
          id: string;
          is_banned?: boolean;
          is_dj?: boolean;
          is_superadmin?: boolean;
        };
        Update: {
          avatar_path?: string | null;
          created_at?: string;
          display_name?: string | null;
          handle?: string | null;
          id?: string;
          is_banned?: boolean;
          is_dj?: boolean;
          is_superadmin?: boolean;
        };
        Relationships: [];
      };
      user_blocks: {
        Row: {
          blocked_id: string;
          blocker_id: string;
          created_at: string;
        };
        ComputedFields: never;
        Insert: {
          blocked_id: string;
          blocker_id: string;
          created_at?: string;
        };
        Update: {
          blocked_id?: string;
          blocker_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_blocks_blocked_id_fkey';
            columns: ['blocked_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_blocks_blocker_id_fkey';
            columns: ['blocker_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      venue_members: {
        Row: {
          role: string;
          user_id: string;
          venue_id: string;
        };
        ComputedFields: never;
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
        Relationships: [
          {
            foreignKeyName: 'venue_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'venue_members_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
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
        ComputedFields: never;
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
    Views: {
      feed_posts: {
        Row: {
          as_venue_id: string | null;
          author_avatar_path: string | null;
          author_handle: string | null;
          author_id: string;
          author_name: string | null;
          body: string;
          comment_count: number | null;
          created_at: string;
          edited_at: string | null;
          id: string;
          image_paths: string[];
          label: string | null;
          like_count: number | null;
          liked_by_me: boolean | null;
        };
        ComputedFields: never;
        Relationships: [
          {
            foreignKeyName: 'posts_as_venue_id_fkey';
            columns: ['as_venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'posts_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      can_interact: { Args: Record<PropertyKey, never>; Returns: boolean };
      claim_offer: {
        Args: { p_offer_id: string; p_token_hash: string; p_user_id: string };
        Returns: string;
      };
      event_venue_id: { Args: { p_event_id: string }; Returns: string };
      feed_author_visible: { Args: { p_author_id: string }; Returns: boolean };
      handle_available: { Args: { p_handle: string }; Returns: boolean };
      hook_before_user_created: { Args: { event: Json }; Returns: Json };
      is_event_public: { Args: { p_event_id: string }; Returns: boolean };
      is_superadmin: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_venue_member: { Args: { p_role?: string; p_venue_id: string }; Returns: boolean };
      offer_venue_id: { Args: { p_offer_id: string }; Returns: string };
      redeem_claim: { Args: { p_host_id: string; p_token_hash: string }; Returns: string };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
