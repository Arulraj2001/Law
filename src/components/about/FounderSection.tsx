import { getFounderSanity } from "@/lib/sanity/queries";
import {
  FounderSectionClient,
  FounderData,
} from "./FounderSectionClient";

const placeholderFounder: FounderData = {
  name: "[Founder Name]",
  designation: "Founder & Chief Faculty",
  qualification: "BA.BL / LLM",
  specialization: "Civil Law, Criminal Law, IP Law",
  experienceYears: 10,
  shortBio:
    "A practicing advocate with over 10 years of experience mentoring judicial aspirants across Tamil Nadu.",
  credentials: [
    "Practicing Advocate",
    "BA.BL / LLM",
    "10+ Years Mentoring",
    "Chennai, Tamil Nadu",
    "25+ Judges Trained",
  ],
  photoUrl: null,
};

export async function FounderSection() {
  let founder: FounderData = placeholderFounder;

  try {
    const sanityFounder = await getFounderSanity();
    if (sanityFounder && sanityFounder.name) {
      founder = {
        name: sanityFounder.name || placeholderFounder.name,
        designation: sanityFounder.designation || placeholderFounder.designation,
        qualification:
          sanityFounder.qualification || placeholderFounder.qualification,
        specialization:
          sanityFounder.specialization || placeholderFounder.specialization,
        experienceYears:
          typeof sanityFounder.experienceYears === "number"
            ? sanityFounder.experienceYears
            : placeholderFounder.experienceYears,
        shortBio: sanityFounder.shortBio || placeholderFounder.shortBio,
        credentials:
          Array.isArray(sanityFounder.credentials) &&
          sanityFounder.credentials.length > 0
            ? sanityFounder.credentials
            : placeholderFounder.credentials,
        photoUrl: sanityFounder.photo?.asset?.url || null,
      };
    }
  } catch {
    founder = placeholderFounder;
  }

  return <FounderSectionClient founder={founder} />;
}

export default FounderSection;
