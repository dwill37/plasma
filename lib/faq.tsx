import type { ReactNode } from "react";
import { BUSINESS, MESSAGES, waLink } from "./site";

export type FaqItem = {
  question: string;
  questionLang?: string;
  /** Plain-text answer, used for FAQPage structured data. */
  plain: string;
  answer: ReactNode;
};

const link = "font-semibold text-violet underline decoration-2 underline-offset-4 hover:text-violet-deep";

export const FAQ: FaqItem[] = [
  {
    question: "How do I book?",
    plain: `Send us a message on WhatsApp at ${BUSINESS.phoneDisplay}. Tell us the piercing you want or your tattoo idea, and we'll confirm the details and your appointment together.`,
    answer: (
      <>
        Send us a message on{" "}
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className={link}>
          WhatsApp
        </a>{" "}
        at {BUSINESS.phoneDisplay}. Tell us the piercing you want or your tattoo idea, and
        we&apos;ll confirm the details and your appointment together.
      </>
    ),
  },
  {
    question: "How much does a piercing or tattoo cost?",
    plain:
      "Every piece is different, so we quote each one individually. Message us on WhatsApp with what you have in mind and we'll send you a quote.",
    answer: (
      <>
        Every piece is different, so we quote each one individually.{" "}
        <a href={waLink(MESSAGES.quote)} target="_blank" rel="noopener noreferrer" className={link}>
          Message us on WhatsApp
        </a>{" "}
        with what you have in mind and we&apos;ll send you a quote.
      </>
    ),
  },
  {
    question: "Is the studio clean and sterilized?",
    plain:
      "Yes. Cleanliness and sterilization are what our Google reviewers mention most when they talk about their visit.",
    answer:
      "Yes. Cleanliness and sterilization are what our Google reviewers mention most when they talk about their visit.",
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
          Oui ! Nigelle Noir parle français.{" "}
          <a
            href={waLink(MESSAGES.nigelle)}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            Écrivez-nous sur WhatsApp
          </a>{" "}
          pour réserver.
        </span>
      </>
    ),
  },
  {
    question: "Is the studio LGBTQ+ friendly?",
    plain: "Yes. PLASMA is an LGBTQ+ friendly studio, and everyone is welcome here.",
    answer: "Yes. PLASMA is an LGBTQ+ friendly studio, and everyone is welcome here.",
  },
];
