import { Share } from 'react-native';

import { shareVenue, venueLink } from './shareVenue';

jest.mock('expo-linking', () => ({
  createURL: (path: string) => `holafest://${path}`,
}));

describe('venueLink', () => {
  it('points at the club page and escapes the id', () => {
    expect(venueLink('v1')).toBe('holafest:///venue/v1');
    expect(venueLink('a/b')).toBe('holafest:///venue/a%2Fb');
  });
});

describe('shareVenue', () => {
  it('opens the share sheet with the name and the link', async () => {
    const share = jest
      .spyOn(Share, 'share')
      .mockResolvedValue({ action: 'dismissedAction', activityType: undefined });
    await shareVenue('v1', 'Bavovna');
    expect(share).toHaveBeenCalledWith({
      message: 'Bavovna\nholafest:///venue/v1',
      url: 'holafest:///venue/v1',
    });
  });
});
