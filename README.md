# SilverNest · Experience Overview

SilverNest helps adults 40+ feel confident about their dating profiles. This project delivers a calm, accessible, and production-ready experience built with the Next.js App Router.

## ✨ Highlights
- Thoughtful UX across **Home**, **Analyze**, **Result**, and **About** pages
- **Shadcn-inspired component library** with Tailwind design tokens
- **Framer Motion** micro-interactions that honor `prefers-reduced-motion`
- **OpenAI API** integration that keeps business logic untouched
- Built for **WCAG 2.2 AA** with keyboard navigation, focus rings, and skip link support
- Ready for **Vercel** deployment (`output: 'standalone'`), robots/sitemap included

## 🚀 Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment variables
   ```bash
   cp .env.local.example .env.local
   # Add your OpenAI API key to .env.local
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## 🧭 App Structure
- `/` — Hero + value prop + how it works
- `/analyze` — Two-step flow for uploads, text input, and preferences
- `/result` — Highlights, improvements, and suggested rewrite
- `/about` — Trust, privacy, and FAQ content

## 🛠️ Scripts
- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run start` — Run built app
- `npm run lint` — Lint with Next.js
- `npm run test` — Unit tests (Vitest)
- `npm run test:ui` — Vitest UI runner
- `npm run test:e2e` — Playwright accessibility/navigation check

## 🧩 Key Files
- `app/layout.tsx` — Global metadata, fonts, analytics, header/footer, toaster
- `app/page.tsx` — Home page content (Hero, ValueCards, HowItWorks)
- `app/analyze/page.tsx` & `components/analyze/*` — Profile intake flow
- `app/result/page.tsx` & `components/result/*` — Feedback presentation
- `app/about/page.tsx` — Brand commitments + FAQ
- `lib/prompt.ts` — System/user prompt builder (unchanged business logic)

## 🔐 Privacy Notes
- Inputs stay in the browser; results persist in `sessionStorage` until cleared
- Photos never leave the client; OpenAI API only receives form text data
- Clear results via the **Delete all** dialog on `/result`

## 📦 Deployment Tips
- Ensure `OPENAI_API_KEY` is set in your Vercel project settings
- Default build command: `npm run build`
- Output mode: `standalone` (configured in `next.config.js`)
- `robots.txt` and `sitemap.xml` ship in `/public`

Enjoy renewing profiles with empathy and polish.
