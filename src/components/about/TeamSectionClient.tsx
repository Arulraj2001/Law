"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  short_bio: string;
  credentials: string[];
  is_founder: boolean;
  photo_url?: string | null;
  sort_order?: number;
}

interface TeamSectionClientProps {
  team: FacultyMember[];
}

export function TeamSectionClient({ team }: TeamSectionClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={containerRef}
      className="py-14 md:py-20 bg-[#F5F5F0] overflow-hidden"
      id="team"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Team"
          title="Expert Faculty Behind Every Success"
          subtitle="Practiced lawyers and legal educators who bring real expertise to every class."
          align="center"
          eyebrowColor="emerald"
        />

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, index) => {
            const initials = member.name
              .replace(/[\[\]]/g, "")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0])
              .join("")
              .toUpperCase() || "FN";

            return (
              <motion.div
                key={member.id || index}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-[20px] p-7 border border-black/[0.08] hover:border-navy-light/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  index === 2 ? "md:max-lg:col-span-2 md:max-lg:max-w-md md:max-lg:mx-auto md:max-lg:w-full" : ""
                }`}
              >
                <div>
                  {/* Photo Section (96px circle) */}
                  <div className="relative mb-4">
                    <div
                      className={`w-24 h-24 rounded-full overflow-hidden shrink-0 relative ${
                        member.is_founder
                          ? "border-2 border-emerald ring-2 ring-emerald/20"
                          : "border border-slate-200"
                      }`}
                    >
                      {member.photo_url ? (
                        <Image
                          src={member.photo_url}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white text-xl font-heading font-bold"
                          style={{
                            background:
                              "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
                          }}
                        >
                          {initials}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Founder Badge (founders only) */}
                  {member.is_founder && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald text-white text-[11px] font-semibold mb-2 shadow-xs">
                      <span>⭐</span>
                      <span>Founder</span>
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="font-heading font-bold text-xl text-navy-dark leading-snug">
                    {member.name}
                  </h3>

                  {/* Designation */}
                  <div className="text-emerald font-medium text-sm mt-0.5">
                    {member.designation}
                  </div>

                  {/* Qualification */}
                  <div className="text-slate-500 text-[13px] mt-0.5">
                    {member.qualification}
                  </div>

                  {/* Specialization Pill */}
                  {member.specialization && (
                    <div>
                      <span className="inline-block bg-navy-tint text-navy-dark text-xs font-semibold px-2.5 py-1 rounded-full mt-2.5">
                        {member.specialization}
                      </span>
                    </div>
                  )}

                  {/* Short Bio */}
                  <p className="font-sans text-sm text-slate-600 leading-[1.6] mt-3">
                    {member.short_bio}
                  </p>
                </div>

                {/* Credential Tags */}
                {member.credentials && member.credentials.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/[0.06]">
                    {member.credentials.map((cred, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-navy-tint/70 text-navy-dark text-[11px] font-medium px-2.5 py-1 rounded-md"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TeamSectionClient;
