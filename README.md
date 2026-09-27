# VIIV by Varman — Website (Phase 1: Homepage)

A career-skills platform for the business side of tech. This phase is the complete
responsive homepage, built around one flagship product: **VIIV Full-Stack Sales**.
The primary action is **Join Free Career Webinar**; the secondary one is **Explore Full-Stack Sales**.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Framer Motion (via `LazyMotion`; animation features load asynchronously)
- Self-hosted variable fonts (Inter + Bricolage Grotesque) via `next/font/local`

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` to configure the site URL, analytics and the registration webhook.

## Homepage narrative

The section order follows the visitor's thinking, from "I need a job" to "I'll attend the free webinar first":

| # | Section | Visitor should think |
|---|---------|----------------------|
| 1 | Hero + career ecosystem | "This is for people like me." |
| 2 | Graduate Reality | "That's exactly my situation." |
| 3 | Hidden Job Market (role explorer) | "There are careers I didn't know about." |
| 4 | Business Side of Tech | "I don't need to be a developer to work in tech." |
| 5 | Career Paths | "These are real roles with real progression." |
| 6 | Why Sales | "Sales is actually a business career." |
| 7 | Skill Gap | "I don't have all these skills yet." |
| 8 | Full-Stack Sales reveal | "This program teaches the skills." |
| 9 | Curriculum + Sales Process | "It covers the whole journey." |
| 10 | Learn By Doing | "This isn't just video content." |
| 11 | The VIIV Method | Discover → Learn → Practice → Prove → Launch |
| 12 | Proof of Work | "I can build evidence of what I can do." |
| 13 | Career Readiness | "They help me prepare, without false promises." |
| 14 | Degree → Career transformation | Signature brand visual |
| 15 | Founder | "There is real experience behind this." |
| 16 | Free Webinar + inline form | Main conversion |
| 17 | FAQ | Objection handling, including "Is a job guaranteed? No." |
| 18 | Final CTA + footer | "Your degree is done. Now build what comes next." |

## Project structure

```
src/
  app/                    layout, page, API route, robots, sitemap, OG image, placeholder legal pages
  content/                ALL editable business content (no layout logic)
    site.ts               brand, legal name, SEO, navigation, CTA labels, footer
    careers.ts            career paths, hero roles, role explorer, graduate reality, business functions
    program.ts            Full-Stack Sales modules, sales process, method, proof of work, readiness, transformation
    founder.ts            founder profile + verified achievements (empty = labelled placeholders)
    webinar.ts            webinar copy, schedule, form options
    faqs.ts               FAQ entries (also emitted as FAQPage JSON-LD)
    media.ts              photography registry + art-direction briefs
  components/
    layout/               Navbar, Footer, StickyMobileCTA, Logo, PlaceholderPage
    sections/             one component per homepage section
    webinar/              WebinarProvider (modal state), WebinarModal (<dialog>), WebinarForm
    ui/                   Section, Button, Icon, Photo, Reveal
    CTAs.tsx              WebinarCTA / ExploreCTA (tracked)
    Analytics.tsx         GA4 / Meta Pixel loaders (env-driven)
    StructuredData.tsx    JSON-LD
  lib/
    analytics.ts          provider-agnostic `track()` + typed event names
    registration.ts       shared client/server validation + UTM attribution
```

## Editing content

- **Copy, roles, modules and FAQs:** edit the files in `src/content/`. The components only read from them.
- **Photography:** put licensed images in `public/images/` and set `src` in `src/content/media.ts`.
  Until you do, each slot shows an art-directed placeholder at the final aspect ratio, so swapping in real photos causes no layout shift.
- **Webinar date:** set `webinar.schedule` in `src/content/webinar.ts`. This also switches on the `Event` structured data.
- **Founder achievements:** add verified items to `verifiedAchievements` in `src/content/founder.ts`.
  To hide the text placeholders, set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`.

## Webinar registration

`POST /api/webinar-registration` validates the submission with the same rules the client uses
(`src/lib/registration.ts`: Indian mobile number, email, degree, graduation year, status and consent).
It also captures UTM parameters and the CTA source, and has a honeypot field to filter out spam bots.

- If `WEBINAR_WEBHOOK_URL` is set, the payload is forwarded there. Point it at a CRM, a WhatsApp/email automation, or Zapier/Make.
- If it is not set, the registration is accepted and a log line is written without personal data.
  **Registrations are not stored anywhere until a webhook is configured.**

The success message deliberately says only that details will be shared "using the contact information you provided".
It does not mention WhatsApp delivery, because that integration doesn't exist yet.

## Analytics

Every event goes through `track()` in `src/lib/analytics.ts`. It pushes to `window.dataLayer`
(GTM-compatible) and forwards to `gtag` and `fbq` when they are loaded. Set `NEXT_PUBLIC_GA4_ID` and/or
`NEXT_PUBLIC_META_PIXEL_ID` to load them. No credentials are committed.

| Event | Fired when |
|-------|-----------|
| `webinar_cta_click` | any webinar CTA opens the modal (`cta_location`) |
| `full_stack_sales_click` | any Explore Full-Stack Sales CTA (`cta_location`) |
| `career_path_click` | a career-path card's webinar link (`career_path`) |
| `why_sales_view` | the Why Sales section is 25% visible (once) |
| `curriculum_interaction` | a module tab, accordion item or sales-process step is selected |
| `webinar_form_start` | first field edit in a form (`form_location`) |
| `webinar_form_submit` | successful registration (mapped to Meta `Lead`) |
| `founder_section_view` | the founder section is 25% visible (once) |
| `faq_interaction` | an FAQ is opened |

## Content integrity rules

The site contains **no** job counts, salary figures, placement percentages, student outcomes, testimonials,
hiring partners, university partners, awards or job guarantees. Wherever verified content is missing,
there is a labelled placeholder instead. Keep it that way unless verified information is supplied.

## Placeholders to replace before launch

- [ ] Photography: hero, three learn-by-doing images, founder portrait (`src/content/media.ts`)
- [ ] Founder verified achievements and LinkedIn URL (`src/content/founder.ts`)
- [ ] Webinar date/time and format confirmation (`src/content/webinar.ts`)
- [ ] Contact details and social links (`src/content/site.ts`)
- [ ] Privacy Policy and Terms of Use (`/privacy`, `/terms`), which need legal review
- [ ] `NEXT_PUBLIC_SITE_URL`, `WEBINAR_WEBHOOK_URL`, analytics IDs
