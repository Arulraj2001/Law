import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { getSiteConfig } from "@/lib/site-config";
import { getAllCoursesSanity } from "@/lib/sanity/queries";
import { COURSES } from "@/lib/constants";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, sanityCourses] = await Promise.all([
    getSiteConfig(),
    getAllCoursesSanity().catch(() => null),
  ]);

  // Normalise Sanity courses to the shape Navbar/Footer expect, fall back to constant
  const courses =
    Array.isArray(sanityCourses) && sanityCourses.length > 0
      ? sanityCourses.map((c: any) => ({
          id: c._id,
          title: c.title,
          slug: c.slug,
          href: `/courses/${c.slug}`,
          badge: c.badge,
          badgeColor: c.badgeColor,
          description: c.shortDescription,
        }))
      : COURSES;

  return (
    <>
      <Navbar config={config} courses={courses} />
      <main className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer config={config} courses={courses} />
      <WhatsAppButton phone={config.whatsapp} />
    </>
  );
}
