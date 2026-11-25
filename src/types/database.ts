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
            referencedRelation: 'offer_stats';
            referencedColumns: ['offer_id'];
          },
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
          ends_at: string | null;
          event_id: string | null;
          id: string;
          is_active: boolean;
          kind: string;
          max_claims: number | null;
          per_user_limit: number;
          starts_at: string | null;
          status: string;
          terms: string | null;
          title: string;
          valid_until: string | null;
          value: string | null;
          venue_id: string;
          offer_effective_status: string | null;
          offer_is_live: boolean | null;
        };
        ComputedFields: 'offer_effective_status' | 'offer_is_live';
        Insert: {
          created_at?: string;
          ends_at?: string | null;
          event_id?: string | null;
          id?: string;
          is_active?: boolean;
          kind?: string;
          max_claims?: number | null;
          per_user_limit?: number;
          starts_at?: string | null;
          status?: string;
          terms?: string | null;
          title: string;
          valid_until?: string | null;
          value?: string | null;
          venue_id: string;
        };
        Update: {
          created_at?: string;
          ends_at?: string | null;
          event_id?: string | null;
          id?: string;
          is_active?: boolean;
          kind?: string;
          max_claims?: number | null;
          per_user_limit?: number;
          starts_at?: string | null;
          status?: string;
          terms?: string | null;
          title?: string;
          valid_until?: string | null;
          value?: string | null;
          venue_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'offers_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'offers_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          is_superadmin: boolean;
        };
        ComputedFields: never;
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
      offer_stats: {
        Row: {
          claims: number | null;
          offer_id: string;
          redemptions: number | null;
          venue_id: string;
        };
        ComputedFields: never;
        Relationships: [
          {
            foreignKeyName: 'offers_venue_id_fkey';
            columns: ['venue_id'];
            isOneToOne: false;
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      claim_offer: {
        Args: { p_offer_id: string; p_token_hash: string; p_user_id: string };
        Returns: string;
      };
      duplicate_offer: {
        Args: { p_offer_id: string };
        Returns: {
          created_at: string;
          ends_at: string | null;
          event_id: string | null;
          id: string;
          is_active: boolean;
          kind: string;
          max_claims: number | null;
          per_user_limit: number;
          starts_at: string | null;
          status: string;
          terms: string | null;
          title: string;
          valid_until: string | null;
          value: string | null;
          venue_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'offers';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      end_offer: {
        Args: { p_offer_id: string };
        Returns: {
          created_at: string;
          ends_at: string | null;
          event_id: string | null;
          id: string;
          is_active: boolean;
          kind: string;
          max_claims: number | null;
          per_user_limit: number;
          starts_at: string | null;
          status: string;
          terms: string | null;
          title: string;
          valid_until: string | null;
          value: string | null;
          venue_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'offers';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      event_venue_id: { Args: { p_event_id: string }; Returns: string };
      has_claim_on_offer: { Args: { p_offer_id: string }; Returns: boolean };
      hook_before_user_created: { Args: { event: Json }; Returns: Json };
      is_event_public: { Args: { p_event_id: string }; Returns: boolean };
      is_superadmin: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_venue_member: { Args: { p_role?: string; p_venue_id: string }; Returns: boolean };
      offer_effective_status: {
        Args: {
          p_offer: Omit<
            Database['public']['Tables']['offers']['Row'],
            Database['public']['Tables']['offers']['ComputedFields']
          >;
        };
        Returns: string;
      };
      offer_is_live: {
        Args: {
          p_offer: Omit<
            Database['public']['Tables']['offers']['Row'],
            Database['public']['Tables']['offers']['ComputedFields']
          >;
        };
        Returns: boolean;
      };
      offer_venue_id: { Args: { p_offer_id: string }; Returns: string };
      pause_offer: {
        Args: { p_offer_id: string };
        Returns: {
          created_at: string;
          ends_at: string | null;
          event_id: string | null;
          id: string;
          is_active: boolean;
          kind: string;
          max_claims: number | null;
          per_user_limit: number;
          starts_at: string | null;
          status: string;
          terms: string | null;
          title: string;
          valid_until: string | null;
          value: string | null;
          venue_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'offers';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      redeem_claim: { Args: { p_host_id: string; p_token_hash: string }; Returns: string };
      resume_offer: {
        Args: { p_offer_id: string };
        Returns: {
          created_at: string;
          ends_at: string | null;
          event_id: string | null;
          id: string;
          is_active: boolean;
          kind: string;
          max_claims: number | null;
          per_user_limit: number;
          starts_at: string | null;
          status: string;
          terms: string | null;
          title: string;
          valid_until: string | null;
          value: string | null;
          venue_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'offers';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      set_offer_status: {
        Args: { p_from: string[]; p_offer_id: string; p_to: string };
        Returns: {
          created_at: string;
          ends_at: string | null;
          event_id: string | null;
          id: string;
          is_active: boolean;
          kind: string;
          max_claims: number | null;
          per_user_limit: number;
          starts_at: string | null;
          status: string;
          terms: string | null;
          title: string;
          valid_until: string | null;
          value: string | null;
          venue_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'offers';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
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
