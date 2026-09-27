import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = (slug || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} | XYZ Law Coaching`,
    description: `Detailed guide and legal analysis on ${title} for judicial exam aspirants.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <article className="py-16 md:py-24">
      <div className="container px-4 sm:px-8 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-navy-mid hover:text-emerald mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>

        <header className="mb-10 space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald bg-emerald-tint rounded-full">
            Legal Analysis
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-navy-dark leading-tight capitalize">
            {(slug || "").replace(/-/g, " ")}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-navy-mid" />
              Published Recently
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-navy-mid" />
              XYZ Legal Academic Panel
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-navy-mid" />
              6 min read
            </span>
          </div>
        </header>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
          <p className="text-lg font-medium text-navy-dark leading-relaxed">
            The ongoing evolution of the criminal justice system in India with the enactment of the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) requires a strategic reorientation for judicial service aspirants.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy-dark pt-4">1. Core Conceptual Shifts</h2>
          <p>
            Candidates preparing for the TNPSC Civil Judge and APP examinations must grasp both the structural reorganization and the substantive novelties introduced under the new codes. Special attention must be paid to revised section mappings, newly recognized offenses, and expanded definitions of digital and electronic records.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy-dark pt-4">2. High-Yield Topics for Prelims &amp; Mains</h2>
          <p>
            In the preliminary screening examination, comparative questions contrasting former sections with new penal provisions are of primary importance. In the descriptive mains paper, the candidate&apos;s ability to state the relevant provisions alongside landmark judicial pronouncements determines top-tier scoring.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy-dark pt-4">3. Recommended Study Approach</h2>
          <p>
            Make use of comparative tables, maintain handwritten notes of key modifications, and practice drafting charges and framing issues weekly. Our classroom and online lecture series cover all comparative nuances systematically.
          </p>
        </div>

        <div className="mt-12 p-8 rounded-xl bg-slate-50 border text-center space-y-4">
          <h3 className="font-heading font-bold text-xl text-navy-dark">
            Join Our Judiciary Coaching Batches
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Get comprehensive study materials, comparative bare act charts, and weekly mock test evaluations updated for the current exam pattern.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/demo-class">
              <Button className="bg-emerald hover:bg-emerald-dark text-white">
                Book Free Demo Class
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
