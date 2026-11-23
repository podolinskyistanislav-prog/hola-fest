/** Trims and collapses inner whitespace: "  DJ   Nova " → "DJ Nova". */
export function normalizeDjName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

/** URL-safe slug of a DJ name: lower case, letters and digits joined by "-". Cyrillic is kept. */
export function djSlug(name: string): string {
  return normalizeDjName(name)
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .join('-');
}
