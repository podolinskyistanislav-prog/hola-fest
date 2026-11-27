const BUCKET_MARKER = '/feed-images/';

/** Storage path of a feed image from its public URL, so an edit can keep the photos. */
export function postImagePath(publicUrl: string): string | null {
  const at = publicUrl.indexOf(BUCKET_MARKER);
  if (at < 0) return null;
  const path = publicUrl.slice(at + BUCKET_MARKER.length).split('?')[0];
  return path ? decodeURIComponent(path) : null;
}

export function postImagePaths(publicUrls: readonly string[]): string[] {
  return publicUrls.flatMap((url) => postImagePath(url) ?? []);
}
