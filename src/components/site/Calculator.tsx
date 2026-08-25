import { useMemo, useState } from "react";
import { Container, Reveal, SectionHeading } from "./Sections";
import {
  CITIES,
  PROPERTY_TYPES,
  RATE_PER_UNIT,
  UNITS_PER_KW_PER_MONTH,
  estimate,
  inr,
  type PropertyType,
} from "@/lib/solar";

/**
 * The estimator has to be usable in a single screen: the point is that dragging
 * the bill visibly moves the numbers, which fails if the slider and the results
 * are not on screen together. The section is therefore height budgeted rather
 * than styled to taste.
 *
 * What that budget bought, versus the earlier version at ~1180px tall:
 *  - the section is min-h-[100svh] and centres its content, so it frames as one screen
 *  - the heading keeps the full display size every other section uses, but runs
 *    on one line via SectionHeading's wide prop, which drops the 48rem cap. Two
 *    lines at 5rem cost about 110px and put the panel below the fold on a 1366
 *    wide laptop, one line costs about 35px and does not.
 *  - the grid splits at md, not lg, so tablets also get input beside output
 *  - three headline numbers instead of five; roof area and annual generation
 *    moved into one supporting line, which alone saved about 110px
 *  - no scroll-mt: the header hands over to the floating cluster past the hero,
 *    so there is no fixed bar left to offset against
 *
 * Recheck the budget in outputs/calc_budget.py before growing anything here.
 * At 1366x768, the tightest common laptop, there is only about 31px of slack.
 */
export function Calculator() {
  const [bill, setBill] = useState(6000);
  const [type, setType] = useState<PropertyType>("home");
  const [city, setCity] = useState(CITIES[0]!);

  const est = useMemo(() => estimate(bill), [bill]);
  const typeLabel = PROPERTY_TYPES.find((p) => p.id === type)?.label.toLowerCase();

  return (
    <section
      id="calculator"
      className="flex min-h-[100svh] flex-col justify-center border-t border-border bg-ivory py-8"
    >
      <Container>
        <Reveal>
          <SectionHeading
            wide
            eyebrow="Estimator"
            title={
              <>
                How much is <span className="text-muted-foreground">your roof worth?</span>
              </>
            }
          />
        </Reveal>

        <Reveal
          delay={80}
          className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2"
        >
          {/* Inputs */}
          <div className="bg-ivory p-6 sm:p-8">
            <label htmlFor="bill" className="eyebrow text-muted-foreground">
              Monthly electricity bill
            </label>
            <div className="mt-3 font-display text-[clamp(2.5rem,3.4vw,3.25rem)] leading-none">
              {inr(bill)}
            </div>
            <input
              id="bill"
              type="range"
              min={1500}
              max={100000}
              step={500}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="mt-5 h-1 w-full cursor-pointer appearance-none rounded-full bg-stone accent-[var(--sun)]"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>₹1,500</span>
              <span>₹1,00,000</span>
            </div>

            <fieldset className="mt-7">
              <legend className="eyebrow text-muted-foreground">Property type</legend>
              <div className="mt-4 grid grid-cols-3 gap-px bg-border">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setType(p.id)}
                    aria-pressed={type === p.id}
                    className={`bg-ivory p-3 text-left transition-colors ${type === p.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <span className="block text-sm font-semibold">{p.label}</span>
                    {/* The note is detail, not a control. It only earns its height
                        once the column is wide enough to hold it in two lines. */}
                    <span
                      className={`mt-1 hidden text-xs leading-snug lg:block ${type === p.id ? "text-primary-foreground/65" : "text-muted-foreground"}`}
                    >
                      {p.note}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7">
              <label htmlFor="city" className="eyebrow text-muted-foreground">
                Location
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-3 w-full border-b border-border bg-transparent py-3 text-lg outline-none focus:border-foreground"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-primary p-6 text-primary-foreground sm:p-8">
            <p className="eyebrow text-accent-light">Indicative plan</p>
            <dl className="mt-6 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
              {[
                ["Recommended system size", `${est.sizeKw} kW`],
                ["Estimated monthly saving", inr(est.monthlySavings)],
                ["Estimated annual saving", inr(est.annualSavings)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-xs text-primary-foreground/60 lg:text-sm">{k}</dt>
                  <dd className="font-display text-2xl">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/60">
              Needs roughly {est.roofAreaSqft} sq ft of shadow free roof and generates about{" "}
              {est.annualGeneration.toLocaleString("en-IN")} units a year.
            </p>

            <a
              href="#quote"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 bg-sun px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Book my free site visit →
            </a>
            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/50">
              Indicative for a {typeLabel} in {city}, at {UNITS_PER_KW_PER_MONTH} units per kW per
              month and ₹{RATE_PER_UNIT} per unit. Final numbers come from the site visit.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
