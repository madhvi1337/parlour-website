import { motion } from "motion/react";
import { fadeUp } from "./Decor";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "default",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "default" | "invert";
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}
    >
      <p className={cn("eyebrow", tone === "invert" && "text-accent")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05]",
          tone === "invert" ? "text-primary-foreground" : "text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-[0.98rem] leading-relaxed",
            tone === "invert" ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
      <span
        aria-hidden
        className={cn(
          "mt-7 block h-px w-24 bg-accent/70",
          align === "center" && "mx-auto",
        )}
      />
    </motion.div>
  );
}
