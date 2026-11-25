// Server-side feed filter (docs/FEED_RULES.md): rejects event promo, links and abuse.
// The result never echoes the text; callers return only the generic reason.
import { BANNED_WORDS } from './banned-words.ts';

export type FilterReason = 'promo' | 'links' | 'abuse';

export interface UpcomingEvent {
  title: string;
}

// Latin and look-alike characters folded to the Cyrillic letter they imitate, so "prоmокод" is caught.
const HOMOGLYPHS = new Map<string, string>(
  Object.entries({
    a: 'а',
    e: 'е',
    o: 'о',
    p: 'р',
    c: 'с',
    x: 'х',
    y: 'у',
    k: 'к',
    h: 'н',
    b: 'в',
    m: 'м',
    t: 'т',
    i: 'і',
    '0': 'о',
    '3': 'з',
    '@': 'а',
    $: 'с',
  }),
);

function normalize(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[​-‏⁠﻿­]/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/\s+/g, ' ');
}

/** Lowercase, zero-width stripped, every Latin look-alike folded to Cyrillic. */
export function foldHomoglyphs(text: string): string {
  return Array.from(normalize(text), (ch) => HOMOGLYPHS.get(ch) ?? ch).join('');
}

const stripSeparators = (text: string) => text.replace(/[^\p{L}\p{N}]+/gu, '');

const FOLDED_BANNED = BANNED_WORDS.map(foldHomoglyphs);

const TLDS =
  'com|net|org|info|io|me|co|ua|ru|app|xyz|link|bio|ly|gl|tv|club|party|shop|store|online|site|dev|gg|to|cc|biz|eu|de|pl|uk|us|fm';

const URL_PATTERNS: RegExp[] = [
  /\bhttps?:\/\//,
  /\bwww\s?\./,
  /\b(t\.me|wa\.me|bit\.ly|goo\.gl|tinyurl|linktr\.ee)\b/,
  new RegExp(`[a-z0-9-]+\\s?(\\.|\\(dot\\)|\\[dot\\])\\s?(${TLDS})\\b`),
];

const PRICE_PATTERNS: RegExp[] = [
  /₴/,
  /\buah\b/,
  /\d\s?(грн|гривн|гривень|hrn|uah)/,
  /(грн|гривн|гривень|uah)\s?\d/,
  /\d\s?(\$|€|usd|eur|долар|євро)/,
];

const DISCOUNT_PATTERNS: RegExp[] = [
  /%/,
  /знижк|скидк|промокод|промо-код|промо код|promo ?code|discount/,
  /безкоштовн\w* вхід|free entry/,
];

const TICKET_PATTERN = /квитк|білет|билет|ticket/;
const ENTRY_WORD = /вхід|вход|entry|entrance/;
const PRICE_OR_TIME =
  /\d{1,2} ?[:.] ?\d{2}|\d+ ?(грн|uah|₴|\$|€)|\b(о|від|до|from|at) ?\d{1,2}\b/;

const MONTHS =
  'січня|лютого|березня|квітня|травня|червня|липня|серпня|вересня|жовтня|листопада|грудня|january|february|march|april|may|june|july|august|september|october|november|december';
const TIME = String.raw`\d{1,2} ?[:.] ?\d{2}|\b(о|at) ?\d{1,2}\b|\d{1,2} ?(pm|am)\b`;
const DATE = String.raw`\d{1,2}[./-]\d{1,2}(?:[./-]\d{2,4})?|\d{1,2} ?(?:${MONTHS})|(?:${MONTHS}) ?\d{1,2}|сьогодні|завтра|післязавтра|tonight|tomorrow`;
const EVENT_DATE_TIME = new RegExp(`(?:${DATE}).{0,25}(?:${TIME})|(?:${TIME}).{0,25}(?:${DATE})`);
const INVITE = /приходьте|запрошуємо|чекаємо вас|не пропусти|join us|реєструйся/;

const anyMatch = (patterns: RegExp[], text: string) => patterns.some((p) => p.test(text));

function hasBannedWord(folded: string): boolean {
  const spaced = folded.replace(/[^\p{L}\p{N}]+/gu, ' ');
  const squashed = stripSeparators(folded);
  return FOLDED_BANNED.some((word) => {
    const squashedWord = stripSeparators(word);
    return spaced.includes(word) || (squashedWord.length >= 4 && squashed.includes(squashedWord));
  });
}

function matchesUpcomingEvent(folded: string, upcoming: UpcomingEvent[]): boolean {
  return upcoming.some((event) => {
    const title = foldHomoglyphs(event.title).trim();
    return title.length >= 4 && folded.includes(title);
  });
}

function looksLikePromo(text: string): boolean {
  return (
    anyMatch(PRICE_PATTERNS, text) ||
    anyMatch(DISCOUNT_PATTERNS, text) ||
    TICKET_PATTERN.test(text) ||
    (ENTRY_WORD.test(text) && PRICE_OR_TIME.test(text)) ||
    EVENT_DATE_TIME.test(text) ||
    (INVITE.test(text) && /\d/.test(text))
  );
}

/** Returns why the text must be rejected, or null when it is fine to publish. */
export function filterFeedText(text: string, upcoming: UpcomingEvent[] = []): FilterReason | null {
  const plain = normalize(text);
  const folded = foldHomoglyphs(text);

  if (anyMatch(URL_PATTERNS, plain)) return 'links';
  if (hasBannedWord(folded)) return 'abuse';
  // Plain text catches digits and symbols; the folded copy catches words typed with look-alikes.
  if (looksLikePromo(plain) || looksLikePromo(folded)) return 'promo';
  if (matchesUpcomingEvent(folded, upcoming)) return 'promo';
  return null;
}
