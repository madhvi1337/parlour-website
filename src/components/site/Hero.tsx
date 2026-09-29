import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import heroComposition from "@/assets/hero-composition.png";
import { useBooking } from "./booking-context";
import { GlassOrb, GlowField, GoldRing, Petal, Sparkle } from "./Decor";

const TRUST = ["Hair", "Skin", "Makeup", "Spa", "Nails"];

const FLOATING_CARDS = [
  { label: "500+", sub: "Happy Clients", className: "left-[-6%] top-[18%]", depth: 34 },
  { label: "Premium", sub: "Beauty Care", className: "right-[-4%] top-[42%]", depth: 22 },
  { label: "Expert", sub: "Stylists", className: "left-[2%] bottom-[10%]", depth: 28 },
];

export function Hero() {
  const { openBooking } = useBooking();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const layer = (depth: number) => ({
    x: useTransform(smx, [-0.5, 0.5], [-depth, depth]),
    y: useTransform(smy, [-0.5, 0.5], [-depth * 0.6, depth * 0.6]),
  });

  const product = layer(30);
  const far = layer(14);
  const cardLayers = [layer(34), layer(46), layer(28)];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-blush-gradient pt-32 pb-20 lg:pt-28"
    >
      <GlowField
        className="left-[-10%] top-[-8%] h-[38rem] w-[38rem]"
        style={{ background: "color-mix(in oklab, var(--blush-deep) 55%, transparent)" }}
      />
      <GlowField
        className="right-[-12%] bottom-[-16%] h-[34rem] w-[34rem]"
        style={{ background: "color-mix(in oklab, var(--gold) 38%, transparent)" }}
      />

      <motion.div
        style={{ y: reduced ? 0 : heroY, opacity: heroFade }}
        className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8"
      >
        {/* Copy */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Women&apos;s Luxury Beauty Studio — Mumbai
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(3rem,8vw,6.2rem)] font-light leading-[0.94] text-primary"
          >
            Beauty,
            <br />
            <span className="italic text-gold-gradient">Redefined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Where beauty meets relaxation, confidence and a little luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button type="button" onClick={() => openBooking()} className="btn-lux">
              Book an Appointment
            </button>
            <a href="#services" className="btn-lux btn-lux-ghost">
              Explore Services
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            {TRUST.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {item}
                {i < TRUST.length - 1 && <span className="text-accent">•</span>}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* 3D composition */}
        <div className="scene-3d relative mx-auto h-[24rem] w-full max-w-lg sm:h-[30rem] lg:h-[38rem]">
          <motion.div
            style={far}
            className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[28rem] sm:w-[28rem]"
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, color-mix(in oklab, white 88%, transparent), color-mix(in oklab, var(--blush) 70%, transparent) 62%, transparent 72%)",
                boxShadow: "0 60px 120px -50px color-mix(in oklab, var(--wine) 45%, transparent)",
              }}
            />
            <GoldRing className="left-[-4%] top-[8%] h-28 w-28" delay={0.4} />
            <GoldRing className="right-[2%] bottom-[6%] h-20 w-20" delay={1.6} />
            <Petal className="left-[6%] bottom-[22%] h-12 w-12" delay={0.9} />
            <Petal className="right-[8%] top-[14%] h-9 w-9" delay={2.1} />
            <GlassOrb className="right-[-6%] top-[44%] h-16 w-16" delay={1.2} />
            <GlassOrb className="left-[12%] top-[-4%] h-10 w-10" delay={2.6} />
            <Sparkle className="left-[30%] top-[20%] h-6 w-6" />
            <Sparkle className="right-[24%] bottom-[24%] h-8 w-8" />
          </motion.div>

          <motion.img
            src={heroComposition}
            alt="Luxury perfume, lipstick, serum and makeup brush floating in a beauty composition"
            width={1024}
            height={1280}
            style={product}
            className="animate-lux-float absolute left-1/2 top-1/2 w-[85%] max-w-md -translate-x-1/2 -translate-y-1/2 select-none object-contain drop-shadow-[0_45px_60px_rgba(90,30,45,0.28)]"
          />

          {FLOATING_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
              style={cardLayers[i]}
              className={`absolute ${card.className} z-20`}
            >
              <div className="glass-panel animate-lux-float rounded-2xl px-5 py-3.5" style={{ animationDelay: `${i * 1.7}s` }}>
                <p className="font-display text-xl leading-none text-primary">{card.label}</p>
                <p className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {card.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
