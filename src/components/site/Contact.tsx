import { motion } from "motion/react";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { SALON } from "@/data/salon";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { GlowField, fadeUp } from "./Decor";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SALON.address)}`;

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <GlowField
        className="right-[-10%] bottom-[6%] h-[30rem] w-[30rem]"
        style={{ background: "color-mix(in oklab, var(--blush) 55%, transparent)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Visit Us"
          title={
            <>
              Come See Us <span className="italic">in Bandra</span>
            </>
          }
          subtitle="Walk-ins welcome when we have a chair free — booking ahead is always safer for weekends."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <TiltCard intensity={6} lift={10} className="rounded-[1.5rem]">
              <div className="rounded-[1.5rem] bg-card p-7 shadow-soft">
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Address
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-foreground">
                        {SALON.address}
                      </span>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Phone &amp; WhatsApp
                      </span>
                      <a
                        href={`tel:${SALON.phone.replace(/\s/g, "")}`}
                        className="mt-1 block text-sm text-foreground hover:text-primary"
                      >
                        {SALON.phone}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Email
                      </span>
                      <a
                        href={`mailto:${SALON.email}`}
                        className="mt-1 block text-sm text-foreground hover:text-primary"
                      >
                        {SALON.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Opening Hours
                      </span>
                      {SALON.hours.map((h) => (
                        <span key={h.days} className="mt-1 block text-sm text-foreground">
                          {h.days}: {h.time}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
            </TiltCard>

            <div className="grid gap-3 sm:grid-cols-3">
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-lux btn-lux-ghost !px-4 text-[0.6rem]">
                <Navigation className="h-3.5 w-3.5" aria-hidden />
                Directions
              </a>
              <a
                href={`https://wa.me/${SALON.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-lux btn-lux-ghost !px-4 text-[0.6rem]"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                WhatsApp Us
              </a>
              <a href={`tel:${SALON.phone.replace(/\s/g, "")}`} className="btn-lux !px-4 text-[0.6rem]">
                <Phone className="h-3.5 w-3.5" aria-hidden />
                Call Now
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="min-h-[24rem] overflow-hidden rounded-[1.8rem] shadow-float"
          >
            <iframe
              title="LUMÉRA Beauty Studio location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SALON.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[24rem] w-full border-0 grayscale-[35%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
