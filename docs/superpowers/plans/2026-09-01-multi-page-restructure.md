# Multi-Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Suryanta Energy website from a single-page site to a 5-page application with routes `/`, `/solutions`, `/about`, `/reviews`, and `/contact`.

**Architecture:** Move `SiteHeader` and `SiteFooter` into `__root.tsx` as layout components. Update `SiteHeader` to use route links (`<Link to="...">`) and handle hero vs standard page scroll states. Build 4 new route files (`solutions.tsx`, `about.tsx`, `reviews.tsx`, `contact.tsx`) and 2 new UI components (`PageHeader.tsx`, `SolutionsOverview.tsx`). Refactor `index.tsx` to display only home-relevant sections.

**Tech Stack:** TanStack Start, TanStack Router, React 19, Tailwind CSS 4, TypeScript

**Spec:** `docs/superpowers/specs/2026-09-01-multi-page-restructure-design.md`

## Global Constraints

- Preserve all existing content, copy, business numbers (+91 90240 71672), address, and WhatsApp logic verbatim.
- Internal navigation must use TanStack Router `<Link>` components to ensure client-side navigation without full page reloads.
- External links (WhatsApp, Google Maps, tel) must remain as standard `<a>` tags with `target="_blank"` and `rel="noreferrer"`.

---

### Task 1: Create UI Helper Primitives (`PageHeader` and `SolutionsOverview`)

**Files:**
- Create: `src/components/site/PageHeader.tsx`
- Create: `src/components/site/SolutionsOverview.tsx`

**Interfaces:**
- `PageHeader`: Props `{ eyebrow?: string; title: ReactNode; subtitle?: string; className?: string }`
- `SolutionsOverview`: No props required. Renders 3 cards (Homes, Societies, Commercial) with links to `/solutions`.

- [ ] **Step 1: Create `PageHeader.tsx`**

```tsx
import { ReactNode } from "react";
import { Container, Eyebrow } from "./Sections";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <section className={`border-b border-border bg-primary-deep pb-16 pt-36 text-primary-foreground md:pb-24 md:pt-44 ${className}`}>
      <Container>
        {eyebrow && <Eyebrow className="text-accent-light">{eyebrow}</Eyebrow>}
        <h1 className="mt-4 text-balance-tight text-[clamp(2.4rem,6vw,5rem)] leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `SolutionsOverview.tsx`**

```tsx
import { Link } from "@tanstack/react-router";
import { Container, Reveal, SectionHeading } from "./Sections";
import heroRooftop from "@/assets/hero-rooftop.jpg";
import housingSociety from "@/assets/housing-society.jpg";
import commercialSolar from "@/assets/commercial-solar.jpg";

const OVERVIEW_ITEMS = [
  {
    title: "Homes",
    tagline: "1 kW to 10 kW rooftop systems",
    desc: "Sized for your household consumption. Complete PM Surya Ghar subsidy and net metering handling.",
    image: heroRooftop,
  },
  {
    title: "Housing Societies",
    tagline: "Common area load reduction",
    desc: "Cut electricity bills for lifts, pumps, and lighting with committee-friendly proposals and single-point AMC.",
    image: housingSociety,
  },
  {
    title: "Commercial & Industrial",
    tagline: "Factories, warehouses & showrooms",
    desc: "Turn unused roof space into energy infrastructure with CAPEX / zero-CAPEX models and accelerated depreciation.",
    image: commercialSolar,
  },
];

