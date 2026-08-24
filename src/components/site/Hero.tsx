import { Container } from "./Sections";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, REVIEWS_URL } from "@/lib/business";
import heroHouse from "@/assets/hero-house.jpg";
import waaree from "@/assets/brands/waaree.png";
import adani from "@/assets/brands/adani.png";
import tataPower from "@/assets/brands/tata-power.png";
import panasonic from "@/assets/brands/panasonic.png";
import ksolare from "@/assets/brands/ksolare.png";

/**
 * Component brands Suryanta builds with. Heights are set per logo rather than
 * shared: Tata Power is a stacked mark and Panasonic a thin wordmark, so a
 * single height would make their lettering look wildly different in size.
 */
const BRANDS = [
  { src: waaree, name: "Waaree", h: "h-6 sm:h-7" },
  { src: adani, name: "Adani", h: "h-6 sm:h-7" },
  { src: tataPower, name: "Tata Power", h: "h-11 sm:h-12" },
  { src: panasonic, name: "Panasonic", h: "h-5 sm:h-6" },
  { src: ksolare, name: "K Solare", h: "h-9 sm:h-10" },
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
      <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />

      <Container className="relative flex min-h-[100svh] flex-col pb-8 pt-24 sm:pt-28">
        <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <h1 className="max-w-5xl text-[clamp(2.1rem,4.9vw,3.9rem)] leading-[1.08] text-ivory">
            The sun already visits your roof.
            <span className="block text-ivory-soft">Put it to work.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/75 sm:mt-6">
            Rooftop solar for homes, housing societies and businesses across Jaipur. Free site
            survey, government subsidy and net metering, all handled end to end by our own crew.
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="cta-pulse group inline-flex items-center justify-center gap-3 rounded-full bg-sun px-8 py-4 label-mono text-accent-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
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

          <a
            href={REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 eyebrow text-ivory/55 underline-offset-8 hover:text-ivory hover:underline"
          >
            ★ Rated {GOOGLE_RATING} by {GOOGLE_REVIEW_COUNT} customers on Google
          </a>
        </div>

        {/* Trusted-by band */}
        <div className="mt-auto border-t border-ivory/15 pb-6 pt-6 sm:pb-10">
          <p className="text-center eyebrow text-ivory/50">
            Engineered with India&apos;s most trusted solar components
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {BRANDS.map((b) => (
              <li key={b.name} className="flex items-center">
                <img
                  src={b.src}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  className={`${b.h} w-auto opacity-80 transition-opacity duration-300 hover:opacity-100`}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
