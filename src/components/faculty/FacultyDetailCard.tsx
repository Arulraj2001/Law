"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { getBlurDataUrl } from "@/lib/image-config";

export interface FacultyDetailItem {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  short_bio: string;
  full_bio?: any;
  credentials: string[];
  is_founder: boolean;
  photo_url: string | null;
  philosophy?: string;
  courses_taught?: { name: string; href: string }[];
}

interface FacultyDetailCardProps {
  faculty: FacultyDetailItem;
  index: number;
}

export function FacultyDetailCard({ faculty, index }: FacultyDetailCardProps) {
  // Alternating entrance animation
  const isEven = index % 2 === 0;
  const initialX = isEven ? -30 : 30;

  // Initials for avatar fallback
  const initials = (faculty.name || "XYZ")
    .replace(/[\[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  // Determine teaching philosophy based on is_founder or index
  const defaultPhilosophy = faculty.is_founder
    ? "Law should be taught the way courts apply it, not the way textbooks explain it. Every session is designed around the question: 'How would a judge think about this?'"
    : index === 1
    ? "Criminal law clarity comes from understanding the purpose behind each provision. I teach the intent of every section, not just its words."
    : "IP law is the intersection of creativity and commerce. I help students see patents and trademarks as business tools, not just legal documents.";

  const philosophy = faculty.philosophy || defaultPhilosophy;

  // Default courses taught if not supplied
  const defaultCourses = faculty.is_founder
    ? [
        { name: "Civil Judge Exam Coaching", href: "/courses/civil-judge" },
        { name: "APP Exam Coaching", href: "/courses/app-exam" },
      ]
    : index === 1
    ? [
        { name: "APP Exam Coaching", href: "/courses/app-exam" },
        { name: "Civil Judge (Criminal Law)", href: "/courses/civil-judge" },
      ]
    : [
        { name: "Patent Agent Exam", href: "/courses/patent-agent" },
        { name: "Trademark Agent Exam", href: "/courses/trademark-agent" },
      ];

  const courses = faculty.courses_taught || defaultCourses;

  return (
    <motion.article
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 lg:p-10 mb-10 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
        {/* Left Column: Photo & Credentials (Desktop 35%) */}
        <div className="w-full lg:w-[35%] flex flex-col items-center shrink-0">
          {/* Founder Badge */}
          {faculty.is_founder && (
            <div className="mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xs">
              <span>⭐ Founder &amp; Chief Faculty</span>
            </div>
          )}

          {/* Photo Container */}
          <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[280px] lg:w-[280px] lg:h-[360px] rounded-xl overflow-hidden bg-gradient-to-br from-navy-dark via-navy-mid to-[#185FA5] flex items-center justify-center shadow-inner border border-slate-200">
            {faculty.photo_url ? (
              <Image
                src={faculty.photo_url}
                alt={faculty.name}
                fill
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
                placeholder="blur"
                blurDataURL={getBlurDataUrl(280, 360)}
                className="object-cover"
              />
            ) : (
              <div className="text-center p-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-white text-3xl sm:text-4xl font-heading font-bold border border-white/20">
                  {initials || "XYZ"}
                </div>
                <p className="text-white/60 text-xs uppercase tracking-wider font-medium">
                  {faculty.designation}
                </p>
              </div>
            )}
          </div>

          {/* Credentials Pills */}
          {faculty.credentials && faculty.credentials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-[280px]">
              {faculty.credentials.map((cred, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald" />
                  <span>{cred}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Content (Desktop 65%) */}
        <div className="w-full lg:w-[65%] flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="mb-4">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-dark leading-tight tracking-tight">
                {faculty.name}
              </h2>
              <p className="text-emerald font-medium text-base sm:text-lg mt-1">
                {faculty.designation}
              </p>
              <p className="text-slate-500 text-sm mt-0.5">
                {faculty.qualification}
              </p>
            </div>

            {/* Specialization Pill */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-md bg-navy-tint border border-navy-light/30 text-navy-dark text-xs sm:text-sm font-semibold">
                {faculty.specialization}
              </span>
            </div>

            {/* Full Bio Section */}
            <div className="mb-6 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
              <p>{faculty.short_bio}</p>
              {!faculty.full_bio && (
                <p className="text-slate-400 italic text-xs sm:text-sm">
                  [Full biography coming soon — check our social media for updates]
                </p>
              )}
            </div>

            {/* Teaching Philosophy Block */}
            <div className="mb-6 border-l-4 border-emerald bg-[#F5F5F0] rounded-r-xl p-4 sm:p-5">
              <h3 className="font-heading font-bold text-navy-dark text-base sm:text-lg mb-1.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald" />
                Teaching Philosophy
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;{philosophy}&rdquo;
              </p>
            </div>

            {/* Courses Taught */}
            <div className="mb-8">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Courses Taught
              </span>
              <div className="flex flex-wrap gap-2">
                {courses.map((course, idx) => (
                  <Link
                    key={idx}
                    href={course.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-navy-tint/60 hover:bg-navy-tint text-navy-dark text-xs sm:text-sm font-medium border border-navy-light/30 hover:border-navy-light transition-all duration-150"
                  >
                    <span>{course.name}</span>
                    <ArrowRight className="w-3 h-3 ml-1.5 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact / Connect Row at Bottom */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              Book a free mentoring session with {faculty.name.split(" ")[0]}
            </span>
            <Link
              href="/demo-class"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald hover:bg-emerald-dark text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150"
            >
              <span>Book Free Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default FacultyDetailCard;
