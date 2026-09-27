import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You | XYZ Law Coaching",
  description: "Thank you for contacting XYZ Law Coaching. Our team will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="py-20 md:py-32">
      <div className="container px-4 sm:px-8 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-tint text-emerald flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-dark tracking-tight">
          Thank You for Reaching Out!
        </h1>

        <p className="text-slate-600 text-base leading-relaxed">
          We have received your details. One of our senior academic counselors will review your profile and connect with you via WhatsApp or Phone within 2 business hours.
        </p>

        <div className="p-6 rounded-xl bg-slate-50 border text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Need Immediate Assistance?</p>
          <p>You can chat directly with our admissions coordinator on WhatsApp:</p>
          <p className="text-navy-mid font-semibold">{SITE_CONFIG.phone}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button variant="outline" className="border-navy-mid text-navy-mid hover:bg-navy-mid hover:text-white">
              Return to Homepage
            </Button>
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi,%20I%20just%20submitted%20the%20inquiry%20form.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
