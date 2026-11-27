# Umrah packages and agency inquiries

Spec for a module where licensed travel agencies list Umrah packages on The Halal Explorer and travellers send them inquiries. We never sell packages, take payments or hold customer money: we are a listing and lead platform. Revenue comes later from per-inquiry fees, monthly listing fees and featured packages.

Status: planned. Build Phase 1 first.

## Goals

- Travellers can browse and filter Umrah packages by departure city, month, budget and hotel level, and send an inquiry in under a minute.
- Agencies get every inquiry by email straight away, plus a WhatsApp button for the traveller.
- Every inquiry is stored in Sanity, so we can count leads per agency and bill on them later.
- The Umrah cost calculator links to packages that match the traveller's budget.
- Works for two markets from day one: Pakistan (PKR, departures from Karachi, Lahore, Islamabad) and Singapore (USD for now).

## Non-goals (for now)

- No bookings, no payments, no customer accounts.
- No agency login in Phase 1: we enter packages for agencies in Sanity Studio.

## Phases

| Phase | Scope | Agencies do |
| --- | --- | --- |
| 1. Launch | Schemas, packages listing and detail pages, agency pages, inquiry form and API, email to agency, calculator link, PKR prices | Send packages on WhatsApp; we enter them in Studio |
| 2. Agency portal | Agency sign-in, self-serve package editing, inbox of their inquiries, inquiry status | Manage their own listings |
| 3. Monetise | Free for the first 3 months, then per-inquiry fee or monthly plan; paid featured packages; monthly lead report per agency | Pay us |

## Sanity schemas (Phase 1)

Add to `schemas/` and export from `schemas/index.ts`, following the style of `schemas/affiliateProduct.ts` (`defineType`, `defineField`, a `preview`).

### `agency`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | required |
| `slug` | slug | source: `name` |
| `logo` | image | |
| `city` | string | e.g. Karachi |
| `country` | string | list: Pakistan, Singapore, UAE, UK, Other |
| `about` | text | short description |
| `registrationNumber` | string | government or tourism registration; required before `isVerified` |
| `saudiPartner` | string | the Saudi Umrah company they contract with |
| `email` | string | where inquiries are sent; required; never rendered on the site |
| `whatsapp` | string | international format, digits only, e.g. 923001234567 |
| `website` | url | |
| `isVerified` | boolean | we checked the registration and the Saudi contract |
| `isActive` | boolean | hide the agency and all its packages when false |
| `plan` | string | list: free-trial, per-lead, monthly; default free-trial |
| `trialEndsAt` | date | |

### `umrahPackage`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | required, e.g. "14-day economy Umrah from Karachi" |
| `slug` | slug | source: `title` |
| `agency` | reference to `agency` | required |
| `departureCity` | string | list: Karachi, Lahore, Islamabad, Peshawar, Multan, Singapore, Other |
| `currency` | string | list: PKR, USD; required |
| `months` | array of string | departure months as `YYYY-MM`, for the month filter |
| `departureDates` | array of date | optional, exact dates if known |
| `makkahNights` | number | required |
| `madinahNights` | number | required |
| `makkahHotel` | object | `name`, `stars` (1–5), `distanceMeters` |
| `madinahHotel` | object | `name`, `stars` (1–5), `distanceMeters` |
| `prices` | array of object | `sharing` (list: quad, triple, double, single) + `amount` (number, per person) |
| `includes` | array of string | list: visa, flights, airport transfers, Makkah–Madinah transport, Haramain train, Ziyarat, breakfast, half board, full board, insurance, guide |
| `notes` | text | extra conditions in plain words |
| `images` | array of image | |
| `isFeatured` | boolean | paid placement later; sorts first |
| `isActive` | boolean | hide when false |
| `validUntil` | date | hide automatically after this date |

Derived in queries, not stored: `totalNights`, `priceFrom` (lowest amount in `prices`), `hotelStars` (lower of the two hotels).

### `inquiry`

Created only by the API route, never on the site.

