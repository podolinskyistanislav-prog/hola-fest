# 0005 — Web build is a single-page app

**Context.** The web build exists for previews and screenshots, not as a product surface. With `web.output: "server"` Expo renders pages in Node, and the Supabase client (AsyncStorage) touches `window` at import time, so `expo export -p web` failed.

**Decision.** `app.json` sets `web.output: "single"`. This was a founder-approved change, made outside the ui lane on purpose to unblock #49.

**Consequences.** There is no server rendering and no Expo API routes on web. We use neither: all trusted logic lives in Supabase Edge Functions. The static server used for screenshots must fall back to `index.html` for unknown paths, and it does (`resolveStaticPath`).
