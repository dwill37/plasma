/**
 * Single source of truth for PLASMA's business facts and booking links.
 * Every fact here comes from the studio's Google Business Profile.
 */

/** Flip to false to hide the smoke shop block and its nav link. */
export const SHOW_SMOKE_SHOP = true;

export const BUSINESS = {
  name: "PLASMA",
  fullName: "\"PLASMA\" Body Piercing - Tattoo & Smoke Shop",
  rating: 4.8,
  reviewCount: 124,
  street: "Ejido Sur",
  neighborhood: "Ejidal",
  postalCode: "77712",
  city: "Playa del Carmen",
  region: "Quintana Roo",
  regionShort: "Q.R.",
  country: "México",
  plusCode: "JWG4+34 Playa del Carmen, Quintana Roo, México",
  plusCodeShort: "JWG4+34",
  phoneDisplay: "+52 984 256 8135",
  phoneHref: "tel:+529842568135",
  whatsappNumber: "529842568135",
  /** Decoded from Open Location Code 76GJJWG4+34 (center of the code area). */
  geo: { latitude: 20.62519, longitude: -87.09469 },
} as const;

export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.neighborhood}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.regionShort}, ${BUSINESS.country}`;

export const MESSAGES = {
  general: "Hi PLASMA! I'd like info about a piercing/tattoo:",
  piercing: "Hi PLASMA! I'd like info about a piercing:",
  souvenir: "Hi PLASMA! I'd love a tattoo as a souvenir of my trip to Mexico:",
  tribute: "Hi PLASMA! I'd like a tattoo as a tribute to someone special:",
  idea: "Hi PLASMA! I have a tattoo idea and I'd like a quote:",
  shop: "Hi PLASMA! I'd like info about your smoke shop:",
  shauna: "Hi PLASMA! I'd like to book a tattoo with Shauna:",
  nigelle: "Hi PLASMA! I'd like to book with Nigelle Noir:",
  quote: "Hi PLASMA! I'd like a quote for:",
  availability: "Hi PLASMA! When can I come by the shop?",
} as const;

export function waLink(message: string = MESSAGES.general) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const MAPS_QUERY = "PLASMA Body Piercing Tattoo Ejido Sur Ejidal 77712 Playa del Carmen";

export const GOOGLE_REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "PLASMA Body Piercing Tattoo Playa del Carmen",
)}`;

export const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&ll=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}&z=16&output=embed`;

export const NAV_LINKS = [
  { href: "#piercing", label: "Piercing" },
  { href: "#tattoo", label: "Tattoo" },
  ...(SHOW_SMOKE_SHOP ? [{ href: "#shop", label: "Shop" }] : []),
  { href: "#team", label: "Team" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
  { href: "#faq", label: "FAQ" },
];
