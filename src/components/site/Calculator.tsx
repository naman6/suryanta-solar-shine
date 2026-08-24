import { useMemo, useState } from "react";
import { Container, Reveal, SectionHeading } from "./Sections";
import { CITIES, PROPERTY_TYPES, estimate, inr, type PropertyType } from "@/lib/solar";

export function Calculator() {
  const [bill, setBill] = useState(6000);
  const [type, setType] = useState<PropertyType>("home");
  const [city, setCity] = useState(CITIES[0]!);

  const est = useMemo(() => estimate(bill), [bill]);

  return (
    <section id="calculator" className="scroll-mt-24 border-t border-border bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Estimator"
            title={
              <>
                How much is
                <span className="block text-muted-foreground">your roof worth?</span>
              </>
            }
          />
        </Reveal>

        <Reveal delay={80} className="mt-16 grid gap-px border border-border bg-border lg:grid-cols-2">
          {/* Inputs */}
          <div className="bg-ivory p-8 sm:p-12">
            <label htmlFor="bill" className="eyebrow text-muted-foreground">
              Monthly electricity bill
            </label>
            <div className="mt-4 font-display text-[clamp(3rem,7vw,5rem)] leading-none">
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
              className="mt-6 h-1 w-full cursor-pointer appearance-none rounded-full bg-stone accent-[var(--sun)]"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>₹1,500</span>
              <span>₹1,00,000</span>
            </div>

            <fieldset className="mt-10">
              <legend className="eyebrow text-muted-foreground">Property type</legend>
              <div className="mt-4 grid gap-px bg-border sm:grid-cols-3">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setType(p.id)}
                    aria-pressed={type === p.id}
                    className={`bg-ivory p-4 text-left transition-colors ${type === p.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <span className="block text-sm font-semibold">{p.label}</span>
                    <span
                      className={`mt-1 block text-xs leading-snug ${type === p.id ? "text-primary-foreground/65" : "text-muted-foreground"}`}
                    >
                      {p.note}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <label htmlFor="city" className="eyebrow text-muted-foreground">
                Location
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-4 w-full border-b border-border bg-transparent py-3 text-lg outline-none focus:border-foreground"
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
          <div className="bg-primary p-8 text-primary-foreground sm:p-12">
            <p className="eyebrow text-accent-light">Indicative plan</p>
            <dl className="mt-8 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
              {[
                ["Recommended system size", `${est.sizeKw} kW`],
                ["Shadow free roof area", `≈ ${est.roofAreaSqft} sq ft`],
                ["Estimated annual generation", `${est.annualGeneration.toLocaleString("en-IN")} units`],
                ["Estimated monthly saving", inr(est.monthlySavings)],
                ["Estimated annual saving", inr(est.annualSavings)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-sm text-primary-foreground/60">{k}</dt>
                  <dd className="font-display text-2xl sm:text-3xl">{v}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#quote"
              className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-sun px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Get my solar plan →
            </a>
            <p className="mt-5 text-xs leading-relaxed text-primary-foreground/50">
              Estimates for a {PROPERTY_TYPES.find((p) => p.id === type)?.label.toLowerCase()} in{" "}
              {city}, based on 120 units per kW per month and ₹8.5 per unit. Not a quotation. Final
              sizing, subsidy and payback come from a free on site survey.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
