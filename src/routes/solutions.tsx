import { createFileRoute, Link } from "@tanstack/react-router";
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
          "Custom rooftop solar systems for homes, housing societies, and commercial properties across Jaipur and Rajasthan.",
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
      <section className="border-t border-border bg-primary-deep py-20 text-center text-primary-foreground">
        <Container>
          <h2 className="text-balance-tight text-3xl sm:text-5xl">
            Need a custom proposal for your roof?
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Share your monthly bill and we will size a system for your property.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-sun px-8 py-4 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Get a WhatsApp quote →
            </a>
            <Link
              to="/contact"
              className="border border-primary-foreground/30 px-8 py-4 label-mono text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              Book a site visit
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
