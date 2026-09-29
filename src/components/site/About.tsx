import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Award, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import salonInterior from "@/assets/salon-interior.jpg";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { GlassOrb, GlowField, GoldRing, fadeUp } from "./Decor";

const STATS = [
  { value: "500+", label: "Happy Clients" },
  { value: "20+", label: "Beauty Services" },
  { value: "8+", label: "Expert Professionals" },
  { value: "5+", label: "Years of Experience" },
];

const REASONS = [
  {
    icon: Award,
    title: "Certified Beauty Professionals",
    text: "Every artist is trained and certified, with ongoing education in the techniques our clients ask for.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    text: "Salon-exclusive, dermatologist-tested lines only — never diluted, never substituted.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic & Relaxing Environment",
    text: "Single-use disposables, sterilised tools and private suites, audited every single week.",
  },
  {
    icon: Leaf,
    title: "Personalised Beauty Experience",
    text: "We begin with a consultation, not a price list. Your service is shaped around your hair and skin.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <GlowField
        className="left-[-10%] bottom-[8%] h-[30rem] w-[30rem]"
        style={{ background: "color-mix(in oklab, var(--blush) 55%, transparent)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div style={{ y: reduced ? 0 : imageY }} className="scene-3d relative">
            <TiltCard intensity={7} lift={14} className="rounded-[2rem]">
              <div className="sheen overflow-hidden rounded-[2rem] shadow-float">
                <img
                  src={salonInterior}
                  alt="The LUMÉRA studio interior with blush velvet chairs and gold fixtures"
                  loading="lazy"
                  width={1280}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
            </TiltCard>
            <GoldRing className="right-[-6%] top-[-6%] h-24 w-24" delay={0.6} />
            <GlassOrb className="left-[-5%] bottom-[-5%] h-20 w-20" delay={1.8} />

            <div className="glass-panel animate-lux-float absolute -bottom-8 right-6 hidden rounded-2xl px-6 py-4 sm:block">
              <p className="font-display text-2xl text-primary">Est. 2021</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                Bandra West, Mumbai
              </p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About LUMÉRA"
              title={
                <>
                  Beauty Is More
                  <br />
                  <span className="italic">Than A Look.</span>
                </>
              }
            />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-7 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground"
            >
              <p>
                LUMÉRA is a women-only beauty studio built around one idea: that an appointment
                should feel like an hour that belongs entirely to you. No rushed chairs, no upselling
                — just skilled hands, honest advice and a space designed to slow you down.
              </p>
              <p>
                Our team specialises in hair, advanced skincare, makeup artistry and restorative spa
                therapy. Every service begins with a consultation so the result suits your features,
                your routine and the way you actually live.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="border-l border-accent/50 pl-4"
                >
                  <p className="font-display text-3xl text-primary">{stat.value}</p>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={
              <>
                The LUMÉRA <span className="italic">Standard</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <TiltCard intensity={8} lift={14} className="h-full rounded-[1.5rem]">
                  <div className="sheen h-full rounded-[1.5rem] bg-card p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift">
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-gradient shadow-gold"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <reason.icon className="h-6 w-6 text-primary" aria-hidden />
                    </span>
                    <h3
                      className="mt-5 font-display text-xl text-primary"
                      style={{ transform: "translateZ(22px)" }}
                    >
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {reason.text}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
