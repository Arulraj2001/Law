"use client";

import { motion } from "framer-motion";

export function ResultsTimeline() {
  const milestones = [
    {
      year: "2021",
      selections: 2,
      label: "Foundation Year",
      highlight: null,
    },
    {
      year: "2022",
      selections: 3,
      label: "Steady Expansion",
      highlight: null,
    },
    {
      year: "2023",
      selections: 7,
      label: "Breakthrough Batch",
      highlight: null,
    },
    {
      year: "2024",
      selections: 13,
      label: "Record Results",
      highlight: "Best year — 13 selections",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">
            Year by Year
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-navy-dark mt-2 mb-3">
            How Our Results Have Grown
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            From our founding batch to becoming Tamil Nadu&apos;s foremost judicial
            examination institute.
          </p>
        </div>

        {/* Timeline Desktop & Tablet */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-slate-200 z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-navy-mid via-emerald to-emerald-dark rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Year Circle (navy, 48px) */}
                <div className="w-12 h-12 rounded-full bg-navy-dark text-white font-heading font-bold text-sm flex items-center justify-center shadow-md border-4 border-white mb-4 ring-2 ring-navy-light/20">
                  {item.year}
                </div>

                {/* Number of selections (emerald, 32px, bold) */}
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald mb-1">
                  {item.selections}
                </span>

                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  selections
                </span>

                <span className="text-xs text-slate-400 font-medium mb-3">
                  {item.label}
                </span>

                {/* Highlight Badge if any */}
                {item.highlight && (
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold shadow-xs">
                    ⭐ {item.highlight}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsTimeline;
