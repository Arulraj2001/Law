import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, BookOpen, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty & Mentors | Senior Advocates & Judicial Educators",
  description:
    "Meet our faculty team: practicing advocates from the Madras High Court, former prosecutors, and judicial examination educators.",
};

const FACULTY_MEMBERS = [
  {
    name: "Senior Advocate (Madras High Court)",
    designation: "Head of Criminal Law & Trial Advocacy",
    experience: "25+ Years Experience",
    specialization: "BNS, BNSS, BSA, Trial Practice & Criminal Appeals",
    bio: "Practiced before the Madras High Court and trial courts across Tamil Nadu. Trained hundreds of aspiring judicial magistrates in evidence appreciation.",
  },
  {
    name: "Senior Legal Counsel",
    designation: "Lead Faculty - Civil Law & CPC",
    experience: "18+ Years Experience",
    specialization: "Code of Civil Procedure, Transfer of Property, Specific Relief",
    bio: "Specializes in civil pleadings, interlocutory applications, and judgment writing for the TNPSC Civil Judge Mains exam.",
  },
  {
    name: "Former Public Prosecutor",
    designation: "Lead Faculty - APP Exam",
    experience: "20+ Years Experience",
    specialization: "State Prosecution, Minor Penal Acts & Forensic Science",
    bio: "Decades of active courtroom prosecution experience bringing practical procedural nuances into the classroom.",
  },
  {
    name: "Judicial Vernacular Expert",
    designation: "Legal Translation Faculty",
    experience: "14+ Years Experience",
    specialization: "Tamil-to-English & English-to-Tamil Legal Translation",
    bio: "Expert translator for legal records, depositions, FIRs, and High Court judgments. Author of judicial translation manuals.",
  },
];

export default function FacultyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading
          badge="Faculty & Leadership"
          title="Taught by Advocates Who Live the Law"
          subtitle="Our mentors combine courtroom practice with systematic pedagogical rigor to prepare you for every stage of judicial selection."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FACULTY_MEMBERS.map((member, i) => (
            <Card key={i} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-navy-tint text-navy-dark flex items-center justify-center font-bold text-lg shrink-0">
                    <Scale className="w-7 h-7 text-navy-mid" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-navy-dark">{member.name}</h3>
                    <p className="text-sm font-semibold text-emerald">{member.designation}</p>
                    <Badge variant="outline" className="text-xs bg-slate-50 mt-1">
                      {member.experience}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>

                <div className="pt-3 border-t text-xs text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-navy-mid shrink-0" />
                  <span><strong>Subjects:</strong> {member.specialization}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
