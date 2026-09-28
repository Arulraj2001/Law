import { getHomepageFAQsSanity } from "@/lib/sanity/queries";
import { FAQS } from "@/lib/constants";
import { FAQSectionClient } from "./FAQSectionClient";

const additionalFAQs = [
  {
    question: "What study materials does XYZ provide?",
    answer:
      "Every student receives handwritten, updated study notes covering the complete syllabus — including the new BNS, BNSS, and BSA laws. Notes are rewritten for every new batch to reflect the latest TNPSC exam pattern changes. Online students also receive weekly MCQ practice PDFs via WhatsApp.",
  },
  {
    question: "Does XYZ cover the new criminal laws BNS, BNSS, and BSA?",
    answer:
      "Yes — completely. From 1 July 2024, the Bharatiya Nyaya Sanhita (BNS) replaced IPC, the Bharatiya Nagarik Suraksha Sanhita (BNSS) replaced CrPC, and the Bharatiya Sakshya Adhiniyam (BSA) replaced the Indian Evidence Act. The TNPSC Civil Judge and APP exams now test these new laws. XYZ covers all three comprehensively in every batch.",
  },
  {
    question: "How does XYZ's 1-on-1 mentorship work?",
    answer:
      "Every student's progress is tracked individually from the first week. Faculty identifies weak areas through weekly test performance and assigns targeted revision sessions. Students can ask doubts via WhatsApp between classes. Before the exam, each student gets a personal revision plan based on their specific weak areas.",
  },
  {
    question: "Is XYZ coaching available for students outside Tamil Nadu?",
    answer:
      "Yes. XYZ offers complete online coaching accessible from anywhere in India. Online students receive live classes, recorded lectures, weekly MCQ PDFs, study notes, and WhatsApp-based mentorship — the same quality as offline students. We have students from 15+ states who have successfully cleared their respective judicial service exams.",
  },
];

const fallbackFAQs = [...FAQS, ...additionalFAQs];

export async function FAQSection() {
  let faqs = fallbackFAQs;

  try {
    const sanityFaqs = await getHomepageFAQsSanity();
    if (sanityFaqs && sanityFaqs.length > 0) {
      faqs = sanityFaqs;
    }
  } catch {
    // Fall back to fallbackFAQs
  }

  return <FAQSectionClient faqs={faqs} />;
}

export default FAQSection;
