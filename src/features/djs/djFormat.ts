import { formatEventDay, formatEventTime } from '@/features/events/eventFormat';
import { t, type TranslationKey } from '@/lib/i18n';
import { dayKeyParts, kyivDayKey, kyivWeekday } from '@/lib/kyivTime';
import type { Dj, DjGig } from '@/types/djs';

/** "Techno · House": tags with the first letter upper-cased. */
export function genresLine(genres: readonly string[]): string {
  return genres.map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1)).join(' · ');
}

/** "Пт, 27 листопада · Котельня" for the DJ's next gig (Kyiv time). */
export function nextGigLine(dj: Dj): string | null {
  const gig = dj.gigs[0];
  if (!gig) return null;
  const weekday = t(`events.weekday.${kyivWeekday(kyivDayKey(gig.startsAt))}` as TranslationKey);
  return `${weekday}, ${formatEventDay(gig.startsAt)} · ${gig.venueName}`;
}

/** DJs whose name contains the query, ignoring case and surrounding spaces. */
export function filterDjsByName(djs: readonly Dj[], query: string): Dj[] {
  const needle = query.trim().toLowerCase();
  if (needle === '') return [...djs];
  return djs.filter((dj) => dj.name.toLowerCase().includes(needle));
}

/**
 * A DJ-typed link as an https URL that is safe to open, or null: http(s) kept, a bare domain gets
 * "https://", any other scheme (e.g. `javascript:`) and empty text are rejected.
 */
export function safeLinkUrl(text: string | null | undefined): string | null {
  const trimmed = (text ?? '').trim();
  if (trimmed === '') return null;
  if (/^https?:\/\/\S+$/i.test(trimmed)) return trimmed;
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(trimmed)) return `https://${trimmed}`;
  return null;
}

/** GigRow props: day, short month, time in Kyiv time. */
export function gigRowProps(gig: DjGig) {
  const { day, month } = dayKeyParts(kyivDayKey(gig.startsAt));
  return {
    day: String(day),
    month: t(`djs.month.${month}` as TranslationKey),
    title: gig.title,
    venue: gig.venueName,
    time: formatEventTime(gig.startsAt),
    offerText: gig.offerTitle,
  };
}
