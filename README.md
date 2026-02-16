# Metzium

Portfolio and contact website for Metzium.

## Features

- Modern Tech Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS
- One-Page Design: Hero, Services, Projects, About, and Contact sections
- Secure Contact Form:
  - Server-side validation with Zod
  - Rate limiting (max 5 submissions per 10 minutes per IP)
  - Honeypot field for bot detection
  - Basic spam checks (link detection)
  - Origin verification (CSRF protection)
  - No secrets exposed to client
- Email Integration: Nodemailer with local Mailpit support and production SMTP provider support
- Authentication (Users + Admin):
  - User login page at `/login`
  - User registration page at `/register` (individual or company account)
  - Protected admin page at `/admin` (admin-only)
  - Logged-in user name shown in navbar
  - PostgreSQL + Prisma for users and sessions
  - Secure httpOnly session cookies

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL (local or hosted)
- Optional: Redis for distributed auth rate limiting (recommended on Railway)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/maxmetz8/metzium.git
cd metzium
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. Set up Prisma:

```bash
npm run db:generate
npm run db:migrate
```

5. Create your admin user:

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` (optional: `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`), then run:

```bash
npm run db:create-admin
```

Optional for production-grade shared auth rate limits across instances:

```env
REDIS_URL=redis://default:password@host:port
```

## Email Setup

For local development with Mailpit:

```bash
docker run --rm -p 1025:1025 -p 8025:8025 axllent/mailpit
```

Then use:

```env
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_AUTH=false
SMTP_FROM=no-reply@localhost
SMTP_TO=contact@metzium.local
```

Open Mailpit UI at [http://localhost:8025](http://localhost:8025).

For production on Railway, use a real SMTP provider and domain-aligned sender:

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH=true
SMTP_USER=resend
SMTP_PASS=your-provider-api-key-or-password
SMTP_FROM=contact@metzium.com
SMTP_TO=contact@metzium.com
ALLOWED_ORIGINS=https://metzium.com,https://www.metzium.com
```

Important: configure SPF and DKIM for `metzium.com` at your DNS provider, otherwise providers may reject your messages or mark them as spam.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
User login is available at [http://localhost:3000/login](http://localhost:3000/login).
User registration is available at [http://localhost:3000/register](http://localhost:3000/register).

## Build

Build the production application:

```bash
npm run build
```

## Production

Start the production server:

```bash
npm start
```

## Project Structure

```text
metzium/
|-- app/
|   |-- actions.ts            # Server actions for form submission
|   |-- admin/actions.ts      # Logout server action
|   |-- admin/page.tsx        # Protected admin page
|   |-- contact/page.tsx      # Contact page
|   |-- globals.css           # Global styles with Tailwind
|   |-- layout.tsx            # Root layout
|   |-- login/actions.ts      # Login server action
|   |-- login/page.tsx        # Login page
|   |-- register/actions.ts   # Registration server action
|   |-- register/page.tsx     # Registration page
|   `-- page.tsx              # Main landing page
|-- components/
|   |-- ContactForm.tsx       # Client-side contact form component
|   |-- LoginForm.tsx         # Login form component
|   |-- Navbar.tsx            # Navbar with auth state
|   `-- RegisterForm.tsx      # Registration form component
|-- lib/
|   |-- auth.ts               # Session/auth helpers
|   |-- email.ts              # Email sending utility
|   |-- password.ts           # Password hashing/verification
|   |-- prisma.ts             # Prisma client singleton
|   |-- rate-limit.ts         # Rate limiting implementation
|   `-- validation.ts         # Zod validation schemas
|-- prisma/
|   `-- schema.prisma         # Prisma schema for User/Session
|-- scripts/
|   `-- create-admin.mjs      # Creates/updates admin user
|-- .env.example              # Environment variables template
`-- package.json
```

## Security Features

- Server-side validation: All form data is validated on the server using Zod
- Rate limiting: Prevents abuse with IP-based rate limiting (5 requests per 10 minutes)
- Honeypot field: Hidden field to catch bots
- Spam detection: Basic checks for excessive links in messages
- CSRF protection: Origin header verification
- Auth sessions: Random session token with SHA-256 hash storage in the database
- Environment variables: Sensitive credentials are never exposed to the client

## License

ISC
