import type { ReactNode } from "react";
import { BUSINESS, MESSAGES, waLink } from "./site";

export type FaqItem = {
  question: string;
  questionLang?: string;
  /** Plain-text answer, used for FAQPage structured data. */
  plain: string;
  answer: ReactNode;
};

const link = "font-semibold text-accent underline decoration-2 underline-offset-4 hover:text-accent-hover";

const wa = (message: string, label: string) => (
  <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={link}>
    {label}
  </a>
);

export const FAQ: FaqItem[] = [
  {
    question: "How do I book?",
    plain: `Message us on WhatsApp or call ${BUSINESS.phoneDisplay}. Tell us the piercing you want or your tattoo idea, and we'll take it from there.`,
    answer: (
      <>
        {wa(MESSAGES.general, "Message us on WhatsApp")} or call{" "}
        <a href={BUSINESS.phoneHref} className={link}>
          {BUSINESS.phoneDisplay}
        </a>
        . Tell us the piercing you want or your tattoo idea, and we&apos;ll take it from there.
      </>
    ),
  },
  {
    question: "Is it clean and sterile?",
    plain:
      "Cleanliness and sterilization are among the things our Google reviewers mention most. Want to know exactly how we work? Ask us on WhatsApp before your visit.",
    answer: (
      <>
        Cleanliness and sterilization are among the things our Google reviewers mention most.
        Want to know exactly how we work? {wa(MESSAGES.general, "Ask us on WhatsApp")} before your
        visit.
      </>
    ),
  },
  {
    question: "Parlez-vous français ?",
    questionLang: "fr",
    plain:
      "Yes! Nigelle Noir speaks French. Oui ! Nigelle Noir parle français. Écrivez-nous sur WhatsApp pour réserver.",
    answer: (
      <>
        Yes! Nigelle Noir speaks French.
        <span lang="fr" className="mt-2 block">
          Oui ! Nigelle Noir parle français. {wa(MESSAGES.nigelle, "Écrivez-nous sur WhatsApp")}{" "}
          pour réserver.
        </span>
      </>
    ),
  },
  {
    question: "Do you take walk-ins?",
    plain:
      "Send us a WhatsApp message before you come and we'll tell you when we can see you. It saves you a wasted trip.",
    answer: (
      <>
        {wa(MESSAGES.availability, "Send us a WhatsApp message")} before you come and we&apos;ll
        tell you when we can see you. It saves you a wasted trip.
      </>
    ),
  },
  {
    question: "How much does it cost?",
    plain:
      "Every piercing and tattoo is different, so we quote each one individually. Message us on WhatsApp for a quote.",
    answer: (
      <>
        Every piercing and tattoo is different, so we quote each one individually.{" "}
        {wa(MESSAGES.quote, "Message us on WhatsApp")} for a quote.
      </>
    ),
  },
  {
    question: "What about aftercare?",
    plain:
      "Aftercare depends on your piercing or tattoo. Ask us on WhatsApp and we'll tell you how to look after yours.",
    answer: (
      <>
        Aftercare depends on your piercing or tattoo. {wa(MESSAGES.general, "Ask us on WhatsApp")}{" "}
        and we&apos;ll tell you how to look after yours.
      </>
    ),
  },
];
