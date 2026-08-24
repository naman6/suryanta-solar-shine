import { Container, Eyebrow } from "./Sections";

const STEPS = [
  {
    n: "01",
    t: "Site survey",
    d: "We measure shadow free roof area, inspect your sanctioned load and read your last twelve months of bills.",
  },
  {
    n: "02",
    t: "System design",
    d: "Panel layout, generation estimate, applicable subsidy and payback period, all in writing before you pay.",
  },
  {
    n: "03",
    t: "Approvals & subsidy",
    d: "We file the DISCOM application, the net metering request and the PM Surya Ghar subsidy claim.",
  },
  {
    n: "04",
    t: "Installation",
    d: "Structure, modules, inverter and safety wiring completed in a few days by our own Jaipur crew.",
  },
  {
    n: "05",
    t: "Generate & service",
    d: "Meter change, generation handover, then scheduled cleaning and performance checks.",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-border bg-secondary py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-muted-foreground">How it works</Eyebrow>
            <h2 className="mt-5 text-balance-tight text-[clamp(2.4rem,5.5vw,4.5rem)]">
              Five steps.
              <span className="block text-muted-foreground">We run four of them.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              From the first survey to a generating system and ongoing service, your only real job is
              to approve the design. We handle the paperwork, the subsidy and the install.
            </p>
          </div>

          <ol className="border-t border-border">
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-8">
                <span className="font-display text-2xl leading-none text-accent">{s.n}</span>
                <div>
                  <h3 className="text-[clamp(1.4rem,3vw,2.1rem)] leading-tight">{s.t}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
