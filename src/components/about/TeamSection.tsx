import { getAllFacultySanity } from "@/lib/sanity/queries";
import { TeamSectionClient, FacultyMember } from "./TeamSectionClient";

const placeholderTeam: FacultyMember[] = [
  {
    id: "1",
    name: "[Founder Name]",
    designation: "Founder & Chief Faculty",
    qualification: "BA.BL / LLM",
    specialization: "Civil Law · Criminal Law",
    short_bio:
      "Practicing advocate with 10+ years mentoring judiciary aspirants across Tamil Nadu.",
    credentials: ["Practicing Advocate", "10+ Years"],
    is_founder: true,
    photo_url: null,
    sort_order: 1,
  },
  {
    id: "2",
    name: "[Faculty Name 2]",
    designation: "Senior Faculty — Criminal Law",
    qualification: "LLB · LLM",
    specialization: "Criminal Law · BNS · BNSS",
    short_bio:
      "Specialist in new criminal laws (BNS, BNSS, BSA) with extensive exam coaching experience.",
    credentials: ["LLB · LLM", "Criminal Law Expert"],
    is_founder: false,
    photo_url: null,
    sort_order: 2,
  },
  {
    id: "3",
    name: "[Faculty Name 3]",
    designation: "Faculty — IP Law",
    qualification: "LLB · Patent Agent",
    specialization: "IP Law · Patent · Trademark",
    short_bio:
      "Certified patent agent coaching Patent Agent and Trademark Agent exam aspirants.",
    credentials: ["Certified Patent Agent", "IP Specialist"],
    is_founder: false,
    photo_url: null,
    sort_order: 3,
  },
];

export async function TeamSection() {
  let team: FacultyMember[] = placeholderTeam;

  try {
    const sanityFaculty = await getAllFacultySanity();
    if (Array.isArray(sanityFaculty) && sanityFaculty.length > 0) {
      team = sanityFaculty.map((f: any, idx: number) => ({
        id: f._id || String(idx + 1),
        name: f.name || `Faculty Member ${idx + 1}`,
        designation: f.designation || "Law Faculty",
        qualification: f.qualification || "LLB · LLM",
        specialization: f.specialization || "Judicial Preparation",
        short_bio:
          f.shortBio ||
          "Expert educator dedicated to guiding aspirants toward judicial success.",
        credentials: Array.isArray(f.credentials) ? f.credentials : [],
        is_founder: Boolean(f.isFounder),
        photo_url: f.photo?.asset?.url || null,
        sort_order: f.sortOrder || idx + 1,
      }));
    }
  } catch {
    team = placeholderTeam;
  }

  return <TeamSectionClient team={team} />;
}

export default TeamSection;
