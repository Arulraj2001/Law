"use client";

import { Star, CheckCircle2 } from "lucide-react";

const DEMO_STORIES = [
  {
    name: "A. Karthikeyan",
    role: "Civil Judge (Junior Division)",
    district: "Salem District Court",
    year: "2024 Batch",
    quote:
      "I was skeptical about online judicial coaching until I attended XYZ's free demo class. The clarity with which they broke down the CrPC provisions convinced me immediately.",
    rating: 5,
  },
  {
    name: "R. Meenakshi",
    role: "Assistant Public Prosecutor",
    district: "Madurai District",
    year: "2023 Batch",
    quote:
      "The demo class wasn't just a sales pitch — it was an actual 60-minute in-depth masterclass on translation and criminal procedure. I enrolled that evening itself.",
    rating: 5,
  },
];

export function DemoTestimonial() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200/60">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-navy-mid px-3 py-1 rounded-full bg-navy-tint mb-3">
            Real Aspirant Stories
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-dark">
            From Demo Class to Judicial Office
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            See how a single free demo lecture helped current judges take their first decisive step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DEMO_STORIES.map((story, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(story.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed mb-6">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-navy-dark text-base">
                    {story.name}
                  </h4>
                  <p className="text-xs text-emerald font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {story.role}
                  </p>
                  <p className="text-xs text-slate-500">{story.district} · {story.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
