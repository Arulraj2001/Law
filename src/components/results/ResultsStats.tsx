"use client";

import { motion } from "framer-motion";

export function ResultsStats() {
  const examCategories = [
    {
      name: "Civil Judge",
      count: 18,
      widthPercent: 72,
      barColor: "bg-navy-dark",
      textColor: "text-navy-dark",
    },
    {
      name: "APP Exam",
      count: 7,
      widthPercent: 28,
      barColor: "bg-emerald",
      textColor: "text-emerald",
    },
    {
      name: "Other Judicial",
      count: "3+",
      widthPercent: 12,
      barColor: "bg-navy-light",
      textColor: "text-navy-light",
    },
  ];

  const yearWise = [
    { year: "2021", count: 2, heightPercent: 18 },
    { year: "2022", count: 3, heightPercent: 26 },
    { year: "2023", count: 7, heightPercent: 55 },
    { year: "2024", count: 13, heightPercent: 100 },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: Breakdown by Exam */}
          <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-navy-dark mb-6">
              Selections by Exam Category
            </h3>

            <div className="space-y-6">
              {examCategories.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-navy-dark text-sm sm:text-base">
                      {cat.name}
                    </span>
                    <span
                      className={`font-bold font-heading text-base sm:text-lg ${cat.textColor}`}
                    >
                      {cat.count} selections
                    </span>
                  </div>

                  <div className="h-8 w-full bg-slate-200 rounded-full overflow-hidden p-1 flex items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.widthPercent}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: "easeOut",
                      }}
                      className={`h-full ${cat.barColor} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Selections by Year */}
          <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-navy-dark mb-6">
              Selections by Year
            </h3>

            <div className="h-64 flex items-end justify-between gap-4 pt-8 px-2 sm:px-6 border-b border-slate-200">
              {yearWise.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-1 h-full justify-end"
                >
                  {/* Count above bar */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    className="font-heading font-bold text-sm sm:text-base text-emerald mb-2"
                  >
                    {item.count}
                  </motion.span>

                  {/* Vertical bar container */}
                  <div className="w-10 sm:w-14 bg-slate-200/70 rounded-t-xl overflow-hidden h-[180px] flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${item.heightPercent}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.8,
                        delay: idx * 0.15,
                        ease: "easeOut",
                      }}
                      className="w-full bg-gradient-to-t from-emerald-dark to-emerald rounded-t-lg shadow-sm"
                    />
                  </div>

                  {/* Year label below */}
                  <span className="font-medium text-xs sm:text-sm text-navy-dark mt-3">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note below charts */}
        <p className="text-center text-slate-500 text-xs italic mt-8">
          Numbers updated as of 2026. Contact us to verify current selections.
        </p>
      </div>
    </section>
  );
}

export default ResultsStats;
