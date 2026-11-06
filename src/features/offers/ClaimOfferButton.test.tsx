import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { t } from '@/lib/i18n';
import { claimOffer } from '@/services/claims';

import { ClaimOfferButton } from './ClaimOfferButton';

jest.mock('expo-glass-effect', () => {
  const { View } = jest.requireActual('react-native');
  return { GlassView: View, isLiquidGlassAvailable: () => false };
});
jest.mock('@/services/claims', () => ({ claimOffer: jest.fn() }));

const mockClaim = claimOffer as jest.Mock;

async function renderButton() {
  const onClaimed = jest.fn();
  const client = new QueryClient();
  await render(
    <QueryClientProvider client={client}>
      <ClaimOfferButton offerId="o1" onClaimed={onClaimed} />
    </QueryClientProvider>,
  );
  return onClaimed;
}

beforeEach(() => jest.resetAllMocks());

describe('ClaimOfferButton', () => {
  it('claims on tap and reports the offer', async () => {
    mockClaim.mockResolvedValue({ ok: true, token: 't' });
    const onClaimed = await renderButton();
    await fireEvent.press(screen.getByRole('button', { name: t('claim.ready') }));
    expect(await screen.findByRole('button', { name: t('claim.claimed') })).toBeDisabled();
    expect(onClaimed).toHaveBeenCalledWith('o1');
  });

  it('shows sold out and disables the button', async () => {
    mockClaim.mockResolvedValue({ ok: false, reason: 'unavailable' });
    await renderButton();
    await fireEvent.press(screen.getByRole('button', { name: t('claim.ready') }));
    expect(await screen.findByRole('button', { name: t('claim.soldOut') })).toBeDisabled();
  });

  it('shows limit reached', async () => {
    mockClaim.mockResolvedValue({ ok: false, reason: 'limit_reached' });
    await renderButton();
    await fireEvent.press(screen.getByRole('button', { name: t('claim.ready') }));
    expect(await screen.findByRole('button', { name: t('claim.limitReached') })).toBeDisabled();
  });

  it('shows an error that can be tapped to retry', async () => {
    mockClaim.mockResolvedValue({ ok: false, reason: 'network' });
    await renderButton();
    await fireEvent.press(screen.getByRole('button', { name: t('claim.ready') }));
    expect(await screen.findByRole('button', { name: t('claim.error') })).toBeEnabled();
  });
});
