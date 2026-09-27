"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialPullQuote {
  name: string;
  post: string;
  college: string;
  year: string;
  quote: string;
  photoUrl?: string | null;
}

const pullQuotes: TestimonialPullQuote[] = [
  {
    name: "Judge [Name 1]",
    post: "Civil Judge, Chennai District",
    college: "Government Law College, Chennai",
    year: "2024",
    quote:
      "I consider myself fortunate to have found XYZ at the right time. The mentorship I received changed the way I understood law — and I passed on my first attempt. The faculty does not just teach the syllabus. They teach you how to think.",
    photoUrl: null,
  },
  {
    name: "Judge [Name 2]",
    post: "Civil Judge, Coimbatore District",
    college: "Madras Law College",
    year: "2024",
    quote:
      "XYZ helped me ace my preparation, especially civil judgment writing. The online classes were structured and perfectly paced. The translation sessions are the best resource available anywhere for this exam.",
    photoUrl: null,
  },
  {
    name: "Judge [Name 3]",
    post: "Civil Judge, Madurai District",
    college: "Vels University, Chennai",
    year: "2023",
    quote:
      "The finest, most student-friendly institute I have encountered for judicial preparation. They never said 'you can do this alone' — they always said 'let us do this together.' That collaborative spirit makes all the difference.",
    photoUrl: null,
  },
];

export function ResultsTestimonials() {
  return (
    <section className="bg-[#F5F5F0] py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">
            Student Experiences
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark mt-2 mb-3">
            In Their Own Words
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Direct feedback from candidates who transformed their ambition into judicial appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pullQuotes.map((t, index) => {
            const initials = t.name
              .replace(/[\[\]]/g, "")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden group"
              >
                {/* Large decorative quotation mark background */}
                <div className="absolute top-4 right-6 text-navy-dark opacity-[0.08] pointer-events-none select-none group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-20 h-20 fill-current" />
                </div>

                {/* Quote Text */}
                <div className="relative z-10 mb-8">
                  <p className="font-heading italic text-navy-dark text-lg sm:text-[20px] leading-[1.6]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Student Info */}
                <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-navy-mid/10 border-2 border-emerald/30 flex items-center justify-center font-bold text-navy-dark text-sm">
                    {t.photoUrl ? (
                      <Image
                        src={t.photoUrl}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span>{initials || "TN"}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark text-sm sm:text-base">
                      {t.name}
                    </h4>
                    <p className="text-emerald text-xs sm:text-sm font-semibold">
                      {t.post}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {t.college} · Batch of {t.year}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ResultsTestimonials;
