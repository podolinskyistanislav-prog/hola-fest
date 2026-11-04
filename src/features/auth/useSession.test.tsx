import { act, renderHook, waitFor } from '@testing-library/react-native';

import { createSessionStore, type Session } from './sessionStore';
import { useSession } from './useSession';

jest.mock('@/services/auth', () => ({
  ensureGuestSession: jest.fn(),
  onAuthChange: jest.fn(),
}));

const guest = { user: { is_anonymous: true } } as unknown as Session;
const staff = { user: { is_anonymous: false } } as unknown as Session;

function setup(ensure: jest.Mock) {
  let emit: (session: Session | null) => void = () => undefined;
  const unsubscribe = jest.fn();
  const onAuthChange = jest.fn((cb: (e: string, s: Session | null) => void) => {
    emit = (s) => cb('SIGNED_IN', s);
    return unsubscribe;
  });
  const store = createSessionStore({ ensureGuestSession: ensure, onAuthChange });
  return { store, unsubscribe, emit: (s: Session | null) => emit(s) };
}

describe('useSession', () => {
  it('stays loading while the guest session is being created', async () => {
    const { store } = setup(jest.fn().mockReturnValue(new Promise(() => undefined)));
    const { result } = await renderHook(() => useSession(store));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.session).toBeNull();
  });

  it('exposes the guest session and signs in only once', async () => {
    const ensure = jest.fn().mockResolvedValue(guest);
    const { store } = setup(ensure);
    const { result } = await renderHook(() => useSession(store));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.session).toBe(guest);
    expect(result.current.isAnonymous).toBe(true);
    expect(ensure).toHaveBeenCalledTimes(1);
  });

  it('reports an error and recovers on retry', async () => {
    const ensure = jest.fn().mockRejectedValueOnce(new Error('x')).mockResolvedValue(guest);
    const { store } = setup(ensure);
    const { result } = await renderHook(() => useSession(store));
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isRetrying).toBe(false);
    await act(async () => result.current.retry());
    await waitFor(() => expect(result.current.session).toBe(guest));
    expect(result.current.isError).toBe(false);
  });

  it('reports isRetrying while a retry is pending', async () => {
    const ensure = jest
      .fn()
      .mockRejectedValueOnce(new Error('x'))
      .mockReturnValueOnce(new Promise(() => undefined));
    const { store } = setup(ensure);
    const { result } = await renderHook(() => useSession(store));
    await waitFor(() => expect(result.current.isError).toBe(true));
    await act(async () => result.current.retry());
    expect(result.current.isRetrying).toBe(true);
    expect(result.current.isLoading).toBe(true);
  });

  it('follows auth changes such as staff sign-in', async () => {
    const { store, emit } = setup(jest.fn().mockResolvedValue(guest));
    const { result } = await renderHook(() => useSession(store));
    await waitFor(() => expect(result.current.session).toBe(guest));
    await act(async () => emit(staff));
    expect(result.current.isAnonymous).toBe(false);
  });

  it('starts a fresh guest session after staff sign-out', async () => {
    const fresh = { user: { is_anonymous: true, id: 'fresh' } } as unknown as Session;
    const ensure = jest.fn().mockResolvedValueOnce(guest).mockResolvedValueOnce(fresh);
    const { store, emit } = setup(ensure);
    const { result } = await renderHook(() => useSession(store));
    await waitFor(() => expect(result.current.session).toBe(guest));
    await act(async () => emit(staff));
    await act(async () => emit(null));
    await waitFor(() => expect(result.current.session).toBe(fresh));
    expect(ensure).toHaveBeenCalledTimes(2);
  });

  it('unsubscribes from auth changes on unmount', async () => {
    const { store, unsubscribe } = setup(jest.fn().mockResolvedValue(guest));
    const { unmount } = await renderHook(() => useSession(store));
    await unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
