# Multi-Page Restructure — Design Spec

## Overview

Convert the Suryanta Energy website from a single-page landing site (everything on `/`) to a five-page multi-page application. Each page gets its own route, dedicated SEO metadata, and focused content.

## Current State

- One route: `src/routes/index.tsx` at `/`
- Navigation bar links are anchor scrolls (`#solutions`, `#calculator`, `#why`, `#reviews`, `#faq`)
- All sections (Hero, Solutions, Calculator, LeadForm, Metrics, Standards, Process, Testimonials, FAQ, Final CTA) rendered sequentially on one page
- SiteHeader and SiteFooter are imported per-page (not in root layout)
- TanStack Router with file-based routing (`src/routes/`)

## Target Architecture

### Routes

| Route file | URL | Page title (SEO) |
|---|---|---|
| `src/routes/index.tsx` | `/` | Suryanta Energy \| Rooftop Solar Installers in Jaipur, Rajasthan |
| `src/routes/solutions.tsx` | `/solutions` | Solar Solutions for Homes, Societies & Businesses \| Suryanta Energy |
| `src/routes/about.tsx` | `/about` | About Suryanta Energy \| Rooftop Solar Company in Jaipur |
| `src/routes/reviews.tsx` | `/reviews` | Customer Reviews \| Suryanta Energy Jaipur |
| `src/routes/contact.tsx` | `/contact` | Contact Us \| Suryanta Energy Jaipur |

### Shared Layout

Move `SiteHeader` and `SiteFooter` into `__root.tsx` so they render on every page without repetition. The root component becomes:

```
<SiteHeader />
<main>
  <Outlet />
</main>
<SiteFooter />
```

### Page Content Breakdown

#### Home (`/`)
Sections in order:
1. **Hero** — unchanged (with new hero image already swapped in)
2. **Solutions overview** — a simplified version: three cards (Homes, Societies, Commercial) with brief description and a "Learn more" link to `/solutions`
3. **Calculator** — interactive savings estimator, unchanged
4. **Metrics** — trust stats (5.0 rating, 33 reviews, 25-yr warranty, 120 units/kW), unchanged
5. **Testimonials** — review carousel showing 2-3 reviews, with "See all reviews" link to `/reviews`
6. **LeadForm** — "Book a free site visit" form, unchanged

Remove from home: Standards section, Process section, FAQ section, Final CTA section.

#### Solutions (`/solutions`)
Sections in order:
1. **Page header** — eyebrow + heading ("Built for the Indian sun")
2. **Solutions tabs** — existing interactive tabs (Homes, Societies, Commercial) with images and bullet points, expanded with more detail per solution type
3. **Relevant FAQs** — the roof area, subsidy, and cloudy day questions that relate to solutions
4. **CTA** — "Discuss your property" WhatsApp link + link to `/contact`

#### About (`/about`)
Sections in order:
1. **Page header** — company introduction heading
2. **Standards** — the "Precision first. Then panels." section with install team image and the 4 CRAFT value propositions (currently in `index.tsx`)
3. **Process** — 5-step "How it works" (currently `Process.tsx`)
4. **Metrics** — reuse the stats section
5. **CTA** — link to `/contact` to book a visit

#### Reviews (`/reviews`)
Sections in order:
1. **Page header** — rating summary (5.0 stars, 33 reviews)
2. **All reviews** — all 3 Google reviews displayed as full cards (not a carousel), each with name, date, full text, star rating
3. **Google link** — prominent link to Google reviews page
4. **CTA** — "Ready to join them?" link to `/contact`

#### Contact (`/contact`)
Sections in order:
1. **Page header** — "Get in touch" heading
2. **LeadForm** — the existing WhatsApp-based lead form, reused
3. **Contact details** — phone, WhatsApp link, address with Google Maps link
4. **Map** — embedded Google Maps iframe showing the business location

### Navigation Updates

#### SiteHeader changes

Replace anchor-based `NAV` array:
```ts
// Before
const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Savings", href: "#calculator" },
  { label: "Why us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

// After
const NAV = [
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];
```

