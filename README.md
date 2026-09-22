# qwysoft.com — marketing site

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Setup

1. Extract `qwysoft-website.zip` (downloaded from the Claude chat) into this folder so that
   `package.json`, `app/`, `components/` and `lib/` sit next to this README.
2. Then:

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node 20.9+ (Node 22 recommended). Fonts (Newsreader, Geist, Geist Mono) are
self-hosted at build time via `next/font/google`, so the build machine needs internet access.

## Structure

```
app/            layout (metadata, JSON-LD), page, sitemap, robots, OG image, legal pages
components/
  navbar/       sticky nav, mega menus, mobile menu, dark-section awareness
  hero/         headline + layered product composition
  dashboard/    QWY Console mock, floating cards, dependency-free SVG charts
  trust/ intro/ features/ analytics/ ai/ solutions/ enterprise/
  developers/ testimonials/ pricing/ resources/ cta/ footer/ legal/
  ui/           button, container, reveal, counter, streaming text, logo, kasavu, thumb
lib/
  constants.ts  ALL site copy — edit here, not in components
  data.ts       sample data behind every chart
  fonts.ts      typefaces
  utils.ts      cn(), Indian number formatting, chart path helpers
```

## Before launch — replace placeholders (search the code for `REPLACE`)

1. `components/ui/logo.tsx` — swap in the official QWY logo SVG.
2. `lib/constants.ts → STORY` — a real, approved client quote and metrics (current one is invented).
3. `lib/constants.ts → RESOURCES` — real article titles/links (or wire to a CMS).
4. `lib/constants.ts → LIFE_PHOTOS` — add photos to `public/images/life/`; the gallery appears automatically.
5. `lib/constants.ts → SITE.social` — confirm LinkedIn / Instagram / Facebook URLs.
6. `app/privacy`, `app/terms` — approved legal text.
7. Navbar "Log in" points to `#login` — point it at the client portal URL.
