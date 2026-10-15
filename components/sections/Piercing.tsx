"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { EASE_OUT, MaskWords, SPRING } from "@/components/ui/motion";
import { PIERCING_SHOWCASE } from "@/lib/images";
import { MESSAGES, waLink } from "@/lib/site";

/** Service block 01. Rendered inside <Services />, which supplies the frame and anchor. */
export function Piercing() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // The two detail shots drift against the main photo
  const yEar = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);
  const yCuff = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 30]);
  const yMain = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  const [main, ear, cuff] = PIERCING_SHOWCASE;

  return (
    <div ref={ref} className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <h3
          id="piercing-title"
          className="display text-[clamp(2.25rem,5.5vw,4.25rem)] text-ink text-balance"
        >
          <MaskWords text="Piercing, done with care." accents={{ "care.": "text-accent" }} />
        </h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          Clean, sterilized, careful. That&apos;s what Google reviewers value most about getting
          pierced at PLASMA. Tell us what you have in mind and we&apos;ll guide you from there.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button href={waLink(MESSAGES.piercing)} size="lg" whatsapp>
            Book a piercing
          </Button>
          <span className="text-[15px] font-medium text-ink-soft">Message us for a quote</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[32rem] lg:col-span-6 lg:col-start-7">
        {/* The in-view trigger lives on an unclipped wrapper: a fully clipped element never intersects */}
        <motion.div initial={reduce ? false : "hide"} whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <motion.div
            variants={{
              hide: { clipPath: "inset(0% 0% 100% 0% round 24px)" },
              show: { clipPath: "inset(0% 0% 0% 0% round 24px)" },
            }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
          >
            <motion.div
              className="absolute -inset-y-[8%] inset-x-0"
              style={{ y: yMain }}
              variants={{ hide: { scale: 1.2 }, show: { scale: 1 } }}
              transition={{ duration: 1.6, ease: EASE_OUT }}
            >
              <Image
                src={main.src}
                alt={main.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover object-[50%_40%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {[
          { photo: ear, y: yEar, className: "-left-3 top-4 w-[38%] sm:-left-12", pos: "object-[30%_38%]", delay: 0.5 },
          { photo: cuff, y: yCuff, className: "-bottom-4 -right-2 w-[42%] sm:-right-10", pos: "object-[70%_50%]", delay: 0.65 },
        ].map(({ photo, y, className, pos, delay }) => (
          <motion.div key={photo.alt} style={{ y }} className={`absolute ${className}`}>
            <motion.div
              initial={reduce ? false : { scale: 0, rotate: -12 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...SPRING, delay }}
              className="relative aspect-square overflow-hidden rounded-full ring-[6px] ring-surface"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 13rem, 40vw"
                className={`object-cover ${pos}`}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
