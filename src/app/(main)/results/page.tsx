import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TopperCard } from "@/components/shared/TopperCard";
import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Topper } from "@/types/topper";

export const metadata: Metadata = {
  title: "Results & Toppers | Selected Civil Judges & APPs in Tamil Nadu",
  description:
    "See our proud alumni serving as Civil Judges (Junior Division) and Assistant Public Prosecutors across Tamil Nadu courts.",
};

const ALL_TOPPERS: Topper[] = [
  {
    id: "1",
    name: "Adv. K. Rajesh",
    exam: "TNPSC Civil Judge",
    rank: "State Rank 4",
    year: 2023,
    post: "Civil Judge (Junior Division)",
    district: "Madurai District",
    quote: "The translation practice classes and weekly judgment writing reviews made the decisive difference in Mains.",
  },
  {
    id: "2",
    name: "Adv. S. Meenakshi",
    exam: "TNPSC APP Grade II",
    rank: "State Rank 2",
    year: 2023,
    post: "Assistant Public Prosecutor",
    district: "Chennai Metropolitan Court",
    quote: "Rigorous MCQ practice with criminal law scenario questions helped me sail through the prelims comfortably.",
  },
  {
    id: "3",
    name: "Adv. V. Ananth",
    exam: "TNPSC Civil Judge",
    rank: "State Rank 11",
    year: 2022,
    post: "Civil Judge (Junior Division)",
    district: "Coimbatore District",
    quote: "Personal mentorship and 1-on-1 mock interviews gave me immense poise during the High Court Viva-Voce.",
  },
  {
    id: "4",
    name: "Adv. P. Kavitha",
    exam: "TNPSC Civil Judge",
    rank: "State Rank 16",
    year: 2022,
    post: "Civil Judge (Junior Division)",
    district: "Tiruchirappalli District",
    quote: "Civil Procedure Code and judgment writing evaluated by advocates helped me structure my answers flawlessly.",
  },
  {
    id: "5",
    name: "Adv. M. Dinesh",
    exam: "TNPSC APP Grade II",
    rank: "State Rank 7",
    year: 2021,
    post: "Assistant Public Prosecutor",
    district: "Salem District Court",
    quote: "The comprehensive focus on minor penal statutes and evidence law was the secret behind my high score in APP Mains.",
  },
  {
    id: "6",
    name: "Adv. T. Nivetha",
    exam: "TNPSC Civil Judge",
    rank: "State Rank 21",
    year: 2021,
    post: "Civil Judge (Junior Division)",
    district: "Tirunelveli District",
    quote: "The mock interview panel with retired judges removed all my apprehension before facing the High Court bench.",
  },
];

export default function ResultsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading
          badge="Selection Track Record"
          title="25+ Selected Judicial Officers Across Tamil Nadu"
          subtitle="Real candidates, verified selections, and transformative legal journeys made possible through focused coaching."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-50 border text-center max-w-4xl mx-auto mb-16">
          {STATS.map((s, idx) => (
            <div key={idx}>
              <div className="flex justify-center">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ALL_TOPPERS.map((topper) => (
            <TopperCard key={topper.id} topper={topper} />
          ))}
        </div>
      </div>
    </div>
  );
}
