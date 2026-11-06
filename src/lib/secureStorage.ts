import * as SecureStore from 'expo-secure-store';

/**
 * Thin wrapper over the device keychain / keystore. Values never leave the device
 * and are never logged. Failures (locked keychain, unsupported platform) resolve to
 * "nothing stored" so callers degrade instead of crashing.
 */
export async function saveSecret(key: string, value: string): Promise<boolean> {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch {
    return false;
  }
}

export async function readSecret(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export async function deleteSecret(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    // nothing to delete or store unavailable
  }
}
