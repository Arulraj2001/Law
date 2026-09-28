"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, GraduationCap, Download } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface CourseStickySidebarProps {
  courseTitle: string;
}

export function CourseStickySidebar({ courseTitle }: CourseStickySidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { openCourseEnquiry, openSyllabusRequest } = useWhatsApp();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerOffset = 450; // hide before hitting bottom footer

      if (scrollY > 400 && scrollY < documentHeight - windowHeight - footerOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadSyllabus = () => {
    openSyllabusRequest(courseTitle);
  };


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hidden lg:block fixed right-6 top-24 w-[260px] z-40 bg-white rounded-xl shadow-2xl border border-black/[0.08] p-5"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald shrink-0" />
            <span className="font-heading font-bold text-sm text-navy-dark leading-tight line-clamp-1">
              {courseTitle}
            </span>
          </div>

          <div className="border-t border-black/[0.06] my-3" />

          {/* 3 Quick Action Buttons */}
          <div className="space-y-2.5">
            {/* 1. WhatsApp Enquiry */}
            <button
              type="button"
              onClick={() => openCourseEnquiry(courseTitle)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald hover:bg-emerald-dark text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Enquiry</span>
            </button>

            {/* 2. Book Free Demo */}
            <Link
              href="/demo-class"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-navy-dark hover:bg-navy-mid text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Book Free Demo</span>
            </Link>

            {/* 3. Download Syllabus */}
            <button
              type="button"
              onClick={handleDownloadSyllabus}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-navy-mid/40 hover:bg-navy-tint text-navy-dark font-semibold text-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-navy-mid" />
              <span>Download Syllabus</span>
            </button>
          </div>

          {/* Next Batch Info */}
          <div className="text-[11px] text-slate-500 text-center mt-3 pt-2.5 border-t border-black/[0.06]">
            Next batch: <span className="font-semibold text-navy-dark">Contact us</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CourseStickySidebar;
