const HANDLE_PATTERN = /^[a-z0-9_.]{3,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_PATTERN = /^\d{6}$/;
const NAME_MIN = 2;
const NAME_MAX = 30;

/** Lowercases and strips a leading "@" so "@Nova.Dj " becomes "nova.dj". */
export function normalizeHandle(input: string): string {
  return input.trim().replace(/^@/, '').toLowerCase();
}

export function isValidHandle(handle: string): boolean {
  return HANDLE_PATTERN.test(handle);
}

export function isValidDisplayName(name: string): boolean {
  const length = Array.from(name.trim()).length;
  return length >= NAME_MIN && length <= NAME_MAX;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function isValidCode(code: string): boolean {
  return CODE_PATTERN.test(code.trim());
}
