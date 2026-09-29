import { motion } from "motion/react";
import { useBooking } from "./booking-context";
import { GlassOrb, GoldRing, Petal, Sparkle, fadeUp } from "./Decor";

export function Offer() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden rounded-[2.2rem] bg-wine-gradient px-8 py-16 text-center shadow-float sm:px-16 sm:py-20"
        >
          <GoldRing className="left-[6%] top-[14%] h-24 w-24 opacity-70" delay={0.4} />
          <GoldRing className="right-[8%] bottom-[10%] h-16 w-16 opacity-60" delay={1.7} />
          <Petal className="left-[14%] bottom-[16%] hidden h-10 w-10 opacity-80 sm:block" delay={1.1} />
          <GlassOrb className="right-[16%] top-[18%] hidden h-14 w-14 sm:block" delay={2.2} />
          <Sparkle className="left-[40%] top-[12%] h-8 w-8" />
          <Sparkle className="right-[36%] bottom-[14%] h-10 w-10" />

          <div className="relative">
            <p className="eyebrow text-accent">Limited Time</p>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] text-primary-foreground">
              Your Beauty Break Awaits
            </h2>
            <p className="mt-5 font-display text-2xl italic text-gold-gradient sm:text-3xl">
              Get 15% off your first visit
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm text-primary-foreground/70">
              Valid on any single service or package, Monday to Thursday. Mention the offer when you
              book.
            </p>
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-lux btn-lux-gold mt-10"
            >
              Claim Your Offer
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
