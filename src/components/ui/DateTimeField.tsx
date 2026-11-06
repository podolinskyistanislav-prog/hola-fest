import { useState } from 'react';

import { TextField, type TextFieldProps } from './TextField';

export interface DateTimeFieldProps extends Omit<
  TextFieldProps,
  'value' | 'onChange' | 'onChangeText' | 'secure' | 'multiline' | 'placeholder' | 'keyboardType'
> {
  /** Selected moment, or null while empty/incomplete. */
  value: Date | null;
  /** Called with a valid Date once the text is complete, or null when cleared/incomplete. */
  onChange: (value: Date | null) => void;
}

const DATE_TIME_PATTERN = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;

const pad = (n: number) => String(n).padStart(2, '0');

/** Formats a Date as `ДД.ММ.РРРР ГГ:ХХ` in the device's local time. */
export function formatDateTime(date: Date): string {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Parses `ДД.ММ.РРРР ГГ:ХХ` (local time). Returns null for anything incomplete or impossible. */
export function parseDateTime(text: string): Date | null {
  const match = DATE_TIME_PATTERN.exec(text.trim());
  if (!match) return null;
  const [day = 0, month = 0, year = 0, hour = 0, minute = 0] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day, hour, minute);
  const isReal =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hour &&
    date.getMinutes() === minute;
  return isReal ? date : null;
}

/** Date and time typed as `ДД.ММ.РРРР ГГ:ХХ`; range validation stays with the form. */
export function DateTimeField({ value, onChange, onBlur, ...rest }: DateTimeFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? (value ? formatDateTime(value) : '');

  return (
    <TextField
      {...rest}
      value={text}
      placeholder="ДД.ММ.РРРР ГГ:ХХ"
      keyboardType="numbers-and-punctuation"
      maxLength={16}
      onChangeText={(next) => {
        setDraft(next);
        onChange(parseDateTime(next));
      }}
      onBlur={(event) => {
        setDraft(null);
        onBlur?.(event);
      }}
    />
  );
}
