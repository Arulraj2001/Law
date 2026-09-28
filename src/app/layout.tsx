import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

import { getSiteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: config.seo.title,
      template: `%s | ${config.name}`,
    },
    description: config.seo.description,
    keywords: [
      "civil judge coaching Tamil Nadu",
      "TNPSC civil judge coaching",
      "APP exam coaching Tamil Nadu",
      "judiciary coaching Tamil Nadu",
      "civil judge coaching Chennai",
      "APP exam coaching Chennai",
      "patent agent exam coaching",
      "trademark agent exam coaching",
      "UGC NET law coaching Tamil Nadu",
      "SET law coaching Tamil Nadu",
      "Tamil Nadu judicial service coaching",
      "civil judge exam preparation 2026",
    ],
    authors: [
      {
        name: `${config.name} Tamil Nadu`,
      },
    ],
    creator: config.name,
    publisher: config.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: `${config.name} Tamil Nadu`,
      title: config.seo.title,
      description: config.seo.description,
    },
    twitter: {
      card: "summary_large_image",
      site: "@xyzlawcoaching",
      creator: "@xyzlawcoaching",
      title: config.seo.title,
      description: config.seo.description,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    },
    alternates: {
      canonical: siteUrl,
    },
    category: "education",
  };
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {children}
      </body>
    </html>
  );
}

