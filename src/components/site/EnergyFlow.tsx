import { useState } from "react";
import { Container, Reveal, SectionHeading } from "./Sections";

const STAGES = [
  { id: "sun", label: "Sun", note: "Rajasthan gets some of the strongest year round sunlight in India." },
  { id: "panels", label: "Solar panels", note: "Convert sunlight into DC electricity on your roof." },
  { id: "inverter", label: "Inverter", note: "Converts that DC electricity into usable AC power." },
  { id: "property", label: "Property", note: "The power is used where it is generated, first." },
  { id: "savings", label: "Savings", note: "Surplus units are exported and credited through net metering." },
];

export function EnergyFlow() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="flow" className="scroll-mt-24 border-t border-border bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How the energy moves"
            title={
              <>
                From sunlight
                <span className="block text-muted-foreground">to power.</span>
              </>
            }
          />
        </Reveal>

        <Reveal delay={80} className="mt-16">
          <div className="relative">
            <svg
              viewBox="0 0 1000 90"
              className="hidden h-24 w-full md:block"
              role="img"
              aria-label="Energy path from sun through panels and inverter to your property and savings"
            >
              <path
                d="M40 45 H960"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <path
                d="M40 45 H960"
                fill="none"
                stroke="var(--sun)"
                strokeWidth="2.5"
                strokeDasharray="6 26"
                className="energy-dash"
              />
              {STAGES.map((s, i) => {
                const x = 40 + (920 / (STAGES.length - 1)) * i;
                const on = active === s.id;
                return (
                  <circle
                    key={s.id}
                    cx={x}
                    cy={45}
                    r={on ? 10 : 6}
                    fill={on ? "var(--sun)" : "var(--foreground)"}
                    style={{ transition: "r .3s var(--ease-out-soft), fill .3s" }}
                  />
                );
              })}
            </svg>

            <ol className="grid gap-px border-y border-border bg-border md:mt-2 md:grid-cols-5">
              {STAGES.map((s, i) => (
                <li
                  key={s.id}
                  onMouseEnter={() => setActive(s.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.id)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  className="group bg-ivory p-6 outline-none transition-colors focus-visible:bg-secondary md:p-7"
                >
                  <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-3 text-2xl">{s.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground opacity-70 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
                    {s.note}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-px w-full origin-left scale-x-0 bg-sun transition-transform duration-500 group-hover:scale-x-100 group-focus:scale-x-100"
                  />
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