export function SolutionsOverview() {
  return (
    <section id="solutions" className="scroll-mt-24 border-t border-border bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Solar solutions for
                <span className="block text-muted-foreground">every property type.</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {OVERVIEW_ITEMS.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 100}>
              <div className="group flex h-full flex-col overflow-hidden border border-border bg-background transition-shadow hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} solar`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {item.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <Link
                    to="/solutions"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-accent"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Commit Task 1**

```bash
git add src/components/site/PageHeader.tsx src/components/site/SolutionsOverview.tsx
git commit -m "feat: add PageHeader and SolutionsOverview UI components"
```

---

### Task 2: Update `SiteHeader` and `SiteFooter` for Client-Side Routing

**Files:**
- Modify: `src/components/site/SiteHeader.tsx`
- Modify: `src/components/site/SiteFooter.tsx`

**Interfaces:**
- `SiteHeader`: Uses `Link` from `@tanstack/react-router` and `useLocation` to determine active page and header scroll behavior.
- `SiteFooter`: Uses `Link` from `@tanstack/react-router` for internal page links.

- [ ] **Step 1: Refactor `SiteHeader.tsx`**

Update `NAV` to use path routes (`/solutions`, `/about`, `/reviews`, `/contact`). Use `useLocation()` to detect if on `/` (home page). If not on `/`, set `pastHero = true` permanently so the standard fixed bar always shows. Replace `<a>` with `<Link>` for internal links. Update CTA to point to `/contact` (or `#quote` on home).

- [ ] **Step 2: Refactor `SiteFooter.tsx`**

Replace anchor links in "Explore" with `<Link to="/solutions">` etc. Add a "Company" column with links to `/about`, `/reviews`, `/contact`. Use `<Link>` for internal links.

- [ ] **Step 3: Verify build / syntax**

Run: `npm run build` or check TypeScript diagnostics.

- [ ] **Step 4: Commit Task 2**

```bash
git add src/components/site/SiteHeader.tsx src/components/site/SiteFooter.tsx
git commit -m "feat: update SiteHeader and SiteFooter with client-side routing"
```

---

### Task 3: Setup Root Layout in `__root.tsx`

**Files:**
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- `RootComponent` renders `<SiteHeader />`, `<main><Outlet /></main>`, and `<SiteFooter />`.

- [ ] **Step 1: Update `RootComponent` in `src/routes/__root.tsx`**

Import `SiteHeader` and `SiteFooter`. Wrap `<Outlet />` inside `<main>` with header and footer.

```tsx
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-ivory text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 2: Commit Task 3**

```bash
git add src/routes/__root.tsx
git commit -m "feat: move SiteHeader and SiteFooter into root layout"
```

---

### Task 4: Refactor Home Page (`src/routes/index.tsx`)

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Render Home page with: `Hero`, `SolutionsOverview`, `Calculator`, `Metrics`, `Testimonials`, `LeadForm`.
- Remove standalone `SiteHeader` and `SiteFooter` calls since they are in `__root.tsx`.

- [ ] **Step 1: Refactor `src/routes/index.tsx`**

Remove header/footer imports. Swap `Solutions` for `SolutionsOverview`. Remove `Standards` section, `Process`, `FAQ`, and `Final CTA` section (which now live on `/about`, `/solutions`, `/contact`).

- [ ] **Step 2: Commit Task 4**

```bash
git add src/routes/index.tsx
git commit -m "refactor: streamline home page sections"
```

---

### Task 5: Create Solutions Route (`src/routes/solutions.tsx`)

**Files:**
- Create: `src/routes/solutions.tsx`

**Interfaces:**
- Route: `/solutions`
- Sections: `PageHeader`, `Solutions` (full tabs), relevant FAQs, CTA section.

- [ ] **Step 1: Create `src/routes/solutions.tsx`**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Solutions } from "@/components/site/Solutions";
import { Container, Eyebrow } from "@/components/site/Sections";
import { WHATSAPP_URL } from "@/lib/business";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solar Solutions for Homes, Societies & Commercial | Suryanta Energy" },
      {
        name: "description",
        content:
          "Custom rooftop solar systems for homes (1-10kW), housing societies, and commercial properties across Jaipur and Rajasthan.",
      },
    ],
  }),
  component: SolutionsPage,
});

const FAQS = [
  {
    q: "How much roof area do I need?",
    a: "Roughly 80 to 100 sq ft of shadow free roof per kW. A typical 3 kW home system needs about 300 sq ft, which most independent Jaipur houses have on the terrace.",
  },
  {
    q: "Do you handle the government subsidy?",
    a: "Yes. For eligible residential rooftop systems we prepare and file the PM Surya Ghar subsidy application along with the DISCOM paperwork, and track it until the amount is credited.",
  },
  {
    q: "What happens on cloudy days or at night?",
    a: "On grid systems stay connected to the grid, so you draw power normally when the sun is down. Surplus units exported during the day are credited through net metering.",
  },
];

function SolutionsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Solar Solutions"
        title={
          <>
            Built for
            <span className="block text-accent-light">the Indian sun.</span>
          </>
        }
        subtitle="Whether you own an independent home, manage a housing society, or run a commercial facility, we engineer rooftop solar to match your exact power consumption."
      />

      <Solutions />

      {/* Solutions FAQ */}
      <section className="border-t border-border bg-ivory py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-muted-foreground">Solutions FAQ</Eyebrow>
            <h2 className="mt-4 text-balance-tight text-3xl sm:text-4xl">
              Common questions about system sizing &amp; subsidies
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-medium">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="border-t border-border bg-primary-deep py-20 text-primary-foreground text-center">
        <Container>
          <h2 className="text-balance-tight text-3xl sm:text-5xl">
            Need a custom proposal for your roof?
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Share your monthly bill and we will size a system for your property.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-sun px-8 py-4 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Get a WhatsApp quote →
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit Task 5**

```bash
git add src/routes/solutions.tsx
git commit -m "feat: create /solutions route"
```

---

### Task 6: Create About Route (`src/routes/about.tsx`)

**Files:**
- Create: `src/routes/about.tsx`

**Interfaces:**
- Route: `/about`
- Sections: `PageHeader`, `Standards` ("Precision first"), `Process` (5 steps), `Metrics`, CTA.

- [ ] **Step 1: Create `src/routes/about.tsx`**

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { Metrics } from "@/components/site/Metrics";
import { Container, Reveal, SectionHeading } from "@/components/site/Sections";
import installTeam from "@/assets/install-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Suryanta Energy Solar Installers Jaipur" },
      {
        name: "description",
        content:
          "Learn about Suryanta Energy — Jaipur's premier rooftop solar installer. 5.0 Google rated, end-to-end service, and 25-year performance warranty.",
      },
    ],
  }),
  component: AboutPage,
});

const CRAFT = [
  {
    t: "Sized on your real consumption",
    d: "Twelve months of bills and your sanctioned load decide the system, not a generic per kW guess.",
  },
  {
    t: "Built for Rajasthan heat and wind",
    d: "Hot dip galvanised structures and high temperature coefficient modules that hold output through peak summer.",
  },
  {
    t: "Paperwork is our job",
    d: "Subsidy application, DISCOM approvals and the net metering inspection are handled by our team.",
  },
  {
    t: "Service that answers",
    d: "A local Jaipur crew, scheduled cleaning and performance checks, and a number that picks up.",
  },
];

function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Suryanta Energy"
        title={
          <>
            Solar energy,
            <span className="block text-accent-light">engineered for real life.</span>
          </>
        }
        subtitle="We are a local solar company based in Sodala, Jaipur. We handle everything from site audit to subsidy filing and long-term maintenance."
      />

      {/* Engineering Standards */}
      <section className="border-t border-border bg-ivory py-24 md:py-32">
        <Container className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <img
              src={installTeam}
              alt="Rooftop solar array installed by Suryanta Energy"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading
              eyebrow="Our Standards"
              title={
                <>
                  Precision first.
                  <span className="block text-muted-foreground">Then panels.</span>
                </>
              }
            />
            <dl className="mt-12 divide-y divide-border border-y border-border">
              {CRAFT.map((c) => (
                <div key={c.t} className="py-6">
                  <dt className="text-lg font-medium">{c.t}</dt>
                  <dd className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {c.d}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <Process />
      <Metrics />

      {/* CTA */}
      <section className="border-t border-border bg-primary-deep py-20 text-center text-primary-foreground">
        <Container>
          <h2 className="text-balance-tight text-3xl sm:text-5xl">
            Ready to work with Jaipur&apos;s top-rated crew?
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Book a free site survey today and get an honest recommendation.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-block bg-sun px-8 py-4 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Book a free site visit →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit Task 6**

```bash
git add src/routes/about.tsx
git commit -m "feat: create /about route"
```

---

### Task 7: Create Reviews Route (`src/routes/reviews.tsx`)

**Files:**
- Create: `src/routes/reviews.tsx`

**Interfaces:**
- Route: `/reviews`
- Sections: `PageHeader`, All Google reviews as full cards, rating summary, Google link, CTA.

- [ ] **Step 1: Create `src/routes/reviews.tsx`**

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Container, Reveal } from "@/components/site/Sections";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS, REVIEWS_URL } from "@/lib/business";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Ratings | Suryanta Energy Jaipur" },
      {
        name: "description",
        content:
          "Read verified 5.0-star Google reviews from Suryanta Energy solar customers in Jaipur and Rajasthan.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Customer Reviews"
        title={
          <>
            Rated {GOOGLE_RATING} Stars
            <span className="block text-accent-light">on Google Business.</span>
          </>
        }
        subtitle={`Every review comes from a real customer across Jaipur and Rajasthan. Read what property owners say about our service.`}
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          {/* Summary badge */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 text-4xl text-sun font-bold">
              ★ {GOOGLE_RATING}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on {GOOGLE_REVIEW_COUNT} verified customer reviews on Google
            </p>
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-foreground"
            >
              View on Google Maps ↗
            </a>
          </div>

          {/* Reviews grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {GOOGLE_REVIEWS.map((rev, idx) => (
              <Reveal key={rev.name} delay={idx * 100}>
                <div className="flex h-full flex-col justify-between border border-border bg-background p-8 shadow-sm">
                  <div>
                    <div className="text-sun text-lg">★★★★★</div>
                    <p className="mt-4 text-base leading-relaxed text-foreground">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                  <div className="mt-8 border-t border-border pt-4">
                    <p className="font-semibold text-sm">{rev.name}</p>
                    <p className="text-xs text-muted-foreground">Google Review · {rev.when}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary-deep py-20 text-center text-primary-foreground">
        <Container>
          <h2 className="text-balance-tight text-3xl sm:text-5xl">
            Want 5-star solar service for your property?
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Talk to our team today for a free site evaluation.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-block bg-sun px-8 py-4 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Contact Suryanta Energy →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit Task 7**

```bash
git add src/routes/reviews.tsx
git commit -m "feat: create /reviews route"
```

---

### Task 8: Create Contact Route (`src/routes/contact.tsx`)

**Files:**
- Create: `src/routes/contact.tsx`

**Interfaces:**
- Route: `/contact`
- Sections: `PageHeader`, `LeadForm`, Contact info, embedded Google Maps iframe.

- [ ] **Step 1: Create `src/routes/contact.tsx`**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { LeadForm } from "@/components/site/LeadForm";
import { Container } from "@/components/site/Sections";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Suryanta Energy Solar Jaipur" },
      {
        name: "description",
        content:
          "Contact Suryanta Energy in Sodala, Jaipur. Call +91 90240 71672 or book a free rooftop solar site visit on WhatsApp.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s talk about
            <span className="block text-accent-light">your solar project.</span>
          </>
        }
        subtitle="Book a free site survey, send us your electricity bill on WhatsApp, or visit our office in Sodala, Jaipur."
      />

      <LeadForm />

      {/* Map & Office section */}
      <section className="border-t border-border bg-ivory py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow text-muted-foreground">Visit our office</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Suryanta Energy Headquarters
            </h2>
            <address className="mt-6 not-italic text-base leading-relaxed text-muted-foreground">
              {ADDRESS}
            </address>

            <div className="mt-8 space-y-4">
              <div>
                <p className="eyebrow text-muted-foreground">Phone</p>
                <a href={PHONE_TEL} className="mt-1 block text-lg font-semibold text-foreground hover:text-accent">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">WhatsApp</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-lg font-semibold text-foreground hover:text-accent"
                >
                  Send a WhatsApp message →
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">Google Profile</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm font-semibold text-foreground underline hover:text-accent"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-stone">
            <iframe
              title="Suryanta Energy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4616235478496!2d75.7686!3d26.8887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd3f8582f3496057c!2sSuryanta%20Energy!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit Task 8**

```bash
git add src/routes/contact.tsx
git commit -m "feat: create /contact route"
```

---

### Task 9: Verification & Build Check

- [ ] **Step 1: Test Build**

Run: `npm run build` or `bun run build` to verify TanStack Router generated the route tree and there are no TypeScript or compilation errors.

- [ ] **Step 2: Verify All Routes in Browser**

Check `/`, `/solutions`, `/about`, `/reviews`, and `/contact` render cleanly with header and footer.
