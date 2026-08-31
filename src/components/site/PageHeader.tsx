import { ReactNode } from "react";
import { Container, Eyebrow } from "./Sections";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <section className={`border-b border-border bg-primary-deep pb-16 pt-36 text-primary-foreground md:pb-24 md:pt-44 ${className}`}>
      <Container>
        {eyebrow && <Eyebrow className="text-accent-light">{eyebrow}</Eyebrow>}
        <h1 className="mt-4 text-balance-tight text-[clamp(2.4rem,6vw,5rem)] leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
