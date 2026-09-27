export interface Testimonial {
  id: string;
  name: string;
  role: string;
  examCleared: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
  videoUrl?: string;
  year?: number;
}
