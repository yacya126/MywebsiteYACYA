# Personal Website Starter

A production-minded personal website foundation using Next.js App Router, strict TypeScript, Tailwind CSS, shadcn/ui conventions, Supabase, and `next-intl`.

## Included

- Locale-prefixed routes for Chinese (`/zh`), English (`/en`), and Japanese (`/ja`), with Chinese as the default
- Responsive public pages, dark mode, accessible navigation, localized metadata, loading and empty states
- Supabase email/password sign-up, sign-in, email confirmation, password recovery, and sign-out
- Server-side checks for dashboard, profile, and settings routes
- PostgreSQL `profiles` migration with constraints, trigger, indexes, and Row Level Security
- Private Supabase Storage avatar bucket with per-user policies
- React Hook Form and Zod validation; typed Supabase clients for browser and server
- Vercel-ready scripts and environment variable template

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local` and fill in the Supabase project URL and publishable key.
3. Apply `supabase/migrations/202609230001_initial_schema.sql` in the Supabase SQL Editor, or link the Supabase CLI and run `pnpm supabase db push`.
4. In Supabase Auth URL Configuration, set the site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` as a redirect URL.
5. Run `pnpm dev`, then open `http://localhost:3000`. It redirects to `/zh`.

Do not add a service-role key to any `NEXT_PUBLIC_*` variable. The application only needs the browser-safe Supabase publishable key.

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Deployment

Push the repository to GitHub and import it into Vercel. Add the same three variables from `.env.example`, changing `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin. Add `https://your-domain.com/auth/callback` to the Supabase allowed redirect URLs.

Cloudflare can manage the domain and DNS. For the simplest Vercel setup, create the DNS records Vercel requests. Avoid proxying through a second caching layer until cache behavior has been intentionally configured for authenticated routes.

## Architecture

```text
messages/                     Translation dictionaries
src/app/[locale]/(public)/    Public portfolio routes
src/app/[locale]/(auth)/      Authentication routes and Server Actions
src/app/[locale]/(protected)/ Server-verified private routes
src/components/ui/            shadcn/ui-style primitives
src/i18n/                     Routing and request configuration
src/lib/supabase/             Browser, server, and proxy clients
src/lib/validations/          Shared Zod schemas
supabase/migrations/          Database, RLS, trigger, and Storage policies
```

OAuth providers can be added later without changing the current session architecture. If the data model grows, generate `src/types/database.ts` from the Supabase CLI and evaluate Drizzle only when migrations or query composition need more structure.
