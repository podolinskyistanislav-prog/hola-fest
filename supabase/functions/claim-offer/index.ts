import { createClient } from 'npm:@supabase/supabase-js@2';
import { handleClaimOffer, type ClaimResult } from './handler.ts';

// Injected by the Supabase Edge runtime; the service role key lives only in Supabase secrets.
const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

Deno.serve((req) =>
  handleClaimOffer(req, {
    getUserId: async (authorization) => {
      const client = createClient(url, anonKey, {
        auth: { persistSession: false },
        global: { headers: { Authorization: authorization } },
      });
      const { data, error } = await client.auth.getUser();
      return error ? null : (data.user?.id ?? null);
    },
    claim: async (offerId, userId, tokenHash) => {
      const { data, error } = await admin.rpc('claim_offer', {
        p_offer_id: offerId,
        p_user_id: userId,
        p_token_hash: tokenHash,
      });
      return error ? null : (data as ClaimResult);
    },
    randomBytes: (length) => crypto.getRandomValues(new Uint8Array(length)),
  }),
);
