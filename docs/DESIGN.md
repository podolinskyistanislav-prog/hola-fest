# Hola Fest — design rules

> Approved mockups (the visual source of truth): https://claude.ai/artifact/AvyZwZkTfX2RScQiXkfCvH
> Tokens in code: `src/theme/tokens.ts`. Shared components: `src/components/ui/`.
> Owner: the `ui-ux` agent. Changes to the look require the founder's approval.

## Look in one sentence

Black or white ground, Hola yellow and pink as the only accents, big soft corners, and liquid glass only on things that float over content.

## Colors

- Backgrounds: `#000000` (dark, default) / `#FFFFFF` (light). The app follows the phone setting.
- Accents: yellow `#FDD303`, pink `#F1277D`. Use them for primary actions, offers, selected day, map pins and event covers. Never as body-text color on white.
- Text on yellow or pink is **always black** (`brand.onAccent`). White on pink fails contrast.
- Every text/background pair must pass WCAG AA (4.5:1). `src/theme/tokens.test.ts` enforces it for the palette, so add new pairs there.
- Never write a hex value outside `src/theme`.

## Liquid glass

- Use `GlassSurface` **only** for floating UI: tab bar, bottom sheets, the taxi bar, buttons and info panels over covers or maps.
- Never for regular cards, list rows or whole screens. Too much glass turns to mush.
- On covers use `kind="cover"` (dark glass with white text). Elsewhere use the default `floating`.
- Native liquid glass runs on iOS 26+. Everywhere else a translucent themed fill is the fallback, and both must look acceptable.

## Text fields

- Use `TextField` (label above, raised-surface input, `radius.control`, height ≥ 44). Never a bare `TextInput`.
- Error: `colors.danger` border and message under the field, announced to screen readers. Validation logic lives outside the component.
- `secure` hides the text and adds a show/hide toggle with an accessibility label.

## Typography

- Headings: **Unbounded** (`title`, `heading`, `cardTitle`). Everything else: **Inter**.
- Use `AppText` with a `variant`. Never set `fontFamily` or `fontSize` inline.
- UI copy is Ukrainian, in sentence case.

## Shape and spacing

- Radii from `radius`: chips 16, controls 20, list rows 22, cards 28, sheets 32, buttons are pills.
- Spacing from `space`, screen edge padding 20.
- Touch targets ≥ 44 pt.

## Every screen

- Has loading, empty and error states, all designed, not a bare spinner.
- Works in both themes.
- Keeps floating bars clear of content: the last list item must scroll above the tab bar.
- Icons and icon-only buttons carry `accessibilityLabel`.

## Day strip

`DayStrip` is a horizontal day selector. The selected day is filled with Hola yellow and black text (both themes); other days use the raised surface. Weekday and date arrive already formatted, the component does no date logic. Each day is a button with a `selected` state.

## Event covers (until real photos exist)

A yellow or pink block with the 4-point Hola star in the other accent color, as in the mockups.
