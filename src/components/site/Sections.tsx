import type { ReactNode } from "react";
import { useInView } from "@/lib/motion";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-6 sm:px-10 ${className}`}>{children}</div>
  );
}

/** One purposeful reveal primitive used across the page. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
  wide = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
  /**
   * Releases the 3xl width cap so a long title can hold one line at the full
   * display size. For sections whose body has to share one screen with the
   * heading, such as the estimator: at 5rem inside a 48rem cap that title takes
   * two lines and costs about 110px, which pushes the panel below the fold.
   * Unconstrained the title needs roughly 13em of width, allowing for the
   * -0.035em tracking on h2, which clears every viewport at or above about
   * 640px. Narrower than that it wraps, and such layouts are stacked anyway.
   * The subtitle keeps its own max-w-xl, so it is unaffected.
   */
  wide?: boolean;
}) {
  return (
    <div
      className={`${wide ? "max-w-none" : "max-w-3xl"} ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <Eyebrow className={invert ? "text-accent-light" : "text-muted-foreground"}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`mt-5 text-balance-tight text-[clamp(2.4rem,6vw,5rem)] ${invert ? "text-primary-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-6 max-w-xl text-base leading-relaxed ${invert ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
