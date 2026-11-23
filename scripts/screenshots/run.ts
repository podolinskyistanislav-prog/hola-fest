/// <reference types="node" />
/* eslint-disable no-console -- this is a CLI; progress goes to stdout */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createHash } from 'node:crypto';
import { extname, join } from 'node:path';

import { createClient } from '@supabase/supabase-js';
import { chromium } from 'playwright';

import {
  appEnvFromSupabaseStatus,
  buildShotPlan,
  readStatusValue,
  resolveStaticPath,
  supabaseSessionStorageKey,
} from './plan';
import { OUTPUT_DIR, SCREENS, THEMES, TICKET_OFFER_ID, TICKET_TOKEN, VIEWPORT } from './screens';

const WEB_DIR = 'dist/screenshots-web';
const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
};

/** Reads local Supabase status, using the global CLI if installed, otherwise `npx supabase`. */
function readSupabaseStatus(): string {
  const args = ['status', '-o', 'env'];
  try {
    return execFileSync('supabase', args, { encoding: 'utf8' });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    return execFileSync('npx', ['--yes', 'supabase', ...args], { encoding: 'utf8' });
  }
}

/**
 * Signs in a throwaway anonymous demo guest (as the app does) and gives it a claim for the
 * seeded offer, written with the local service role key. The ticket screen then reads real
 * offer, venue and event data through the normal RLS-protected claims query.
 * Returns the localStorage entry that starts the browser signed in as that guest.
 */
async function seedDemoClaimSession(status: string): Promise<Record<string, string>> {
  const { EXPO_PUBLIC_SUPABASE_URL: url, EXPO_PUBLIC_SUPABASE_ANON_KEY: anonKey } =
    appEnvFromSupabaseStatus(status);
  const serviceKey = readStatusValue(status, 'SERVICE_ROLE_KEY');
  if (!url || !anonKey || !serviceKey) throw new Error('Local Supabase keys are missing.');

  const guest = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data, error } = await guest.auth.signInAnonymously();
  if (error || !data.session) throw new Error('Could not sign in the demo guest.');

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error: claimError } = await admin.from('claims').insert({
    offer_id: TICKET_OFFER_ID,
    user_id: data.session.user.id,
    token_hash: createHash('sha256').update(TICKET_TOKEN).digest('hex'),
  });
  if (claimError) throw new Error('Could not create the demo claim.');

  return { [supabaseSessionStorageKey(url)]: JSON.stringify(data.session) };
}

function exportWeb(status: string): void {
  const env = { ...process.env, ...appEnvFromSupabaseStatus(status) };
  rmSync(WEB_DIR, { recursive: true, force: true });
  execFileSync('npx', ['expo', 'export', '--platform', 'web', '--output-dir', WEB_DIR], {
    env,
    stdio: 'inherit',
  });
}

function serveWeb(): Promise<{ url: string; close: () => void }> {
  const root = join(process.cwd(), WEB_DIR);
  const isFile = (p: string) => existsSync(join(root, p)) && statSync(join(root, p)).isFile();
  const server = createServer((req, res) => {
    const file = resolveStaticPath(req.url ?? '/', isFile);
    if (!file) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(join(root, file)));
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo; // listen(0) on a TCP port always yields AddressInfo
      resolve({ url: `http://127.0.0.1:${port}`, close: () => server.close() });
    });
  });
}

async function main(): Promise<void> {
  const status = readSupabaseStatus();
  const session = await seedDemoClaimSession(status);
  const plan = buildShotPlan(SCREENS, THEMES).map((shot) => ({
    ...shot,
    seed: { ...shot.seed, ...session },
  }));
  exportWeb(status);
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const server = await serveWeb();
  const browser = await chromium.launch();
  try {
    for (const theme of THEMES) {
      const context = await browser.newContext({
        viewport: VIEWPORT,
        deviceScaleFactor: 2,
        colorScheme: theme,
      });
      for (const shot of plan.filter((s) => s.theme === theme)) {
        const page = await context.newPage();
        if (Object.keys(shot.seed).length > 0) {
          await page.addInitScript((entries: Record<string, string>) => {
            for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
          }, shot.seed);
        }
        const response = await page.goto(`${server.url}${shot.path}`, { waitUntil: 'networkidle' });
        if (!response?.ok()) throw new Error(`Screen ${shot.screen} did not load`);
        await page.waitForSelector('#root > *');
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: join(OUTPUT_DIR, shot.file) });
        await page.close();
        console.log(`saved ${join(OUTPUT_DIR, shot.file)}`);
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Screenshots failed');
  process.exit(1);
});
