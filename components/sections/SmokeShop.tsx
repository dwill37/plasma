"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE_OUT, MaskWords } from "@/components/ui/motion";
import { STOREFRONT } from "@/lib/images";
import { MESSAGES, waLink } from "@/lib/site";

/**
 * Service block 03. Hidden everywhere (block + nav link) by SHOW_SMOKE_SHOP in lib/site.ts.
 * No products or age rules are listed yet, so the copy only invites a message.
 */
export function Shop() {
  const reduce = useReducedMotion();

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
      {/* The in-view trigger lives on an unclipped wrapper: a fully clipped element never intersects */}
      <motion.div
        className="lg:col-span-6"
        initial={reduce ? false : "hide"}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div
          className="relative aspect-[16/11] overflow-hidden rounded-[24px]"
          variants={{
            hide: { clipPath: "inset(0% 100% 0% 0% round 24px)" },
            show: { clipPath: "inset(0% 0% 0% 0% round 24px)" },
          }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <Image
            src={STOREFRONT.src}
            alt={STOREFRONT.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="lg:col-span-5 lg:col-start-8"
        initial={reduce ? false : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
      >
        <h3
          id="shop-title"
          className="display text-[clamp(2.25rem,5.5vw,4.25rem)] text-ink text-balance"
        >
          <MaskWords
            text="Smoke shop, same sign."
            accents={{ "sign.": "text-accent" }}
          />
        </h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          PLASMA is also a smoke shop. Look for the big hand-lettered sign in
          Ejidal, or message us first to ask what&apos;s in store.
        </p>
        <Button
          href={waLink(MESSAGES.shop)}
          size="lg"
          whatsapp
          variant="ghost"
          className="mt-9"
        >
          Ask about the shop
        </Button>
      </motion.div>
    </div>
  );
}
