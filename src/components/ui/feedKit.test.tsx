import { fireEvent, render, screen } from '@testing-library/react-native';
import * as ReactNative from 'react-native';

import { AuthorLabel } from './AuthorLabel';
import { CommentRow } from './CommentRow';
import { Composer } from './Composer';
import { FeedRulesSheet } from './FeedRulesSheet';
import { ImageGrid } from './ImageGrid';
import { PostCard, formatRelativeTime } from './PostCard';
import { ReportSheet } from './ReportSheet';
import { TabBar } from './TabBar';
import { TabIcon, type TabIconName } from './TabIcon';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});

const NOW = new Date('2026-11-25T12:00:00Z');
const ago = (ms: number) => new Date(NOW.getTime() - ms);

describe('formatRelativeTime', () => {
  it('formats minutes, hours, yesterday, days and dates', () => {
    expect(formatRelativeTime(ago(10_000), NOW)).toBe('щойно');
    expect(formatRelativeTime(ago(5 * 60_000), NOW)).toBe('5 хв');
    expect(formatRelativeTime(ago(3 * 3_600_000), NOW)).toBe('3 год');
    expect(formatRelativeTime(ago(30 * 3_600_000), NOW)).toBe('вчора');
    expect(formatRelativeTime(ago(4 * 86_400_000), NOW)).toBe('4 дн');
    expect(formatRelativeTime(new Date(2026, 10, 2), NOW)).toBe('02.11');
  });
});

