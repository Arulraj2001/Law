import { createClient } from "next-sanity";
import * as fs from "fs";
import * as path from "path";

// Load .env.local if available
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val.replace(/^["']|["']$/g, "");
        }
      }
    }
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4zn0ydn7",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

function createBlock(text: string, style = "normal") {
  return {
    _type: "block",
    _key: `k-${Math.random().toString(36).substring(2, 9)}`,
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `s-${Math.random().toString(36).substring(2, 9)}`,
        text,
        marks: [],
      },
    ],
  };
}

async function seedSiteSettings() {
  console.log("⚙️  Checking Site Settings...");
  try {
    const existing = await client.fetch('*[_type == "siteSettings"][0]._id');
    if (existing) {
      console.log("   ✓ Site settings already exist");
      return;
    }

    await client.create({
      _type: "siteSettings",
      _id: "siteSettings",
      siteName: "XYZ Law Coaching",
      tagline: "Tamil Nadu's Trusted Judiciary Coaching",
      primaryPhone: "+91 98765 43210",
      whatsappNumber: "919876543210",
      email: "contact@xyzlawcoaching.com",
      address: "No. 45, High Court Road, George Town, Chennai, Tamil Nadu 600001",
      studentsCount: "1000+",
      judgesCount: "25+",
      experienceYears: "10+",
      statesCount: "15+",
      mission:
        "To prepare every serious judicial aspirant in Tamil Nadu with expert legal coaching, real courtroom insight, and personal mentorship.",
      vision:
        "To be Tamil Nadu's most trusted name in judiciary and law exam coaching.",
      values:
        "Courtroom-first teaching\n" +
        "Individual student attention\n" +
        "Honest, result-oriented guidance\n" +
        "Continuous improvement of material\n" +
        "Accessibility — online and offline",
    });
    console.log("   ✅ Site settings seeded successfully");
  } catch (err: any) {
    console.error("   ❌ Failed to seed site settings:", err?.message || err);
  }
}

