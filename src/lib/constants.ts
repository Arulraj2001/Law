export const SITE_CONFIG = {
  name: "XYZ Law Coaching",
  tagline: "Tamil Nadu's Trusted Judiciary Coaching",
  description:
    "Expert coaching for TNPSC Civil Judge, APP Exam, Patent Agent, Trademark Agent, UGC-NET and SET Law exams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX",
  phone: "+91 XXXXX XXXXX",
  email: "contact@yourdomain.com",
  address: "[Address], Tamil Nadu",
  established: "[Year]",
  mapUrl: "https://maps.google.com/?q=your+address",
  social: {
    youtube: "https://youtube.com/@yourchannel",
    instagram: "https://instagram.com/yourhandle",
    facebook: "https://facebook.com/yourpage",
    whatsappChannel: "https://whatsapp.com/channel/yourlink",
  },
};

export const STATS = [
  { value: 1000, suffix: "+", label: "Students Trained" },
  { value: 25, suffix: "+", label: "Judges Selected" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 6, suffix: "", label: "Exam Categories" },
];

export const COURSES = [
  {
    id: "civil-judge",
    title: "Civil Judge Exam Coaching",
    slug: "civil-judge",
    badge: "Primary Focus",
    badgeColor: "navy",
    icon: "gavel",
    description:
      "Complete preparation for TNPSC Civil Judge exam — Prelims, Mains & Viva-Voce. BNS, BNSS & BSA covered.",
    highlights: [
      "Prelims + Mains + Viva coverage",
      "Tamil-to-English translation classes",
      "Weekly TNPSC-pattern mock tests",
      "BNS, BNSS & BSA — new criminal laws",
      "Handwritten updated notes",
      "Online + offline batches",
    ],
    duration: "TBD",
    mode: "Online + Offline",
    href: "/courses/civil-judge",
  },
  {
    id: "app-exam",
    title: "APP Exam Coaching",
    slug: "app-exam",
    badge: "Primary Focus",
    badgeColor: "navy",
    icon: "briefcase",
    description:
      "TNPSC Assistant Public Prosecutor Grade II — all 3 stages with GS, Law & Interview preparation.",
    highlights: [
      "All 200 Prelims MCQs covered",
      "Criminal law — BNS, BNSS, BSA",
      "GS + Aptitude sections",
      "Mains answer writing",
      "Interview preparation",
      "Online + offline batches",
    ],
    duration: "TBD",
    mode: "Online + Offline",
    href: "/courses/app-exam",
  },
  {
    id: "patent-agent",
    title: "Patent Agent Exam",
    slug: "patent-agent",
    badge: "60% Focus",
    badgeColor: "emerald",
    icon: "certificate",
    description:
      "CGPDTM Patent Agent Exam preparation — IP law, patent drafting, prosecution & procedure.",
    highlights: [
      "Patent Act & Rules",
      "IP law fundamentals",
      "Patent drafting practice",
      "Previous year questions",
      "Online classes",
    ],
    duration: "TBD",
    mode: "Online",
    href: "/courses/patent-agent",
  },
  {
    id: "trademark-agent",
    title: "Trademark Agent Exam",
    slug: "trademark-agent",
    badge: "60% Focus",
    badgeColor: "emerald",
    icon: "registered",
    description:
      "Trade Marks Registry Agent Exam — TM law, filing procedures, opposition & registration.",
    highlights: [
      "Trade Marks Act & Rules",
      "TM filing procedures",
      "Opposition & registration",
      "Previous year questions",
      "Online classes",
    ],
    duration: "TBD",
    mode: "Online",
    href: "/courses/trademark-agent",
  },
  {
    id: "ugc-net-law",
    title: "UGC-NET Law Coaching",
    slug: "ugc-net-law",
    badge: "40% Focus",
    badgeColor: "gold",
    icon: "school",
    description:
      "UGC-NET Law Paper I + Paper II — for law graduates targeting lectureship and JRF positions.",
    highlights: [
      "Paper I — Teaching & Research",
      "Paper II — Law subjects",
      "Previous year question bank",
      "Mock tests",
      "Online classes",
    ],
    duration: "TBD",
    mode: "Online",
    href: "/courses/ugc-net-law",
  },
  {
    id: "set-law",
    title: "SET Law Coaching",
    slug: "set-law",
    badge: "40% Focus",
    badgeColor: "gold",
    icon: "award",
    description:
      "Tamil Nadu SET and other state SET exams for law graduates seeking assistant professor eligibility.",
    highlights: [
      "Tamil Nadu SET pattern",
      "Law subject papers",
      "Mock tests",
      "Previous year questions",
      "Online classes",
    ],
    duration: "TBD",
    mode: "Online",
    href: "/courses/set-law",
  },
];

export const WHY_US = [
  {
    icon: "user-check",
    title: "Expert Legal Faculty",
    description:
      "Practicing lawyers and senior advocates — not just educators. You learn law the way courts apply it.",
  },
  {
    icon: "clipboard-check",
    title: "Weekly Mock Tests",
    description:
      "TNPSC-pattern MCQ tests every week for Prelims and descriptive tests for Mains. Updated for BNS/BNSS/BSA.",
  },
  {
    icon: "language",
    title: "Exclusive Translation Classes",
    description:
      "Tamil-to-English legal translation — compiled from past TNPSC papers. No other institute covers this depth.",
  },
  {
    icon: "user-heart",
    title: "1-on-1 Mentorship",
    description:
      "Personal performance tracking and doubt-clearing. Every student gets individual attention and a preparation plan.",
  },
  {
    icon: "refresh",
    title: "Updated Study Material",
    description:
      "Notes updated every batch to cover BNS, BNSS, BSA and latest TNPSC exam pattern changes.",
  },
  {
    icon: "trophy",
    title: "25+ Judges Selected",
    description:
      "Real students, real results. Civil Judges and APPs serving across Tamil Nadu — trained right here.",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Free Counselling",
    description: "Discuss your exam goal and current preparation level with our faculty.",
  },
  {
    step: 2,
    title: "Attend Demo Class",
    description: "Experience our teaching style — free, no commitment required.",
  },
  {
    step: 3,
    title: "Enrol & Start",
    description: "Choose your batch — online or offline — and begin structured preparation.",
  },
  {
    step: 4,
    title: "Weekly Tests & Review",
    description: "Sit mock tests every week. Get personal feedback on your answers.",
  },
  {
    step: 5,
    title: "Clear the Exam",
    description: "Interview preparation, final revision — and join our toppers list.",
  },
];

export const FAQS = [
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
];
