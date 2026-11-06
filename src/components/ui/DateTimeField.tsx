import { useState } from 'react';

import { fromKyivParts, kyivParts } from '../../lib/kyivTime';
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

/** Formats a Date as `ДД.ММ.РРРР ГГ:ХХ` in Kyiv time. */
export function formatDateTime(date: Date): string {
  const { year, month, day, hour, minute } = kyivParts(date);
  return `${pad(day)}.${pad(month + 1)}.${year} ${pad(hour)}:${pad(minute)}`;
}

/** Parses `ДД.ММ.РРРР ГГ:ХХ` as Kyiv time. Returns null for anything incomplete or impossible. */
export function parseDateTime(text: string): Date | null {
  const match = DATE_TIME_PATTERN.exec(text.trim());
  if (!match) return null;
  const [day = 0, month = 0, year = 0, hour = 0, minute = 0] = match.slice(1).map(Number);
  return fromKyivParts({ year, month: month - 1, day, hour, minute });
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
