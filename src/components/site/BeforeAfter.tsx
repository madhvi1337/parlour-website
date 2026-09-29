import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { SectionHeading } from "./SectionHeading";
import { GlowField, GoldRing, fadeUp } from "./Decor";

export function BeforeAfter() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && setFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <section className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <GlowField
        className="left-[-8%] top-[20%] h-[28rem] w-[28rem]"
        style={{ background: "color-mix(in oklab, var(--gold) 30%, transparent)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Transformations"
          title={
            <>
              Before &amp; <span className="italic">After</span>
            </>
          }
          subtitle="Drag the divider to see a full glam and blow-dry transformation from a single sitting."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="scene-3d mx-auto mt-14 max-w-3xl"
        >
          <div
            className="relative rounded-[2rem] bg-card p-3 shadow-float"
            style={{ transform: "rotateX(6deg)", transformStyle: "preserve-3d" }}
          >
            <GoldRing className="right-[-5%] top-[-7%] h-20 w-20" delay={0.9} />
            <div
              ref={frameRef}
              onPointerDown={(e) => {
                dragging.current = true;
                setFromClientX(e.clientX);
              }}
              className="relative aspect-[4/5] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[1.5rem] sm:aspect-[16/11]"
            >
              <img
                src={afterImg}
                alt="After a LUMÉRA glam and blow-dry"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${position}%` }}
              >
                <img
                  src={beforeImg}
                  alt="Before the appointment"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  style={{ width: frameRef.current?.clientWidth ?? "100%", maxWidth: "none" }}
                />
              </div>

              <span className="absolute left-4 top-4 rounded-full bg-card/85 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-primary backdrop-blur">
                Before
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-primary/85 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-primary-foreground backdrop-blur">
                After
              </span>

              <div
                className="absolute inset-y-0 w-px bg-accent"
                style={{ left: `${position}%` }}
                aria-hidden
              >
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow-lift">
                  <MoveHorizontal className="h-5 w-5" />
                </span>
              </div>
            </div>

            <label className="sr-only" htmlFor="ba-range">
              Before and after comparison
            </label>
            <input
              id="ba-range"
              type="range"
              min={2}
              max={98}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="sr-only"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
