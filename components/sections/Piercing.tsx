"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ORGANIC_RADII } from "@/components/ui/blob";
import { EASE_OUT, MaskWords, PlasmaBlob, SPRING } from "@/components/ui/motion";
import { PIERCING_SHOWCASE } from "@/lib/images";
import { MESSAGES, waLink } from "@/lib/site";

export function Piercing() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Each blob drifts at its own speed, so the background feels like moving plasma
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 140]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [200, -60]);
  const rot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 40]);

  const [main, ear, cuff] = PIERCING_SHOWCASE;

  return (
    <section
      ref={ref}
      id="piercing"
      aria-labelledby="piercing-title"
      className="relative isolate overflow-clip bg-lilac py-24 md:py-32"
    >
      <motion.div style={{ y: y1, rotate: rot }} className="absolute -left-24 top-10 -z-10 w-[26rem] opacity-70">
        <PlasmaBlob seeds={[5, 9, 13]} className="w-full text-violet-soft" duration={16} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -right-20 top-1/3 -z-10 w-[22rem] opacity-80">
        <PlasmaBlob seeds={[21, 2, 33]} className="w-full text-plasma-soft" duration={12} />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-0 left-1/3 -z-10 w-40">
        <PlasmaBlob seeds={[8, 17, 4]} className="w-full text-violet/25" duration={10} />
      </motion.div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <h2
            id="piercing-title"
            className="display text-[clamp(2.5rem,6.5vw,5rem)] text-ink text-balance"
          >
            <MaskWords text="Piercing, done with care." accents={{ "care.": "text-violet" }} />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Clean, sterilized, careful. That&apos;s what our Google reviewers value most about
            getting pierced at PLASMA. Tell us what you have in mind and we&apos;ll take it from
            there.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href={waLink(MESSAGES.piercing)} size="lg" whatsapp>
              Book a piercing
            </Button>
            <span className="text-[15px] font-medium text-ink-soft">
              Message us for a quote
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:col-start-7">
          {/* Main photo: an organic clip-path opens it, then the outline keeps breathing */}
          {/* The in-view trigger lives on an unclipped wrapper: a fully clipped element never intersects */}
          <motion.div
            initial={reduce ? false : "hide"}
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
          <motion.div
            variants={{
              hide: { clipPath: "circle(0% at 50% 50%)" },
              show: { clipPath: "circle(75% at 50% 50%)" },
            }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="relative"
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden"
              style={{ borderRadius: ORGANIC_RADII[0] }}
              animate={reduce ? undefined : { borderRadius: ORGANIC_RADII }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                variants={{ hide: { scale: 1.2 }, show: { scale: 1 } }}
                transition={{ duration: 1.6, ease: EASE_OUT }}
              >
                <Image
                  src={main.src}
                  alt={main.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34rem, 90vw"
                  className="object-cover object-[50%_40%]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          </motion.div>

          {[
            { photo: ear, className: "-left-4 -top-6 w-[38%] sm:-left-12", pos: "object-[30%_38%]", delay: 0.5 },
            { photo: cuff, className: "-bottom-8 -right-2 w-[42%] sm:-right-10", pos: "object-[70%_50%]", delay: 0.65 },
          ].map(({ photo, className, pos, delay }) => (
            <motion.div
              key={photo.alt}
              initial={reduce ? false : { scale: 0, rotate: -12 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...SPRING, delay }}
              className={`absolute aspect-square overflow-hidden rounded-full border-[6px] border-lilac shadow-[0_20px_40px_-20px_rgba(106,43,255,0.55)] ${className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 15rem, 40vw"
                className={`object-cover ${pos}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
