# Feed rules (Стрічка)

Shown to every user before their first post, and linked from the post menu. Product source of truth for moderation and for the server-side post filter.

## For everyone (guests, clubs, DJs)

**Allowed:** impressions and photos from a night out, atmosphere, music, sets you liked, questions to the community, club and DJ news without a sales pitch ("we renovated the bar", "new sound system").

**Not allowed:**

1. **Direct event promotion.** Calls to come to a specific event or date ("приходьте сьогодні о 22:00"), announcements, lineups with a date, entry or ticket prices, discounts, promo codes, giveaways for entry, links to buy tickets. Events and offers go in Події: clubs publish them through the admin.
2. Links of any kind (the MVP has no link previews).
3. Insults, harassment, hate speech, threats, doxxing.
4. Sexual content, drugs, violence, illegal activity.
5. Spam, repeated posts, bots, impersonating a club, DJ or person.
6. Personal data of others (phone numbers, addresses) without consent.

## Enforcement

- **Server filter on create and edit:** rejects posts with URLs, promo patterns (₴ / грн / UAH prices, "%" discounts, "промокод", "квитк*", "вхід" + price or time, explicit date and time of an event), and banned words. The user sees a friendly reason ("Схоже на рекламу події — анонси публікуй у розділі Події").
- **Reports:** any user can report a post or comment (reason: реклама події / образи / 18+ / спам / інше). A post with 3 or more reports is hidden automatically until a team member reviews it.
- **Team actions:** hide or restore a post, ban or unban a user (superadmin).
- **Rate limits:** 10 posts and 100 comments per user per day; clubs get the same limits as everyone else.
- **Block:** a blocked author's posts and comments are hidden for the blocker.
