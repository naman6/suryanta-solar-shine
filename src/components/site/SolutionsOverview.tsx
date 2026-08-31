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
