/// <reference types="node" />
/* eslint-disable no-console -- this is a CLI; progress goes to stdout */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { extname, join } from 'node:path';

import { chromium } from 'playwright';

import { appEnvFromSupabaseStatus, buildShotPlan, resolveStaticPath } from './plan';
import { OUTPUT_DIR, SCREENS, THEMES, VIEWPORT } from './screens';

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

function exportWeb(): void {
  const status = execFileSync('supabase', ['status', '-o', 'env'], { encoding: 'utf8' });
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
  const plan = buildShotPlan(SCREENS, THEMES);
  exportWeb();
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
