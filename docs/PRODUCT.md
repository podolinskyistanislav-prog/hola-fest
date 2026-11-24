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

| Role / account | Who                                        | Can                                                                                                                                  |
| -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `guest`        | Anyone with the app (anonymous by default) | Browse; claim offers; after email confirmation, post in the Feed.                                                                    |
| `venue_owner`  | Business owner, approved by the team       | Everything a `venue_admin` can, plus edit the venue profile (photos, description, address) and invite or remove staff.               |
| `venue_admin`  | Club manager (invited by the owner)        | Create, edit, schedule and pause the venue's events and offers (Offer builder); see claim and redemption stats.                      |
| `host`         | Door staff (invited by the owner or admin) | Scan a guest QR and mark it redeemed, **only for their own venue**.                                                                  |
| `dj`           | DJ, approved by the team                   | Edit their public DJ profile (photo, cover, stage name, bio, genres, links); see their gigs; post in the Feed with the Діджей label. |
| `superadmin`   | Founder / Hola team                        | Everything; approves venue and DJ applications; moderation.                                                                          |

### Account types and approval (founder decision 2026-11-24)

- Every account starts as a guest. After email confirmation (the same one-time code as the Feed), the user can choose **"Я заклад"** or **"Я діджей"** and fill in an application.
- Applications stay **pending until a superadmin approves them**. Rights (venue membership, DJ profile, labels) are granted on the server by the approval, never by the app. Rejected applications get a reason.
- An approved owner gets a new venue (or is linked to an existing one) and can invite admins and hosts by email.
- An approved DJ gets a public DJ profile. Venues pick DJs from the list when they build an event lineup; free-text names stay as a fallback.

### Offer builder

Venue owners and admins build offers themselves, without the team:

- Templates: % off entry, fixed amount off, free entry until a time, a gift (drink or shot), 2 for 1, custom text.
- The title is generated from the template ("−20% на вхід", "Шот у подарунок") and can be edited. Terms are generated too ("Покажи QR на вході до 23:00").
- When: tied to an event, or a date and time window at the venue.
- Limits: total claims and per-guest limit.
- Live preview exactly as guests will see it (card, badge, QR screen).
- Publish now or schedule; pause, duplicate, end. Stats per offer: views (later), claims, redemptions.
- The server validates everything (window inside the event, limits > 0, the owner owns the venue) and keeps the Feed rule: offers live in Події, not in the Feed.

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
