import { Share } from 'react-native';

import { eventLink, shareEvent } from './shareEvent';

jest.mock('expo-linking', () => ({
  createURL: (path: string) => `holafest://${path}`,
}));

describe('eventLink', () => {
  it('points at the event page and escapes the id', () => {
    expect(eventLink('e1')).toBe('holafest:///event/e1');
    expect(eventLink('a/b')).toBe('holafest:///event/a%2Fb');
  });
});

describe('shareEvent', () => {
  it('opens the share sheet with the title and the link', async () => {
    const share = jest
      .spyOn(Share, 'share')
      .mockResolvedValue({ action: 'dismissedAction', activityType: undefined });
    await shareEvent('e1', 'Hola Night');
    expect(share).toHaveBeenCalledWith({
      message: 'Hola Night\nholafest:///event/e1',
      url: 'holafest:///event/e1',
    });
  });
});
