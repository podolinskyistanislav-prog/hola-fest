import type { Href } from 'expo-router';

interface BackRouter {
  canGoBack: () => boolean;
  back: () => void;
  replace: (href: Href) => void;
}

/** Goes back when there is history; otherwise (page opened directly or reloaded) opens `fallback`. */
export function goBackOr(router: BackRouter, fallback: Href): void {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
