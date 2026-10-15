"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { LineWipe, SPRING } from "@/components/ui/motion";
import { waLink } from "@/lib/site";

const STEPS = [
  {
    title: "Message us on WhatsApp",
    body: "Send your tattoo idea or the piercing you want. A photo or a sketch helps.",
  },
  {
    title: "Get advice and a quote",
    body: "We talk it through with you and send you a quote, so you know where you stand.",
  },
  {
    title: "Come to the shop in Ejidal",
    body: "Meet us at PLASMA in Ejido Sur, Ejidal, Playa del Carmen.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.7"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const draw = useTransform(smooth, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <section ref={ref} aria-labelledby="how-title" className="relative overflow-clip bg-night py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 id="how-title" className="display max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] text-ink text-balance">
          <LineWipe>
            Booking takes one <span className="text-accent">message.</span>
          </LineWipe>
        </h2>

        <div className="relative mt-16 md:mt-24">
          {/* Needle path drawn by scroll (desktop: horizontal, mobile: vertical) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute left-0 top-7 hidden h-24 w-full drop-shadow-[0_0_6px_rgba(255,61,142,0.8)] md:block"
          >
            <motion.path
              d="M48,15 C170,95 340,-40 462,15 S760,95 876,15"
              fill="none"
              stroke="#ff3d8e"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 400"
            preserveAspectRatio="none"
            className="absolute left-[27px] top-4 h-[calc(100%-4rem)] w-5 drop-shadow-[0_0_5px_rgba(255,61,142,0.8)] md:hidden"
          >
            <motion.path
              d="M10,0 C22,80 -2,160 10,240 S18,360 10,400"
              fill="none"
              stroke="#ff3d8e"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
            />
          </svg>

          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                className="flex gap-6 md:block"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <motion.span
                  className={`display grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl md:h-20 md:w-20 md:text-3xl ${i === 0 ? "bg-accent text-night" : "bg-raised text-ink ring-1 ring-white/15"}`}
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ ...SPRING, delay: 0.15 + i * 0.15 }}
                  aria-hidden="true"
                >
                  {i + 1}
                </motion.span>
                <div className="md:mt-8">
                  <h3 className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.05] tracking-[-0.04em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-base leading-relaxed text-ink-soft md:text-lg">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <Button href={waLink()} whatsapp size="lg">
            Book on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
