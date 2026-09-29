import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryItem } from "@/data/salon";
import { SectionHeading } from "./SectionHeading";
import { GlowField, Petal } from "./Decor";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <GlowField
        className="right-[-10%] top-[10%] h-[28rem] w-[28rem]"
        style={{ background: "color-mix(in oklab, var(--blush-deep) 45%, transparent)" }}
      />
      <Petal className="left-[5%] top-[14%] hidden h-12 w-12 lg:block" delay={1.4} />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              Work From <span className="italic">Our Chairs</span>
            </>
          }
          subtitle="Real clients, real results — photographed in-studio with no retouching."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-all duration-300",
                filter === cat
                  ? "bg-wine-gradient text-primary-foreground shadow-lift"
                  : "gold-hairline bg-card/70 text-primary hover:bg-card",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="scene-3d mt-12 columns-2 gap-5 [column-fill:_balance] lg:columns-3 xl:columns-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                type="button"
                onClick={() => setActive(item)}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotateX: -5, rotateY: 5, z: 40 }}
                className="sheen group mb-5 block w-full overflow-hidden rounded-[1.4rem] shadow-soft transition-shadow duration-500 hover:shadow-float"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative block">
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    className={cn(
                      "w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
                      item.tall ? "aspect-[3/4]" : "aspect-square",
                    )}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/70 p-5 backdrop-blur-md"
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[86vh] max-w-3xl overflow-hidden rounded-[1.6rem] bg-card shadow-float"
              style={{ perspective: 1000 }}
            >
              <img src={active.image} alt={active.caption} className="max-h-[74vh] w-full object-contain" />
              <figcaption className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="font-display text-xl text-primary">{active.caption}</span>
                <span className="eyebrow">{active.category}</span>
              </figcaption>
              <button
                type="button"
                aria-label="Close image"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/85 text-primary shadow-soft backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
