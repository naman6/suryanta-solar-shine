import { useState, type FormEvent } from "react";
import { Container } from "./Sections";
import { CITIES } from "@/lib/solar";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/business";

const WA_NUMBER = PHONE_TEL.replace("tel:+", "");

const ASSURANCES = [
  "Free site survey and system design",
  "PM Surya Ghar subsidy filed for you",
  "Net metering and DISCOM paperwork handled",
  "No obligation, just a real number and no sales pitch",
];

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bill, setBill] = useState("");
  const [city, setCity] = useState(CITIES[0]!);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = `Hi Suryanta Energy, I'd like a free rooftop solar quote.\n\nName: ${name}\nPhone: ${phone}\nMonthly bill: ${bill ? "₹" + bill : "Not specified"}\nCity: ${city}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "mt-2 w-full border border-border bg-ivory px-4 py-3 text-base outline-none transition-colors focus:border-foreground";

  return (
    <section
      id="quote"
      className="scroll-mt-24 py-24 text-primary-foreground md:py-32"
      style={{ background: "linear-gradient(135deg, var(--sun-deep), var(--primary-deep))" }}
    >
      <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-accent-light">Free quote</p>
          <h2 className="mt-5 text-balance-tight text-[clamp(2.4rem,5.5vw,4.5rem)]">
            Get your solar plan
            <span className="block text-primary-foreground/60">in one message.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Send us your details and last electricity bill. We come back with a sized system,
            subsidy estimate and payback period, usually the same day.
          </p>

          <ul className="mt-8 space-y-3">
            {ASSURANCES.map((a) => (
              <li key={a} className="flex items-start gap-3 text-sm text-primary-foreground/85">
                <span aria-hidden="true" className="mt-0.5 text-accent-light">
                  ✓
                </span>
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="text-primary-foreground/50">Prefer to talk?</span>
            <a href={PHONE_TEL} className="font-semibold underline-offset-4 hover:underline">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-ivory p-7 text-foreground sm:p-9">
          {sent ? (
            <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
              <p className="font-display text-3xl">Thank you, {name || "there"}.</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                WhatsApp should have opened with your details. If it didn&apos;t, just call us on{" "}
                {PHONE_DISPLAY} and we&apos;ll take it from there.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-foreground"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div>
                <label htmlFor="lf-name" className="eyebrow text-muted-foreground">
                  Your name
                </label>
                <input
                  id="lf-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={field}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="lf-phone" className="eyebrow text-muted-foreground">
                  Phone / WhatsApp number
                </label>
                <input
                  id="lf-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  pattern="[0-9+ -]{10,15}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile number (10 digits)"
                  className={field}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="lf-bill" className="eyebrow text-muted-foreground">
                  Average monthly electricity bill (₹)
                </label>
                <input
                  id="lf-bill"
                  type="number"
                  min={0}
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="e.g. 6000"
                  className={field}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="lf-city" className="eyebrow text-muted-foreground">
                  City
                </label>
                <select
                  id="lf-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={field}
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-sun px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Send on WhatsApp →
              </button>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                Opens WhatsApp with your details ready to send. We never share your number.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
