import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/ui/motion-provider";
import { googleSans, googleSansCode } from "@/lib/fonts";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "QWY Software | Odoo ERP, custom software and applied AI",
    template: "%s | QWY Software",
  },
  description: SITE.description,
  keywords: [
    "Odoo partner Kerala",
    "Odoo implementation India",
    "ERP Thiruvananthapuram",
    "custom software development",
    "AI solutions for business",
    "Technopark software company",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "QWY Software: build the intelligent core of your business",
    description: SITE.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "QWY Software: build the intelligent core of your business",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/brand/fav-icon.webp", type: "image/webp" }],
    apple: [{ url: "/brand/fav-icon.webp", type: "image/webp" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo.png`,
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  sameAs: SITE.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${googleSans.variable} ${googleSansCode.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
