import { Container, SunRays } from "./Sections";
import logo from "@/assets/suryanta-logo.png.asset.json";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <SunRays className="h-9 w-16 text-accent" />
              <span className="font-display text-2xl">Suryanta Energy</span>
            </div>
            <p className="mt-2 font-display text-lg text-accent">
              The best solar panel company in Jaipur
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Rooftop solar design, installation and service for homes, housing societies and
              businesses across Jaipur and Rajasthan.
            </p>
            <img
              src={logo.url}
              alt="Suryanta Energy logo"
              loading="lazy"
              width={320}
              height={320}
              className="mt-6 h-32 w-auto"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              <li>
                <a href="#homes" className="hover:text-primary-foreground">
                  Home solar
                </a>
              </li>
              <li>
                <a href="#societies" className="hover:text-primary-foreground">
                  Housing societies
                </a>
              </li>
              <li>
                <a href="#commercial" className="hover:text-primary-foreground">
                  Commercial &amp; industrial
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-primary-foreground">
                  Savings estimator
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary-foreground">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Reach us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li>
                <a href={PHONE_TEL} className="hover:text-primary-foreground">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} className="hover:text-primary-foreground">
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="leading-relaxed hover:text-primary-foreground"
                >
                  {ADDRESS}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Suryanta Energy, Jaipur. All rights reserved.</p>
          <p>Solar energy company · Serving all of Rajasthan</p>
        </div>
      </Container>
    </footer>
  );
}
