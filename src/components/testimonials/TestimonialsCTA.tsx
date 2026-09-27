"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";

export function TestimonialsCTA() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden text-white text-center bg-gradient-to-r from-[#0F6E56] to-[#1D9E75]">
      {/* Background subtle dots */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="font-sans text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto mb-8">
            Join the lawyers and law graduates who prepared with XYZ and are now
            serving in Tamil Nadu&apos;s courts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo-class"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-emerald-800 font-bold text-sm shadow-md hover:bg-slate-50 transition-all duration-200"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/results"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border-[1.5px] border-white text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
            >
              <Trophy className="w-4 h-4" />
              <span>See Our Results →</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsCTA;
