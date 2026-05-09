import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const TITLE = "Zia Dental Consultants | Trusted Dentist in G-6, Islamabad";
const DESCRIPTION =
  "Warm, modern dental care in G-6 Markaz, Islamabad. General dentistry, cosmetic dentistry, orthodontics & more. Open daily until 9 PM. Book now: 0333 5100708";
const OG_IMAGE =
  "https://zia-smiles-site.lovable.app/assets/hero-clinic-BzVgT24M.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "dental clinic islamabad",
    "dentist g-6",
    "orthodontist islamabad",
    "dr adeel rehman",
    "zia dental consultants",
    "braces islamabad",
    "clear aligners islamabad",
    "cosmetic dentistry islamabad",
    "root canal islamabad",
    "pediatric dentist islamabad",
  ],
  authors: [{ name: SITE.doctor.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE.url,
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE.name,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.doctor.title} in Islamabad`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Dentist"],
  "@id": `${SITE.url}#clinic`,
  name: SITE.name,
  alternateName: SITE.shortName,
  image: OG_IMAGE,
  logo: `${SITE.url}/favicon.svg`,
  url: SITE.url,
  telephone: SITE.contact.phoneFormatted,
  email: SITE.contact.email,
  priceRange: "$$",
  description: DESCRIPTION,
  slogan: SITE.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.location.address}, ${SITE.location.area}`,
    addressLocality: SITE.location.city,
    postalCode: SITE.location.postal,
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.7193,
    longitude: 73.0651,
  },
  hasMap: SITE.location.mapsHref,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:00",
      closes: "21:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: SITE.doctor.name,
    jobTitle: SITE.doctor.title,
    qualifications: SITE.doctor.credentials,
  },
  employee: [
    {
      "@type": "Person",
      name: SITE.doctor.name,
      jobTitle: SITE.doctor.title,
    },
  ],
  medicalSpecialty: ["Orthodontics", "CosmeticDentistry", "GeneralDentistry"],
  areaServed: {
    "@type": "City",
    name: "Islamabad",
  },
  sameAs: [SITE.social.facebook, SITE.social.instagram],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
