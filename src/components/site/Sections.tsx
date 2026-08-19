import type { ReactNode } from "react";
import { useInView } from "@/lib/motion";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[88rem] px-6 sm:px-10 ${className}`}>{children}</div>;
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
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <Eyebrow className={invert ? "text-accent" : "text-muted-foreground"}>{eyebrow}</Eyebrow>
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