- "Savings" and "FAQ" are no longer top-level nav items (calculator is on home, FAQs are distributed)
- "Book a site visit" CTA button links to `/contact` on all pages. On the home page specifically, it links to `#quote` to scroll to the LeadForm already on the page. The header component will check the current route to decide which href to use.
- Use TanStack Router's `<Link>` component instead of `<a>` tags for internal navigation (enables client-side routing)
- The header logic currently hides the full bar once scrolled past the hero and shows a floating cluster. This is hero-specific behavior. On non-home pages, the header should always show as a standard fixed bar (no hide/show logic needed since there's no full-viewport hero).

#### SiteFooter changes

Update the "Explore" links from anchor scrolls to page routes:
```
Home solar → /solutions
Housing societies → /solutions
Commercial & industrial → /solutions
Savings estimator → / (or /solutions with anchor)
FAQs → /about or /solutions
```

Add a "Company" column with About, Reviews, Contact links.

### Component Changes

| Component | Change |
|---|---|
| `Hero.tsx` | No changes (only used on home) |
| `Solutions.tsx` | Keep as-is for `/solutions` page. Create a new `SolutionsOverview.tsx` for the home page (simplified cards) |
| `Calculator.tsx` | No changes (used on home) |
| `LeadForm.tsx` | No changes (reused on both home and contact) |
| `Metrics.tsx` | No changes (reused on home and about) |
| `Process.tsx` | No changes (moved to about page) |
| `Testimonials.tsx` | No changes (used on home with link to /reviews) |
| `SiteHeader.tsx` | Major update: route-based nav, `<Link>` components, conditional hero behavior |
| `SiteFooter.tsx` | Update links to use routes |
| `Sections.tsx` | No changes |

### New Components

| Component | Purpose |
|---|---|
| `SolutionsOverview.tsx` | Three solution cards for the home page with links to `/solutions` |
| `PageHeader.tsx` | Reusable page header for interior pages (eyebrow + heading + optional subtitle), with consistent padding that accounts for the fixed header |

### SEO

Each route file defines its own `head()` with:
- Unique `<title>`
- Unique `meta description`
- Unique `og:title` and `og:description`

### Data / Constants

No changes to `src/lib/business.ts` or `src/lib/solar.ts`. The CRAFT and FAQS arrays in `index.tsx` need to move to a shared location (either `src/lib/content.ts` or directly into their consuming page files).

### Routing Behavior

- TanStack Router file-based routing: creating `src/routes/solutions.tsx` automatically registers `/solutions`
- The route tree (`routeTree.gen.ts`) is auto-generated — no manual changes needed
- Internal links use `<Link to="/solutions">` for client-side navigation
- External links (WhatsApp, Google Maps, phone) remain as `<a>` tags

### Files Created

1. `src/routes/solutions.tsx`
2. `src/routes/about.tsx`
3. `src/routes/reviews.tsx`
4. `src/routes/contact.tsx`
5. `src/components/site/SolutionsOverview.tsx`
6. `src/components/site/PageHeader.tsx`

### Files Modified

1. `src/routes/__root.tsx` — add SiteHeader + SiteFooter to shared layout
2. `src/routes/index.tsx` — simplify to home-only sections, remove Standards/Process/FAQ/Final CTA
3. `src/components/site/SiteHeader.tsx` — route-based nav, Link components, conditional hero logic
4. `src/components/site/SiteFooter.tsx` — route-based links

### Files Unchanged

- `src/components/site/Hero.tsx`
- `src/components/site/Calculator.tsx`
- `src/components/site/LeadForm.tsx`
- `src/components/site/Metrics.tsx`
- `src/components/site/Process.tsx`
- `src/components/site/Testimonials.tsx`
- `src/components/site/Sections.tsx`
- `src/lib/business.ts`
- `src/lib/solar.ts`
- All `src/components/ui/*` files

### Testing

- Verify all 5 routes load correctly
- Verify navigation links work (client-side transitions)
- Verify mobile menu works with new routes
- Verify "Book a site visit" CTA works from all pages
- Verify header shows fixed bar on interior pages, hero-aware on home
- Verify footer links navigate correctly
- Run `npm run build` (or `bun run build`) to confirm no build errors
