"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ChatIcon, DropIcon, HeartIcon, SparkIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/motion";

type Highlight = {
  icon: ReactNode;
  title: string;
  body: ReactNode;
  className: string;
  iconClass: string;
  ringClass: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    icon: <DropIcon size={26} />,
    title: "Clean and sterilized",
    body: "It's what our Google reviewers mention most: a clean studio and careful sterilization, so you can relax in the chair.",
    className: "bg-violet text-white lg:col-span-4 lg:row-span-1 lg:min-h-[19rem]",
    iconClass: "bg-white text-violet",
    ringClass: "border-white",
  },
  {
    icon: <SparkIcon size={26} />,
    title: "Quality and mastery",
    body: (
      <>
        <span className="font-semibold">&ldquo;Perfect mastery.&rdquo;</span> &ldquo;An incredible
        result.&rdquo; That&apos;s how clients describe the work.
      </>
    ),
    className: "bg-plasma text-ink lg:col-span-2",
    iconClass: "bg-ink text-plasma",
    ringClass: "border-ink",
  },
  {
    icon: <ChatIcon size={26} />,
    title: "Artists who listen",
    body: "Bring an idea, a reference or just a feeling. Reviewers say our artists really listen before they start.",
    className: "bg-lilac-deep text-ink lg:col-span-2",
    iconClass: "bg-violet text-white",
    ringClass: "border-violet",
  },
  {
    icon: <HeartIcon size={26} />,
    title: "Everyone is welcome",
    body: (
      <>
        An LGBTQ+ friendly studio with a French-speaking artist on the team.{" "}
        <span lang="fr" className="font-semibold text-violet">
          On parle français.
        </span>
      </>
    ),
    className: "bg-paper text-ink ring-1 ring-inset ring-ink/10 lg:col-span-4",
    iconClass: "bg-plasma text-ink",
    ringClass: "border-plasma",
  },
];

export function WhyPlasma() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-plasma-ink">
          Why PLASMA
        </p>
        <h2
          id="why-title"
          className="display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] text-ink text-balance"
        >
          <MaskWords text="Care you can feel. Work you can see." />
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {HIGHLIGHTS.map((h, i) => (
            <motion.li
              key={h.title}
              initial={reduce ? false : { opacity: 0, scale: 0.86, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 210, damping: 18, delay: i * 0.09 }}
              className={`relative flex flex-col justify-between gap-10 overflow-hidden rounded-[28px] p-7 md:p-9 ${h.className}`}
            >
              <div className="relative h-14 w-14">
                {/* Charge pulse: a ring bursts out of the icon when the card lands */}
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full border-2 ${h.ringClass}`}
                    initial={{ scale: 1, opacity: 0 }}
                    whileInView={{ scale: [1, 1.9, 2.4], opacity: [0, 0.7, 0] }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.35 + i * 0.12, ease: "easeOut" }}
                  />
                )}
                <motion.span
                  className={`relative grid h-14 w-14 place-items-center rounded-full ${h.iconClass}`}
                  initial={reduce ? false : { scale: 0.4 }}
                  whileInView={{ scale: [0.4, 1.18, 0.94, 1] }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                >
                  {h.icon}
                </motion.span>
              </div>
              <div>
                <h3 className="display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.02] tracking-[-0.04em]">
                  {h.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-base leading-relaxed opacity-90 md:text-[17px]">
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