async function seedCourses() {
  console.log("📚 Checking Courses...");
  try {
    const count = await client.fetch('count(*[_type == "course"])');
    if (count > 0) {
      console.log(`   ✓ Courses already exist (${count} found)`);
      return;
    }

    const courses = [
      {
        _type: "course",
        title: "Civil Judge Exam Coaching",
        slug: { _type: "slug", current: "civil-judge" },
        badge: "Judiciary",
        badgeColor: "navy",
        shortDescription:
          "Complete preparation for TNPSC Civil Judge exam — Prelims, Mains & Viva-Voce. BNS, BNSS & BSA covered.",
        fullDescription: [
          createBlock(
            "Our flagship Civil Judge Coaching Programme provides 360-degree preparation for the Tamil Nadu State Judicial Service examination."
          ),
          createBlock(
            "The curriculum covers all preliminary multiple-choice topics, rigorous mains answer-writing drills, translation practice papers, and mock interview panels with retired judicial officers."
          ),
        ],
        duration: "6 Months Intensive",
        mode: "Online + Offline",
        fee: "₹18,000",
        feeNote: "EMI available · Inclusive of all BNS updated study materials",
        highlights: [
          "Complete Prelims + Mains + Viva coverage",
          "Exclusive Tamil-to-English legal translation classes",
          "Weekly TNPSC-pattern mock tests with individual evaluations",
          "Comprehensive coverage of BNS, BNSS & BSA (new criminal major acts)",
          "Judgment writing and framing of issues workshops",
          "Live interactive online sessions + offline classroom options",
        ],
        subjects: [
          "Civil Law (CPC, Contract, Transfer of Property)",
          "Criminal Law (BNS, BNSS, BSA)",
          "Tamil-to-English & English-to-Tamil Translation",
          "Judgment Writing & Pleadings",
        ],
        isFeatured: true,
        isActive: true,
        sortOrder: 1,
        seoTitle: "Civil Judge Exam Coaching in Tamil Nadu | TNPSC Civil Judge Coaching",
        seoDescription:
          "Join Tamil Nadu's top-ranked TNPSC Civil Judge coaching. Prelims, Mains, Translation and Viva preparation with 25+ selected judges.",
      },
      {
        _type: "course",
        title: "APP Exam Coaching",
        slug: { _type: "slug", current: "app-exam" },
        badge: "Prosecution",
        badgeColor: "navy",
        shortDescription:
          "TNPSC Assistant Public Prosecutor Grade II — all 3 stages with GS, Law & Interview preparation.",
        fullDescription: [
          createBlock(
            "Targeted coaching for the TNPSC Assistant Public Prosecutor (APP Grade II) exam."
          ),
          createBlock(
            "Focused criminal law modules, previous 10 years question dissection, and mock trial examination guidance."
          ),
        ],
        duration: "4 Months Fast-Track",
        mode: "Online + Offline",
        fee: "₹15,000",
        feeNote: "Includes Criminal Major Acts & General Studies modules",
        highlights: [
          "All 200 Prelims MCQs exhaustively covered",
          "Criminal law special focus on BNS, BNSS & BSA",
          "General Studies and Mental Ability preparation",
          "Mains descriptive answer writing practice",
          "Interview panel simulation with former prosecutors",
        ],
        subjects: [
          "Criminal Major Acts",
          "Minor Criminal Acts & Special Laws",
          "General Studies & Mental Ability",
          "Trial Practice & Evidence Evaluation",
        ],
        isFeatured: true,
        isActive: true,
        sortOrder: 2,
        seoTitle: "APP Exam Coaching in Tamil Nadu | Assistant Public Prosecutor",
        seoDescription:
          "Comprehensive TNPSC APP Grade II exam coaching with criminal law specialists and former prosecutors.",
      },
      {
        _type: "course",
        title: "Patent Agent Exam",
        slug: { _type: "slug", current: "patent-agent" },
        badge: "Patent Office",
        badgeColor: "emerald",
        shortDescription:
          "CGPDTM Patent Agent Exam preparation — IP law, patent drafting, prosecution & procedure.",
        duration: "3 Months",
        mode: "Online",
        fee: "₹12,000",
        feeNote: "Covers Patent Act & Specification Drafting",
        highlights: [
          "Indian Patents Act 1970 & Patent Rules 2003",
          "Patent specification & claims drafting workshops",
          "Viva-voce simulation by practicing patent attorneys",
          "Previous 10 years question paper discussion",
        ],
        subjects: ["Patents Act", "Patent Drafting", "Viva-Voce"],
        isFeatured: false,
        isActive: true,
        sortOrder: 3,
      },
      {
        _type: "course",
        title: "Trademark Agent Exam",
        slug: { _type: "slug", current: "trademark-agent" },
        badge: "TM Registry",
        badgeColor: "emerald",
        shortDescription:
          "Trade Marks Registry Agent Exam — TM law, filing procedures, opposition & registration.",
        duration: "2 Months",
        mode: "Online",
        fee: "₹10,000",
        feeNote: "Includes filing and opposition practice",
        highlights: [
          "Trade Marks Act 1999 & Trade Marks Rules 2017",
          "Filing, examination reports, and opposition proceedings",
          "Real-world portfolio filing case studies",
          "Objective MCQ test series",
        ],
        subjects: ["Trade Marks Act", "TM Rules & Procedure"],
        isFeatured: false,
        isActive: true,
        sortOrder: 4,
      },
      {
        _type: "course",
        title: "UGC-NET Law Coaching",
        slug: { _type: "slug", current: "ugc-net-law" },
        badge: "Academic",
        badgeColor: "gold",
        shortDescription:
          "NTA UGC-NET Law paper 1 & 2 preparation for Assistant Professorship and JRF.",
        duration: "5 Months",
        mode: "Online + Offline",
        fee: "₹14,000",
        feeNote: "Paper 1 + Paper 2 complete study kit",
        highlights: [
          "Paper 1 (Teaching & Research Aptitude) mastery",
          "Paper 2 (All 10 Law Modules) detailed analysis",
          "Previous year questions with analytical solutions",
          "Regular timed online mock tests",
        ],
        subjects: [
          "Jurisprudence",
          "Constitutional Law",
          "Public International Law",
          "Commercial Law",
        ],
        isFeatured: false,
        isActive: true,
        sortOrder: 5,
      },
      {
        _type: "course",
        title: "SET Law Exam Coaching",
        slug: { _type: "slug", current: "set-law" },
        badge: "Academic",
        badgeColor: "gold",
        shortDescription:
          "State Eligibility Test coaching for collegiate Assistant Professor appointments in Tamil Nadu.",
        duration: "4 Months",
        mode: "Online + Offline",
        fee: "₹12,000",
        feeNote: "Targeted TNSET syllabus prep",
        highlights: [
          "TNSET exam syllabus aligned lectures",
          "Tamil Nadu higher education exam pattern focus",
          "Paper 1 & Paper 2 combined preparation",
          "Weekly doubt clearance and revision sets",
        ],
        subjects: ["Teaching Aptitude", "Core Law Papers", "Mock Tests"],
        isFeatured: false,
        isActive: true,
        sortOrder: 6,
      },
    ];

    for (const c of courses) {
      await client.create(c);
    }
    console.log(`   ✅ ${courses.length} courses seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed courses:", err?.message || err);
  }
}

async function seedBatches() {
  console.log("📅 Checking Batches...");
  try {
    const count = await client.fetch('count(*[_type == "batch"])');
    if (count > 0) {
      console.log(`   ✓ Batches already exist (${count} found)`);
      return;
    }

    const batches = [
      {
        _type: "batch",
        courseName: "Civil Judge Exam — Morning Regular Batch",
        startDate: new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 10),
        timing: "7:00 AM – 9:00 AM (Monday to Friday)",
        mode: "Online + Offline",
        totalSeats: 30,
        seatsFilled: 18,
        status: "filling",
        isCurrent: true,
        isActive: true,
      },
      {
        _type: "batch",
        courseName: "Civil Judge Exam — Weekend Working Professionals",
        startDate: new Date(Date.now() + 86400000 * 21).toISOString().slice(0, 10),
        timing: "10:00 AM – 4:00 PM (Saturday & Sunday)",
        mode: "Online",
        totalSeats: 40,
        seatsFilled: 22,
        status: "filling",
        isCurrent: true,
        isActive: true,
      },
      {
        _type: "batch",
        courseName: "APP Exam (Grade II) — Intensive Crash Batch",
        startDate: new Date(Date.now() + 86400000 * 28).toISOString().slice(0, 10),
        timing: "6:00 PM – 8:30 PM (Monday to Friday)",
        mode: "Online",
        totalSeats: 35,
        seatsFilled: 12,
        status: "open",
        isCurrent: true,
        isActive: true,
      },
      {
        _type: "batch",
        courseName: "Patent Agent Examination 2026 Batch",
        startDate: new Date(Date.now() + 86400000 * 35).toISOString().slice(0, 10),
        timing: "7:00 PM – 9:00 PM (Tue, Thu, Sat)",
        mode: "Online",
        totalSeats: 25,
        seatsFilled: 8,
        status: "open",
        isCurrent: true,
        isActive: true,
      },
    ];

    for (const b of batches) {
      await client.create(b);
    }
    console.log(`   ✅ ${batches.length} batches seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed batches:", err?.message || err);
  }
}

async function seedFaculty() {
  console.log("👨‍🏫 Checking Faculty...");
  try {
    const count = await client.fetch('count(*[_type == "faculty"])');
    if (count > 0) {
      console.log(`   ✓ Faculty already exist (${count} found)`);
      return;
    }

    const facultyMembers = [
      {
        _type: "faculty",
        name: "Adv. K. Ramesh",
        designation: "Founder & Chief Faculty",
        qualification: "B.A. B.L., LL.M. (Constitutional Law)",
        specialization: "Criminal Major Acts, BNS, BNSS & BSA",
        experienceYears: 15,
        shortBio:
          "Senior advocate with 15+ years of litigation experience in the Madras High Court. Mentored 25+ successful judicial officers across Tamil Nadu.",
        isFounder: true,
        isActive: true,
        sortOrder: 1,
        credentials: [
          "Madras High Court Advocate",
          "15+ Years Litigation Experience",
          "Author of TNPSC Law Guides",
        ],
      },
      {
        _type: "faculty",
        name: "Dr. M. Sangeetha",
        designation: "Senior Faculty — Civil Law",
        qualification: "B.L., LL.M., Ph.D.",
        specialization: "CPC, Specific Relief Act & Translation",
        experienceYears: 12,
        shortBio:
          "Distinguished legal scholar specializing in procedural civil law, property jurisprudence, and Tamil-English legal translation papers.",
        isFounder: false,
        isActive: true,
        sortOrder: 2,
        credentials: [
          "Ph.D in Procedural Law",
          "12+ Years Academic Experience",
          "Legal Translation Specialist",
        ],
      },
      {
        _type: "faculty",
        name: "Adv. P. Vigneshwaran",
        designation: "Faculty — IP & Commercial Law",
        qualification: "B.B.A. LL.B. (Hons), LL.M. (IPR)",
        specialization: "Patent Act, Trademarks & Commercial Courts",
        experienceYears: 9,
        shortBio:
          "Practicing Intellectual Property Attorney helping aspirants master Patent & Trademark Agent examinations and corporate law modules.",
        isFounder: false,
        isActive: true,
        sortOrder: 3,
        credentials: [
          "Registered Patent Agent",
          "Madras Bar Council Member",
          "Commercial Law Specialist",
        ],
      },
    ];

    for (const f of facultyMembers) {
      await client.create(f);
    }
    console.log(`   ✅ ${facultyMembers.length} faculty seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed faculty:", err?.message || err);
  }
}

async function seedToppers() {
  console.log("🏆 Checking Toppers & Results...");
  try {
    const count = await client.fetch('count(*[_type == "topper"])');
    if (count > 0) {
      console.log(`   ✓ Toppers already exist (${count} found)`);
      return;
    }

    const toppers = [
      {
        _type: "topper",
        name: "Kavitha Rajendran",
        post: "Civil Judge",
        courseName: "Civil Judge Exam Coaching",
        college: "Dr. Ambedkar Govt Law College, Chennai",
        batchYear: "2024",
        district: "Salem District Court",
        rank: "Rank 4",
        quote:
          "The Tamil-English translation sessions and mock viva evaluations at XYZ were the turning point in my preparation.",
        isFeatured: true,
        isActive: true,
        sortOrder: 1,
      },
      {
        _type: "topper",
        name: "M. Dinesh Kumar",
        post: "Assistant Public Prosecutor (APP Grade II)",
        courseName: "APP Exam Coaching",
        college: "Government Law College, Madurai",
        batchYear: "2023",
        district: "Tirunelveli",
        rank: "Rank 2",
        quote:
          "Exhaustive coverage of criminal procedure and regular answer evaluation helped me secure top rank in the state.",
        isFeatured: true,
        isActive: true,
        sortOrder: 2,
      },
      {
        _type: "topper",
        name: "S. Ananya Sundaram",
        post: "Civil Judge",
        courseName: "Civil Judge Exam Coaching",
        college: "School of Excellence in Law (SOEL), Chennai",
        batchYear: "2023",
        district: "Coimbatore District Court",
        rank: "Rank 7",
        quote:
          "The courtroom insight shared by practicing advocates gives XYZ students an unfair advantage in Mains and Interview.",
        isFeatured: true,
        isActive: true,
        sortOrder: 3,
      },
      {
        _type: "topper",
        name: "V. Prakash",
        post: "Civil Judge",
        courseName: "Civil Judge Exam Coaching",
        college: "Government Law College, Coimbatore",
        batchYear: "2022",
        district: "Tiruchirappalli",
        rank: "Rank 11",
        quote:
          "Personal 1-on-1 mentorship and judgment writing practice were instrumental in clearing in my very first attempt.",
        isFeatured: true,
        isActive: true,
        sortOrder: 4,
      },
    ];

    for (const t of toppers) {
      await client.create(t);
    }
    console.log(`   ✅ ${toppers.length} toppers seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed toppers:", err?.message || err);
  }
}

async function seedTestimonials() {
  console.log("💬 Checking Testimonials...");
  try {
    const count = await client.fetch('count(*[_type == "testimonial"])');
    if (count > 0) {
      console.log(`   ✓ Testimonials already exist (${count} found)`);
      return;
    }

    const testimonials = [
      {
        _type: "testimonial",
        studentName: "Kavitha R.",
        currentPost: "Civil Judge",
        courseName: "Civil Judge Exam Coaching",
        college: "Dr. Ambedkar Govt Law College, Chennai",
        batchYear: "2024",
        quote:
          "The personalized attention and courtroom insight at XYZ made all the difference. The mock tests mirrored the exact TNPSC exam pattern.",
        type: "text",
        rating: 5,
        isFeatured: true,
        isActive: true,
        sortOrder: 1,
      },
      {
        _type: "testimonial",
        studentName: "M. Dinesh Kumar",
        currentPost: "Assistant Public Prosecutor",
        courseName: "APP Exam Coaching",
        college: "GLC Madurai",
        batchYear: "2023",
        quote:
          "Best coaching academy for APP and judicial exams in Tamil Nadu. The criminal law notes with latest amendments are unmatched.",
        type: "text",
        rating: 5,
        isFeatured: true,
        isActive: true,
        sortOrder: 2,
      },
      {
        _type: "testimonial",
        studentName: "P. Priya",
        currentPost: "Civil Judge Aspirant",
        courseName: "Civil Judge Coaching (Weekend Batch)",
        college: "SOEL Chennai",
        batchYear: "2024",
        quote:
          "Weekend batch timings are perfect for practicing junior advocates. Faculty takes personal care of every student's weak areas.",
        type: "text",
        rating: 5,
        isFeatured: true,
        isActive: true,
        sortOrder: 3,
      },
    ];

    for (const t of testimonials) {
      await client.create(t);
    }
    console.log(`   ✅ ${testimonials.length} testimonials seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed testimonials:", err?.message || err);
  }
}

async function seedBlogPosts() {
  console.log("✍️  Checking Blog Posts...");
  try {
    const count = await client.fetch('count(*[_type == "blogPost" && status == "published"])');
    if (count > 0) {
      console.log(`   ✓ Blog posts already exist (${count} published found)`);
      return;
    }

    const posts = [
      {
        _type: "blogPost",
        title: "How to Clear TNPSC Civil Judge Exam in First Attempt (2026 Strategy Guide)",
        slug: { _type: "slug", current: "tnpsc-civil-judge-syllabus-2026" },
        status: "published",
        category: "exam-guide",
        publishedAt: new Date().toISOString(),
        tags: ["civil judge", "TNPSC", "Tamil Nadu", "strategy", "judiciary"],
        excerpt:
          "A complete step-by-step roadmap for clearing Preliminary, Mains, and Viva-Voce stages in the TNPSC Judicial Service Examination.",
        body: [
          createBlock(
            "Cracking the Tamil Nadu State Judicial Service Examination on your first attempt is not merely a question of memorizing bare acts; it requires a structured, multi-stage strategy."
          ),
          createBlock(
            "Phase 1: Master the Bare Acts for Prelims. The preliminary examination tests your command over statutory provisions, exceptions, and key legal illustrations."
          ),
          createBlock(
            "Phase 2: Answer Writing Drills for Mains. The difference between qualifying and topping lies in how cleanly you frame legal issues, state principles, and cite leading Supreme Court and Madras High Court precedents."
          ),
          createBlock(
            "Phase 3: Translation Paper Mastery. The translation paper (Tamil to English and English to Tamil) carries qualifying marks that disqualify dozens of candidates each year. Practice daily translation of court depositions and FIR extracts."
          ),
        ],
        seoTitle: "How to Clear TNPSC Civil Judge Exam in First Attempt | Strategy Guide",
        seoDescription:
          "Comprehensive roadmap and study plan to clear the Tamil Nadu Judicial Service Civil Judge examination in first attempt.",
      },
      {
        _type: "blogPost",
        title: "Complete Guide to BNS, BNSS & BSA for Tamil Nadu Judicial Services",
        slug: { _type: "slug", current: "bns-bnss-bsa-judiciary-exam-guide" },
        status: "published",
        category: "legal-update",
        publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        tags: ["BNS", "BNSS", "BSA", "criminal law", "legal update"],
        excerpt:
          "Key transitions from IPC, CrPC, and Indian Evidence Act to the Bharatiya Nyaya Sanhita, BNSS, and BSA for judicial aspirants.",
        body: [
          createBlock(
            "With the new criminal laws taking full effect, aspirants preparing for upcoming judicial service and APP exams must master the transitional provisions."
          ),
          createBlock(
            "Bharatiya Nyaya Sanhita (BNS) introduces crucial consolidations and modern offenses, replacing the 164-year-old IPC."
          ),
          createBlock(
            "Bharatiya Nagarik Suraksha Sanhita (BNSS) updates trial timelines, electronic summons, and investigation procedures."
          ),
          createBlock(
            "Bharatiya Sakshya Adhiniyam (BSA) modernizes electronic and digital evidence admissible in trial courts."
          ),
        ],
        seoTitle: "BNS, BNSS, BSA Guide for Judiciary Exams | Tamil Nadu Law",
        seoDescription:
          "In-depth analysis of the new criminal laws (BNS, BNSS, BSA) for TNPSC Civil Judge and APP examinations.",
      },
      {
        _type: "blogPost",
        title: "Tamil-to-English Legal Translation: Essential Vocabulary for Law Exams",
        slug: { _type: "slug", current: "tamil-legal-translation-word-list" },
        status: "published",
        category: "study-material",
        publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        tags: ["translation", "Tamil", "Mains paper", "vocabulary", "study material"],
        excerpt:
          "Master the 100 most frequently tested Tamil legal terms, court petition terminologies, and judgment phrases.",
        body: [
          createBlock(
            "The translation paper in the TNPSC Civil Judge Mains examination is often the single most decisive factor for law graduates educated primarily in English medium."
          ),
          createBlock(
            "Key Terms to Master: வாதி (Plaintiff), பிரதிவாதி (Defendant), தீர்ப்பாணை (Decree), பிரமாணப் பத்திரம் (Affidavit), குற்றப்பத்திரிகை (Charge Sheet)."
          ),
          createBlock(
            "Daily Practice Tip: Translate one short judgment excerpt from the Madras Law Journal (Tamil) into English every morning."
          ),
        ],
        seoTitle: "Tamil Legal Translation Vocabulary for Judiciary Exams",
        seoDescription:
          "Essential Tamil-English legal vocabulary list and translation techniques for TNPSC Civil Judge Mains examination.",
      },
    ];

    for (const p of posts) {
      await client.create(p);
    }
    console.log(`   ✅ ${posts.length} blog posts seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed blog posts:", err?.message || err);
  }
}

async function seedExamUpdates() {
  console.log("🔔 Checking Exam Updates...");
  try {
    const count = await client.fetch('count(*[_type == "examUpdate"])');
    if (count > 0) {
      console.log(`   ✓ Exam updates already exist (${count} found)`);
      return;
    }

    const updates = [
      {
        _type: "examUpdate",
        title: "TNPSC Civil Judge 2026 Notification Expected Shortly",
        examName: "TNPSC Civil Judge Exam",
        type: "notification",
        content:
          "TNPSC is scheduled to release the recruitment notification for Civil Judge vacancies across Tamil Nadu district judiciary courts. Candidates are advised to begin Prelims & BNS preparation.",
        notificationDate: new Date().toISOString().slice(0, 10),
        officialLink: "https://tnpsc.gov.in",
        isFeatured: true,
        isActive: true,
      },
      {
        _type: "examUpdate",
        title: "APP Exam (Grade II) Syllabus Notification",
        examName: "TNPSC Assistant Public Prosecutor",
        type: "syllabus",
        content:
          "Revised criminal law question weightage including Bharatiya Nyaya Sanhita (BNS) provisions confirmed for upcoming examination.",
        notificationDate: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
        officialLink: "https://tnpsc.gov.in",
        isFeatured: false,
        isActive: true,
      },
    ];

    for (const u of updates) {
      await client.create(u);
    }
    console.log(`   ✅ ${updates.length} exam updates seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed exam updates:", err?.message || err);
  }
}

async function seedFAQs() {
  console.log("❓ Checking FAQs...");
  try {
    const count = await client.fetch('count(*[_type == "faq"])');
    if (count > 0) {
      console.log(`   ✓ FAQs already exist (${count} found)`);
      return;
    }

    const faqs = [
      {
        _type: "faq",
        question: "Who is eligible to appear for the TNPSC Civil Judge exam?",
        answer:
          "Law graduates who are enrolled as an advocate in the Bar Council with a minimum of 3 years of active court practice (Fresh law graduates with 50%+ marks are also eligible under the fresh law graduate quota subject to current TNPSC rules).",
        category: "about-courses",
        sortOrder: 1,
        isActive: true,
        showOnHomepage: true,
      },
      {
        _type: "faq",
        question: "Are the new criminal laws (BNS, BNSS, BSA) covered in your coaching?",
        answer:
          "Yes, 100%. All our classes, test series, and study materials have been completely updated to cover the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA).",
        category: "about-courses",
        sortOrder: 2,
        isActive: true,
        showOnHomepage: true,
      },
      {
        _type: "faq",
        question: "Do you offer online classes for working advocates?",
        answer:
          "Yes! We offer live interactive online batches as well as special weekend morning/evening batches specifically designed for practicing advocates and court clerks.",
        category: "fees-batches",
        sortOrder: 3,
        isActive: true,
        showOnHomepage: true,
      },
      {
        _type: "faq",
        question: "Is special guidance provided for the Tamil translation paper?",
        answer:
          "Yes. Translation is a critical scoring paper in the TNPSC Mains. We provide dedicated weekly Tamil-to-English and English-to-Tamil legal translation drills with individual paper corrections.",
        category: "about-courses",
        sortOrder: 4,
        isActive: true,
        showOnHomepage: true,
      },
      {
        _type: "faq",
        question: "Can I attend a free demo class before enrolling?",
        answer:
          "Yes! You can register for a free live demo class right from our website or by messaging us on WhatsApp.",
        category: "fees-batches",
        sortOrder: 5,
        isActive: true,
        showOnHomepage: true,
      },
    ];

    for (const f of faqs) {
      await client.create(f);
    }
    console.log(`   ✅ ${faqs.length} FAQs seeded successfully`);
  } catch (err: any) {
    console.error("   ❌ Failed to seed FAQs:", err?.message || err);
  }
}

async function main() {
  console.log("\n=======================================================");
  console.log("  🌱 SEEDING COMPLETE SANITY CMS CONTENT");
  console.log("  Project ID: " + (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4zn0ydn7"));
  console.log("=======================================================\n");

  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ Error: SANITY_API_TOKEN is missing in .env.local!");
    process.exit(1);
  }

  await seedSiteSettings();
  await seedCourses();
  await seedBatches();
  await seedFaculty();
  await seedToppers();
  await seedTestimonials();
  await seedBlogPosts();
  await seedExamUpdates();
  await seedFAQs();

  console.log("\n=======================================================");
  console.log("  🎉 SANITY DATABASE SEEDING COMPLETED!");
  console.log("  Refresh your Studio at http://localhost:3000/studio");
  console.log("=======================================================\n");
}

main().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
