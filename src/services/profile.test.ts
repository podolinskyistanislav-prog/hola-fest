import { checkHandleAvailable } from './profile';
import { supabase } from './supabase';

jest.mock('./supabase', () => ({ supabase: { rpc: jest.fn() } }));

const rpc = supabase.rpc as unknown as jest.Mock;

describe('checkHandleAvailable', () => {
  beforeEach(() => rpc.mockReset());

  it('returns true when the RPC says the handle is free', async () => {
    rpc.mockResolvedValue({ data: true, error: null });
    await expect(checkHandleAvailable('free_one')).resolves.toBe(true);
    expect(rpc).toHaveBeenCalledWith('handle_available', { p_handle: 'free_one' });
  });

  it('returns false when the handle is taken', async () => {
    rpc.mockResolvedValue({ data: false, error: null });
    await expect(checkHandleAvailable('taken')).resolves.toBe(false);
  });

  it('throws a generic error when the RPC fails', async () => {
    rpc.mockResolvedValue({ data: null, error: { message: 'secret detail' } });
    await expect(checkHandleAvailable('x_y_z')).rejects.toThrow('handle_check_failed');
  });
});
