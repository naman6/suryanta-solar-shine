import { Container } from "./Sections";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, REVIEWS_URL, WHATSAPP_URL } from "@/lib/business";
import heroHouse from "@/assets/hero-house.jpg";

const TRUST = [
  `${GOOGLE_RATING} on Google`,
  `${GOOGLE_REVIEW_COUNT} verified reviews`,
  "PM Surya Ghar subsidy filed for you",
  "Jaipur & all of Rajasthan",
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <img
        src={heroHouse}
        alt="Modern home with a full rooftop solar array at dusk"
        width={1920}
        height={1200}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent"
      />

      <Container className="relative flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-40 text-center">
        <h1 className="max-w-5xl text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] text-ivory">
          Power your property.
          <span className="block">Not your electricity bill.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory/70">
          Rooftop solar for homes, housing societies and businesses in Jaipur. Free site survey,
          subsidy paperwork and net metering handled by our own crew.
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={WHATSAPP_URL}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-sun px-8 py-4 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get a free quote
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-8 py-4 label-mono text-ivory transition-colors hover:border-ivory hover:bg-ivory/10"
          >
            Explore solutions
          </a>
        </div>

        <div className="mt-20 w-full">
          <a
            href={REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="eyebrow text-ivory/50 underline-offset-8 hover:text-ivory hover:underline"
          >
            Rated {GOOGLE_RATING} by {GOOGLE_REVIEW_COUNT} customers on Google
          </a>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-ivory/75">
            {TRUST.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
