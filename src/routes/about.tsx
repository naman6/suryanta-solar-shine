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
