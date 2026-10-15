import type { StaticImageData } from "next/image";

import heroSleeve from "@/public/images/hero-fluid-sleeve.jpg";
import artistAtWork from "@/public/images/artist-at-work.jpg";
import storefront from "@/public/images/storefront.jpg";
import piercing1 from "@/public/images/piercing-1.jpg";
import piercing2 from "@/public/images/piercing-2.jpg";
import piercing3 from "@/public/images/piercing-3.jpg";
import piercing4 from "@/public/images/piercing-4.jpg";
import piercing5 from "@/public/images/piercing-5.jpg";
import piercing6 from "@/public/images/piercing-6.jpg";
import piercing7 from "@/public/images/piercing-7.jpg";
import piercing8 from "@/public/images/piercing-8.jpg";
import piercing9 from "@/public/images/piercing-9.jpg";
import piercing10 from "@/public/images/piercing-10.jpg";
import piercing11 from "@/public/images/piercing-11.jpg";
import tattoo1 from "@/public/images/tattoo-1.jpg";
import tattoo2 from "@/public/images/tattoo-2.jpg";
import tattoo3 from "@/public/images/tattoo-3.jpg";
import tattoo4 from "@/public/images/tattoo-4.jpg";
import tattoo5 from "@/public/images/tattoo-5.jpg";
import tattoo6 from "@/public/images/tattoo-6.jpg";
import tattoo7 from "@/public/images/tattoo-7.jpg";
import tattoo8 from "@/public/images/tattoo-8.jpg";
import tattoo9 from "@/public/images/tattoo-9.jpg";
import tattoo11 from "@/public/images/tattoo-11.jpg";
import tattoo12 from "@/public/images/tattoo-12.jpg";
import tattoo13 from "@/public/images/tattoo-13.jpg";
import tattoo14 from "@/public/images/tattoo-14.jpg";
import tattoo15 from "@/public/images/tattoo-15.jpg";

export type Photo = { src: StaticImageData; alt: string };
export type Category = "piercing" | "tattoo" | "studio";
export type WorkPhoto = Photo & { id: string; category: Category };

export const HERO: Photo = {
  src: heroSleeve,
  alt: "Full-arm blackwork tattoo of flowing, liquid-like swirls from shoulder to wrist, worn by a client in a white tank top inside the bright PLASMA studio",
};

export const PIERCING_SHOWCASE: Photo[] = [
  {
    src: piercing10,
    alt: "Smiling client with freckles wearing two small studs in both nostrils and a jeweled septum ring",
  },
  {
    src: piercing5,
    alt: "Close-up of an upper ear helix with a climber stud of five marquise-cut clear stones",
  },
  {
    src: piercing9,
    alt: "Ear helix with a jeweled hoop and three fine chains draping below it",
  },
];

export const TATTOO_CARDS = {
  souvenir: {
    src: tattoo7,
    alt: "Fine-line tattoo of the Chichén Itzá pyramid with a palm tree and moon on a client's upper arm, photographed in front of the real pyramid",
  },
  tribute: {
    src: tattoo12,
    alt: "Black and grey forearm tattoo of a sunflower, a rose, a lily and a butterfly in delicate fine line",
  },
  idea: {
    src: tattoo4,
    alt: "Illustrative upper-arm tattoo of a young warrior woman with a red mask and red face paint holding a dagger, with small forest spirits around her",
  },
} satisfies Record<string, Photo>;

export const ARTIST_AT_WORK: Photo = {
  src: artistAtWork,
  alt: "PLASMA artist in black gloves smiling while tattooing a client's back under a bright lamp",
};

export const STOREFRONT: Photo = {
  src: storefront,
  alt: "PLASMA storefront at night with its large hand-lettered sign reading Tattoo Shop, Smoke, Piercings, Shirts above an open glass entrance",
};

