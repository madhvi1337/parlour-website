import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/salon";
import { SectionHeading } from "./SectionHeading";
import { GlassOrb, GlowField } from "./Decor";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <GlowField
        className="left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2"
        style={{ background: "color-mix(in oklab, var(--blush) 50%, transparent)" }}
      />
      <GlassOrb className="right-[8%] top-[18%] hidden h-16 w-16 lg:block" delay={1.1} />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved By <span className="italic">Our Clients</span>
            </>
          }
        />

        <div
          className="relative mt-16 flex h-[24rem] items-center justify-center sm:h-[21rem]"
          style={{ perspective: "1400px" }}
        >
          {TESTIMONIALS.map((t, i) => {
            let offset = i - index;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            return (
              <motion.article
                key={t.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  if (info.offset.x > 60) go(-1);
                }}
                animate={{
                  x: `${offset * 58}%`,
                  scale: 1 - abs * 0.12,
                  rotateY: offset * -18,
                  z: -abs * 140,
                  opacity: abs > 1 ? 0 : 1,
                  zIndex: 10 - abs,
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[min(92vw,30rem)] cursor-grab rounded-[1.8rem] bg-card p-9 shadow-float active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" aria-hidden />
                  ))}
                </div>
                <p className="mt-6 font-display text-[1.45rem] leading-snug text-primary">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-gradient font-display text-lg text-primary">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">{t.name}</span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                </footer>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full gold-hairline bg-card text-primary shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === index ? "w-8 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full gold-hairline bg-card text-primary shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
