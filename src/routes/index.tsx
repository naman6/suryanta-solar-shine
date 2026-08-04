import { createFileRoute } from "@tanstack/react-router";
import { Container, SectionHeading, SunRays } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import {
  ADDRESS,
  GOOGLE_RATING,
  GOOGLE_REVIEWS,
  GOOGLE_REVIEW_COUNT,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEWS_URL,
  WHATSAPP_URL,
} from "@/lib/business";
import heroRooftop from "@/assets/hero-rooftop.jpg";
import commercialSolar from "@/assets/commercial-solar.jpg";
import housingSociety from "@/assets/housing-society.jpg";
import installTeam from "@/assets/install-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suryanta Energy | Rooftop Solar Installers in Jaipur, Rajasthan" },
      {
        name: "description",
        content:
          "Rooftop solar for homes, housing societies and businesses in Jaipur. Subsidy paperwork, net metering and 25-year performance panels — rated 5.0 on Google.",
      },
      { property: "og:title", content: "Suryanta Energy | Rooftop Solar in Jaipur" },
      {
        property: "og:description",
        content:
          "Cut your electricity bill by up to 90% with rooftop solar designed, installed and serviced by Suryanta Energy, Jaipur.",
      },
    ],
  }),
  component: Home,
});

const OFFERINGS = [
  {
    id: "homes",
    title: "Homes",
    image: heroRooftop,
    copy: "Save up to 90% on your household electricity bill with a rooftop system sized to your family's usage.",
    points: ["1 kW – 10 kW systems", "PM Surya Ghar subsidy assistance", "Net metering handled end-to-end"],
  },
  {
    id: "societies",
    title: "Housing Societies",
    image: housingSociety,
    copy: "Slash common-area power costs for lifts, pumps and lighting, and raise the value of every flat.",
    points: ["Common-area load audit", "Committee-friendly proposals", "Single-point AMC for the society"],
  },
  {
    id: "commercial",
    title: "Commercial & Industrial",
    image: commercialSolar,
    copy: "Factories, warehouses and showrooms across Rajasthan — engineered for generation and uptime.",
    points: ["CAPEX or zero-CAPEX models", "Accelerated depreciation benefit", "Remote generation monitoring"],
  },
];

const TRUST = [
  {
    title: "Bills down, not comfort",
    copy: "Systems are sized on twelve months of your real consumption — not a generic per-kW guess.",
  },
  {
    title: "Built for Rajasthan heat & wind",
    copy: "Hot-dip galvanised structures and high-temperature-coefficient modules that hold output through peak summer.",
  },
  {
    title: "Paperwork is our job",
    copy: "Subsidy application, DISCOM approvals and net-metering inspection are handled by our team, not yours.",
  },
  {
    title: "Service that answers",
    copy: "A local Jaipur crew, scheduled cleaning and maintenance visits, and a number that picks up.",
  },
];

const PROCESS = [
  { n: "01", t: "Free site visit", d: "We measure shadow-free roof area, inspect your sanctioned load and read your last bills." },
  { n: "02", t: "Design & transparent quote", d: "Layout, generation estimate, subsidy applicable and payback period — in writing." },
  { n: "03", t: "Approvals & subsidy", d: "We file the DISCOM application, net-metering request and PM Surya Ghar subsidy claim." },
  { n: "04", t: "Installation", d: "Structure, modules, inverter and safety wiring completed in a few days by our own crew." },
  { n: "05", t: "Commissioning & service", d: "Meter change, generation handover and ongoing cleaning plus performance checks." },
];

const FAQS = [
  {
    q: "How much roof area do I need?",
    a: "Roughly 80–100 sq ft of shadow-free roof per kW. A typical 3 kW home system needs about 300 sq ft, which most independent Jaipur houses have on the terrace.",
  },
  {
    q: "Do you handle the government subsidy?",
    a: "Yes. For eligible residential rooftop systems we prepare and file the PM Surya Ghar subsidy application along with the DISCOM paperwork, and track it until the amount is credited.",
  },
  {
    q: "What happens on cloudy days or at night?",
    a: "On-grid systems stay connected to the grid, so you draw power normally when the sun is down. Surplus units exported during the day are credited through net metering.",
  },
  {
    q: "How long does installation take?",
    a: "A residential installation is usually completed in 2–4 days once material is on site. Approvals and meter replacement by the DISCOM add a few weeks.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in Sodala, Jaipur and take up projects across Jaipur and the rest of Rajasthan.",
  },
];

