import { Artists } from "@/components/sections/Artists";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { Nav } from "@/components/sections/Nav";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { WhyPlasma } from "@/components/sections/WhyPlasma";
import { Work } from "@/components/sections/Work";
import { FAQ } from "@/lib/faq";
import { BUSINESS } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TattooParlor",
      name: BUSINESS.fullName,
      ...(siteUrl ? { url: siteUrl, image: `${siteUrl}/opengraph-image.jpg` } : {}),
      telephone: BUSINESS.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${BUSINESS.street}, ${BUSINESS.neighborhood}`,
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.region,
        postalCode: BUSINESS.postalCode,
        addressCountry: "MX",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: BUSINESS.rating,
        bestRating: 5,
        reviewCount: BUSINESS.reviewCount,
      },
      amenityFeature: {
        "@type": "LocationFeatureSpecification",
        name: "LGBTQ+ friendly",
        value: true,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.plain },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <WhyPlasma />
        <Services />
        <Work />
        <Artists />
        <Reviews />
        <HowItWorks />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
