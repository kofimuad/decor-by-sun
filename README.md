# Decor by Sun — Website

A full-stack Next.js website for Decor by Sun, a bespoke event décor business based in Kumasi, Ghana.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS variables
- **Database:** MongoDB Atlas (via Mongoose)
- **Auth:** NextAuth.js (admin login)
- **Email:** Nodemailer + Gmail SMTP
- **CMS:** Sanity.io (portfolio photos & services)
- **Deployment:** Vercel

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Then fill in all values in `.env.local` (see below).

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Any random 32+ char string (use `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `http://localhost:3000` in dev, your domain in prod |
| `ADMIN_EMAIL` | Email to log into the admin panel |
| `ADMIN_PASSWORD` | Password for admin panel |
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (NOT your real password) |
| `BUSINESS_EMAIL` | Email that receives booking notifications |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | From sanity.io dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL |

### Getting a Gmail App Password
1. Go to [Google Account](https://myaccount.google.com)
2. Security → 2-Step Verification (must be enabled)
3. App Passwords → Generate new → Select "Mail"
4. Copy the 16-character password into `GMAIL_APP_PASSWORD`

### Getting a MongoDB Atlas URI
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) → Create free cluster
2. Database Access → Add a user with password
3. Network Access → Allow access from anywhere (0.0.0.0/0) for dev
4. Connect → Connect your application → Copy the URI
5. Replace `<password>` in the URI with your DB user password

---

## Sanity CMS Setup

The CMS is where Sun manages portfolio photos, services, and testimonials.

```bash
# Install Sanity CLI
npm install -g sanity

# Initialize Sanity in this project
npx sanity@latest init --env .env.local
```

Or go to [sanity.io](https://sanity.io) → Create a new project → get your Project ID → add to `.env.local`.

To run the Sanity Studio locally:
```bash
npx sanity dev
```

---

## Project Structure

```
app/
  page.tsx              # Home page
  portfolio/            # Full portfolio gallery
  services/             # Services detail page
  about/                # About page
  contact/              # Contact page
  admin/                # 🔒 Admin dashboard (login required)
    login/              # Admin login
    bookings/           # All bookings list + detail view
  api/
    auth/               # NextAuth handler
    bookings/           # POST (create) + GET (list)
    bookings/[id]/      # GET + PATCH (update status)
    contact/            # Contact form handler

components/
  layout/               # Navbar + Footer
  home/                 # Hero, Services, Portfolio, Testimonials, BookingForm
  ui/                   # Button, SectionLabel, SunLogo, RevealWrapper

lib/
  mongodb.ts            # DB connection
  mailer.ts             # Nodemailer setup
  auth.ts               # NextAuth config
  sanity.ts             # Sanity client
  queries.ts            # GROQ queries

models/
  Booking.ts            # Mongoose schema

emails/
  clientConfirmation.ts # Email to client on booking
  adminNotification.ts  # Email to Sun on new booking

sanity/
  schema/               # Portfolio, Service, Testimonial schemas
```

---

## Booking Flow

1. Client fills in the booking form on the homepage
2. Form POSTs to `/api/bookings`
3. Booking is saved to MongoDB with status `pending`
4. Two emails are sent automatically:
   - Client receives a confirmation email (if email provided)
   - Sun receives a notification with all booking details
5. Sun logs into `/admin` to view bookings
6. Sun clicks Confirm or Reject on any booking
7. If confirmed, an additional confirmation email is sent to the client

---

## Admin Panel

URL: `/admin/login`

Log in with your `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env.local`.

Features:
- Dashboard with booking stats (total, pending, confirmed, rejected)
- Full bookings table with filters by status
- Individual booking detail view
- Confirm / Reject / Reset status buttons
- Auto-sends confirmation email to client when confirmed

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Project → Settings → Environment Variables
# Add all variables from .env.local
```

Make sure to update `NEXTAUTH_URL` to your production domain and
`NEXT_PUBLIC_SITE_URL` to your deployed URL before going live.

---

## Customization Checklist

- [ ] Replace placeholder photos in `PortfolioPreview.tsx` and `portfolio/page.tsx` with real photos (or connect Sanity)
- [ ] Update WhatsApp number in `Footer.tsx` and `contact/page.tsx`
- [ ] Update Instagram handle in `Footer.tsx`
- [ ] Add a real photo of Sun in `about/page.tsx`
- [ ] Add real email/contact details in `contact/page.tsx`
- [ ] Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` to something secure
- [ ] Connect Sanity and upload real portfolio photos
