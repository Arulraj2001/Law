"use client";

import { motion } from "framer-motion";
import { Brain, Target, Users } from "lucide-react";

const philosophies = [
  {
    icon: Brain,
    iconColor: "text-emerald-400",
    title: "Courts Over Textbooks",
    text: "We teach law the way courts interpret and apply it. Every concept is anchored in real cases, real judgments, real courtrooms.",
  },
  {
    icon: Target,
    iconColor: "text-amber-400",
    title: "Exam-First Strategy",
    text: "Every topic is taught with the exam in mind. We never teach what is not relevant to the TNPSC exam — your time is too valuable.",
  },
  {
    icon: Users,
    iconColor: "text-emerald-400",
    title: "Individual Attention",
    text: "Batch size is kept small intentionally. Every student gets personal attention, individual progress tracking, and customised revision plans.",
  },
];

export function FacultyPhilosophy() {
  return (
    <section className="bg-navy-dark text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-[32px] text-white">
            Our Teaching Philosophy
          </h2>
          <div className="w-16 h-1 bg-emerald mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="bg-white/10 border border-white/15 rounded-xl p-6 sm:p-8 backdrop-blur-sm hover:bg-white/[0.14] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-5 inline-flex p-3 rounded-xl bg-white/5 border border-white/10">
                    <Icon className={`w-8 h-8 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FacultyPhilosophy;
