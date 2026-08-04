import { useState } from "react";
import logo from "@/assets/suryanta-logo.png.asset.json";
import { Container } from "./Sections";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

const NAV = [
  { label: "Homes", href: "#homes" },
  { label: "Societies", href: "#societies" },
  { label: "Commercial", href: "#commercial" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-24 items-center justify-between gap-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="Suryanta Energy" className="h-22 w-auto" width={280} height={88} />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={PHONE_TEL}
            className="text-sm font-semibold text-primary transition-opacity hover:opacity-70"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            Free Site Visit
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-0.5 w-4 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-4 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Book a Free Site Visit
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
