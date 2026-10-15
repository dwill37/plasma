"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE_OUT, MaskWords } from "@/components/ui/motion";
import { TATTOO_CARDS } from "@/lib/images";
import { MESSAGES, waLink } from "@/lib/site";

// Souvenirs and tributes both come straight from Google reviews
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
    tilt: -5,
    offset: "",
  },
  {
    title: "A tribute that matters",
    body: "Honor someone special with a piece you design together, carefully and at your pace.",
    photo: TATTOO_CARDS.tribute,
    pos: "object-[50%_45%]",
    cta: "Plan a tribute",
    message: MESSAGES.tribute,
    tilt: 4,
    offset: "md:mt-20",
  },
  {
    title: "Your idea, custom-made",
    body: "Bring a sketch, a photo or just a feeling. We talk it through, then send you a quote on WhatsApp.",
    photo: TATTOO_CARDS.idea,
    pos: "object-[55%_35%]",
    cta: "Share my idea",
    message: MESSAGES.idea,
    tilt: -4,
    offset: "md:mt-8",
  },
];

/** Service block 02. Rendered inside <Services />, which supplies the frame and anchor. */
export function Tattoos() {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="max-w-3xl">
        <h3 id="tattoo-title" className="display text-[clamp(2.25rem,5.5vw,4.25rem)] text-ink text-balance">
          <MaskWords text="Ink that means something." accents={{ "something.": "text-accent" }} />
        </h3>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          A memory of your trip, a tribute to someone you love, an idea you&apos;ve carried for
          years. Tell us the story and we&apos;ll draw it out with you.
        </p>
      </div>

      <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-6 lg:gap-10">
        {CARDS.map((card, i) => (
          <motion.li
            key={card.title}
            initial={reduce ? false : { opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.12 }}
            className={`group relative ${card.offset}`}
          >
            <div className="relative">
              {/* A fine stencil outline snaps into place behind the photo */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-[22px] ring-1 ring-accent/60"
                initial={reduce ? false : { rotate: 0, opacity: 0 }}
                whileInView={{ rotate: card.tilt, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.3 + i * 0.12 }}
              />
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-raised transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_0_40px_-10px_rgba(255,61,142,0.55)]"
              >
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
                    sizes="(min-width: 768px) 28vw, 88vw"
                    className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${card.pos}`}
                  />
                </motion.div>
              </motion.div>
            </div>
            <h4 className="display mt-8 text-[clamp(1.4rem,2vw,1.85rem)] leading-[1.04] tracking-[-0.04em] text-ink">
              {card.title}
            </h4>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-ink-soft">{card.body}</p>
            <Button
              href={waLink(card.message)}
              whatsapp
              variant={i === 0 ? "primary" : "ghost"}
              className="mt-6"
            >
              {card.cta}
            </Button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
