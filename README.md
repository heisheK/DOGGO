# Campus Paws Rescue

A mobile-first campus stray animal rescue platform built with Next.js 15, TypeScript, TailwindCSS, shadcn/ui-style components, and Supabase.

## Project Architecture

```txt
app/
  api/
    adoptions/route.ts
    ai-description/route.ts
    animals/route.ts
    medical-records/route.ts
    rescue-cases/route.ts
  adopt/page.tsx
  animals/[id]/page.tsx
  dashboard/page.tsx
  login/page.tsx
  medical/upload/page.tsx
  rescue/page.tsx
  layout.tsx
  page.tsx
components/
  adoption/
  animals/
  dashboard/
  layout/
  rescue/
  ui/
lib/
  supabase/
  types/
  data.ts
  mock-data.ts
  utils.ts
supabase/
  schema.sql
  seed.sql
```

## Features

- Public animal profiles with AI-ready descriptions.
- Campus stray map visualization.
- Adoption application form and API route.
- Internal volunteer dashboard.
- Medical and sterilization record upload flow.
- Rescue workflow board from report to adoption.
- Supabase Auth login/register screen.
- Interactive adoption search/filtering, map point focus, and workflow stage focus.
- Figma design file for tokens, desktop screens, mobile screens, and reusable product components.
- Responsive Apple-like interface with warm community styling and dark mode.

## Figma Design

Editable design file: https://www.figma.com/design/ADPmzexLc7RJZG8XD6QLKI

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` for example data.
4. Copy `.env.example` to `.env.local` and fill in values.
5. Optional: create a `medical-records` Storage bucket for attachments.

## API Routes

- `GET /api/animals`: list public animal profiles.
- `POST /api/animals`: create an animal profile with the Supabase service role.
- `POST /api/adoptions`: submit adoption applications.
- `POST /api/rescue-cases`: create rescue workflow cases.
- `POST /api/medical-records`: create medical, vaccine, treatment, or sterilization records.
- `POST /api/ai-description`: generate a warm public profile description. Falls back locally when `OPENAI_API_KEY` is missing.

## Local Development

```bash
npm install
npm run dev
```

The app renders with mock data before Supabase credentials are added.
