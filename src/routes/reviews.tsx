import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Container, Reveal } from "@/components/site/Sections";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS, REVIEWS_URL } from "@/lib/business";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Ratings | Suryanta Energy Jaipur" },
      {
        name: "description",
        content:
          "Read verified 5.0-star Google reviews from Suryanta Energy solar customers in Jaipur and Rajasthan.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Customer Reviews"
        title={
          <>
            Rated {GOOGLE_RATING} Stars
            <span className="block text-accent-light">on Google Business.</span>
          </>
        }
        subtitle="Every review comes from a real customer across Jaipur and Rajasthan. Read what property owners say about our service."
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          {/* Summary badge */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 text-4xl text-sun font-bold">
              ★ {GOOGLE_RATING}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on {GOOGLE_REVIEW_COUNT} verified customer reviews on Google
            </p>
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-foreground"
            >
              View on Google Maps ↗
            </a>
          </div>

          {/* Reviews grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {GOOGLE_REVIEWS.map((rev, idx) => (
              <Reveal key={rev.name} delay={idx * 100}>
                <div className="flex h-full flex-col justify-between border border-border bg-background p-8 shadow-sm">
                  <div>
                    <div className="text-sun text-lg">★★★★★</div>
                    <p className="mt-4 text-base leading-relaxed text-foreground">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                  <div className="mt-8 border-t border-border pt-4">
                    <p className="font-semibold text-sm">{rev.name}</p>
                    <p className="text-xs text-muted-foreground">Google Review · {rev.when}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary-deep py-20 text-center text-primary-foreground">
        <Container>
          <h2 className="text-balance-tight text-3xl sm:text-5xl">
            Want 5-star solar service for your property?
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Talk to our team today for a free site evaluation.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-block bg-sun px-8 py-4 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Contact Suryanta Energy →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
