# Hola Fest — Product

> Owner: the human founder. Agents may propose changes via PR, never change scope on their own.

## One-liner

You are in Kyiv tonight. Open Hola Fest → see a map of clubs and what is on today → tap an event → grab an exclusive offer (QR) → tap "Go" to open Uklon / Bolt / Uber with the address filled in → show the QR at the door.

## MVP goal

Prove that people come to a club **because of the app**. The one metric that matters:
**redeemed offers per week** (QR scanned at the door).

Funnel we measure: event viewed → offer claimed → offer redeemed → taxi button tapped.

## Scope: 2 partner clubs in Kyiv.

## Roles

| Role          | Who                  | Can                                                                                                            |
| ------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `guest`       | Anyone with the app  | Browse venues and events without logging in. Log in (Apple / Google) to claim an offer and see their QR codes. |
| `host`        | Door staff of a club | Scan a guest QR and mark it redeemed — **only for their own venue**.                                           |
| `venue_admin` | Club manager         | Create/edit their venue's events and offers, see their venue's stats.                                          |
| `superadmin`  | Founder              | Everything; onboards venues and assigns staff.                                                                 |

## User stories (MVP)

1. As a guest, I see a map of Kyiv with partner venues, so I know where to go.
2. As a guest, I see a list of events for **today** and **this week**, so I can choose.
3. As a guest, I open an event and see photo, lineup, time, entry price and the offer.
4. As a guest, I can claim an offer without signing up. The app creates a guest account for me silently.
5. As a guest, I claim an offer and get a one-time QR code that works offline at the door.
6. As a guest, I tap Uklon / Bolt / Uber and the taxi app opens with the venue as destination.
7. As a guest, I see whether the event ends before curfew and whether the venue has a shelter.
8. As a guest, I get a push notification when a venue I follow posts an offer for tonight.
9. As a host, I scan a QR and immediately see ✅ valid / ❌ already used / ❌ wrong venue.
10. As a venue admin, I create an event with an offer in under 2 minutes from my phone.
11. As a venue admin, I see how many offers were claimed and redeemed per event.

## Explicitly NOT in the MVP

- Phone-number login, SMS, email/password **for guests** (staff use email/password)
- Sign in with Apple / Google (after the MVP, with guest-account linking)
- In-app payments or ticket sales
- Social features (friends, chat, check-ins)
- Recommendations / personalization
- Reviews and ratings
- Cities other than Kyiv, venues beyond the 2 partners
- Taxi API integrations (deep links only)

## Kyiv-specific requirements

- Show event end time relative to curfew; the curfew hours are a config value, not hardcoded.
- Venue has a `has_shelter` flag shown on the venue and event pages.
- Taxi buttons order: Uklon, Bolt, Uber.
- UI language: Ukrainian first, English second.
