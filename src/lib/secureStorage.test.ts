import * as SecureStore from 'expo-secure-store';

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
