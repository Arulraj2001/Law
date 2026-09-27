export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "about-the-courses",
    title: "About the Courses",
    items: [
      {
        question: "What is the eligibility for the Tamil Nadu Civil Judge exam?",
        answer:
          "You must hold an LLB degree from a recognised university obtained within 3 years of the notification date, with minimum 50% marks (45% for reserved categories). Age limit is 25 to 42 years. You must be proficient in both English and Tamil.",
      },
      {
        question: "Does XYZ offer both online and offline coaching?",
        answer:
          "Yes. We offer both online and offline classes for the Civil Judge and APP exams. Online students get live classes, recorded lectures, weekly MCQ PDFs, and WhatsApp mentorship. Offline students attend classes at our centre in Tamil Nadu.",
      },
      {
        question: "What are the new criminal laws — BNS, BNSS, and BSA?",
        answer:
          "From 1 July 2024, three new laws replaced the old criminal laws. BNS (Bharatiya Nyaya Sanhita) replaced IPC. BNSS (Bharatiya Nagarik Suraksha Sanhita) replaced CrPC. BSA (Bharatiya Sakshya Adhiniyam) replaced the Indian Evidence Act. XYZ covers all three in full for both Civil Judge and APP exams.",
      },
      {
        question: "What is the difference between the Civil Judge and APP exams?",
        answer:
          "The Civil Judge exam selects judges for civil matters — property, contracts, family law. The APP exam selects prosecutors who represent the state in criminal cases. Both are TNPSC exams with 3 stages, but the Civil Judge exam has a Tamil-to-English translation paper while the APP exam has a stronger General Studies component.",
      },
    ],
  },
  {
    id: "fees-and-batches",
    title: "Fees & Batches",
    items: [
      {
        question: "When is the next batch starting and what is the fee?",
        answer:
          "Batches start regularly. Contact us on WhatsApp for the current batch date, timings, and fee details. You can also book a free counselling session to discuss which course fits your preparation level.",
      },
      {
        question: "How many students from XYZ have become Civil Judges?",
        answer:
          "More than 25 of our students are now serving as Civil Judges and Assistant Public Prosecutors across Tamil Nadu. Their testimonials are on our results page.",
      },
    ],
  },
  {
    id: "study-and-preparation",
    title: "Study & Preparation",
    items: [
      {
        question: "What study materials does XYZ provide?",
        answer:
          "Every student receives handwritten, updated study notes covering the complete syllabus — including the new BNS, BNSS, and BSA laws. Notes are rewritten for every new batch to reflect the latest TNPSC exam pattern changes. Online students also receive weekly MCQ practice PDFs via WhatsApp.",
      },
      {
        question: "How does XYZ's 1-on-1 mentorship work?",
        answer:
          "Every student's progress is tracked individually from the first week. Faculty identifies weak areas through weekly test performance and assigns targeted revision sessions. Students can ask doubts via WhatsApp between classes. Before the exam, each student gets a personal revision plan based on their specific weak areas.",
      },
      {
        question: "Does XYZ cover the new criminal laws BNS, BNSS, and BSA?",
        answer:
          "Yes — completely. From 1 July 2024, the Bharatiya Nyaya Sanhita (BNS) replaced IPC, the Bharatiya Nagarik Suraksha Sanhita (BNSS) replaced CrPC, and the Bharatiya Sakshya Adhiniyam (BSA) replaced the Indian Evidence Act. The TNPSC Civil Judge and APP exams now test these new laws. XYZ covers all three comprehensively in every batch.",
      },
    ],
  },
  {
    id: "online-classes",
    title: "Online Classes",
    items: [
      {
        question: "Is XYZ coaching available for students outside Tamil Nadu?",
        answer:
          "Yes. XYZ offers complete online coaching accessible from anywhere in India. Online students receive live classes, recorded lectures, weekly MCQ PDFs, study notes, and WhatsApp-based mentorship — the same quality as offline students. We have students from 15+ states who have successfully cleared their respective judicial service exams.",
      },
      {
        question: "Is online coaching as effective as offline for judiciary exams?",
        answer:
          "Yes. Our online students receive the same curriculum, study notes, weekly mock tests and mentorship as offline students. Many of our 25+ successful judicial selections prepared entirely online. The only difference is the medium — the quality and attention are identical.",
      },
    ],
  },
  {
    id: "career-and-results",
    title: "Career & Results",
    items: [
      {
        question: "What is the salary of a Tamil Nadu Civil Judge?",
        answer:
          "A Tamil Nadu Civil Judge (Junior Division) earns ₹27,700 – ₹44,770 per month basic pay. After adding DA, HRA, TA and other allowances, the approximate in-hand salary is ₹88,000 – ₹1,05,000 per month. The post also includes government accommodation, job security, and a clear career path to District Judge.",
      },
      {
        question: "How long does it take to become a Civil Judge after LLB?",
        answer:
          "After completing LLB, you must qualify the TNPSC Civil Judge exam (Prelims, Mains, and Viva-Voce). With focused coaching of 8–12 months and a successful first attempt, you can join as a Civil Judge within 1–2 years of completing LLB. Many XYZ students have achieved this on their first attempt.",
      },
    ],
  },
];