/** Portfolio, ordered to alternate categories and formats for a lively masonry. */
export const WORK: WorkPhoto[] = [
  { id: "t10", category: "tattoo", src: heroSleeve, alt: HERO.alt },
  { id: "p10", category: "piercing", src: piercing10, alt: PIERCING_SHOWCASE[0].alt },
  { id: "t3", category: "tattoo", src: tattoo3, alt: "Black and grey tattoo of a skeleton couple embracing, the man in a sombrero and the woman with a flower in her hair, on a client's arm" },
  { id: "s1", category: "studio", src: storefront, alt: STOREFRONT.alt },
  { id: "p5", category: "piercing", src: piercing5, alt: PIERCING_SHOWCASE[1].alt },
  { id: "t5", category: "tattoo", src: tattoo5, alt: "Thigh tattoo of a winged insect with an eye at its center, under a crescent moon and framed by fine leaves and dots" },
  { id: "p8", category: "piercing", src: piercing8, alt: "Cheek dermal piercing topped with an iridescent opal-like stone just below the eye" },
  { id: "t7", category: "tattoo", src: tattoo7, alt: TATTOO_CARDS.souvenir.alt },
  { id: "t1", category: "tattoo", src: tattoo1, alt: "Forearm and elbow blackwork tattoo of organic, melting contour lines with soft shading" },
  { id: "p1", category: "piercing", src: piercing1, alt: "Close-up of a septum piercing with a gold-tone ornamental clicker set with three clear round stones and beaded details" },
  { id: "t4", category: "tattoo", src: tattoo4, alt: TATTOO_CARDS.idea.alt },
  { id: "p9", category: "piercing", src: piercing9, alt: PIERCING_SHOWCASE[2].alt },
  { id: "s2", category: "studio", src: artistAtWork, alt: ARTIST_AT_WORK.alt },
  { id: "t12", category: "tattoo", src: tattoo12, alt: TATTOO_CARDS.tribute.alt },
  { id: "p11", category: "piercing", src: piercing11, alt: "Conch piercing in the inner ear with a cluster of four clear stones and small beads" },
  { id: "t11", category: "tattoo", src: tattoo11, alt: "Fine-line upper-arm tattoo of a woman's face with sugar skull details under a large rose" },
  { id: "p2", category: "piercing", src: piercing2, alt: "Silver double-band ring jewelry with a row of clear stones resting on a dark rock" },
  { id: "t15", category: "tattoo", src: tattoo15, alt: "Forearm tattoo of a humpback whale breaching through swirling waves, in black and grey" },
  { id: "t6", category: "tattoo", src: tattoo6, alt: "Forearm tattoo of interlocking rings covered in eyes, surrounded by wings and flames" },
  { id: "p3", category: "piercing", src: piercing3, alt: "Rose-gold-tone septum clicker with a curved row of clear stones and beaded edge, displayed on a dark rock" },
  { id: "t9", category: "tattoo", src: tattoo9, alt: "Colorful calf tattoo of a lion's face woven into pink and blue flowers and butterflies, with an ornamental line" },
  { id: "t14", category: "tattoo", src: tattoo14, alt: "Black and grey forearm tattoo of a betta fish with long flowing fins" },
  { id: "p7", category: "piercing", src: piercing7, alt: "Thin hoop jewelry set with a small pink stone, resting on a piece of wood" },
  { id: "t2", category: "tattoo", src: tattoo2, alt: "Wrist tattoo of a puzzle piece with a keyhole and ornamental swirls in black and grey" },
  { id: "t13", category: "tattoo", src: tattoo13, alt: "Illustrative upper-arm tattoo of a hand gripping a straight razor among sprigs of leaves" },
  { id: "p6", category: "piercing", src: piercing6, alt: "Fine silver chain jewelry draped over a dark rock" },
  { id: "t8", category: "tattoo", src: tattoo8, alt: "Freshly done color tattoo of interlocking puzzle shapes in teal, green, orange and red on a client's upper arm" },
  { id: "p4", category: "piercing", src: piercing4, alt: "Two clients side by side showing matching finger piercings with dark red heart and spike tops" },
];

export const FINAL_CTA_PHOTO = ARTIST_AT_WORK;
