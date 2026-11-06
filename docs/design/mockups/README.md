# Approved mockups — source of truth

These HTML files are the approved design. The founder requires the app to match them: every element, every piece of copy, and the layout, sizes, radii, colors, glass and accents. Open a file in a browser to view it (390×844, iPhone 14 size).

| File         | Screen in the app                                  |
| ------------ | -------------------------------------------------- |
| `Main.html`  | Events home, `src/app/(tabs)/index.tsx` (dark)     |
| `Event.html` | Event page, `src/app/event/[id].tsx`               |
| `Offer.html` | QR at the entrance, `src/app/ticket/[offerId].tsx` |
| `Map.html`   | Map tab, `src/app/(tabs)/map.tsx`                  |

**Light theme (MainLight).** Same layout as `Main.html`, with these colors swapped:

| Dark                                                            | Light                                              |
| --------------------------------------------------------------- | -------------------------------------------------- |
| background `#000000`                                            | `#FFFFFF`                                          |
| text `#FFFFFF`                                                  | `#0A0A0A`                                          |
| secondary text `#A1A1AA`                                        | `#52525B`                                          |
| chip/day background `#18181B`, border `#27272A`                 | `#F4F4F5`, border `#E4E4E7`                        |
| glass `rgba(255,255,255,0.08)`, border `rgba(255,255,255,0.16)` | `rgba(244,244,245,0.7)`, border `rgba(0,0,0,0.08)` |
| link color `#FDD303`                                            | `#0A0A0A`                                          |

Accents stay the same in both themes: yellow `#FDD303`, pink `#F1277D`, text on accents `#000000`.

## Rules for agents

- Treat the files as a spec, not as code to copy. Build everything with `src/theme` tokens and `src/components/ui`, and add tokens or components where they are missing.
- **Placeholders.** When real data is missing, keep the element and show a placeholder rather than hiding it, for example `Укриття: [уточнити]`, `[Артист 1]`, or the yellow/pink cover with Hola stars when there is no cover image.
- Mockup copy is the UI copy (Ukrainian), routed through `t()`.
- Glass = `GlassSurface` (iOS blur and liquid glass where available, a translucent fill elsewhere).
- Every PR that changes a screen attaches its CI screenshot next to the matching mockup. The UI/UX reviewer checks each element listed in the issue.
