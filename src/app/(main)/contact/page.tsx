import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactMap } from "@/components/contact/ContactMap";
import { getSiteConfig } from "@/lib/site-config";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return generatePageMetadata({
    title: `Contact ${config.name} — Tamil Nadu Judiciary Coaching`,
    description: `Contact ${config.name} for Civil Judge, APP Exam coaching enquiries. Call, WhatsApp or visit us at our Tamil Nadu centre. Free counselling available.`,
    keywords: [
      `contact ${config.name.toLowerCase()}`,
      "judiciary coaching Chennai address",
      "civil judge coaching phone number",
      "Tamil Nadu law coaching enquiries",
    ],
    path: "/contact",
  });
}

export default async function ContactPage() {
  const config = await getSiteConfig();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);

  const businessSchema = localBusinessSchema({
    phone: config.phone,
    email: config.email,
    address: config.address,
    mapUrl: config.mapUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      <main className="min-h-screen">
        <ContactHero />
        <ContactFormSection config={config} />
        <ContactMap mapUrl={config.mapUrl} address={config.address} />

        {/* Find us on Google Section */}
        <section className="py-10 bg-slate-50 border-t border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 block mb-1">
              Google Business Profile
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-navy-dark mb-2">
              Find us on Google
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-4">
              Search <span className="font-semibold text-navy-dark">&quot;{config.name} Tamil Nadu&quot;</span> on
              Google to find our verified business listing, student reviews, photo gallery, and direct driving directions.
            </p>
            <a
              href={config.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald hover:text-emerald-dark underline"
            >
              <span>View Verified Listing on Google Maps →</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
