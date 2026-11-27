import { postImagePath, postImagePaths } from './postImagePaths';

const BASE = 'https://x.supabase.co/storage/v1/object/public/feed-images';

describe('postImagePath', () => {
  it('extracts the storage path from a public URL', () => {
    expect(postImagePath(`${BASE}/u1/post-1-abc.jpg`)).toBe('u1/post-1-abc.jpg');
  });

  it('ignores a query string', () => {
    expect(postImagePath(`${BASE}/u1/a.jpg?t=1`)).toBe('u1/a.jpg');
  });

  it('returns null for a foreign URL', () => {
    expect(postImagePath('https://example.com/a.jpg')).toBeNull();
  });

  it('keeps only the recognised URLs in a list', () => {
    expect(postImagePaths([`${BASE}/u1/a.jpg`, 'https://example.com/a.jpg'])).toEqual(['u1/a.jpg']);
  });
});
