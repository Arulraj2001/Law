import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { getSiteConfig } from "@/lib/site-config";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <>
      <Navbar config={config} />
      <main className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer config={config} />
      <WhatsAppButton phone={config.whatsapp} />
    </>
  );
}
