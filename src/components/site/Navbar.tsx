import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SALON } from "@/data/salon";
import { useBooking } from "./booking-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-7",
              scrolled ? "glass-panel shadow-lift" : "border border-transparent",
            )}
          >
            <a href="#home" className="group flex flex-col leading-none">
              <span className="font-display text-2xl font-medium tracking-[0.22em] text-primary sm:text-[1.7rem]">
                {SALON.name}
              </span>
              <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.42em] text-muted-foreground">
                {SALON.subtitle}
              </span>
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative text-[0.78rem] font-medium uppercase tracking-[0.16em] text-foreground/75 transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-lux hidden !px-6 !py-3 text-[0.68rem] sm:inline-flex"
              >
                Book Appointment
              </button>

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full gold-hairline bg-card/70 backdrop-blur lg:hidden"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-px w-5 bg-primary"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                  className="block h-px w-5 bg-primary"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-px w-5 bg-primary"
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-blush-gradient lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-border/60 py-4 font-display text-3xl text-primary"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
                className="btn-lux mt-10 w-full"
              >
                Book Appointment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
