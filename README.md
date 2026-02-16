# Metzium

Portfolio and contact website for Metzium

## Features

- **Modern Tech Stack**: Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS
- **One-Page Design**: Professional layout with Hero, Services, Projects, About, and Contact sections
- **Secure Contact Form**: 
  - Server-side validation with Zod
  - Rate limiting (max 5 submissions per 10 minutes per IP)
  - Honeypot field for bot detection
  - Basic spam checks (link detection)
  - Origin verification (CSRF protection)
  - No secrets exposed to client
- **Email Integration**: Nodemailer with local Mailpit support and production SMTP provider support

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

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

**Note on Rate Limiting**: The current implementation uses in-memory storage, which works well for single-server deployments. For serverless environments (e.g., Vercel), consider implementing a Redis or database-backed solution for persistent rate limiting across function instances.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

```
metzium/
├── app/
│   ├── actions.ts          # Server actions for form submission
│   ├── globals.css         # Global styles with Tailwind
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main landing page
├── components/
│   └── ContactForm.tsx     # Client-side contact form component
├── lib/
│   ├── email.ts            # Email sending utility (Nodemailer)
│   ├── rate-limit.ts       # Rate limiting implementation
│   └── validation.ts       # Zod validation schemas
├── .env.example            # Environment variables template
└── package.json
```

## Security Features

- **Server-side validation**: All form data is validated on the server using Zod
- **Rate limiting**: Prevents abuse with IP-based rate limiting (5 requests per 10 minutes)
- **Honeypot field**: Hidden field to catch bots
- **Spam detection**: Basic checks for excessive links in messages
- **CSRF protection**: Origin header verification
- **Environment variables**: Sensitive credentials stored securely, never exposed to client

## License

ISC
