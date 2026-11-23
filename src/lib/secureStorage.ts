import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Thin wrapper over the device keychain / keystore. Values never leave the device
 * and are never logged. Failures (locked keychain, unsupported platform) resolve to
 * "nothing stored" so callers degrade instead of crashing.
 *
 * On web `expo-secure-store` is empty, so values fall back to `localStorage`. That is
 * NOT secure storage: it exists for development and screenshots only
 * (see docs/decisions/0009-web-secret-storage-fallback.md).
 */
function webStorage(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export async function saveSecret(key: string, value: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      const storage = webStorage();
      if (!storage) return false;
      storage.setItem(key, value);
      return true;
    }
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch {
    return false;
  }
}

export async function readSecret(key: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web') return webStorage()?.getItem(key) ?? null;
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export async function deleteSecret(key: string): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      webStorage()?.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  } catch {
    // nothing to delete or store unavailable
  }
}
