import type { FeedComment } from '@/services/feed';

import { buildCommentThreads } from './commentThreads';

function comment(id: string, parentId: string | null = null): FeedComment {
  return {
    id,
    postId: 'p1',
    parentId,
    authorId: 'u1',
    authorName: 'Ola',
    handle: 'ola',
    avatarUrl: null,
    label: null,
    body: id,
    createdAt: '2026-11-20T10:00:00Z',
  };
}

describe('buildCommentThreads', () => {
  it('groups replies under their comment, keeping order', () => {
    const threads = buildCommentThreads([
      comment('a'),
      comment('b'),
      comment('a1', 'a'),
      comment('a2', 'a'),
    ]);
    expect(threads.map((thread) => thread.comment.id)).toEqual(['a', 'b']);
    expect(threads[0]?.replies.map((reply) => reply.id)).toEqual(['a1', 'a2']);
    expect(threads[1]?.replies).toEqual([]);
  });

  it('keeps a reply to a reply on one level', () => {
    const threads = buildCommentThreads([comment('a'), comment('a1', 'a'), comment('a1x', 'a1')]);
    expect(threads[0]?.replies.map((reply) => reply.id)).toEqual(['a1', 'a1x']);
  });

  it('drops replies whose parent is not visible', () => {
    const threads = buildCommentThreads([comment('a'), comment('x1', 'hidden')]);
    expect(threads).toHaveLength(1);
    expect(threads[0]?.replies).toEqual([]);
  });
});
