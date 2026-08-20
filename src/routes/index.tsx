import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow, Reveal, SectionHeading } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CustomCursor } from "@/components/site/CustomCursor";
import { Hero } from "@/components/site/Hero";
import { EnergyFlow } from "@/components/site/EnergyFlow";
import { Solutions } from "@/components/site/Solutions";
import { RoofVisualization } from "@/components/site/RoofVisualization";
import { Metrics } from "@/components/site/Metrics";
import { Calculator } from "@/components/site/Calculator";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import {
  ADDRESS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/lib/business";
import installTeam from "@/assets/install-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suryanta Energy | Rooftop Solar Installers in Jaipur, Rajasthan" },
      {
        name: "description",
        content:
          "Rooftop solar for homes, housing societies and businesses in Jaipur. Subsidy paperwork, net metering and 25 year performance panels, rated 5.0 on Google.",
      },
      { property: "og:title", content: "Suryanta Energy | Rooftop Solar in Jaipur" },
      {
        property: "og:description",
        content:
          "Solar energy, engineered for real life. Design, installation and service of rooftop solar across Jaipur and Rajasthan.",
      },
    ],
  }),
  component: Home,
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
  {
    q: "How long does installation take?",
    a: "A residential installation is usually completed in 2 to 4 days once material is on site. Approvals and meter replacement by the DISCOM add a few weeks.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in Sodala, Jaipur and take up projects across Jaipur and the rest of Rajasthan.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <CustomCursor />
      <SiteHeader />

      <main>
        <Hero />
        <EnergyFlow />
        <Solutions />
        <RoofVisualization />
        <Metrics />

        {/* Engineering standards */}
        <section className="border-t border-border bg-ivory py-24 md:py-32">
          <Container className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <img
                src={installTeam}
                alt="Rooftop solar array installed by Suryanta Energy under a clear sky"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
            <Reveal delay={80}>
              <SectionHeading
                eyebrow="Standards"
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
                    <dt className="text-lg">{c.t}</dt>
                    <dd className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {c.d}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>

        <Calculator />
        <Process />
        <Testimonials />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 border-t border-border bg-ivory py-24 md:py-32">
          <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Eyebrow className="text-muted-foreground">Questions</Eyebrow>
            <div className="divide-y divide-border border-y border-border">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg">
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

        {/* Final CTA */}
        <section id="contact" className="scroll-mt-24 bg-primary-deep py-28 text-primary-foreground md:py-36">
          <Container>
            <h2 className="max-w-4xl text-balance-tight text-[clamp(2.6rem,7.5vw,6.5rem)]">
              Ready to generate
              <span className="block text-accent">your own power?</span>
            </h2>

            <div className="mt-16 grid gap-12 border-t border-primary-foreground/15 pt-12 md:grid-cols-3">
              <div>
                <p className="eyebrow text-primary-foreground/50">Talk to us</p>
                <div className="mt-5 flex flex-col items-start gap-3">
                  <a
                    href={WHATSAPP_URL}
                    className="bg-sun px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    WhatsApp us
                  </a>
                  <a
                    href={PHONE_TEL}
                    className="border border-primary-foreground/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-accent hover:text-accent"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <address className="not-italic text-sm leading-relaxed text-primary-foreground/70">
                <span className="eyebrow block text-primary-foreground/50">Visit us</span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 block max-w-xs hover:text-primary-foreground"
                >
                  {ADDRESS}
                </a>
              </address>
              <p className="text-sm leading-relaxed text-primary-foreground/70">
                <span className="eyebrow block text-primary-foreground/50">What to send</span>
                <span className="mt-5 block max-w-xs">
                  Share your last electricity bill on WhatsApp and we come back with a sized system,
                  subsidy estimate and payback period.
                </span>
              </p>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
