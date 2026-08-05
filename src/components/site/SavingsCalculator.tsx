import { useMemo, useState } from "react";
import { WHATSAPP_URL } from "@/lib/business";


const RATE_PER_UNIT = 8.5; // ₹/unit, typical Jaipur residential slab
const UNITS_PER_KW_PER_MONTH = 120; // Rajasthan average generation

export function SavingsCalculator() {
  const [bill, setBill] = useState(6000);

  const { size, monthly, yearly, twentyFive } = useMemo(() => {
    const units = bill / RATE_PER_UNIT;
    const kw = Math.max(1, Math.round((units / UNITS_PER_KW_PER_MONTH) * 2) / 2);
    const generated = kw * UNITS_PER_KW_PER_MONTH;
    const saved = Math.min(bill * 0.9, generated * RATE_PER_UNIT);
    return {
      size: kw,
      monthly: Math.round(saved),
      yearly: Math.round(saved * 12),
      twentyFive: Math.round((saved * 12 * 25) / 100000),
    };
  }, [bill]);

  const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="surface-card overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="p-7 sm:p-9">
          <p className="eyebrow text-primary">Savings Estimator</p>
          <h3 className="mt-3 text-2xl sm:text-3xl">What does your roof earn?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Slide your average monthly electricity bill to see an indicative system size and
            savings. Final numbers come from a free on site survey.
          </p>

          <label htmlFor="bill" className="mt-8 block text-sm font-medium text-foreground">
            Monthly electricity bill
          </label>
          <div className="mt-2 font-display text-4xl text-primary">{inr(bill)}</div>
          <input
            id="bill"
            type="range"
            min={1500}
            max={50000}
            step={500}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-soft accent-[var(--primary)]"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>₹1,500</span>
            <span>₹50,000</span>
          </div>
        </div>

        <div className="bg-dawn p-7 text-primary-foreground sm:p-9">
          <dl className="space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-widest text-primary-foreground/70">
                Recommended system
              </dt>
              <dd className="font-display text-3xl">{size} kW</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-primary-foreground/70">
                Monthly savings
              </dt>
              <dd className="font-display text-3xl">{inr(monthly)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-primary-foreground/70">
                Yearly savings
              </dt>
              <dd className="font-display text-3xl">{inr(yearly)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-primary-foreground/70">
                Over 25 years
              </dt>
              <dd className="font-display text-3xl">≈ ₹{twentyFive} lakh</dd>
            </div>
          </dl>
          <a
            href={WHATSAPP_URL}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get my exact quote
          </a>
          <p className="mt-3 text-[11px] leading-relaxed text-primary-foreground/60">
            Indicative only. Assumes ₹{RATE_PER_UNIT}/unit and {UNITS_PER_KW_PER_MONTH} units per kW
            per month in Rajasthan.
          </p>
        </div>
      </div>
    </div>
  );
}
