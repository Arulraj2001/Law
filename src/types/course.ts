export interface Course {
  id: string;
  title: string;
  slug: string;
  badge?: string;
  badgeColor?: "navy" | "emerald" | "gold";
  icon?: string;
  description: string;
  highlights: string[];
  duration: string;
  mode: string;
  href: string;
  syllabus?: string[];
  eligibility?: string;
  fee?: string;
  startDate?: string;
}
