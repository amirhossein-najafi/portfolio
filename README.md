# Amirhossein Najafi — Portfolio

**Crafted interfaces. Reliable systems.**

Personal portfolio of [Amirhossein Najafi](https://amirhossein-najafi.vercel.app) — Frontend Developer based in Mazandaran, Iran.

**Live site → [amirhossein-najafi.vercel.app](https://amirhossein-najafi.vercel.app)**

---

## Highlights

- Dark editorial UI with gold & forest accents
- Smooth scroll (Lenis) + cinematic motion (GSAP / ScrollTrigger)
- EN / FA with RTL support
- Pinned project showcase (one scroll = next project)
- Production work featured: [Daraei 360](https://daraei.ai/)
- SEO-ready: metadata, sitemap, robots, JSON-LD, Open Graph

---

## Stack

| Layer | Tech |
|--------|------|
| Framework | Next.js 16 (App Router) · React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | GSAP · ScrollTrigger · Lenis |
| Fonts | Syne · Source Sans 3 · Vazirmatn |
| Deploy | Vercel |

---

## Getting started

```bash
git clone https://github.com/amirhossein-najafi/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
```

---

## Project structure

```
src/
  app/           # layout, page, SEO (sitemap, robots, OG, icons)
  components/    # Hero, Projects, Experience, motion helpers…
  data/          # profile.ts · seo.ts
  i18n/          # EN / FA dictionaries + language provider
  lib/           # motion utilities
public/          # photo, CV, verification files
```

---

## Content & branding

| What | Where |
|------|--------|
| Name, email, phone, socials, photo | `src/data/profile.ts` |
| Titles, descriptions, keywords | `src/data/seo.ts` |
| All EN / FA copy | `src/i18n/dictionaries.ts` |
| Portrait | `public/amirhossein-najafi.jpg` |
| Resume PDF | `public/Amirhossein_Najafi_Resume.pdf` |

---

## Environment

Copy `.env.example` → `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://amirhossein-najafi.vercel.app
```

Used for canonical URLs, Open Graph, sitemap, and JSON-LD.

---

## Deploy

Connected to **Vercel** via GitHub (`main` → auto deploy).

1. Push to `main`
2. Confirm `NEXT_PUBLIC_SITE_URL` in Vercel → Environment Variables
3. Redeploy if the public URL changes

---

## License

Private portfolio project · © Amirhossein Najafi
