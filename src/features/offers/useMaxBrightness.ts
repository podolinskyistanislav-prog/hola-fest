import * as Brightness from 'expo-brightness';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Max screen brightness while the screen using this hook is open (a QR scans better bright).
 * Starts on; `toggle` turns it off and on. The previous level is restored on leave. Failures are
 * ignored: brightness is a comfort, never a reason to break the ticket.
 */
export function useMaxBrightness() {
  const [enabled, setEnabled] = useState(true);
  const previous = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    void (async () => {
      try {
        const before = await Brightness.getBrightnessAsync();
        if (cancelled) return;
        previous.current = before;
        await Brightness.setBrightnessAsync(1);
      } catch {
        previous.current = null;
      }
    })();
    return () => {
      cancelled = true;
      const level = previous.current;
      previous.current = null;
      if (level !== null) void Brightness.setBrightnessAsync(level).catch(() => undefined);
    };
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((value) => !value), []);
  return { enabled, toggle };
}
