import { Share } from 'react-native';

import { postLink, sharePost } from './sharePost';

jest.mock('expo-linking', () => ({
  createURL: (path: string) => `holafest://${path}`,
}));

describe('postLink', () => {
  it('points at the post page and escapes the id', () => {
    expect(postLink('p1')).toBe('holafest:///post/p1');
    expect(postLink('a/b')).toBe('holafest:///post/a%2Fb');
  });
});

describe('sharePost', () => {
  it('opens the share sheet with the message and the link', async () => {
    const share = jest
      .spyOn(Share, 'share')
      .mockResolvedValue({ action: 'dismissedAction', activityType: undefined });
    await sharePost('p1', 'Допис');
    expect(share).toHaveBeenCalledWith({
      message: 'Допис\nholafest:///post/p1',
      url: 'holafest:///post/p1',
    });
  });
});
