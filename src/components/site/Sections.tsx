import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className={`eyebrow ${invert ? "text-accent" : "text-primary"}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-3 text-3xl leading-[1.1] sm:text-4xl md:text-5xl ${invert ? "text-primary-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed ${invert ? "text-primary-foreground/75" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function SunRays({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 17 });
  return (
    <svg viewBox="0 0 200 110" className={className} aria-hidden="true">
      <g fill="currentColor">
        {rays.map((_, i) => {
          const a = (Math.PI * i) / 16;
          const len = i % 2 === 0 ? 48 : 34;
          const r = (n: number) => Math.round(n * 100) / 100;
          const x1 = r(100 - Math.cos(a) * 46);
          const y1 = r(100 - Math.sin(a) * 46);
          const x2 = r(100 - Math.cos(a) * (46 + len));
          const y2 = r(100 - Math.sin(a) * (46 + len));
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} L ${r(x2 - 1.6)} ${y2} L ${r(x2 + 1.6)} ${y2} Z`}
              opacity={i % 2 === 0 ? 1 : 0.75}
            />

          );
        })}
        <path d="M 62 100 A 38 38 0 0 1 138 100 Z" fillOpacity="0.18" />
        <path
          d="M 62 100 A 38 38 0 0 1 138 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <rect x="10" y="101" width="180" height="3.2" rx="1.6" />
      </g>
    </svg>
  );
}
