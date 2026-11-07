import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as Brightness from 'expo-brightness';

import { t } from '@/lib/i18n';
import { getMyClaims } from '@/services/claims';
import type { MyClaim } from '@/types/claims';

import { getClaimToken } from './claimedTokens';
import { MyTicketsContent } from './MyTicketsContent';
import { TicketScreenContent } from './TicketScreenContent';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@/services/claims', () => ({ getMyClaims: jest.fn(), claimOffer: jest.fn() }));
jest.mock('@expo/vector-icons', () => ({ Feather: () => null }));
jest.mock('expo-brightness', () => ({
  getBrightnessAsync: jest.fn(),
  setBrightnessAsync: jest.fn(),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('./claimedTokens', () => ({ getClaimToken: jest.fn() }));

const mockClaims = getMyClaims as jest.Mock;
const mockToken = getClaimToken as jest.Mock;

const claim: MyClaim = {
  id: 'c1',
  status: 'issued',
  issuedAt: new Date(2026, 10, 4, 18),
  redeemedAt: null,
  offer: {
    id: 'o1',
    title: '−20% на напої',
    terms: null,
    validUntil: null,
    event: {
      id: 'e1',
      title: 'Hola Night',
      startsAt: new Date(2026, 10, 4, 20),
      endsAt: null,
      venue: { id: 'v1', name: 'Bavovna', address: null, lat: null, lng: null },
    },
  },
};

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

beforeEach(() => {
  jest.resetAllMocks();
  (Brightness.getBrightnessAsync as jest.Mock).mockResolvedValue(0.5);
  (Brightness.setBrightnessAsync as jest.Mock).mockResolvedValue(undefined);
});

describe('MyTicketsContent', () => {
  it('shows a loading state first', async () => {
    mockClaims.mockReturnValue(new Promise(() => undefined));
    await renderWithClient(<MyTicketsContent onOpenTicket={jest.fn()} onBack={jest.fn()} />);
    expect(screen.getByLabelText(t('tickets.loading'))).toBeTruthy();
  });

  it('shows an empty state', async () => {
    mockClaims.mockResolvedValue([]);
    await renderWithClient(<MyTicketsContent onOpenTicket={jest.fn()} onBack={jest.fn()} />);
    expect(await screen.findByText(t('tickets.emptyTitle'))).toBeTruthy();
  });

  it('shows an error state with retry', async () => {
    mockClaims.mockRejectedValue(new Error('x'));
    await renderWithClient(<MyTicketsContent onOpenTicket={jest.fn()} onBack={jest.fn()} />);
    expect(await screen.findByText(t('tickets.errorTitle'))).toBeTruthy();
    expect(screen.getByRole('button', { name: t('events.retry') })).toBeTruthy();
  });

  it('lists claims with their status and opens one', async () => {
    mockClaims.mockResolvedValue([
      claim,
      { ...claim, id: 'c2', status: 'redeemed', offer: { ...claim.offer, id: 'o2', title: 'Шот' } },
    ]);
    const onOpenTicket = jest.fn();
    await renderWithClient(<MyTicketsContent onOpenTicket={onOpenTicket} onBack={jest.fn()} />);
    expect(await screen.findByText(t('tickets.statusActive'))).toBeTruthy();
    expect(screen.getByText(t('tickets.statusRedeemed'))).toBeTruthy();
    await fireEvent.press(screen.getByText('−20% на напої'));
    expect(onOpenTicket).toHaveBeenCalledWith('o1');
  });
});

describe('TicketScreenContent', () => {
  it('shows the QR from the stored token even when claims cannot load (offline)', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockRejectedValue(new Error('offline'));
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByLabelText(t('ticket.qrLabel'))).toBeTruthy();
    expect(screen.getByText(t('ticket.fallbackTitle'))).toBeTruthy();
  });

  it('shows the mockup details once claims load', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockResolvedValue([
      { ...claim, offer: { ...claim.offer, validUntil: new Date(Date.now() + 134 * 60_000) } },
    ]);
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByText('−20% на напої')).toBeTruthy();
    expect(screen.getByText('Покажи його на вході в Bavovna')).toBeTruthy();
    expect(screen.getByText(t('ticket.offline'))).toBeTruthy();
    expect(screen.getByText(t('ticket.codeLabel'))).toBeTruthy();
    expect(screen.getByText(/^Діє ще 2 год/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Поїхати в Bavovna' })).toBeTruthy();
    expect(screen.getByRole('button', { name: t('ticket.brightness') })).toBeTruthy();
  });

  it('shows placeholders, not missing elements, while claims are unavailable', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockRejectedValue(new Error('offline'));
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByText(t('ticket.countdownNone'))).toBeTruthy();
    expect(screen.getByText('Покажи його на вході в закладі')).toBeTruthy();
  });

  it('opens the taxi choice from the bottom button', async () => {
    mockToken.mockResolvedValue('stored-token');
    const venue = { ...claim.offer.event.venue, lat: 50.4, lng: 30.5 };
    mockClaims.mockResolvedValue([
      { ...claim, offer: { ...claim.offer, event: { ...claim.offer.event, venue } } },
    ]);
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    await fireEvent.press(await screen.findByRole('button', { name: 'Поїхати в Bavovna' }));
    expect(screen.getByRole('button', { name: 'Uklon' })).toBeTruthy();
  });

  it('closes with the glass close button', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockResolvedValue([claim]);
    const onBack = jest.fn();
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={onBack} />);
    await fireEvent.press(await screen.findByRole('button', { name: t('ticket.close') }));
    expect(onBack).toHaveBeenCalled();
  });

  it('labels a redeemed ticket', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockResolvedValue([{ ...claim, status: 'redeemed' }]);
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByText(t('ticket.redeemedPill'))).toBeTruthy();
  });

  it('labels an expired ticket', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockResolvedValue([
      { ...claim, offer: { ...claim.offer, validUntil: new Date(Date.now() - 60_000) } },
    ]);
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByText(t('ticket.expiredPill'))).toBeTruthy();
  });

  it('explains when the token is not on this device', async () => {
    mockToken.mockResolvedValue(null);
    mockClaims.mockResolvedValue([claim]);
    const onBack = jest.fn();
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={onBack} />);
    expect(await screen.findByText(t('ticket.missingTitle'))).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: t('ticket.back') }));
    expect(onBack).toHaveBeenCalled();
  });

  it('shows a loading state while reading the device', async () => {
    mockToken.mockReturnValue(new Promise(() => undefined));
    mockClaims.mockReturnValue(new Promise(() => undefined));
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(screen.getByLabelText(t('ticket.loading'))).toBeTruthy();
  });
});
