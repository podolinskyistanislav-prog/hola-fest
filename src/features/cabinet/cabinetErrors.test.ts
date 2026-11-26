import { VenueCabinetError } from '@/services/venueCabinetError';

import { cabinetErrorText } from './cabinetErrors';

describe('cabinetErrorText', () => {
  it('maps each code to its own text', () => {
    const texts = (['forbidden', 'invalid', 'network', 'unknown'] as const).map((code) =>
      cabinetErrorText(new VenueCabinetError(code)),
    );
    expect(new Set(texts).size).toBe(4);
  });

  it('falls back to the generic text for foreign errors', () => {
    expect(cabinetErrorText(new Error('secret db message'))).toBe(
      cabinetErrorText(new VenueCabinetError('unknown')),
    );
  });
});
