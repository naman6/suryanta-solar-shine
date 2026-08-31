import { useState } from "react";
import { Container, Reveal, SectionHeading } from "./Sections";
import { WHATSAPP_URL } from "@/lib/business";
import heroRooftop from "@/assets/hero-rooftop.jpg";
import housingSociety from "@/assets/housing-society.jpg";
import commercialSolar from "@/assets/commercial-solar.jpg";

const SOLUTIONS = [
  {
    n: "01",
    id: "homes",
    title: "Homes",
    image: heroRooftop,
    copy: "Systems sized around household consumption, available shadow free roof area and long term energy needs.",
    points: [
      "Custom capacity systems built to your load",
      "PM Surya Ghar subsidy assistance",
      "Net metering handled end to end",
    ],
  },
  {
    n: "02",
    id: "societies",
    title: "Societies",
    image: housingSociety,
    copy: "Shared residential properties where lifts, pumps and lighting drive the common area bill.",
    points: [
      "Common area load audit",
      "Committee friendly proposals",
      "Single point AMC for the society",
    ],
  },
  {
    n: "03",
    id: "commercial",
    title: "Commercial",
    image: commercialSolar,
    copy: "Factories, warehouses and showrooms across Rajasthan, turning unused roof space into energy infrastructure.",
    points: [
      "CAPEX or zero CAPEX models",
      "Accelerated depreciation benefit",
      "Remote generation monitoring",
    ],
  },
];

export function Solutions() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active]!;

  return (
    <section
      id="solutions"
      className="scroll-mt-24 border-t border-border bg-primary py-24 text-primary-foreground md:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Built for
                <span className="block text-accent-light">the Indian sun.</span>
              </>
            }
            invert
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ul className="border-t border-primary-foreground/15">
            {SOLUTIONS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 border-b border-primary-foreground/15"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="w-full py-7 text-left"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="eyebrow text-primary-foreground/45">{s.n}</span>
                      <span
                        className={`font-display text-[clamp(2rem,5vw,3.6rem)] leading-none transition-colors ${on ? "text-accent-light" : "text-primary-foreground/70"}`}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span
                      className={`grid transition-all duration-500 ${on ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-md pl-14 text-sm leading-relaxed text-primary-foreground/70">
                          {s.copy}
                        </span>
                        <span className="mt-4 block space-y-1.5 pl-14 text-sm text-primary-foreground/85">
                          {s.points.map((p) => (
                            <span key={p} className="block">
                              {p}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="pt-8">
              <a
                href={WHATSAPP_URL}
                className="inline-flex items-center gap-3 border border-primary-foreground/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-accent-light hover:text-accent-light"
              >
                Discuss your property →
              </a>
            </li>
          </ul>

          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-[4/5]">
            {SOLUTIONS.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={`${s.title} solar installation`}
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] [transition-timing-function:var(--ease-out-soft)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.06)",
                }}
              />
            ))}
            <span className="absolute bottom-5 left-5 eyebrow bg-ink/60 px-3 py-2 text-ivory backdrop-blur-sm">
              {current.n} · {current.title}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
