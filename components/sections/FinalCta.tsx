"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ORGANIC_RADII } from "@/components/ui/blob";
import { EASE_OUT, MaskWords, PlasmaBlob } from "@/components/ui/motion";
import { FINAL_CTA_PHOTO } from "@/lib/images";
import { waLink } from "@/lib/site";

/** CTA that leans toward the pointer, like charge pulled across a plasma ball. */
function MagneticButton() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className="group inline-flex h-16 items-center gap-3 whitespace-nowrap rounded-full bg-violet px-8 text-lg font-semibold text-white shadow-[0_20px_50px_-15px_rgba(82,22,230,0.8)] transition-colors hover:bg-violet-deep md:h-20 md:px-12 md:text-xl"
    >
      <WhatsAppIcon size={26} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      Book on WhatsApp
    </motion.a>
  );
}

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-clip bg-plasma">
      <PlasmaBlob seeds={[44, 15, 26]} duration={16} className="absolute -left-40 -top-40 -z-10 w-[36rem] text-[#ff76a6]" />
      <PlasmaBlob seeds={[9, 38, 20]} duration={13} className="absolute -bottom-48 left-1/3 -z-10 w-[30rem] text-violet-soft/60" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <h2 id="cta-title" className="display text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] text-ink">
            <MaskWords text="Let's make it yours." stagger={0.1} />
          </h2>
          <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-ink md:text-xl">
            A piercing, a tattoo, an idea you can&apos;t shake. Send it our way.
          </p>
          <div className="mt-10">
            <MagneticButton />
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:col-span-5"
          initial={reduce ? false : { scale: 0.7, opacity: 0, rotate: -6 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <motion.div
            className="relative aspect-[4/5] overflow-hidden border-[8px] border-paper shadow-[0_40px_80px_-30px_rgba(82,22,230,0.6)]"
            style={{ borderRadius: ORGANIC_RADII[1] }}
            animate={reduce ? undefined : { borderRadius: [...ORGANIC_RADII].reverse() }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE_OUT }}
            >
              <Image
                src={FINAL_CTA_PHOTO.src}
                alt={FINAL_CTA_PHOTO.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
