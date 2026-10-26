# TpaParking

Event parking marketplace for Tampa Bay. Drivers pick an event, pick a lot, reserve, and get a QR pass. Lot owners list their lot for events.

**Stack:** Next.js (App Router) · Supabase (project `tpaparking`) · Vercel. Stripe payments come next.

## Pages
- `/` upcoming events with search
- `/event/[id]` lots for an event (closest / cheapest / trucks OK)
- `/checkout?e=…&le=…` plate, number of cars, contact, total with $1.50 service fee
- `/pass/[code]` QR pass, entry instructions, directions
- `/list` owner form; new lots wait for approval

## Run locally
```
cp .env.example .env.local
npm install
npm run dev
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: Add New → Project → import the repo.
3. Add the two variables from `.env.example` under Environment Variables.
4. Deploy.

## Managing the marketplace (Supabase table editor)
- **Events:** add rows to `events` (venue, title, start time). The three `SAMPLE` events are placeholders; delete them before launch.
- **Approve a lot:** set `lots.status` to `approved`. Delete the two `SAMPLE` lots before launch.
- **Bookings:** `bookings` (status `reserved` until Stripe is connected).
