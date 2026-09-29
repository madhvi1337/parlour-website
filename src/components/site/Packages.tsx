import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { PACKAGES, formatINR } from "@/data/salon";
import { useBooking } from "./booking-context";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { GlassOrb, GlowField, GoldRing, fadeUp } from "./Decor";

export function Packages() {
  const { openBooking } = useBooking();
  const [hero, ...rest] = PACKAGES;

  return (
    <section id="packages" className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <GlowField
        className="right-[-12%] top-[6%] h-[32rem] w-[32rem]"
        style={{ background: "color-mix(in oklab, var(--gold) 34%, transparent)" }}
      />
      <GoldRing className="left-[4%] top-[16%] hidden h-24 w-24 lg:block" delay={0.7} />
      <GlassOrb className="left-[8%] bottom-[12%] hidden h-14 w-14 lg:block" delay={2} />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Combo Packages"
          title={
            <>
              Beauty, <span className="italic">Curated For You</span>
            </>
          }
          subtitle="Thoughtfully bundled rituals that save you time and money — and take the guesswork out of planning."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Hero package */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <TiltCard intensity={7} lift={20} className="h-full rounded-[2rem]">
              <article className="sheen relative h-full overflow-hidden rounded-[2rem] bg-wine-gradient text-primary-foreground shadow-float">
                <img
                  src={hero.image}
                  alt="Bridal makeup by LUMÉRA"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-45"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/20" />

                <div
                  className="relative flex h-full flex-col justify-end p-8 sm:p-11"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <span
                    className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-blush-gradient px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-gold"
                    style={{ transform: "translateZ(60px)" }}
                  >
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Most Popular
                  </span>

                  <p className="eyebrow text-accent">The Signature</p>
                  <h3 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none">
                    {hero.name}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-primary-foreground/75">{hero.tagline}</p>

                  <p className="mt-6 font-display text-4xl text-gold-gradient">
                    {formatINR(hero.price)}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {hero.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground/85">
                        <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openBooking(`pkg:${hero.id}`)}
                    className="btn-lux btn-lux-gold mt-9 w-full sm:w-auto"
                  >
                    {hero.cta}
                  </button>
                </div>
              </article>
            </TiltCard>
          </motion.div>

          {/* Supporting packages */}
          <div className="grid gap-6">
            {rest.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <TiltCard intensity={6} lift={12} className="rounded-[1.5rem]">
                  <article className="sheen flex flex-col gap-4 rounded-[1.5rem] bg-card p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
                    <div style={{ transform: "translateZ(18px)" }}>
                      <h3 className="font-display text-2xl text-primary">{pkg.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{pkg.tagline}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {pkg.includes.map((item) => (
                          <li
                            key={item}
                            className="rounded-full bg-muted px-2.5 py-1 text-[0.66rem] text-foreground/70"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="flex shrink-0 flex-col items-start gap-3 sm:items-end"
                      style={{ transform: "translateZ(34px)" }}
                    >
                      <p className="font-display text-3xl text-primary">{formatINR(pkg.price)}</p>
                      <button
                        type="button"
                        onClick={() => openBooking(`pkg:${pkg.id}`)}
                        className="rounded-full gold-hairline px-5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-wine-gradient hover:text-primary-foreground"
                      >
                        Book Now
                      </button>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}

            <motion.button
              type="button"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onClick={() => openBooking()}
              className="btn-lux btn-lux-ghost w-full"
            >
              View All Packages
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
