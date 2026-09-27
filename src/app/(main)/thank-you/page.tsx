import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYouContent } from "@/components/thank-you/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You — We'll Be in Touch! | XYZ Law Coaching",
  description:
    "Thank you for reaching out to XYZ Law Coaching. We will contact you on WhatsApp within 2 hours to confirm your enquiry or demo class booking.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-dark" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
