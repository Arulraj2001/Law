"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Bell, Sparkles } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { SITE_CONFIG } from "@/lib/constants";

export interface ExamUpdateItem {
  _id?: string;
  title: string;
  examName?: string;
  type?: string;
  notificationDate?: string;
}

interface BlogSidebarProps {
  examUpdates?: ExamUpdateItem[];
}

const defaultExamUpdates: ExamUpdateItem[] = [
  {
    _id: "1",
    title: "TNPSC Civil Judge 2026 Notification Expected Soon",
    examName: "Civil Judge",
    type: "notification",
    notificationDate: "Jan 2026",
  },
  {
    _id: "2",
    title: "TNPSC APP Grade II 61 Vacancies Confirmed",
    examName: "APP Exam",
    type: "vacancy",
    notificationDate: "Jan 2026",
  },
  {
    _id: "3",
    title: "Patent Agent Exam Registration Window Opening",
    examName: "Patent Agent",
    type: "schedule",
    notificationDate: "Dec 2025",
  },
];

export function BlogSidebar({ examUpdates }: BlogSidebarProps) {
  const { openGeneralEnquiry } = useWhatsApp();
  const updates = examUpdates && examUpdates.length > 0 ? examUpdates : defaultExamUpdates;
  const whatsappChannelUrl =
    SITE_CONFIG.social?.whatsappChannel || "https://whatsapp.com";

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* 1. Exam Updates Box */}
      <div className="bg-navy-tint/80 border border-navy-light/30 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-navy-dark" />
          <h3 className="font-heading font-bold text-base text-navy-dark">
            Exam Updates
          </h3>
        </div>

        <div className="space-y-3 divide-y divide-navy-light/20">
          {updates.slice(0, 3).map((item, idx) => (
            <div key={item._id || idx} className="pt-3 first:pt-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
                {item.examName || "Update"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-navy-dark line-clamp-2 hover:text-emerald transition-colors">
                {item.title}
              </p>
              {item.notificationDate && (
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  {item.notificationDate}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-navy-light/20">
          <Link
            href="/courses"
            className="inline-flex items-center text-xs font-bold text-navy-dark hover:text-emerald transition-colors"
          >
            <span>View all course updates</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>

      {/* 2. Popular Courses Box */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald" />
          <h3 className="font-heading font-bold text-base text-navy-dark">
            Popular Courses
          </h3>
        </div>

        <div className="space-y-2.5">
          <Link
            href="/courses/civil-judge"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-100 transition-colors group"
          >
            <span className="text-xs sm:text-sm font-semibold text-navy-dark group-hover:text-emerald">
              ⚖ Civil Judge Coaching
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/courses/app-exam"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-100 transition-colors group"
          >
            <span className="text-xs sm:text-sm font-semibold text-navy-dark group-hover:text-emerald">
              📋 APP Exam Coaching
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/courses/patent-agent"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-100 transition-colors group"
          >
            <span className="text-xs sm:text-sm font-semibold text-navy-dark group-hover:text-emerald">
              🔬 Patent Agent Exam
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>

      {/* 3. Free Demo CTA Box */}
      <div className="bg-gradient-to-br from-emerald to-emerald-dark text-white rounded-2xl p-5 shadow-sm">
        <h4 className="font-heading font-bold text-base mb-1">
          Try a Free Demo Class
        </h4>
        <p className="text-xs text-white/80 mb-4">
          Experience our courtroom-anchored teaching style before you decide. No commitment required.
        </p>
        <Link
          href="/demo-class"
          className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white text-emerald-900 font-bold text-xs sm:text-sm shadow-xs hover:bg-slate-50 transition-colors"
        >
          <span>Book Now →</span>
        </Link>
      </div>

      {/* 4. WhatsApp Updates Box */}
      <div className="bg-navy-dark text-white rounded-2xl p-5 shadow-sm">
        <h4 className="font-heading font-bold text-base mb-1">
          Exam Alerts on WhatsApp
        </h4>
        <p className="text-xs text-white/70 mb-4">
          Receive syllabus updates, vacancy announcements, and judgment summaries.
        </p>
        <button
          type="button"
          onClick={openGeneralEnquiry}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Join WhatsApp Updates</span>
        </button>
      </div>
    </aside>
  );
}

export default BlogSidebar;
