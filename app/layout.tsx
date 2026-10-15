import type { Metadata, Viewport } from "next";
import { Geist, Unbounded } from "next/font/google";
import { Providers } from "@/components/Providers";
import { BUSINESS } from "@/lib/site";
import "./globals.css";

const display = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/** Set NEXT_PUBLIC_SITE_URL once the site has a domain (enables canonical + absolute OG URLs). */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const title = "PLASMA | Body Piercing & Tattoo Studio in Playa del Carmen";
const description = `Clean, sterilized body piercing and meaningful tattoos in Ejidal, Playa del Carmen. Rated ${BUSINESS.rating}/5 from ${BUSINESS.reviewCount} Google reviews. LGBTQ+ friendly, French-speaking artist. Book on WhatsApp.`;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title,
  description,
  keywords: [
    "body piercing Playa del Carmen",
    "tattoo Playa del Carmen",
    "piercing studio Playa del Carmen",
    "tattoo studio Ejidal",
    "French speaking tattoo artist Playa del Carmen",
    "LGBTQ+ friendly tattoo studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PLASMA",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#ede8ff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-violet px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
