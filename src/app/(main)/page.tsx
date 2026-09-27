import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import CoursesSection from "@/components/home/CoursesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import FacultySection from "@/components/home/FacultySection";
import ProcessSection from "@/components/home/ProcessSection";
import ToppersSection from "@/components/home/ToppersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ExamOverviewSection from "@/components/home/ExamOverviewSection";
import BatchesSection from "@/components/home/BatchesSection";
import DemoClassSection from "@/components/home/DemoClassSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

export default async function HomePage() {
  return (
    <>
      <SchemaMarkup
        type="home"
        data={{
          siteName: "XYZ Law Coaching",
          description: "Tamil Nadu judiciary coaching",
          url: process.env.NEXT_PUBLIC_SITE_URL || "",
          phone: "",
          email: "",
          address: "",
          establishedYear: "",
          courses: [],
        }}
      />
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
      <FinalCTASection />
    </>
  );
}
