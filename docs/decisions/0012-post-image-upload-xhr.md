# 0012 — Post image upload through XHR

**Context.** The post composer shows upload progress. `supabase.storage.upload` uses `fetch`, which reports no upload progress in React Native.

**Decision.** `uploadPostImage` sends the JPEG with `XMLHttpRequest` to the storage endpoint, authorised with the user's access token and the public anon key. Access is still enforced by the `feed-images` storage policies (own folder only), so nothing is trusted in the app.

**Consequences.** One place builds the storage URL by hand. If supabase-js adds progress events, switch back to the client upload.
