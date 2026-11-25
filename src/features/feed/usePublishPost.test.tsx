import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { t } from '@/lib/i18n';

import { usePublishPost } from './usePublishPost';

jest.mock('@/services/feed', () => ({ createPost: jest.fn(), uploadPostImage: jest.fn() }));

function setup(deps: Parameters<typeof usePublishPost>[1], userId: string | null = 'u1') {
  const client = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return renderHook(() => usePublishPost(userId ?? undefined, deps), { wrapper });
}

describe('usePublishPost', () => {
  it('uploads the photos, then publishes the trimmed text with their paths', async () => {
    const uploadPostImage = jest
      .fn()
      .mockResolvedValueOnce('u1/a.jpg')
      .mockResolvedValueOnce('u1/b.jpg');
    const createPost = jest.fn().mockResolvedValue({ ok: true, id: 'p1' });
    const { result } = await setup({ createPost, uploadPostImage });
    let outcome;
    await act(async () => {
      outcome = await result.current.publish({
        body: '  Класна ніч  ',
        photoUris: ['file://1', 'file://2'],
        asVenueId: 'v1',
      });
    });
    expect(outcome).toEqual({ ok: true });
    expect(createPost).toHaveBeenCalledWith({
      body: 'Класна ніч',
      imagePaths: ['u1/a.jpg', 'u1/b.jpg'],
      asVenueId: 'v1',
    });
  });

  it('shows the friendly filter reason in Ukrainian', async () => {
    const createPost = jest.fn().mockResolvedValue({ ok: false, reason: 'promo' });
    const { result } = await setup({ createPost, uploadPostImage: jest.fn() });
    let outcome;
    await act(async () => {
      outcome = await result.current.publish({ body: 'x', photoUris: [] });
    });
    expect(outcome).toEqual({ ok: false, error: t('feed.error.promo') });
  });

  it('does not publish when a photo fails to upload', async () => {
    const uploadPostImage = jest.fn().mockRejectedValue(new Error('post_image_upload_failed'));
    const createPost = jest.fn();
    const { result } = await setup({ createPost, uploadPostImage });
    let outcome;
    await act(async () => {
      outcome = await result.current.publish({ body: 'x', photoUris: ['file://1'] });
    });
    expect(outcome).toEqual({ ok: false, error: t('feed.error.photo') });
    expect(createPost).not.toHaveBeenCalled();
  });

  it('refuses without a signed-in user', async () => {
    const createPost = jest.fn();
    const { result } = await setup({ createPost, uploadPostImage: jest.fn() }, null);
    let outcome;
    await act(async () => {
      outcome = await result.current.publish({ body: 'x', photoUris: [] });
    });
    expect(outcome).toEqual({ ok: false, error: t('feed.error.unauthenticated') });
    expect(createPost).not.toHaveBeenCalled();
  });
});
