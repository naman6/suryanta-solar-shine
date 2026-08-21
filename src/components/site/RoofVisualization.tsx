import { useState } from "react";
import { Container, Reveal, SectionHeading } from "./Sections";
import { estimate, inr, SQFT_PER_KW } from "@/lib/solar";
import { useIsTouch } from "@/lib/motion";

const COLS = 7;
const ROWS = 4;
const CELLS = COLS * ROWS;
/** Each lit cell stands for one panel zone of roughly SQFT_PER_KW / 2 sq ft. */
const KW_PER_CELL = 0.5;

/**
 * Isometric roof. Hovering lights the usable zones, clicking commits panels to
 * the roof and reveals an illustrative system size, generation and saving.
 */
export function RoofVisualization() {
  const touch = useIsTouch();
  const [hover, setHover] = useState<number | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);

  const kw = placed.length * KW_PER_CELL;
  const est = kw > 0 ? estimate(kw * 120 * 8.5) : null;

  const fillAll = () => setPlaced(Array.from({ length: CELLS }, (_, i) => i));
  const clear = () => setPlaced([]);

  return (
    <section id="roof" className="scroll-mt-24 border-t border-border bg-ivory py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <Reveal>
            <div
              className="relative select-none overflow-x-clip [perspective:1200px]"
              data-cursor={touch ? undefined : "Place panels"}
            >
              <div
                className="mx-auto grid aspect-[7/4] w-full max-w-2xl gap-[3px] bg-primary-deep p-3"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                  transform: "rotateX(46deg) rotateZ(-24deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: "var(--shadow-lift)",
                }}
              >
                {Array.from({ length: CELLS }).map((_, i) => {
                  const on = placed.includes(i);
                  const near = hover !== null && Math.abs((hover % COLS) - (i % COLS)) <= 1 &&
                    Math.abs(Math.floor(hover / COLS) - Math.floor(i / COLS)) <= 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Toggle panel zone ${i + 1}`}
                      aria-pressed={on}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() =>
                        setPlaced((prev) =>
                          prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
                        )
                      }
                      className="border border-ivory/10 outline-none transition-[background,transform] duration-300 focus-visible:ring-2 focus-visible:ring-sun"
                      style={{
                        background: on
                          ? "linear-gradient(140deg, color-mix(in oklab, var(--sun) 85%, transparent), color-mix(in oklab, var(--sun-deep) 70%, transparent))"
                          : near
                            ? "color-mix(in oklab, var(--sun) 22%, transparent)"
                            : "oklch(0.28 0.008 80)",
                        transform: on ? "translateZ(10px)" : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={fillAll}
                className="border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-foreground"
              >
                Fill the roof
              </button>
              <button
                type="button"
                onClick={clear}
                className="border border-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Reset
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Interactive"
              title={
                <>
                  Your roof.
                  <span className="block text-muted-foreground">Your power plant.</span>
                </>
              }
              subtitle={`Tap the roof to place panel zones. Each zone stands for about ${KW_PER_CELL} kW, or roughly ${Math.round(SQFT_PER_KW * KW_PER_CELL)} sq ft of shadow free area.`}
            />

            <dl className="mt-10 divide-y divide-border border-y border-border">
              <div className="flex items-baseline justify-between py-4">
                <dt className="text-sm text-muted-foreground">System size</dt>
                <dd className="font-display text-3xl">{kw.toFixed(1)} kW</dd>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <dt className="text-sm text-muted-foreground">Annual generation</dt>
                <dd className="font-display text-3xl">
                  {est ? est.annualGeneration.toLocaleString("en-IN") : "0"} units
                </dd>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <dt className="text-sm text-muted-foreground">Value of that generation</dt>
                <dd className="font-display text-3xl text-sun-deep">
                  {est ? inr(est.annualSavings) : "₹0"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Illustrative only. Based on 120 units per kW per month in Rajasthan and ₹8.5 per unit.
              Your figures come from a free on site survey.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
