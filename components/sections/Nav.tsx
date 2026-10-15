"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { EASE_OUT } from "@/components/ui/motion";
import { BUSINESS, NAV_LINKS, waLink } from "@/lib/site";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Only re-render when the threshold is crossed, not on every scroll frame
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 40;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10"
        animate={{ height: scrolled ? 60 : 76 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        {/* Solid layer fades in behind the bar on scroll */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 border-b border-ink/8 bg-paper/85 backdrop-blur-xl"
          initial={false}
          animate={{ opacity: solid ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <a
          href="#top"
          className="display relative z-10 text-[22px] tracking-[-0.06em] text-ink lg:text-2xl"
          aria-label="PLASMA, back to top"
          onClick={() => setOpen(false)}
        >
          PLASMA<span className="text-plasma">.</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full bg-paper/75 p-1 ring-1 ring-ink/5 backdrop-blur-md">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <span className="hidden sm:block">
            <Button href={waLink()} whatsapp>
              Book on WhatsApp
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
          >
            <motion.span
              className="absolute h-[2px] w-5 rounded bg-current"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            />
            <motion.span
              className="absolute h-[2px] w-5 rounded bg-current"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-lilac px-4 pb-10 pt-28 sm:px-6 lg:hidden"
            initial={{ clipPath: "circle(0% at 90% 38px)" }}
            animate={{ clipPath: "circle(150% at 90% 38px)" }}
            exit={{ clipPath: "circle(0% at 90% 38px)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-plasma-soft blur-3xl"
            />
            <nav aria-label="Mobile" className="relative">
              <motion.ul
                initial="hide"
                animate="show"
                exit="hide"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              >
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display block py-2 text-[clamp(2.5rem,12vw,4rem)] text-ink"
                      variants={{
                        hide: { y: "100%" },
                        show: { y: "0%", transition: { duration: 0.6, ease: EASE_OUT } },
                      }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            </nav>
            <motion.div
              className="relative mt-auto flex flex-col gap-3 pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45 } }}
              exit={{ opacity: 0 }}
            >
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-violet text-lg font-semibold text-white"
              >
                <WhatsAppIcon size={22} />
                Book on WhatsApp
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-paper text-lg font-semibold text-ink ring-1 ring-ink/10"
              >
                <PhoneIcon size={20} />
                {BUSINESS.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
