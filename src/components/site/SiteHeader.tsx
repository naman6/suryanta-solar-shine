import { useEffect, useState } from "react";
import logo from "@/assets/suryanta-logo.png";
import { Container } from "./Sections";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Roof", href: "#roof" },
  { label: "Process", href: "#process" },
  { label: "Estimator", href: "#calculator" },
  { label: "Reviews", href: "#reviews" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-ivory/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? "h-16" : "h-24"}`}
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Suryanta Energy, home">
          <img
            src={logo}
            alt="Suryanta Energy"
            width={280}
            height={88}
            className={`w-auto transition-all duration-500 ${scrolled ? "h-12" : "h-20"}`}
          />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={PHONE_TEL} className="text-xs font-semibold tracking-wide hover:text-sun-deep">
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-sun hover:text-accent-foreground"
          >
            Get a quote
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </Container>

      {/* Full screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ivory transition-[opacity,visibility] duration-400 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Container className="flex h-full flex-col justify-center gap-2 pb-16">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={`border-b border-border py-5 font-display text-4xl transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-10 flex flex-col gap-3">
            <a
              href={WHATSAPP_URL}
              onClick={() => setOpen(false)}
              className="bg-primary px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground"
            >
              Get a quote
            </a>
            <a href={PHONE_TEL} className="py-2 text-center text-sm font-semibold">
              {PHONE_DISPLAY}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
