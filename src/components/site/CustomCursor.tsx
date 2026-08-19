import { useEffect, useRef, useState } from "react";
import { useIsTouch, useReducedMotion } from "@/lib/motion";

/**
 * Minimal cursor: a small soft dot that expands over interactive elements and
 * turns into a labelled indicator over the solar visualisations.
 * Disabled entirely on touch devices and under reduced motion.
 */
export function CustomCursor() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<"default" | "hover" | "explore">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (touch || reduced) return;
    document.documentElement.classList.add("no-native-cursor");

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const render = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, select, summary, [role='button']",
      );
      if (!el) {
        setMode("default");
        setLabel("");
        return;
      }
      const custom = el.dataset["cursor"];
      if (custom) {
        setMode("explore");
        setLabel(custom);
      } else {
        setMode("hover");
        setLabel("");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("no-native-cursor");
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  const size = mode === "explore" ? 74 : mode === "hover" ? 34 : 12;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden items-center justify-center rounded-full md:flex"
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        background: mode === "explore" ? "var(--sun)" : "transparent",
        border: mode === "explore" ? "none" : "1px solid var(--foreground)",
        boxShadow: mode === "default" ? "inset 0 0 0 6px var(--foreground)" : "none",
        transition:
          "width .28s var(--ease-out-soft), height .28s var(--ease-out-soft), background .28s, box-shadow .28s, opacity .2s",
        mixBlendMode: mode === "explore" ? "normal" : "difference",
      }}
    >
      {mode === "explore" ? (
        <span className="eyebrow text-[0.55rem] text-accent-foreground">{label}</span>
      ) : null}
    </div>
  );
}
