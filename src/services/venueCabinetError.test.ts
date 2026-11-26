import { toVenueCabinetError, VenueCabinetError } from './venueCabinetError';

describe('toVenueCabinetError', () => {
  it.each([
    [{ code: '42501', message: 'secret detail' }, 'forbidden'],
    [{ code: '22023', message: 'invalid invite' }, 'invalid'],
    [{ code: '23514', message: 'check violation' }, 'invalid'],
    [{ message: 'TypeError: Network request failed' }, 'network'],
    [{ message: 'boom' }, 'unknown'],
    [null, 'unknown'],
  ])('maps %j to %s without leaking the server message', (input, code) => {
    const error = toVenueCabinetError(input);
    expect(error).toBeInstanceOf(VenueCabinetError);
    expect(error.code).toBe(code);
    expect(error.message).toBe(`venue_cabinet_${code}`);
  });

  it('keeps an existing VenueCabinetError', () => {
    const original = new VenueCabinetError('forbidden');
    expect(toVenueCabinetError(original)).toBe(original);
  });
});
