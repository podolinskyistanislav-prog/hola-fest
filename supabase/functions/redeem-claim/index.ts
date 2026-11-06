import { createClient } from 'npm:@supabase/supabase-js@2';
import { handleRedeemClaim, type RedeemResult } from './handler.ts';

// Injected by the Supabase Edge runtime; the service role key lives only in Supabase secrets.
const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

Deno.serve((req) =>
  handleRedeemClaim(req, {
    getUserId: async (authorization) => {
      const client = createClient(url, anonKey, {
        auth: { persistSession: false },
        global: { headers: { Authorization: authorization } },
      });
      const { data, error } = await client.auth.getUser();
      return error ? null : (data.user?.id ?? null);
    },
    redeem: async (tokenHash, hostId) => {
      const { data, error } = await admin.rpc('redeem_claim', {
        p_token_hash: tokenHash,
        p_host_id: hostId,
      });
      return error ? null : (data as RedeemResult);
    },
  }),
);
