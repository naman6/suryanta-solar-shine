import { useEffect, useState } from "react";
import logo from "@/assets/suryanta-logo.png";
import { Container } from "./Sections";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Why us", href: "#why" },
  { label: "Estimator", href: "#calculator" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="flex h-24 items-center justify-between gap-6">
        <a href="#top" aria-label="Suryanta Energy, home" className="relative z-50">
          <img
            src={logo}
            alt="Suryanta Energy"
            width={280}
            height={88}
            className={`h-14 w-auto transition-[filter] duration-300 ${
              scrolled && !open ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        {/* Centered pill navigation */}
        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 rounded-full border px-7 py-3 backdrop-blur-md transition-colors duration-300 md:flex ${
            scrolled
              ? "border-border bg-ivory/90 text-foreground"
              : "border-ivory/20 bg-ink/40 text-ivory"
          }`}
        >
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="label-mono opacity-80 hover:opacity-100">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={PHONE_TEL}
            className={`label-mono transition-colors ${scrolled ? "text-foreground" : "text-ivory"}`}
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            className="rounded-full bg-sun px-6 py-3 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get a quote
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${
            scrolled && !open ? "border-border text-foreground" : "border-ivory/30 text-ivory"
          }`}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </Container>

      <div
        className={`fixed inset-0 z-40 bg-ink text-ivory transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Container className="flex h-full flex-col justify-center gap-1 pb-16">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-ivory/15 py-5 font-display text-3xl"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-10 flex flex-col gap-3">
            <a
              href={WHATSAPP_URL}
              onClick={() => setOpen(false)}
              className="rounded-full bg-sun px-6 py-4 text-center label-mono text-accent-foreground"
            >
              Get a free quote
            </a>
            <a href={PHONE_TEL} className="py-2 text-center label-mono text-ivory/80">
              {PHONE_DISPLAY}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
