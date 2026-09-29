import { motion } from "motion/react";
import { SERVICES, formatINR } from "@/data/salon";
import { useBooking } from "./booking-context";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { GlowField, Petal, fadeUp } from "./Decor";

export function Services() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <GlowField
        className="left-[-14%] top-[12%] h-[30rem] w-[30rem] opacity-60"
        style={{ background: "color-mix(in oklab, var(--blush) 65%, transparent)" }}
      />
      <Petal className="right-[6%] top-[8%] hidden h-14 w-14 lg:block" delay={1.1} />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Everything You Need
              <br />
              <span className="italic">to Feel Your Best</span>
            </>
          }
          subtitle="Eight dedicated studios under one roof, each led by a specialist and stocked with professional-grade products."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i % 4}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <TiltCard intensity={9} lift={16} className="h-full rounded-[1.6rem]">
                <article className="sheen group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-card shadow-soft transition-shadow duration-500 hover:shadow-float">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      width={928}
                      height={720}
                      className="h-full w-full scale-105 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115"
                      style={{ transform: "translateZ(24px)" }}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent" />
                    <span
                      className="absolute bottom-3 left-3 rounded-full bg-card/85 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-primary backdrop-blur"
                      style={{ transform: "translateZ(38px)" }}
                    >
                      From {formatINR(service.from)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="font-display text-2xl text-primary">{service.name}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-muted px-2.5 py-1 text-[0.66rem] tracking-wide text-foreground/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => openBooking(`${service.id}:${service.items[0]}`)}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gold-hairline bg-muted/60 py-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-wine-gradient hover:text-primary-foreground"
                    >
                      Book Now
                    </button>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
