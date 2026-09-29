import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  lift?: number;
};

/**
 * Perspective tilt container. Children can use `translateZ` via inline style
 * to sit at different depths inside the card.
 */
export function TiltCard({ children, className, intensity = 10, lift = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hover = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const sh = useSpring(hover, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const z = useTransform(sh, [0, 1], [0, lift]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);
  const glareOpacity = useTransform(sh, [0, 1], [0, 0.55]);

  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(420px circle at ${gx} ${gy}, color-mix(in oklab, white 70%, transparent), transparent 62%)`,
  );

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div className="scene-3d">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => hover.set(1)}
        onMouseLeave={() => {
          hover.set(0);
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY, translateZ: z }}
        className={cn("card-3d relative", className)}
      >
        {children}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ opacity: glareOpacity, background: glare }}
        />
      </motion.div>
    </div>
  );
}
