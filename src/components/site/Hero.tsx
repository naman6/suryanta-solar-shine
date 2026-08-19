import { useEffect, useRef, useState } from "react";
import { Container } from "./Sections";
import { useIsTouch, useReducedMotion } from "@/lib/motion";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, REVIEWS_URL, WHATSAPP_URL } from "@/lib/business";
import heroRooftop from "@/assets/hero-rooftop.jpg";

const COLS = 6;
const ROWS = 3;

/**
 * Layered 2.5D rooftop scene. Pointer position drives a small camera shift,
 * panel perspective and the position of the sunlight highlight. On touch it
 * breathes on a slow sine instead. No WebGL: transforms only, GPU friendly.
 */
export function Hero() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const el = sceneRef.current;
    if (!el) return;

    if (touch) {
      let raf = 0;
      const start = performance.now();
      const loop = (now: number) => {
        const t = (now - start) / 5200;
        setP({ x: Math.sin(t) * 0.5, y: Math.sin(t * 0.7) * 0.3 });
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        setP({
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [touch, reduced]);

  const cursorCol = (p.x + 1) / 2;
  const cursorRow = (p.y + 1) / 2;

  return (
    <section id="top" className="relative overflow-hidden bg-ivory pt-28 md:pt-32">
      <Container className="relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow text-muted-foreground">Solar energy, engineered for real life</p>
            <h1 className="mt-6 text-balance-tight text-[clamp(2.9rem,8.2vw,7.2rem)]">
              Power your property.
              <span className="mt-1 block text-muted-foreground">Not your electricity bill.</span>
            </h1>
          </div>
          <div className="lg:pb-4">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Suryanta Energy designs, installs and services rooftop solar for homes, housing
              societies and commercial properties across Jaipur and Rajasthan. Survey, subsidy,
              DISCOM approvals and net metering are handled by our own crew.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_URL}
                className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-sun hover:text-accent-foreground"
              >
                Get a solar consultation
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#flow"
                className="inline-flex items-center gap-3 border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-foreground"
              >
                Explore solar
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Scene */}
      <div
        ref={sceneRef}
        data-cursor="Explore"
        className="relative mt-14 h-[52vh] min-h-[320px] w-full overflow-hidden md:mt-20 md:h-[68vh]"
      >
        <img
          src={heroRooftop}
          alt="Rooftop solar installation by Suryanta Energy in Jaipur"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            transform: `scale(1.08) translate3d(${p.x * -14}px, ${p.y * -10}px, 0)`,
            transition: "transform .6s var(--ease-out-soft)",
          }}
        />
        {/* Sunlight highlight follows the pointer */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(38% 46% at ${(cursorCol * 100).toFixed(1)}% ${(cursorRow * 100).toFixed(1)}%, color-mix(in oklab, var(--sun) 42%, transparent), transparent 70%)`,
            transition: "background .5s linear",
            mixBlendMode: "soft-light",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/25" />

        {/* Panel grid overlay, individually lit */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[8%] bottom-[10%] top-[26%] [perspective:1100px]"
        >
          <div
            className="grid h-full gap-2 will-change-transform"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              transform: `rotateX(${52 + p.y * 4}deg) rotateZ(${p.x * 4}deg)`,
              transformOrigin: "center bottom",
              transition: "transform .6s var(--ease-out-soft)",
            }}
          >
            {Array.from({ length: COLS * ROWS }).map((_, i) => {
              const c = (i % COLS) + 0.5;
              const r = Math.floor(i / COLS) + 0.5;
              const d = Math.hypot(c / COLS - cursorCol, r / ROWS - cursorRow);
              const lit = Math.max(0, 1 - d * 2.6);
              return (
                <div
                  key={i}
                  className="border border-ivory/25"
                  style={{
                    background: `color-mix(in oklab, var(--sun) ${(lit * 55).toFixed(1)}%, oklch(0.185 0.008 80 / 0.35))`,
                    transition: "background .35s linear",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <Container className="flex flex-wrap items-end justify-between gap-6 pb-6">
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-ivory/85 underline-offset-4 hover:underline"
            >
              {GOOGLE_RATING} on Google · {GOOGLE_REVIEW_COUNT} reviews
            </a>
            <span className="eyebrow text-ivory/60">Jaipur · Rajasthan</span>
          </Container>
        </div>
      </div>
    </section>
  );
}
