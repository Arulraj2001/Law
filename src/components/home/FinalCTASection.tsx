"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/useWhatsApp";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

export function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const { openGeneralEnquiry } = useWhatsApp();

  const benefits = [
    "Understand your exact preparation gap",
    "Get a personalised study timeline",
    "Ask any question about the exam or the course",
  ];

  const reassuranceItems = [
    "✅ Free counselling — no payment required",
    "⚡ Response within 2 hours on WhatsApp",
    "🎓 Demo class available before enrolment",
  ];

  const cleanPhone = (SITE_CONFIG.phone || "").replace(/\s+/g, "");

  return (
    <section
      ref={containerRef}
      className="py-16 lg:py-20 relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
      }}
      id="contact"
    >
      {/* Decorative background elements */}
      {/* 1. Large emerald blurred orb (400px, opacity 0.08, top-right) */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "#1D9E75",
          opacity: 0.08,
          filter: "blur(100px)",
        }}
      />

      {/* 2. Gold blurred orb (300px, opacity 0.06, bottom-left) */}
      <div
        className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "#C9A84C",
          opacity: 0.06,
          filter: "blur(90px)",
        }}
      />

      {/* 3. Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN — Urgency text (60% on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald text-white text-xs font-semibold tracking-wide">
              <span>🎓 Start Your Judicial Career Today</span>
            </div>

            {/* H2 heading */}
            <h2 className="font-heading font-extrabold text-[28px] lg:text-[38px] text-white leading-[1.2] tracking-tight">
              Book a Free Counselling Session with Our Faculty
            </h2>

            {/* Sub-text */}
            <p className="font-sans text-base lg:text-[17px] text-white/80 leading-[1.7] max-w-[520px]">
              One free conversation with our faculty tells you: where you stand
              today, what you need to cover, and how long it will take. No cost.
              No commitment. Just clarity.
            </p>

            {/* 3 Benefit Rows */}
            <div className="space-y-3 pt-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-3 text-[15px] text-white font-medium"
                >
                  <span className="text-base select-none">✅</span>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof mini-bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-gold fill-gold shrink-0"
                  />
                ))}
              </div>
              <span className="text-white/60 text-[13px]">
                Joined by 1,000+ law graduates from Tamil Nadu
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Contact card (40% on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-white/[0.10] backdrop-blur-[20px] border border-white/20 rounded-[20px] p-6 sm:p-8 shadow-2xl">
              {/* Card heading */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald inline-block animate-pulse shrink-0" />
                <h3 className="font-heading text-xl font-bold text-white">
                  Get in Touch
                </h3>
              </div>

              {/* 3 Contact Method Rows */}
              <div className="space-y-3">
                {/* Row 1 — WhatsApp (primary) */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openGeneralEnquiry}
                  className="w-full flex items-center justify-between bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl px-5 py-3.5 transition-colors duration-200 shadow-md group"
                >
                  <div className="flex items-center gap-3 text-left">
                    <WhatsAppIcon className="w-6 h-6 fill-white shrink-0" />
                    <div>
                      <div className="font-bold text-white text-base leading-tight">
                        Chat on WhatsApp
                      </div>
                      <div className="text-xs text-white/80 leading-tight">
                        We reply within 2 hours
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Divider between buttons */}
                <div className="text-center my-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  or
                </div>

                {/* Row 2 — Phone call */}
                <motion.a
                  href={`tel:${cleanPhone}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/25 text-white rounded-xl px-5 py-3.5 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 text-white/90 shrink-0" />
                  <span className="font-semibold text-sm sm:text-base text-white truncate">
                    {SITE_CONFIG.phone}
                  </span>
                </motion.a>

                {/* Row 3 — Email */}
                <motion.a
                  href={`mailto:${SITE_CONFIG.email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/25 text-white rounded-xl px-5 py-3.5 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 text-white/90 shrink-0" />
                  <span className="font-semibold text-sm sm:text-base text-white truncate">
                    {SITE_CONFIG.email}
                  </span>
                </motion.a>
              </div>

              {/* Address block below buttons */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2.5 text-white/60 text-[13px] leading-relaxed">
                  <MapPin className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.address}</span>
                </div>
                {SITE_CONFIG.mapUrl && (
                  <div className="mt-2 pl-6">
                    <a
                      href={SITE_CONFIG.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald hover:text-emerald-light transition-colors font-medium text-[13px] inline-flex items-center gap-1"
                    >
                      <span>View on Google Maps →</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Below both columns — Final strip */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {reassuranceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.1,
                  ease: "easeOut",
                }}
                className="text-white/70 text-sm font-medium text-center"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
