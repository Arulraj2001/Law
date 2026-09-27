import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import CoursesSection from "@/components/home/CoursesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import FacultySection from "@/components/home/FacultySection";
import ProcessSection from "@/components/home/ProcessSection";
import { SEOTextSection } from "@/components/home/SEOTextSection";
import { SITE_CONFIG } from "@/lib/constants";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo/schemas";

// Below the fold sections loaded dynamically with shimmer fallbacks
const ToppersSection = dynamic(
  () => import("@/components/home/ToppersSection"),
  {
    loading: () => <div className="py-20 bg-white animate-pulse" />,
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
  {
    loading: () => <div className="py-20 bg-[#F5F5F0] animate-pulse" />,
  }
);

const ExamOverviewSection = dynamic(
  () => import("@/components/home/ExamOverviewSection"),
  {
    loading: () => <div className="py-20 bg-white animate-pulse" />,
  }
);

const BatchesSection = dynamic(
  () => import("@/components/home/BatchesSection"),
  {
    loading: () => <div className="py-20 bg-slate-50 animate-pulse" />,
  }
);

const DemoClassSection = dynamic(
  () => import("@/components/home/DemoClassSection"),
  {
    loading: () => <div className="py-20 bg-navy-dark animate-pulse" />,
  }
);

const BlogPreviewSection = dynamic(
  () => import("@/components/home/BlogPreviewSection"),
  {
    loading: () => <div className="py-20 bg-white animate-pulse" />,
  }
);

const FAQSection = dynamic(
  () => import("@/components/home/FAQSection"),
  {
    loading: () => <div className="py-20 bg-slate-50 animate-pulse" />,
  }
);

const FinalCTASection = dynamic(
  () => import("@/components/home/FinalCTASection"),
  {
    loading: () => <div className="py-16 bg-navy-dark animate-pulse" />,
  }
);

function HomepageSchemas() {
  const schemas = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema({
      phone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: SITE_CONFIG.address,
      mapUrl: SITE_CONFIG.mapUrl,
    }),
    breadcrumbSchema([{ name: "Home", href: "/" }]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

export default async function HomePage() {
  return (
    <>
      <HomepageSchemas />
      <HeroSection />
      <TrustBar />
      <CoursesSection />
      <WhyUsSection />
      <FacultySection />
      <ProcessSection />
      <ToppersSection />
      <TestimonialsSection />
      <ExamOverviewSection />
      <BatchesSection />
      <DemoClassSection />
      <BlogPreviewSection />
      <FAQSection />
      <SEOTextSection />
      <FinalCTASection />
    </>
  );
}
