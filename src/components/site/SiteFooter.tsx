import { Link } from "@tanstack/react-router";
import { Container } from "./Sections";
import logo from "@/assets/suryanta-logo-tight.png";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img
                  src={logo}
                  alt="Suryanta Energy logo"
                  width={598}
                  height={300}
                  className="h-[42px] w-auto mix-blend-screen"
                />
              </Link>
            </div>
            <p className="mt-2 font-display text-lg text-accent-light">
              The best solar panel company in Jaipur
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Rooftop solar design, installation and service for homes, housing societies and
              businesses across Jaipur and Rajasthan.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              <li>
                <Link to="/solutions" className="hover:text-primary-foreground">
                  Home Solar
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-primary-foreground">
                  Housing Societies
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-primary-foreground">
                  Commercial &amp; Industrial
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-foreground">
                  Savings Estimator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              <li>
                <Link to="/about" className="hover:text-primary-foreground">
                  About Suryanta
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-foreground">
                  Our 5-Step Process
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-primary-foreground">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-foreground">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
              Reach us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li>
                <a href={PHONE_TEL} className="hover:text-primary-foreground">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-primary-foreground">
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
