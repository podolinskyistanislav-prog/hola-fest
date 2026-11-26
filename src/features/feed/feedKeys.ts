export const feedKeys = {
  all: ['feed'] as const,
  list: () => [...feedKeys.all, 'list'] as const,
  myClubs: () => [...feedKeys.all, 'my-clubs'] as const,
  post: (postId: string) => [...feedKeys.all, 'post', postId] as const,
  comments: (postId: string) => [...feedKeys.all, 'comments', postId] as const,
  author: (handle: string) => [...feedKeys.all, 'author', handle] as const,
  authorPosts: (authorId: string) => [...feedKeys.all, 'author-posts', authorId] as const,
};
