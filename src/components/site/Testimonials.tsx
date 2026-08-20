import { useState } from "react";
import { Container, Eyebrow } from "./Sections";
import { GOOGLE_REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, REVIEWS_URL } from "@/lib/business";

export function Testimonials() {
  const [i, setI] = useState(0);
  const r = GOOGLE_REVIEWS[i]!;

  return (
    <section id="reviews" className="scroll-mt-24 border-t border-border bg-ivory py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Eyebrow className="text-muted-foreground">Google reviews</Eyebrow>
          <a
            href={REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.16em] underline-offset-8 hover:underline"
          >
            {GOOGLE_RATING} · {GOOGLE_REVIEW_COUNT} reviews on Google →
          </a>
        </div>

        <figure className="mt-14 max-w-5xl">
          <blockquote
            key={r.name}
            className="font-display text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.02em]"
          >
            <span className="text-muted-foreground">“</span>
            {r.text}
            <span className="text-muted-foreground">”</span>
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-sm">
            <span className="font-semibold">{r.name}</span>
            <span className="text-muted-foreground">Google review · {r.when}</span>
          </figcaption>
        </figure>

        <div className="mt-10 flex gap-3">
          {GOOGLE_REVIEWS.map((rev, idx) => (
            <button
              key={rev.name}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Read the review from ${rev.name}`}
              aria-current={idx === i}
              className="h-[3px] w-16 transition-colors"
              style={{ background: idx === i ? "var(--sun)" : "var(--border)" }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
