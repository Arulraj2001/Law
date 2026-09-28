export interface SiteConfig {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  establishedYear: string;
  mapUrl: string;
  social: {
    youtube: string;
    instagram: string;
    facebook: string;
    whatsappChannel: string;
  };
  stats: {
    studentsCount: string;
    judgesCount: string;
    experienceYears: string;
    statesCount: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

// Fallback values safe for both client and server components
export const SITE_CONFIG_FALLBACK: SiteConfig = {
  name: "XYZ Law Coaching",
  tagline: "Tamil Nadu's Trusted Judiciary Coaching",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "contact@xyzlawcoaching.com",
  address: "No. 45, High Court Road, George Town, Chennai, Tamil Nadu 600001",
  establishedYear: "2016",
  mapUrl: "https://maps.google.com/?q=Chennai+High+Court",
  social: {
    youtube: "https://youtube.com/@xyzlawcoaching",
    instagram: "https://instagram.com/xyzlawcoaching",
    facebook: "https://facebook.com/xyzlawcoaching",
    whatsappChannel: "https://whatsapp.com/channel/xyzlawcoaching",
  },
  stats: {
    studentsCount: "1000",
    judgesCount: "25",
    experienceYears: "10",
    statesCount: "15",
  },
  seo: {
    title:
      "Civil Judge & APP Exam Coaching in Tamil Nadu | XYZ Law Coaching",
    description:
      "Tamil Nadu's trusted judiciary coaching institute for TNPSC Civil Judge, APP Exam, Patent Agent, Trademark Agent, UGC-NET & SET Law.",
  },
};
