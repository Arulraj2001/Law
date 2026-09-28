import { createClient } from "next-sanity";
import { WHY_US, PROCESS_STEPS, FAQS } from "../lib/constants";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xyz-law-coaching",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seedSiteSettings() {
  try {
    const existing = await client.fetch('*[_type == "siteSettings"][0]._id');

    if (existing) {
      console.log("Site settings already exist");
      return;
    }

    await client.create({
      _type: "siteSettings",
      _id: "siteSettings",
      siteName: "XYZ Law Coaching",
      tagline: "Tamil Nadu's Trusted Judiciary Coaching",
      whyUsFeatures: WHY_US.map((item) => ({
        _type: "object",
        _key: item.icon,
        icon: item.icon,
        title: item.title,
        description: item.description,
      })),
      processSteps: PROCESS_STEPS.map((step) => ({
        _type: "object",
        _key: `step-${step.step}`,
        step: step.step,
        title: step.title,
        description: step.description,
      })),
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

    console.log("✅ Site settings seeded");
  } catch (err) {
    console.error("Failed to seed site settings:", err);
  }
}

async function seedFAQs() {
  try {
    const existing = await client.fetch('count(*[_type == "faq"])');

    if (existing > 0) {
      console.log("FAQs already exist");
      return;
    }

    const categoryMap: Record<number, string> = {
      0: "about-courses",
      1: "about-courses",
      2: "about-courses",
      3: "about-courses",
      4: "fees-batches",
      5: "career-results",
    };

    const docs = FAQS.map((faq, index) => ({
      _type: "faq",
      question: faq.question,
      answer: faq.answer,
      category: categoryMap[index] || "about-courses",
      sortOrder: index,
      isActive: true,
      showOnHomepage: index < 6,
    }));

    await Promise.all(docs.map((doc) => client.create(doc)));

    console.log(`✅ ${docs.length} FAQs seeded`);
  } catch (err) {
    console.error("Failed to seed FAQs:", err);
  }
}

async function main() {
  console.log("🌱 Seeding Sanity...");
  if (!process.env.SANITY_API_TOKEN) {
    console.warn("⚠️ Warning: SANITY_API_TOKEN is not set. Seed script requires write access.");
  }
  await seedSiteSettings();
  await seedFAQs();
  console.log("✅ Seeding complete");
}

main().catch(console.error);
