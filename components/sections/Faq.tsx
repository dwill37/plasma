"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { PlusIcon } from "@/components/ui/Icons";
import { EASE_OUT, LineWipe } from "@/components/ui/motion";
import { FAQ } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-night py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">FAQ</p>
        <h2 id="faq-title" className="display mt-4 text-[clamp(2.25rem,6vw,4.5rem)] text-ink">
          <LineWipe>Good to know.</LineWipe>
        </h2>

        <ul className="mt-12 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <li
                key={item.question}
                className={`overflow-hidden rounded-[24px] transition-colors duration-300 ${
                  isOpen ? "bg-raised ring-1 ring-inset ring-accent/40" : "bg-surface ring-1 ring-inset ring-white/[0.06] hover:bg-raised"
                }`}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 rounded-[24px] px-6 py-5 text-left sm:px-8 sm:py-6"
                  >
                    <span
                      lang={item.questionLang}
                      className="text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl"
                    >
                      {item.question}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-accent text-night" : "bg-white/[0.06] text-ink"
                      }`}
                    >
                      <PlusIcon size={18} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    >
                      <div className="max-w-[62ch] px-6 pb-7 text-base leading-relaxed text-ink-soft sm:px-8 sm:text-lg">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
