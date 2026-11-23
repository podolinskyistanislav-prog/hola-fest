import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { deleteSecret, readSecret, saveSecret } from './secureStorage';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const store = SecureStore as jest.Mocked<typeof SecureStore>;

beforeEach(() => jest.resetAllMocks());

describe('secureStorage', () => {
  it('saves a value under its key', async () => {
    store.setItemAsync.mockResolvedValue();
    await expect(saveSecret('k', 'v')).resolves.toBe(true);
    expect(store.setItemAsync).toHaveBeenCalledWith('k', 'v');
  });

  it('reports a failed save instead of throwing', async () => {
    store.setItemAsync.mockRejectedValue(new Error('locked'));
    await expect(saveSecret('k', 'v')).resolves.toBe(false);
  });

  it('reads a stored value', async () => {
    store.getItemAsync.mockResolvedValue('v');
    await expect(readSecret('k')).resolves.toBe('v');
  });

  it('reads null when the store fails', async () => {
    store.getItemAsync.mockRejectedValue(new Error('locked'));
    await expect(readSecret('k')).resolves.toBeNull();
  });

  it('deletes a value and swallows store errors', async () => {
    store.deleteItemAsync.mockRejectedValue(new Error('nope'));
    await expect(deleteSecret('k')).resolves.toBeUndefined();
    expect(store.deleteItemAsync).toHaveBeenCalledWith('k');
  });
});

describe('secureStorage on web', () => {
  const originalOS = Platform.OS;
  const backing = new Map<string, string>();
  const fakeStorage = {
    setItem: (k: string, v: string) => void backing.set(k, v),
    getItem: (k: string) => backing.get(k) ?? null,
    removeItem: (k: string) => void backing.delete(k),
  };

  beforeEach(() => {
    backing.clear();
    Platform.OS = 'web';
    Object.defineProperty(globalThis, 'localStorage', { value: fakeStorage, configurable: true });
  });
  afterEach(() => {
    Platform.OS = originalOS;
    Reflect.deleteProperty(globalThis, 'localStorage');
  });

  it('saves, reads and deletes through localStorage, never SecureStore', async () => {
    await expect(saveSecret('k', 'v')).resolves.toBe(true);
    await expect(readSecret('k')).resolves.toBe('v');
    await deleteSecret('k');
    await expect(readSecret('k')).resolves.toBeNull();
    expect(store.setItemAsync).not.toHaveBeenCalled();
    expect(store.getItemAsync).not.toHaveBeenCalled();
    expect(store.deleteItemAsync).not.toHaveBeenCalled();
  });

  it('degrades when localStorage is unavailable', async () => {
    Reflect.deleteProperty(globalThis, 'localStorage');
    await expect(saveSecret('k', 'v')).resolves.toBe(false);
    await expect(readSecret('k')).resolves.toBeNull();
  });
});
