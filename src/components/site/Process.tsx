import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "./Sections";

const STEPS = [
  {
    n: "01",
    t: "Site survey",
    d: "We measure shadow free roof area, inspect your sanctioned load and read your last twelve months of bills.",
  },
  {
    n: "02",
    t: "System design",
    d: "Panel layout, generation estimate, applicable subsidy and payback period, all in writing before you pay.",
  },
  {
    n: "03",
    t: "Approvals & subsidy",
    d: "We file the DISCOM application, the net metering request and the PM Surya Ghar subsidy claim.",
  },
  {
    n: "04",
    t: "Installation",
    d: "Structure, modules, inverter and safety wiring completed in a few days by our own Jaipur crew.",
  },
  {
    n: "05",
    t: "Generate & service",
    d: "Meter change, generation handover, then scheduled cleaning and performance checks.",
  },
];

/** Sticky visual on the left, scroll driven stages on the right. */
export function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.findIndex((r) => r === e.target);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const progress = (active + 1) / STEPS.length;

  return (
    <section id="process" className="scroll-mt-24 border-t border-border bg-secondary py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:h-[70vh]">
            <Eyebrow className="text-muted-foreground">How it works</Eyebrow>
            <h2 className="mt-5 text-balance-tight text-[clamp(2.4rem,5.5vw,4.5rem)]">
              Five steps.
              <span className="block text-muted-foreground">We run four of them.</span>
            </h2>

            {/* Stage visual: roof, layout, install, generation */}
            <div className="relative mt-10 aspect-[5/4] w-full overflow-hidden bg-primary-deep">
              <div className="absolute inset-6 grid grid-cols-6 grid-rows-4 gap-[3px]">
                {Array.from({ length: 24 }).map((_, i) => {
                  const stage = active;
                  const shown = stage >= 1 && i < Math.round((24 * (stage + 1)) / STEPS.length) + 4;
                  const generating = stage >= 4;
                  return (
                    <span
                      key={i}
                      className="border border-ivory/10 transition-all duration-700"
                      style={{
                        background: shown
                          ? generating
                            ? "color-mix(in oklab, var(--sun) 80%, transparent)"
                            : "color-mix(in oklab, var(--sun) 34%, transparent)"
                          : "oklch(0.26 0.008 80)",
                        transform: shown ? "none" : "scale(0.94)",
                        transitionDelay: `${i * 12}ms`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ivory/10">
                <div
                  className="h-full bg-sun transition-[width] duration-700"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="absolute left-6 top-6 eyebrow text-ivory/70">
                {STEPS[active]!.n} — {STEPS[active]!.t}
              </span>
            </div>
          </div>

          <ol className="space-y-2">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="border-t border-border py-10 transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0.45 }}
              >
                <span className="eyebrow text-muted-foreground">{s.n}</span>
                <h3 className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight">{s.t}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
