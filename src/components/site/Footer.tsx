import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { NAV_LINKS, SALON } from "@/data/salon";
import { useBooking } from "./booking-context";

export function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="relative overflow-hidden bg-wine-gradient pb-28 pt-20 text-primary-foreground sm:pb-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-[0.2em]">{SALON.name}</p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.42em] text-primary-foreground/60">
              {SALON.subtitle}
            </p>
            <p className="mt-6 font-display text-2xl italic text-gold-gradient">{SALON.tagline}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/65">
              A women-only luxury beauty studio in Bandra West offering hair, skin, makeup, nails and
              spa care by certified professionals.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                { icon: Instagram, href: SALON.instagram, label: "Instagram" },
                { icon: Facebook, href: SALON.facebook, label: "Facebook" },
                { icon: MessageCircle, href: `https://wa.me/${SALON.whatsapp}`, label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-accent">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-accent">Studio</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-primary-foreground/70">
              <p>{SALON.address}</p>
              <p>
                <a href={`tel:${SALON.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {SALON.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${SALON.email}`} className="hover:text-accent">
                  {SALON.email}
                </a>
              </p>
              {SALON.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-primary-foreground/15 pt-6 text-center text-[0.7rem] tracking-wide text-primary-foreground/50">
          © 2026 LUMÉRA BEAUTY STUDIO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
