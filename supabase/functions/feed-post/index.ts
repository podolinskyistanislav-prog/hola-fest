import { createClient } from 'npm:@supabase/supabase-js@2';
import { withCors } from '../_shared/cors.ts';
import { handleFeedPost } from './handler.ts';

// Injected by the Supabase Edge runtime; the service role key lives only in Supabase secrets.
const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

Deno.serve(
  withCors((req) =>
    handleFeedPost(req, {
      getUser: async (authorization) => {
        const client = createClient(url, anonKey, {
          auth: { persistSession: false },
          global: { headers: { Authorization: authorization } },
        });
        const { data, error } = await client.auth.getUser();
        if (error || !data.user) return null;
        return { id: data.user.id, isAnonymous: data.user.is_anonymous === true };
      },
      isBanned: async (userId) => {
        const { data, error } = await admin
          .from('profiles')
          .select('is_banned')
          .eq('id', userId)
          .maybeSingle();
        if (error) throw new Error('profile lookup failed');
        return data?.is_banned !== false;
      },
      countPostsSince: async (userId, since) => {
        const { count, error } = await admin
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('author_id', userId)
          .gte('created_at', since.toISOString());
        if (error) throw new Error('count failed');
        return count ?? 0;
      },
      upcomingEventTitles: async (from, to) => {
        const { data, error } = await admin
          .from('events')
          .select('title')
          .eq('status', 'published')
          .gte('starts_at', from.toISOString())
          .lte('starts_at', to.toISOString());
        if (error) throw new Error('events lookup failed');
        return data ?? [];
      },
      isVenueMember: async (userId, venueId) => {
        const { data, error } = await admin
          .from('venue_members')
          .select('user_id')
          .eq('user_id', userId)
          .eq('venue_id', venueId)
          .maybeSingle();
        if (error) throw new Error('membership lookup failed');
        return data !== null;
      },
      insertPost: async (userId, input) => {
        const { data, error } = await admin
          .from('posts')
          .insert({
            author_id: userId,
            as_venue_id: input.asVenueId,
            body: input.body,
            image_paths: input.imagePaths,
          })
          .select('id')
          .single();
        return error ? null : data.id;
      },
      updateOwnPost: async (userId, postId, input) => {
        const { data, error } = await admin
          .from('posts')
          .update({
            body: input.body,
            image_paths: input.imagePaths,
            as_venue_id: input.asVenueId,
            edited_at: new Date().toISOString(),
          })
          .eq('id', postId)
          .eq('author_id', userId)
          .is('hidden_at', null)
          .select('id');
        if (error) throw new Error('update failed');
        return data.length > 0;
      },
      now: () => new Date(),
    }),
  ),
);
