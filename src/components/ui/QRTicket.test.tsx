import { render, screen } from '@testing-library/react-native';

import { QRTicket, qrDarkRuns } from './QRTicket';

const baseProps = {
  token: 'claim-token-123',
  offerTitle: 'Знижка 20%',
  venueName: 'Бар «Зірка»',
  validUntil: 'Діє до 23:00',
};

describe('qrDarkRuns', () => {
  it('encodes a token into a square grid of non-overlapping dark runs', () => {
    const { size, runs } = qrDarkRuns(baseProps.token);
    expect(size).toBeGreaterThanOrEqual(21);
    expect(runs.length).toBeGreaterThan(0);
    for (const run of runs) {
      expect(run.length).toBeGreaterThan(0);
      expect(run.start + run.length).toBeLessThanOrEqual(size);
      expect(run.row).toBeLessThan(size);
    }
  });

  it('draws the top-left finder pattern as a 7-module dark run', () => {
    const { runs } = qrDarkRuns(baseProps.token);
    expect(runs).toContainEqual({ row: 0, start: 0, length: 7 });
  });

  it('is deterministic for the same token and differs for another', () => {
    expect(qrDarkRuns('a')).toEqual(qrDarkRuns('a'));
    expect(qrDarkRuns('a')).not.toEqual(qrDarkRuns('b'));
  });
});

describe('QRTicket', () => {
  it('shows offer, venue, validity and an accessible label while active', async () => {
    await render(<QRTicket {...baseProps} status="active" />);
    expect(screen.getByText('Знижка 20%')).toBeTruthy();
    expect(screen.getByText('Бар «Зірка»')).toBeTruthy();
    expect(screen.getByText('Діє до 23:00')).toBeTruthy();
    expect(
      screen.getByLabelText('QR-код офера «Знижка 20%», Бар «Зірка». Діє до 23:00'),
    ).toBeTruthy();
  });

  it('never prints the token as text', async () => {
    await render(<QRTicket {...baseProps} status="active" />);
    expect(screen.queryByText(baseProps.token)).toBeNull();
  });

  it.each([
    ['redeemed', 'Офер використано'],
    ['expired', 'Термін дії минув'],
  ] as const)('shows %s state instead of the code', async (status, label) => {
    await render(<QRTicket {...baseProps} status={status} />);
    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByLabelText(`${label}: «Знижка 20%», Бар «Зірка»`)).toBeTruthy();
  });
});
