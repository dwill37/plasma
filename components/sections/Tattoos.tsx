"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE_OUT, MaskWords } from "@/components/ui/motion";
import { TATTOO_CARDS } from "@/lib/images";
import { MESSAGES, waLink } from "@/lib/site";

const CARDS = [
  {
    title: "A souvenir of Mexico",
    body: (
      <>
        Take a piece of your trip home, for good. In one reviewer&apos;s words: &ldquo;a beautiful
        souvenir of Mexico.&rdquo;
      </>
    ),
    photo: TATTOO_CARDS.souvenir,
    pos: "object-[78%_50%]",
    cta: "Plan my souvenir",
    message: MESSAGES.souvenir,
    accent: "bg-plasma",
    tilt: -7,
    offset: "",
  },
  {
    title: "A tribute that matters",
    body: "Honor someone special with a piece you design together, carefully and at your pace.",
    photo: TATTOO_CARDS.tribute,
    pos: "object-[50%_45%]",
    cta: "Plan a tribute",
    message: MESSAGES.tribute,
    accent: "bg-violet",
    tilt: 6,
    offset: "md:mt-24",
  },
  {
    title: "Your idea, listened to",
    body: "Bring a sketch, a photo or just a feeling. We talk it through, then send you a quote on WhatsApp.",
    photo: TATTOO_CARDS.idea,
    pos: "object-[55%_35%]",
    cta: "Share my idea",
    message: MESSAGES.idea,
    accent: "bg-lilac-deep",
    tilt: -5,
    offset: "md:mt-10",
  },
];

export function Tattoos() {
  const reduce = useReducedMotion();

  return (
    <section
      id="tattoos"
      aria-labelledby="tattoos-title"
      className="relative overflow-clip bg-paper py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2
            id="tattoos-title"
            className="display text-[clamp(2.5rem,6.5vw,5rem)] text-ink text-balance"
          >
            <MaskWords text="Ink that means something." accents={{ "something.": "text-plasma-ink" }} />
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            A memory of your trip, a tribute to someone you love, an idea you&apos;ve carried for
            years. Tell us the story and we&apos;ll draw it out with you.
          </p>
        </div>

        <ul className="mt-16 grid gap-14 md:grid-cols-3 md:gap-6 lg:gap-10">
          {CARDS.map((card, i) => (
            <motion.li
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 90 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: i * 0.12 }}
              className={`group relative ${card.offset}`}
            >
              <div className="relative">
                {/* Accent shape slides in behind the photo */}
                <motion.div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-[28px] ${card.accent}`}
                  initial={reduce ? false : { x: -40, rotate: 0, opacity: 0 }}
                  whileInView={{ x: 0, rotate: card.tilt, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.25 + i * 0.12 }}
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-lilac">
                  <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.22 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.5, ease: EASE_OUT, delay: i * 0.12 }}
                  >
                    <Image
                      src={card.photo.src}
                      alt={card.photo.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${card.pos}`}
                    />
                  </motion.div>
                </div>
              </div>
              <h3 className="display mt-8 text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.02] tracking-[-0.04em] text-ink">
                {card.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-ink-soft">
                {card.body}
              </p>
              <Button
                href={waLink(card.message)}
                whatsapp
                variant={i === 0 ? "plasma" : i === 1 ? "primary" : "ghost"}
                className="mt-6"
              >
                {card.cta}
              </Button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