function GoogleStars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-accent ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M10 1.6l2.5 5.3 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dawn text-primary-foreground">
        <SunRays className="pointer-events-none absolute -top-10 left-1/2 h-72 w-[46rem] -translate-x-1/2 text-primary-foreground/10" />
        <Container className="relative grid gap-12 py-16 md:grid-cols-[1.05fr_1fr] md:items-center md:py-24">
          <div>
            <p className="eyebrow text-accent">Jaipur · Rajasthan</p>
            <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              The sun already visits your roof.
              <span className="block italic text-accent">Put it to work.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
              Suryanta Energy designs, installs and services rooftop solar for homes, housing
              societies and businesses across Rajasthan — subsidy paperwork included.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                className="rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
              >
                Book a free site visit
              </a>
              <a
                href="#calculator"
                className="rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Estimate my savings
              </a>
            </div>

            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/85 ring-1 ring-primary-foreground/15 transition-colors hover:bg-primary-foreground/15"
            >
              <GoogleStars />
              <span>
                Rated <strong className="font-semibold">{GOOGLE_RATING}</strong> on Google ·{" "}
                {GOOGLE_REVIEW_COUNT} reviews
              </span>
            </a>
          </div>

          <div className="relative">
            <img
              src={heroRooftop}
              alt="Rooftop solar panels on a Jaipur home at sunrise"
              width={1600}
              height={1104}
              className="w-full rounded-[var(--radius-3xl)] object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-background px-5 py-4 shadow-[var(--shadow-lift)]">
              <p className="font-display text-3xl text-primary">Up to 90%</p>
              <p className="text-xs text-muted-foreground">lower monthly power bill</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stat strip */}
      <section className="border-b border-border bg-secondary">
        <Container className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {[
            ["25 yrs", "Panel performance warranty"],
            ["5.0 ★", `Google rating (${GOOGLE_REVIEW_COUNT} reviews)`],
            ["All Rajasthan", "Service coverage"],
            ["End-to-end", "Subsidy & net metering"],
          ].map(([big, small]) => (
            <div key={small} className="px-2 text-center">
              <p className="font-display text-2xl text-primary sm:text-3xl">{big}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{small}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Offerings */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Get solar for"
            title="One roof, three ways to save"
            subtitle="Every project starts with a free survey and a sized, written proposal."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OFFERINGS.map((o) => (
              <article
                key={o.id}
                id={o.id}
                className="surface-card group flex flex-col overflow-hidden scroll-mt-24 transition-transform hover:-translate-y-1"
              >
                <img
                  src={o.image}
                  alt={`${o.title} solar installation`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-48 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.copy}</p>
                  <ul className="mt-5 space-y-2 text-sm text-foreground">
                    {o.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    className="mt-6 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Talk to us about {o.title.toLowerCase()} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-primary-soft py-20">
        <Container className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <img
              src={installTeam}
              alt="Suryanta Energy technicians installing a rooftop solar mounting structure"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full rounded-[var(--radius-3xl)] object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Suryanta"
              title="Solar you can forget about, in the best way"
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {TRUST.map((t) => (
                <div key={t.title}>
                  <SunRays className="h-6 w-11 text-accent" />
                  <h3 className="mt-3 text-lg">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator */}
      <section id="calculator" className="scroll-mt-24 py-20">
        <Container>
          <SavingsCalculator />
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 bg-primary-deep py-20 text-primary-foreground">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Five steps, and we do four of them"
            subtitle="You approve the design. We handle surveys, approvals, subsidy and installation."
            invert
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-2xl)] bg-primary-foreground/15 md:grid-cols-5">
            {PROCESS.map((s) => (
              <li key={s.n} className="bg-primary-deep p-6">
                <span className="font-display text-3xl text-accent">{s.n}</span>
                <h3 className="mt-3 text-lg text-primary-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Google reviews */}
      <section id="reviews" className="scroll-mt-24 py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Google reviews"
              title="Rated 5.0 by our customers"
              subtitle={`${GOOGLE_REVIEW_COUNT} verified reviews on our Google Business Profile.`}
            />
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            >
              Read all on Google
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GOOGLE_REVIEWS.map((r) => (
              <figure key={r.name} className="surface-card flex h-full flex-col p-6">
                <GoogleStars />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      Google review · {r.when}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-secondary py-20">
        <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="FAQs" title="Your questions, answered plainly" />
          <div className="divide-y divide-border">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-semibold text-foreground">
                  {f.q}
                  <span className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-24 py-20">
        <Container>
          <div className="surface-card overflow-hidden bg-dawn text-primary-foreground">
            <div className="grid gap-10 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl">
                  Free site visit. <span className="italic text-accent">No obligation.</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
                  Send us your last electricity bill on WhatsApp and we'll come back with a sized
                  system, subsidy estimate and payback period.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_URL}
                    className="rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    WhatsApp us
                  </a>
                  <a
                    href={PHONE_TEL}
                    className="rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <address className="not-italic text-sm leading-relaxed text-primary-foreground/80">
                <span className="eyebrow block text-accent">Visit us</span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block hover:text-primary-foreground"
                >
                  {ADDRESS}
                </a>
                <span className="mt-4 block text-primary-foreground/60">
                  Serving Jaipur and all of Rajasthan
                </span>
              </address>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