| Field | Type | Notes |
| --- | --- | --- |
| `package` | reference to `umrahPackage` | |
| `agency` | reference to `agency` | copied from the package, for billing queries |
| `name` | string | |
| `phone` | string | |
| `email` | string | optional |
| `travellers` | number | 1–20 |
| `preferredMonth` | string | `YYYY-MM` |
| `message` | text | max 1,000 characters |
| `source` | string | `package-page`, `calculator`, `agency-page` |
| `status` | string | list: new, sent, contacted, booked, spam; default new |
| `emailSent` | boolean | |
| `createdAt` | datetime | |

## Routes and pages

All under the existing `/umrah` hub. Same colours and theme as the rest of the site (teal #1D6A5B, dark #0F1923, teal-soft #E8F5F1, gold #F59E0B).

- `/umrah/packages` — listing with filters in the URL query (`from`, `month`, `max`, `stars`, `currency`) so filtered views can be shared and indexed. Cards show title, agency (with Verified badge), departure city, nights split, hotel stars and distance, "from" price, and what's included. Featured first, then cheapest.
- `/umrah/packages/[slug]` — package detail: summary, hotels, prices by room sharing, includes, notes, agency card, inquiry form, WhatsApp button, the disclaimer below. JSON-LD: `BreadcrumbList` and `Product` with an `Offer` (lowest price) or `TouristTrip`; no fake ratings.
- `/umrah/agencies/[slug]` — agency profile with its active packages.
- Add `/umrah/packages`, every active package and every active agency to `src/app/sitemap.ts`.
- Add a "Packages" link to the Umrah hub page and the navbar's Umrah item.

## Inquiry flow

1. The traveller fills the form on the package page: name, phone, optional email, travellers, preferred month, message. Include a hidden honeypot field and a consent checkbox ("Share my details with this agency").
2. The form posts to `POST /api/inquiry` (new route in `src/app/api/inquiry/route.ts`).
3. The route:
   - validates input (lengths, phone format, travellers 1–20) and rejects the honeypot;
   - rate-limits by IP (for example 5 per hour) to stop spam;
   - loads the package and its agency; rejects if either is inactive;
   - creates an `inquiry` document with the server-side `SANITY_API_TOKEN` (already used by the cron routes) — never expose a write token to the client;
   - emails the agency with the traveller's details and the package title and link, with reply-to set to the traveller's email if given;
   - sets `emailSent` and `status: "sent"`.
4. The page shows a thank-you state and a WhatsApp button that opens `https://wa.me/<agency.whatsapp>?text=<prefilled message with package title>`.

Email provider: still to choose (Resend has a free tier and works with our domain). Add the key as an env var, for example `RESEND_API_KEY`, and the from address as `INQUIRY_FROM_EMAIL`. If the key is missing, still save the inquiry and log a warning.

## Calculator link

On `/umrah/planner`, under the estimate, add "See packages in this range": link to `/umrah/packages?max=<high estimate>&stars=<hotel level>&currency=USD`. Inquiries that start this way carry `source: "calculator"`.

## Trust and legal

- Only agencies with a government registration and a Saudi Umrah partner get `isVerified`. Unverified agencies are not shown in Phase 1.
- Show this note on every package page and in the inquiry email footer: "Packages are sold by the agency, not by The Halal Explorer. Check the agency's registration and get the final price and terms in writing before you pay."
- Update `/privacy` to say inquiry details are shared with the chosen agency.
- Never render agency email addresses on the site.

## Acceptance criteria (Phase 1)

- An agency and three packages created in Studio appear on `/umrah/packages`, filter correctly, and disappear when `isActive` is false or `validUntil` has passed.
- Submitting the inquiry form creates an `inquiry` document and the agency receives the email; spam and invalid input are rejected.
- PKR and USD prices format correctly (`Rs 285,000`, `$1,850`).
- Pages pass `npm run lint` and `npm run build`, work at phone width and print no console errors.
- New pages are in the sitemap with canonical URLs and metadata.

## Later

- Phase 2 auth options: Clerk or NextAuth with email magic links; agencies see only their own packages and inquiries.
- Reviews from travellers who booked (only after a confirmed booking).
- More currencies (SGD, GBP, MYR) using the same pattern as `src/lib/umrah-planner.ts`.
- A monthly lead report per agency, built from `inquiry` documents.
