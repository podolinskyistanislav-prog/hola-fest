export type VenueCabinetErrorCode = 'forbidden' | 'invalid' | 'network' | 'unknown';

/** Generic, safe-to-show error for the business cabinet services. Never contains server messages. */
export class VenueCabinetError extends Error {
  readonly code: VenueCabinetErrorCode;

  constructor(code: VenueCabinetErrorCode) {
    super(`venue_cabinet_${code}`);
    this.name = 'VenueCabinetError';
    this.code = code;
  }
}

type ClientError = { code?: string; message?: string };

/** Maps a Supabase/PostgREST error to a generic error (42501 = forbidden, 22023/23xxx = invalid). */
export function toVenueCabinetError(error: unknown): VenueCabinetError {
  if (error instanceof VenueCabinetError) return error;
  const { code, message } = (error ?? {}) as ClientError;
  if (code === '42501') return new VenueCabinetError('forbidden');
  if (code === '22023' || code?.startsWith('23')) return new VenueCabinetError('invalid');
  const text = (message ?? '').toLowerCase();
  if (text.includes('fetch') || text.includes('network')) return new VenueCabinetError('network');
  return new VenueCabinetError('unknown');
}
