import { useEffect, useState } from "react";
import logo from "@/assets/suryanta-logo-tight.png";
import { Container } from "./Sections";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/business";

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Savings", href: "#calculator" },
  { label: "Why us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

/**
 * The three line menu button. Rendered twice, once in the full bar over the hero
 * and once in the floating cluster below it, so it needs to carry its own colour
 * scheme: the cluster floats over light sections where ivory on transparent
 * would be invisible.
 */
function MenuButton({
  open,
  onToggle,
  className = "",
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${className}`}
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
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // Hand over to the floating cluster as the hero leaves, so every section
      // below gets the full viewport height instead of losing 96px to the bar.
      const heroHeight = document.getElementById("top")?.offsetHeight ?? window.innerHeight;
      setPastHero(y > heroHeight - 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  return (
    <>
      {/* Full bar, shown over the hero only */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-ivory/10 bg-primary-deep/95 backdrop-blur-md transition-[transform,opacity,visibility,box-shadow] duration-500 ${
          scrolled ? "shadow-xl shadow-black/30" : ""
        } ${pastHero ? "invisible -translate-y-full opacity-0" : "visible translate-y-0 opacity-100"}`}
      >
        <Container className="flex h-24 items-center justify-between gap-6">
          <a href="#top" aria-label="Suryanta Energy, home" className="relative z-50">
            <img
              src={logo}
              alt="Suryanta Energy"
              width={598}
              height={300}
              className="h-[42px] w-auto brightness-0 invert"
            />
          </a>

          {/*
            Centred pill navigation. It is absolutely positioned, so it does not
            reserve space in the flex row and can collide with the phone plus CTA
            group on its right. The pill is ~431px wide and the right group ~325px,
            so the two only clear each other above roughly 1200px. Hence xl, not md:
            below that width the menu button takes over.
          */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 rounded-full border border-ivory/15 bg-ivory/5 px-7 py-3 text-ivory xl:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="label-mono opacity-80 hover:opacity-100">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={PHONE_TEL}
              className="hidden label-mono text-ivory/90 transition-colors hover:text-ivory xl:block"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href="#quote"
              className="hidden rounded-full bg-sun px-6 py-3 label-mono text-accent-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Book a site visit
            </a>
            <MenuButton
              open={open}
              onToggle={toggle}
              className="border border-ivory/30 text-ivory xl:hidden"
            />
          </div>
        </Container>
      </header>

      {/*
        Floating cluster, shown below the hero. It replaces the bar so sections
        keep their full height, and it keeps the one action that matters on screen
        at all times rather than trading the CTA away for the extra space.
      */}
      <div
        className={`fixed right-4 top-4 z-50 flex items-center gap-3 transition-[transform,opacity,visibility] duration-500 sm:right-6 sm:top-6 ${
          pastHero ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <a
          href="#quote"
          className={`rounded-full bg-sun px-6 py-3 label-mono text-accent-foreground shadow-lg shadow-black/25 transition-[transform,opacity] hover:-translate-y-0.5 ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          Book a site visit
        </a>
        <MenuButton
          open={open}
          onToggle={toggle}
          className="border border-ivory/20 bg-primary-deep/90 text-ivory shadow-lg shadow-black/25 backdrop-blur-md"
        />
      </div>

      {/* Full screen menu, the only navigation below xl and below the hero */}
      <div
        className={`fixed inset-0 z-40 bg-ink text-ivory transition-[opacity,visibility] duration-300 ${
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
              href="#quote"
              onClick={() => setOpen(false)}
              className="rounded-full bg-sun px-6 py-4 text-center label-mono text-accent-foreground"
            >
              Book a free site visit
            </a>
            <a href={PHONE_TEL} className="py-2 text-center label-mono text-ivory/80">
              {PHONE_DISPLAY}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
