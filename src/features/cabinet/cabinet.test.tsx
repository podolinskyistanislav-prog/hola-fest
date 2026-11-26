import { fireEvent, render, screen } from '@testing-library/react-native';

import type { VenueProfile } from '@/services/venueProfile';

import { CabinetHome, type CabinetHomeProps } from './CabinetHome';
import { TeamPanel, type TeamPanelProps } from './TeamPanel';
import { VenueProfileEditor, type VenueProfileEditorProps } from './VenueProfileEditor';

jest.mock('@/features/map', () => ({ VenueMap: () => null }));

const homeBase: CabinetHomeProps = {
  venueName: 'Club',
  role: 'owner',
  isLoading: false,
  isError: false,
  onRetry: jest.fn(),
  onOpenProfile: jest.fn(),
  onOpenTeam: jest.fn(),
  onOpenEvents: jest.fn(),
  onOpenOffers: jest.fn(),
  onOpenScanner: jest.fn(),
};

describe('CabinetHome', () => {
  it('shows loading and error states', async () => {
    const onRetry = jest.fn();
    await render(<CabinetHome {...homeBase} isLoading isError onRetry={onRetry} />);
    expect(screen.getByLabelText('Завантажуємо…')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Спробувати ще раз'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('shows today numbers and the week ahead', async () => {
    const event = {
      id: 'e1',
      title: 'Techno Night',
      startsAt: new Date(2026, 5, 3, 22, 0),
      status: 'published' as const,
      offersCount: 0,
    };
    await render(
      <CabinetHome
        {...homeBase}
        dashboard={{
          todayEvents: [event],
          nextEvents: [event],
          liveOffers: [],
          claimsToday: 7,
          redemptionsToday: 3,
        }}
      />,
    );
    expect(screen.getByLabelText('Взято: 7')).toBeTruthy();
    expect(screen.getByLabelText('Використано: 3')).toBeTruthy();
    expect(screen.getByLabelText('Techno Night')).toBeTruthy();
  });

  it('shows profile and team only to the owner', async () => {
    const onOpenTeam = jest.fn();
    const { rerender } = await render(<CabinetHome {...homeBase} onOpenTeam={onOpenTeam} />);
    await fireEvent.press(screen.getByLabelText('Команда'));
    expect(onOpenTeam).toHaveBeenCalled();

    await rerender(<CabinetHome {...homeBase} role="admin" />);
    expect(screen.queryByLabelText('Команда')).toBeNull();
    expect(screen.queryByLabelText('Профіль закладу')).toBeNull();
    expect(screen.getByLabelText('Події та пропозиції')).toBeTruthy();
  });
});

const teamBase: TeamPanelProps = {
  members: [
    { userId: 'u1', role: 'owner', displayName: 'Olena', handle: null },
    { userId: 'u2', role: 'host', displayName: null, handle: 'ivan' },
  ],
  invites: [
    {
      id: 'i1',
      email: 'new@club.ua',
      role: 'admin',
      createdAt: new Date(),
      expiresAt: new Date(),
    },
  ],
  isLoading: false,
  isError: false,
  isInviting: false,
  actionError: null,
  newInviteToken: null,
  onRetry: jest.fn(),
  onInvite: jest.fn(),
  onDismissToken: jest.fn(),
  onRemoveMember: jest.fn(),
  onCancelInvite: jest.fn(),
};

describe('TeamPanel', () => {
  it('lists members and lets the owner remove only non-owners', async () => {
    const onRemoveMember = jest.fn();
    await render(<TeamPanel {...teamBase} onRemoveMember={onRemoveMember} />);
    expect(screen.queryByLabelText('Прибрати, Olena')).toBeNull();
    await fireEvent.press(screen.getByLabelText('Прибрати, ivan'));
    expect(onRemoveMember).toHaveBeenCalledWith('u2');
  });

  it('invites only with a valid email and picks the role', async () => {
    const onInvite = jest.fn();
    await render(<TeamPanel {...teamBase} onInvite={onInvite} />);
    await fireEvent.press(screen.getByLabelText('Створити запрошення'));
    expect(onInvite).not.toHaveBeenCalled();

    await fireEvent.changeText(screen.getByLabelText('Електронна пошта'), 'a@b.ua');
    await fireEvent.press(screen.getByRole('button', { name: 'Адмін' }));
    await fireEvent.press(screen.getByLabelText('Створити запрошення'));
    expect(onInvite).toHaveBeenCalledWith('a@b.ua', 'admin');
  });

  it('cancels an open invite and shows the one-time token', async () => {
    const onCancelInvite = jest.fn();
    await render(
      <TeamPanel {...teamBase} onCancelInvite={onCancelInvite} newInviteToken="tok-123" />,
    );
    expect(screen.getByText('tok-123')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Скасувати, new@club.ua'));
    expect(onCancelInvite).toHaveBeenCalledWith('i1');
  });
});

const profile: VenueProfile = {
  id: 'v1',
  slug: 'club',
  name: 'Club',
  isPublished: true,
  description: 'Good place',
  address: 'Street 1',
  lat: 50.4,
  lng: 30.5,
  instagramUrl: 'https://instagram.com/club',
  hasShelter: true,
  coverPath: null,
  photos: [],
};

const editorBase: VenueProfileEditorProps = {
  profile,
  mediaUrl: (path) => `https://cdn/${path}`,
  isSaving: false,
  isUploading: false,
  error: null,
  onSave: jest.fn(),
  onPickCover: jest.fn(),
  onPickPhoto: jest.fn(),
  onRemovePhoto: jest.fn(),
};

describe('VenueProfileEditor', () => {
  it('saves the edited fields', async () => {
    const onSave = jest.fn();
    await render(<VenueProfileEditor {...editorBase} onSave={onSave} />);
    await fireEvent.changeText(screen.getByLabelText('Опис'), '  New text ');
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(onSave).toHaveBeenCalledWith({
      description: 'New text',
      address: 'Street 1',
      lat: 50.4,
      lng: 30.5,
      instagramUrl: 'https://instagram.com/club',
      hasShelter: true,
    });
  });

  it('blocks saving an invalid instagram link', async () => {
    const onSave = jest.fn();
    await render(<VenueProfileEditor {...editorBase} onSave={onSave} />);
    await fireEvent.changeText(screen.getByLabelText('Instagram'), 'http://bad.example');
    expect(screen.getByText('Встав посилання виду https://instagram.com/…')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Зберегти'));
    expect(onSave).not.toHaveBeenCalled();
  });

  it('asks for a photo of the chosen kind', async () => {
    const onPickPhoto = jest.fn();
    await render(<VenueProfileEditor {...editorBase} onPickPhoto={onPickPhoto} />);
    await fireEvent.press(screen.getByLabelText('Додати фото, Всередині'));
    expect(onPickPhoto).toHaveBeenCalledWith('inside');
  });

  it('previews the page as guests see it', async () => {
    await render(<VenueProfileEditor {...editorBase} />);
    await fireEvent.press(screen.getByLabelText('Як бачать гості'));
    expect(screen.getByText('Good place')).toBeTruthy();
    expect(screen.getByText('Є укриття')).toBeTruthy();
    expect(screen.queryByLabelText('Зберегти')).toBeNull();
  });
});
