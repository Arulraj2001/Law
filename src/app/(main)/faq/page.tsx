import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | TNPSC Judiciary & APP Exams",
  description:
    "Everything you need to know about TNPSC Civil Judge exam eligibility, Tamil translation paper, new criminal laws, fees, and batch options.",
};

export default function FAQPage() {
  const faqSchemaData = {
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="py-16 md:py-24">
      <SchemaMarkup type="FAQ" data={faqSchemaData} />
      <div className="container px-4 sm:px-8 max-w-4xl mx-auto">
        <SectionHeading
          badge="Aspirant Helpdesk"
          title="Frequently Asked Questions"
          subtitle="Clear, verified answers to common questions about eligibility, batch timings, translation papers, and criminal law changes."
        />

        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-200 rounded-lg px-6 bg-white"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-navy-dark hover:no-underline py-5 text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
