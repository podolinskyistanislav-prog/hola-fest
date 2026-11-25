import { createClient } from 'npm:@supabase/supabase-js@2';
import { withCors } from '../_shared/cors.ts';
import { handleFeedComment } from './handler.ts';

// Injected by the Supabase Edge runtime; the service role key lives only in Supabase secrets.
const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

Deno.serve(
  withCors((req) =>
    handleFeedComment(req, {
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
      countCommentsSince: async (userId, since) => {
        const { count, error } = await admin
          .from('post_comments')
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
      postIsOpen: async (postId) => {
        const { data, error } = await admin
          .from('posts')
          .select('id')
          .eq('id', postId)
          .is('hidden_at', null)
          .maybeSingle();
        if (error) throw new Error('post lookup failed');
        return data !== null;
      },
      parentBelongsToPost: async (parentId, postId) => {
        const { data, error } = await admin
          .from('post_comments')
          .select('id')
          .eq('id', parentId)
          .eq('post_id', postId)
          .maybeSingle();
        if (error) throw new Error('comment lookup failed');
        return data !== null;
      },
      insertComment: async (userId, input) => {
        const { data, error } = await admin
          .from('post_comments')
          .insert({
            author_id: userId,
            post_id: input.postId,
            parent_id: input.parentId,
            body: input.body,
          })
          .select('id')
          .single();
        return error ? null : data.id;
      },
      now: () => new Date(),
    }),
  ),
);
