import { Container, Eyebrow } from "./Sections";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/lib/business";

const STATS = [
  { value: `${GOOGLE_RATING}★`, label: "Google rating across our verified customer reviews" },
  { value: `${GOOGLE_REVIEW_COUNT}`, label: "Verified reviews on the Suryanta Energy Google profile" },
  { value: "25 yr", label: "Performance warranty on the solar modules we install" },
  { value: "120", label: "Units generated per kW per month, the Rajasthan average" },
];

export function Metrics() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-border bg-primary-deep py-24 text-primary-foreground md:py-32"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow className="text-accent-light">On record</Eyebrow>
            <h2 className="mt-5 text-balance-tight text-[clamp(2.4rem,6vw,5rem)]">
              Energy we&apos;ve
              <span className="block text-primary-foreground/55">put to work.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-primary-foreground/60">
            We only publish numbers we can stand behind. Rating and review count come straight from
            our Google Business Profile; the rest are the terms we commit to on every installation.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-primary-foreground/15 pt-6">
              <p className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none text-accent-light">
                {s.value}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-primary-foreground/65">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
