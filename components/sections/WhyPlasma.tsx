"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ChatIcon, DropIcon, HeartIcon, SparkIcon } from "@/components/ui/Icons";
import { LineWipe } from "@/components/ui/motion";

type Highlight = {
  icon: ReactNode;
  title: string;
  body: ReactNode;
  className: string;
  /** Where the card slides in from: crisp, needle-straight entries. */
  from: { x?: number; y?: number };
};

// Every highlight comes from what Google reviewers say (GMB review keywords and review text)
const HIGHLIGHTS: Highlight[] = [
  {
    icon: <DropIcon size={24} />,
    title: "Clean & sterilized",
    body: "Cleanliness and sterilization come up again and again in our Google reviews. You can relax in the chair.",
    className: "lg:col-span-4 lg:min-h-[19rem]",
    from: { x: -60 },
  },
  {
    icon: <SparkIcon size={24} />,
    title: "Skilled, quality work",
    body: (
      <>
        Quality is one of the words reviewers use most. One calls it{" "}
        <span className="font-semibold text-ink">&ldquo;perfect mastery.&rdquo;</span>
      </>
    ),
    className: "lg:col-span-2",
    from: { x: 60 },
  },
  {
    icon: <ChatIcon size={24} />,
    title: "They really listen",
    body: (
      <>
        Bring an idea, a reference or just a feeling. Clients mention{" "}
        <span className="font-semibold text-ink">attentive listening</span> and{" "}
        <span className="font-semibold text-ink">a perfect welcome.</span>
      </>
    ),
    className: "lg:col-span-2",
    from: { y: 60 },
  },
  {
    icon: <HeartIcon size={24} />,
    title: "Everyone welcome",
    body: (
      <>
        An LGBTQ+ friendly studio, with a French-speaking artist on the team.{" "}
        <span lang="fr" className="font-semibold text-ink">
          On parle français.
        </span>
      </>
    ),
    className: "lg:col-span-4",
    from: { x: 60 },
  },
];

export function WhyPlasma() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="relative bg-night py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Why PLASMA</p>
        <h2
          id="why-title"
          className="display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] text-ink text-balance"
        >
          <LineWipe>Care you can feel. Work you can see.</LineWipe>
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {HIGHLIGHTS.map((h, i) => (
            <motion.li
              key={h.title}
              initial={reduce ? false : { opacity: 0, ...h.from }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className={`group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[24px] bg-surface p-7 ring-1 ring-inset ring-white/[0.08] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,61,142,0.45),0_0_40px_-12px_rgba(255,61,142,0.5)] md:p-9 ${h.className}`}
            >
              {/* A fine line is drawn across the top edge as the card lands */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent via-accent/50 to-transparent"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}
              />
              <div className="relative h-12 w-12">
                {/* Charge pulse: a ring bursts out of the icon when the card lands */}
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-accent"
                    initial={{ scale: 1, opacity: 0 }}
                    whileInView={{ scale: [1, 1.9, 2.4], opacity: [0, 0.8, 0] }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.35 + i * 0.12, ease: "easeOut" }}
                  />
                )}
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-raised text-accent ring-1 ring-white/10">
                  {h.icon}
                </span>
              </div>
              <div>
                <h3 className="display text-[clamp(1.45rem,2.3vw,2rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                  {h.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-ink-soft md:text-[17px]">
                  {h.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
