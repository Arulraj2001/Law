import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Law Blog & Exam Updates | XYZ Law Coaching",
  description:
    "Expert articles on BNS, BNSS, BSA, TNPSC Civil Judge exam preparation strategies, legal translation tips, and judicial notifications.",
};

const ARTICLES = [
  {
    slug: "bns-vs-ipc-major-changes-civil-judge-exam",
    title: "Key Changes from IPC to Bharatiya Nyaya Sanhita (BNS) for Civil Judge Aspirants",
    excerpt:
      "A section-by-section comparison of essential offences, sentencing guidelines, and community service provisions under BNS 2023.",
    date: "September 2024",
    author: "Legal Research Team",
    category: "Criminal Law",
  },
  {
    slug: "mastering-tamil-to-english-legal-translation",
    title: "How to Score 70+ in TNPSC Civil Judge Legal Translation Paper",
    excerpt:
      "Tactical guidelines for translating Tamil plaints, FIRs, and witness depositions into English with judicial terminology.",
    date: "August 2024",
    author: "Judicial Translation Faculty",
    category: "Translation",
  },
  {
    slug: "patent-agent-exam-2025-preparation-strategy",
    title: "Complete Roadmap for CGPDTM Patent Agent Examination 2025",
    excerpt:
      "Paper 1 patent acts and Paper 2 patent drafting strategies that help candidates clear in their very first attempt.",
    date: "August 2024",
    author: "Patent Faculty",
    category: "IP Law",
  },
  {
    slug: "judgment-writing-techniques-civil-judge-mains",
    title: "Art of Judgment Writing: Essential Framework for Civil Judge Mains",
    excerpt:
      "Framing issues, evaluating conflicting oral testimonies, and applying precedent to write watertight judicial decrees.",
    date: "July 2024",
    author: "Senior Advocate Faculty",
    category: "Civil Law",
  },
  {
    slug: "bnss-arrest-and-bail-procedural-nuances",
    title: "Arrest, Custody & Bail Reforms under Bharatiya Nagarik Suraksha Sanhita (BNSS)",
    excerpt:
      "Important procedural changes under BNSS 2023 relevant for both TNPSC Civil Judge and APP examinations.",
    date: "July 2024",
    author: "Criminal Law Team",
    category: "Criminal Procedure",
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading
          badge="Knowledge Hub"
          title="Legal Insights, Notes & Exam Strategy"
          subtitle="Articles written by practicing advocates and legal academicians to keep you ahead in judicial examination preparation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ARTICLES.map((article) => (
            <Card key={article.slug} className="flex flex-col justify-between border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald bg-emerald-tint px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-lg text-navy-dark leading-snug">
                  {article.title}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {article.author}
                </span>
                <Link href={`/blog/${article.slug}`}>
                  <Button variant="ghost" size="sm" className="text-xs font-semibold text-navy-mid hover:text-emerald p-0">
                    Read &rarr;
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
