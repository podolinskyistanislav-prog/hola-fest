import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

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

beforeEach(() => jest.resetAllMocks());

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
    expect(await screen.findByLabelText(new RegExp(t('ticket.fallbackTitle')))).toBeTruthy();
  });

  it('shows offer details once claims load', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockResolvedValue([claim]);
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByText('−20% на напої')).toBeTruthy();
    expect(screen.getByText('Bavovna')).toBeTruthy();
  });

  it('hides the code of a redeemed ticket', async () => {
    mockToken.mockResolvedValue('stored-token');
    mockClaims.mockResolvedValue([{ ...claim, status: 'redeemed' }]);
    await renderWithClient(<TicketScreenContent offerId="o1" onBack={jest.fn()} />);
    expect(await screen.findByText('Офер використано')).toBeTruthy();
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
