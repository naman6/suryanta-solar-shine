import { Container, Eyebrow } from "./Sections";
import { useCountUp, useInView } from "@/lib/motion";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/lib/business";

function Metric({
  value,
  suffix = "",
  decimals = 0,
  label,
  active,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="border-t border-primary-foreground/15 pt-6">
      <p className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none text-accent">
        {n.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-primary-foreground/65">{label}</p>
    </div>
  );
}

export function Metrics() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="border-t border-border bg-primary-deep py-24 text-primary-foreground md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow className="text-accent">On record</Eyebrow>
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

        <div ref={ref} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            active={inView}
            value={Number(GOOGLE_RATING)}
            decimals={1}
            label="Google rating across our verified customer reviews"
          />
          <Metric
            active={inView}
            value={GOOGLE_REVIEW_COUNT}
            label="Verified reviews on the Suryanta Energy Google profile"
          />
          <Metric
            active={inView}
            value={25}
            suffix=" yr"
            label="Panel performance warranty on the modules we install"
          />
          <Metric
            active={inView}
            value={120}
            label="Units generated per kW per month, the Rajasthan planning average"
          />
        </div>
      </Container>
    </section>
  );
}
