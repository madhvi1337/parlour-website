import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Soft translucent sphere with a glassy highlight. */
export function GlassOrb({
  className,
  style,
  delay = 0,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full animate-lux-drift", className)}
      style={{
        background:
          "radial-gradient(circle at 32% 28%, color-mix(in oklab, white 85%, transparent), color-mix(in oklab, var(--blush-deep) 55%, transparent) 55%, color-mix(in oklab, var(--gold) 30%, transparent))",
        boxShadow:
          "inset -8px -10px 24px color-mix(in oklab, var(--wine) 18%, transparent), 0 24px 50px -22px color-mix(in oklab, var(--wine) 40%, transparent)",
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  );
}

/** Thin champagne gold ring. */
export function GoldRing({
  className,
  style,
  delay = 0,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full border-[3px] animate-lux-float",
        className,
      )}
      style={{
        borderColor: "color-mix(in oklab, var(--gold) 70%, transparent)",
        boxShadow: "0 18px 40px -20px color-mix(in oklab, var(--gold) 80%, transparent)",
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  );
}

/** Soft blush petal shape. */
export function Petal({
  className,
  style,
  delay = 0,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute animate-lux-drift", className)}
      style={{
        borderRadius: "80% 10% 80% 10%",
        background:
          "linear-gradient(140deg, color-mix(in oklab, var(--blush) 95%, transparent), color-mix(in oklab, var(--blush-deep) 85%, transparent))",
        boxShadow: "0 16px 34px -18px color-mix(in oklab, var(--wine) 45%, transparent)",
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  );
}

export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute animate-lux-glow", className)}
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--gold) 90%, transparent) 0%, transparent 70%)",
        ...style,
      }}
    />
  );
}

/** Blurred colour wash used behind sections for depth. */
export function GlowField({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl animate-lux-glow", className)}
      style={style}
    />
  );
}

/**
 * Wraps decorative children and drifts them as the section scrolls past.
 * `speed` > 0 moves up, < 0 moves down.
 */
export function ParallaxLayer({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y: reduced ? 0 : yRaw }} className={className}>
      {children}
    </motion.div>
  );
}

/** Standard fade-up reveal used across sections. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