describe.each(['dark', 'light'] as const)('feed kit in %s theme', (scheme) => {
  beforeEach(() => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(scheme);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ['club', 'Клуб'],
    ['dj', 'Діджей'],
    ['hola', 'Hola'],
  ] as const)('AuthorLabel %s shows its text', async (kind, text) => {
    await render(<AuthorLabel kind={kind} />);
    expect(screen.getByText(text)).toBeTruthy();
  });

  it('ImageGrid renders 1 to 4 photos, caps at 4 and reports taps', async () => {
    const onPressImage = jest.fn();
    const uris = ['a', 'b', 'c', 'd', 'e'].map((id) => `https://x.test/${id}.jpg`);
    const { rerender } = await render(<ImageGrid uris={uris.slice(0, 1)} />);
    expect(screen.getAllByRole('imagebutton')).toHaveLength(1);
    await rerender(<ImageGrid uris={uris} onPressImage={onPressImage} />);
    expect(screen.getAllByRole('imagebutton')).toHaveLength(4);
    await fireEvent.press(screen.getByLabelText('Фото 3 з 4'));
    expect(onPressImage).toHaveBeenCalledWith(2);
  });

  it('ImageGrid renders nothing without photos', async () => {
    await render(<ImageGrid uris={[]} />);
    expect(screen.queryAllByRole('imagebutton')).toHaveLength(0);
  });

  it('PostCard shows author, badge, handle with time, text, counts and fires actions', async () => {
    const handlers = {
      onPressLike: jest.fn(),
      onPressComment: jest.fn(),
      onPressShare: jest.fn(),
      onPressMenu: jest.fn(),
    };
    await render(
      <PostCard
        authorName="Club Nova"
        handle="nova"
        authorKind="club"
        createdAt={ago(5 * 60_000)}
        now={NOW}
        text="Нове звучання в барі"
        photoUris={['https://x.test/1.jpg']}
        likeCount={12}
        commentCount={3}
        {...handlers}
      />,
    );
    expect(screen.getByText('Club Nova')).toBeTruthy();
    expect(screen.getByText('Клуб')).toBeTruthy();
    expect(screen.getByText('@nova · 5 хв')).toBeTruthy();
    expect(screen.getByText('Нове звучання в барі')).toBeTruthy();
    expect(screen.getAllByRole('imagebutton')).toHaveLength(1);
    await fireEvent.press(screen.getByLabelText('Вподобати, 12'));
    await fireEvent.press(screen.getByLabelText('Коментарі, 3'));
    await fireEvent.press(screen.getByLabelText('Поділитися'));
    await fireEvent.press(screen.getByLabelText('Ще'));
    Object.values(handlers).forEach((handler) => expect(handler).toHaveBeenCalledTimes(1));
  });

  it('PostCard marks a liked post and omits the badge for guests', async () => {
    await render(
      <PostCard
        authorName="Іра"
        handle="ira"
        createdAt={ago(30 * 3_600_000)}
        now={NOW}
        text="Було круто"
        likeCount={1}
        commentCount={0}
        liked
      />,
    );
    expect(screen.getByLabelText('Прибрати вподобання, 1').props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true }),
    );
    expect(screen.queryByText('Клуб')).toBeNull();
    expect(screen.getByText('@ira · вчора')).toBeTruthy();
  });

  it('CommentRow offers reply on top-level comments only', async () => {
    const onPressReply = jest.fn();
    const props = {
      authorName: 'Діма',
      handle: 'dima',
      createdAt: ago(60_000),
      now: NOW,
      text: 'Згоден',
    };
    const { rerender } = await render(<CommentRow {...props} onPressReply={onPressReply} />);
    await fireEvent.press(screen.getByLabelText('Відповісти'));
    expect(onPressReply).toHaveBeenCalledTimes(1);
    await rerender(<CommentRow {...props} isReply />);
    expect(screen.queryByLabelText('Відповісти')).toBeNull();
    expect(screen.getByText('Згоден')).toBeTruthy();
  });

  describe('Composer', () => {
    const base = {
      visible: true,
      text: '',
      onChangeText: jest.fn(),
      photoUris: [] as string[],
      onAddPhoto: jest.fn(),
      onRemovePhoto: jest.fn(),
      onSubmit: jest.fn(),
      onClose: jest.fn(),
    };

    it('shows the counter, blocks empty posts and publishes real text', async () => {
      const onSubmit = jest.fn();
      const { rerender } = await render(<Composer {...base} onSubmit={onSubmit} />);
      expect(screen.getByText('0/500')).toBeTruthy();
      await fireEvent.press(screen.getByLabelText('Опублікувати'));
      expect(onSubmit).not.toHaveBeenCalled();
      await rerender(<Composer {...base} text="Привіт" onSubmit={onSubmit} />);
      expect(screen.getByText('6/500')).toBeTruthy();
      await fireEvent.press(screen.getByLabelText('Опублікувати'));
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('limits the text field to 500 characters', async () => {
      await render(<Composer {...base} />);
      expect(screen.getByLabelText('Що нового?').props.maxLength).toBe(500);
    });

    it('adds photos until four and removes them', async () => {
      const onAddPhoto = jest.fn();
      const onRemovePhoto = jest.fn();
      const three = ['1', '2', '3'].map((id) => `file:///${id}.jpg`);
      const { rerender } = await render(
        <Composer
          {...base}
          photoUris={three}
          onAddPhoto={onAddPhoto}
          onRemovePhoto={onRemovePhoto}
        />,
      );
      await fireEvent.press(screen.getByLabelText('Додати фото'));
      expect(onAddPhoto).toHaveBeenCalledTimes(1);
      await fireEvent.press(screen.getByLabelText('Прибрати фото 2'));
      expect(onRemovePhoto).toHaveBeenCalledWith(1);
      await rerender(<Composer {...base} photoUris={[...three, 'file:///4.jpg']} />);
      expect(screen.queryByLabelText('Додати фото')).toBeNull();
    });

    it('shows the filter reason in an alert banner and disables publish while submitting', async () => {
      const reason = 'Схоже на рекламу події — анонси публікуй у розділі Події';
      await render(<Composer {...base} text="Привіт" error={reason} submitting />);
      expect(screen.getByRole('alert')).toBeTruthy();
      expect(screen.getByText(reason)).toBeTruthy();
      expect(screen.getByLabelText('Опублікувати').props.accessibilityState.disabled).toBe(true);
    });
  });

  it('ReportSheet lists the five reasons and reports the chosen one', async () => {
    const onSelectReason = jest.fn();
    await render(<ReportSheet visible onClose={jest.fn()} onSelectReason={onSelectReason} />);
    ['Реклама події', 'Образи', '18+', 'Спам', 'Інше'].forEach((label) =>
      expect(screen.getByLabelText(label)).toBeTruthy(),
    );
    await fireEvent.press(screen.getByLabelText('Спам'));
    expect(onSelectReason).toHaveBeenCalledWith('spam');
  });

  it('ReportSheet is hidden when not visible', async () => {
    await render(<ReportSheet visible={false} onClose={jest.fn()} onSelectReason={jest.fn()} />);
    expect(screen.queryByLabelText('Спам')).toBeNull();
  });

  it('FeedRulesSheet shows the rules and closes with Зрозуміло', async () => {
    const onClose = jest.fn();
    await render(<FeedRulesSheet visible onClose={onClose} />);
    expect(screen.getByText('Правила стрічки')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Зрозуміло'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('TabBar holds five tabs: Події, Карта, Стрічка, Діджеї, Мої QR', async () => {
    const defs: readonly [string, string, TabIconName][] = [
      ['index', 'Події', 'calendar'],
      ['map', 'Карта', 'map-pin'],
      ['feed', 'Стрічка', 'feed'],
      ['djs', 'Діджеї', 'headphones'],
      ['tickets', 'Мої QR', 'qr'],
    ];
    const onSelect = jest.fn();
    await render(
      <TabBar
        items={defs.map(([id, label, icon]) => ({
          id,
          label,
          renderIcon: (p: { color: string; size: number }) => <TabIcon name={icon} {...p} />,
        }))}
        activeId="feed"
        onSelect={onSelect}
      />,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(5);
    expect(screen.getByLabelText('Стрічка').props.accessibilityState.selected).toBe(true);
    await fireEvent.press(screen.getByLabelText('Мої QR'));
    expect(onSelect).toHaveBeenCalledWith('tickets');
  });
});
