export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string | null;
          full_description: string | null;
          duration: string | null;
          mode: string | null;
          fee: string | null;
          fee_note: string | null;
          badge: string | null;
          badge_color: string | null;
          icon: string | null;
          is_active: boolean;
          is_featured: boolean;
          sort_order: number;
          highlights: string[];
          subjects: string[];
          href: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description?: string | null;
          full_description?: string | null;
          duration?: string | null;
          mode?: string | null;
          fee?: string | null;
          fee_note?: string | null;
          badge?: string | null;
          badge_color?: string | null;
          icon?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          highlights?: string[];
          subjects?: string[];
          href?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [];
      };
      batches: {
        Row: {
          id: string;
          course_id: string | null;
          course_name: string;
          start_date: string | null;
          timing: string | null;
          mode: string | null;
          total_seats: number;
          seats_filled: number;
          status: "open" | "filling" | "full" | "completed";
          is_active: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id?: string | null;
          course_name: string;
          start_date?: string | null;
          timing?: string | null;
          mode?: string | null;
          total_seats?: number;
          seats_filled?: number;
          status?: "open" | "filling" | "full" | "completed";
          is_active?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["batches"]["Insert"]>;
        Relationships: [];
      };
      faculty: {
        Row: {
          id: string;
          name: string;
          designation: string | null;
          qualification: string | null;
          specialization: string | null;
          experience_years: number | null;
          bio: string | null;
          short_bio: string | null;
          photo_url: string | null;
          is_founder: boolean;
          is_active: boolean;
          sort_order: number;
          credentials: string[];
          social_links: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          designation?: string | null;
          qualification?: string | null;
          specialization?: string | null;
          experience_years?: number | null;
          bio?: string | null;
          short_bio?: string | null;
          photo_url?: string | null;
          is_founder?: boolean;
          is_active?: boolean;
          sort_order?: number;
          credentials?: string[];
          social_links?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["faculty"]["Insert"]>;
        Relationships: [];
      };
      toppers: {
        Row: {
          id: string;
          name: string;
          post: string;
          course_id: string | null;
          course_name: string | null;
          college: string | null;
          batch_year: string | null;
          district: string | null;
          photo_url: string | null;
          quote: string | null;
          rank: string | null;
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          post: string;
          course_id?: string | null;
          course_name?: string | null;
          college?: string | null;
          batch_year?: string | null;
          district?: string | null;
          photo_url?: string | null;
          quote?: string | null;
          rank?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["toppers"]["Insert"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          student_name: string;
          current_post: string | null;
          course_id: string | null;
          course_name: string | null;
          college: string | null;
          batch_year: string | null;
          quote: string;
          video_url: string | null;
          photo_url: string | null;
          type: "text" | "video" | "both";
          rating: number;
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_name: string;
          current_post?: string | null;
          course_id?: string | null;
          course_name?: string | null;
          college?: string | null;
          batch_year?: string | null;
          quote: string;
          video_url?: string | null;
          photo_url?: string | null;
          type?: "text" | "video" | "both";
          rating?: number;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          course_interest: string | null;
          course_id: string | null;
          message: string | null;
          source: string | null;
          form_type: "enquiry" | "demo_class" | "counselling" | "contact";
          status: "new" | "contacted" | "enrolled" | "not_interested" | "follow_up";
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          ip_address: string | null;
          user_agent: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          course_interest?: string | null;
          course_id?: string | null;
          message?: string | null;
          source?: string | null;
          form_type?: "enquiry" | "demo_class" | "counselling" | "contact";
          status?: "new" | "contacted" | "enrolled" | "not_interested" | "follow_up";
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      exam_updates: {
        Row: {
          id: string;
          title: string;
          content: string | null;
          exam_name: string | null;
          notification_date: string | null;
          last_date: string | null;
          official_link: string | null;
          type: "notification" | "result" | "admit_card" | "syllabus" | "news";
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content?: string | null;
          exam_name?: string | null;
          notification_date?: string | null;
          last_date?: string | null;
          official_link?: string | null;
          type?: "notification" | "result" | "admit_card" | "syllabus" | "news";
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["exam_updates"]["Insert"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          value_json: Json | null;
          label: string | null;
          type: "text" | "number" | "boolean" | "json" | "image" | "url";
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: string | null;
          value_json?: Json | null;
          label?: string | null;
          type?: "text" | "number" | "boolean" | "json" | "image" | "url";
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
        Relationships: [];
      };
      blog_views: {
        Row: {
          id: string;
          post_slug: string;
          viewed_at: string;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          post_slug: string;
          viewed_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["blog_views"]["Insert"]>;
        Relationships: [];
      };
      whatsapp_clicks: {
        Row: {
          id: string;
          message_type: string | null;
          clicked_at: string;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          message_type?: string | null;
          clicked_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["whatsapp_clicks"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience type aliases
export type Course =
  Database["public"]["Tables"]["courses"]["Row"];
export type Batch =
  Database["public"]["Tables"]["batches"]["Row"];
export type Faculty =
  Database["public"]["Tables"]["faculty"]["Row"];
export type Topper =
  Database["public"]["Tables"]["toppers"]["Row"];
export type Testimonial =
  Database["public"]["Tables"]["testimonials"]["Row"];
export type Lead =
  Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert =
  Database["public"]["Tables"]["leads"]["Insert"];
export type ExamUpdate =
  Database["public"]["Tables"]["exam_updates"]["Row"];
export type SiteSetting =
  Database["public"]["Tables"]["site_settings"]["Row"];
export type BlogView =
  Database["public"]["Tables"]["blog_views"]["Row"];
export type WhatsAppClick =
  Database["public"]["Tables"]["whatsapp_clicks"]["Row"];


export type BatchStatus = "open" | "filling" | "full" | "completed";
export type LeadStatus =
  | "new"
  | "contacted"
  | "enrolled"
  | "not_interested"
  | "follow_up";
export type FormType =
  | "enquiry"
  | "demo_class"
  | "counselling"
  | "contact";
export type TestimonialType = "text" | "video" | "both";
