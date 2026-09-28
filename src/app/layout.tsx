import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default:
      "Civil Judge & APP Exam Coaching in Tamil Nadu | XYZ Law Coaching",
    template: "%s | XYZ Law Coaching",
  },
  description:
    "XYZ Law Coaching is Tamil Nadu's trusted judiciary coaching institute for TNPSC Civil Judge, APP Exam, Patent Agent, Trademark Agent, UGC-NET & SET Law exams. 25+ students selected. Online & offline. Expert faculty.",
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
      name: "XYZ Law Coaching Tamil Nadu",
    },
  ],
  creator: "XYZ Law Coaching",
  publisher: "XYZ Law Coaching",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "XYZ Law Coaching Tamil Nadu",
    title:
      "Civil Judge & APP Exam Coaching in Tamil Nadu | XYZ Law Coaching",
    description:
      "Tamil Nadu's trusted judiciary coaching. 1000+ students, 25+ judges selected. Online & offline.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@xyzlawcoaching",
    creator: "@xyzlawcoaching",
    title:
      "Civil Judge & APP Exam Coaching | XYZ Law Coaching Tamil Nadu",
    description:
      "Tamil Nadu's trusted judiciary coaching. 25+ judges trained.",
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
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  category: "education",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
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

