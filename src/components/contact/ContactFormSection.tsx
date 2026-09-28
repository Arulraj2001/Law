"use client";

import { useRouter } from "next/navigation";
import { LeadForm } from "@/components/shared/LeadForm";
import { COURSES } from "@/lib/constants";
import { ContactInfo } from "@/components/contact/ContactInfo";
import type { SiteConfig } from "@/lib/site-config";

interface ContactFormSectionProps {
  config?: SiteConfig;
}

export function ContactFormSection({ config }: ContactFormSectionProps = {}) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/thank-you?type=contact");
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Enquiry Form (60% on desktop = col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-navy-dark">
                  Send Us a Message
                </h2>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  We typically respond within 2 hours during business hours.
                </p>
              </div>

              <LeadForm
                formType="contact"
                courseOptions={COURSES.map((c) => c.title)}
                buttonText="Send Message"
                buttonVariant="primary"
                source="contact_page"
                onSuccess={handleSuccess}
                className="p-0 border-0 shadow-none !space-y-4"
              />
            </div>
          </div>

          {/* RIGHT: Contact Information (40% on desktop = col-span-5) */}
          <div className="lg:col-span-5">
            <ContactInfo config={config} />
          </div>
        </div>
      </div>
    </section>
  );
}
