import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Calculator } from "@/components/site/Calculator";
import { LeadForm } from "@/components/site/LeadForm";
import { Metrics } from "@/components/site/Metrics";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suryanta Energy | Rooftop Solar Installers in Jaipur, Rajasthan" },
      {
        name: "description",
        content:
          "Rooftop solar for homes, housing societies and businesses in Jaipur. Subsidy paperwork, net metering and 25 year performance panels, rated 5.0 on Google.",
      },
      { property: "og:title", content: "Suryanta Energy | Rooftop Solar in Jaipur" },
      {
        property: "og:description",
        content:
          "Solar energy, engineered for real life. Design, installation and service of rooftop solar across Jaipur and Rajasthan.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <Calculator />
      <Metrics />
      <LeadForm />
      <Testimonials />
    </div>
  );
}
