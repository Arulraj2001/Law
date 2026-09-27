import type { Metadata } from "next";
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
  title: {
    default: "Civil Judge & APP Exam Coaching in Tamil Nadu | XYZ",
    template: "%s | XYZ Law Coaching",
  },
  description:
    "XYZ is Tamil Nadu's trusted judiciary coaching institute for TNPSC Civil Judge, APP Exam, Patent Agent, Trademark Agent, UGC-NET and SET Law exams. Expert faculty, weekly mock tests, 25+ judges selected.",
  keywords: [
    "civil judge coaching Tamil Nadu",
    "APP exam coaching Chennai",
    "TNPSC civil judge coaching",
    "judiciary coaching Tamil Nadu",
    "patent agent exam coaching",
    "trademark agent exam coaching",
    "UGC NET law coaching Tamil Nadu",
    "SET law coaching Tamil Nadu",
  ],
  authors: [{ name: "XYZ Law Coaching" }],
  creator: "XYZ Law Coaching",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "XYZ Law Coaching",
    title: "Civil Judge & APP Exam Coaching in Tamil Nadu | XYZ",
    description:
      "Tamil Nadu's trusted judiciary coaching. 1000+ students, 25+ judges selected. Online & offline classes.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "XYZ Law Coaching Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Civil Judge & APP Exam Coaching in Tamil Nadu | XYZ",
    description: "Tamil Nadu's trusted judiciary coaching. 1000+ students, 25+ judges selected.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
