import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { LeadForm } from "@/components/site/LeadForm";
import { Container } from "@/components/site/Sections";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Suryanta Energy Solar Jaipur" },
      {
        name: "description",
        content:
          "Contact Suryanta Energy in Sodala, Jaipur. Call +91 90240 71672 or book a free rooftop solar site visit on WhatsApp.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s talk about
            <span className="block text-accent-light">your solar project.</span>
          </>
        }
        subtitle="Book a free site survey, send us your electricity bill on WhatsApp, or visit our office in Sodala, Jaipur."
      />

      <LeadForm />

      {/* Map & Office section */}
      <section className="border-t border-border bg-ivory py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow text-muted-foreground">Visit our office</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Suryanta Energy Headquarters
            </h2>
            <address className="mt-6 not-italic text-base leading-relaxed text-muted-foreground">
              {ADDRESS}
            </address>

            <div className="mt-8 space-y-4">
              <div>
                <p className="eyebrow text-muted-foreground">Phone</p>
                <a href={PHONE_TEL} className="mt-1 block text-lg font-semibold text-foreground hover:text-accent">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">WhatsApp</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-lg font-semibold text-foreground hover:text-accent"
                >
                  Send a WhatsApp message →
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">Google Profile</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm font-semibold text-foreground underline hover:text-accent"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-stone">
            <iframe
              title="Suryanta Energy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4616235478496!2d75.7686!3d26.8887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd3f8582f3496057c!2sSuryanta%20Energy!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
