-- ==============================================================================
-- XYZ LAW COACHING — COMPLETE SUPABASE DATABASE SCHEMA & SEED DATA
-- ==============================================================================
-- Run this complete SQL script in your Supabase Project:
-- Dashboard -> SQL Editor -> New Query -> Paste -> Run (Ctrl+Enter)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Updated At Timestamp Function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- TABLES CREATION
-- ==============================================================================

-- 1. COURSES
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  duration TEXT,
  mode TEXT,
  fee TEXT,
  fee_note TEXT,
  badge TEXT,
  badge_color TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  highlights TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  href TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BATCHES
CREATE TABLE IF NOT EXISTS batches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id TEXT,
  course_name TEXT NOT NULL,
  start_date DATE,
  timing TEXT,
  mode TEXT,
  total_seats INTEGER DEFAULT 30,
  seats_filled INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('open', 'filling', 'full', 'completed')) DEFAULT 'open',
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FACULTY
CREATE TABLE IF NOT EXISTS faculty (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT,
  qualification TEXT,
  specialization TEXT,
  experience_years INTEGER,
  bio TEXT,
  short_bio TEXT,
  photo_url TEXT,
  is_founder BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  credentials TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TOPPERS / RESULTS
CREATE TABLE IF NOT EXISTS toppers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  post TEXT NOT NULL,
  course_id TEXT,
  course_name TEXT,
  college TEXT,
  batch_year TEXT,
  district TEXT,
  photo_url TEXT,
  quote TEXT,
  rank TEXT,
  is_featured BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_name TEXT NOT NULL,
  current_post TEXT,
  course_id TEXT,
  course_name TEXT,
  college TEXT,
  batch_year TEXT,
  quote TEXT NOT NULL,
  video_url TEXT,
  photo_url TEXT,
  type TEXT CHECK (type IN ('text', 'video', 'both')) DEFAULT 'text',
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LEADS & ENQUIRIES
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  course_interest TEXT,
  course_id TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  form_type TEXT CHECK (form_type IN ('enquiry', 'demo_class', 'counselling', 'contact')) DEFAULT 'enquiry',
  status TEXT CHECK (status IN ('new', 'contacted', 'enrolled', 'not_interested', 'follow_up')) DEFAULT 'new',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  user_agent TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EXAM UPDATES & ALERTS
CREATE TABLE IF NOT EXISTS exam_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  exam_name TEXT,
  notification_date DATE,
  last_date DATE,
  official_link TEXT,
  type TEXT CHECK (type IN ('notification', 'result', 'admit_card', 'syllabus', 'news')) DEFAULT 'notification',
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SITE SETTINGS (Dynamic Key-Value Store)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_json JSONB,
  label TEXT,
  type TEXT CHECK (type IN ('text', 'number', 'boolean', 'json', 'image', 'url')) DEFAULT 'text',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BLOG POST VIEWS TRACKER
CREATE TABLE IF NOT EXISTS blog_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- 10. WHATSAPP CLICKS TRACKER
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  message_type TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- 11. SELECTION STATS (Historical Track Record)
CREATE TABLE IF NOT EXISTS selection_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year TEXT NOT NULL,
  exam_name TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_batches_course ON batches(course_id);
CREATE INDEX IF NOT EXISTS idx_batches_active ON batches(is_active, status);
CREATE INDEX IF NOT EXISTS idx_toppers_featured ON toppers(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_exam_updates_active ON exam_updates(is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_blog_views_slug ON blog_views(post_slug);
CREATE INDEX IF NOT EXISTS idx_wa_clicks_type ON whatsapp_clicks(message_type);
CREATE INDEX IF NOT EXISTS idx_wa_clicks_time ON whatsapp_clicks(clicked_at DESC);

-- ==============================================================================
-- UPDATED_AT TRIGGERS
-- ==============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_courses_updated_at') THEN
    CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_batches_updated_at') THEN
    CREATE TRIGGER trg_batches_updated_at BEFORE UPDATE ON batches FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_faculty_updated_at') THEN
    CREATE TRIGGER trg_faculty_updated_at BEFORE UPDATE ON faculty FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_toppers_updated_at') THEN
    CREATE TRIGGER trg_toppers_updated_at BEFORE UPDATE ON toppers FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_testimonials_updated_at') THEN
    CREATE TRIGGER trg_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_leads_updated_at') THEN
    CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_exam_updates_updated_at') THEN
    CREATE TRIGGER trg_exam_updates_updated_at BEFORE UPDATE ON exam_updates FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_site_settings_updated_at') THEN
    CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_selection_stats_updated_at') THEN
    CREATE TRIGGER trg_selection_stats_updated_at BEFORE UPDATE ON selection_stats FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE selection_stats ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access for website visitors
CREATE POLICY "Public courses are viewable by everyone" ON courses FOR SELECT USING (is_active = true);
CREATE POLICY "Public batches are viewable by everyone" ON batches FOR SELECT USING (is_active = true);
CREATE POLICY "Public faculty are viewable by everyone" ON faculty FOR SELECT USING (is_active = true);
CREATE POLICY "Public toppers are viewable by everyone" ON toppers FOR SELECT USING (is_active = true);
CREATE POLICY "Public testimonials are viewable by everyone" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public exam updates are viewable by everyone" ON exam_updates FOR SELECT USING (is_active = true);
CREATE POLICY "Public site settings are viewable by everyone" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public blog views count" ON blog_views FOR SELECT USING (true);
CREATE POLICY "Public selection stats viewable" ON selection_stats FOR SELECT USING (is_active = true);

-- 2. Public Insert Access for student enquiries and tracking
CREATE POLICY "Anyone can submit a lead enquiry" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can log a blog view" ON blog_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can track whatsapp click" ON whatsapp_clicks FOR INSERT WITH CHECK (true);

-- 3. Service Role & Authenticated Admins have FULL access (ALL commands)
CREATE POLICY "Service role full access on courses" ON courses FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on batches" ON batches FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on faculty" ON faculty FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on toppers" ON toppers FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on testimonials" ON testimonials FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on leads" ON leads FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on exam_updates" ON exam_updates FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on site_settings" ON site_settings FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on blog_views" ON blog_views FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on whatsapp_clicks" ON whatsapp_clicks FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Service role full access on selection_stats" ON selection_stats FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Site Settings Initial Configuration
INSERT INTO site_settings (key, value, label, type) VALUES
('phone', '+91 98765 43210', 'Primary Office Phone', 'text'),
('whatsapp', '919876543210', 'Primary WhatsApp Desk Number', 'text'),
('email', 'contact@xyzlawcoaching.com', 'Primary Admissions Email', 'text'),
('address', 'No. 45, High Court Road, George Town, Chennai, Tamil Nadu 600001', 'Academy Postal Address', 'text'),
('students_count', '1000', 'Students Trained Count', 'number'),
('judges_count', '25', 'Judges & APPs Selected', 'number'),
('experience_years', '10', 'Years of Coaching Experience', 'number'),
('states_count', '15', 'States / Districts Covered', 'number'),
('youtube_url', 'https://youtube.com/@xyzlawcoaching', 'YouTube Channel URL', 'url'),
('instagram_url', 'https://instagram.com/xyzlawcoaching', 'Instagram Profile URL', 'url'),
('facebook_url', 'https://facebook.com/xyzlawcoaching', 'Facebook Page URL', 'url'),
('whatsapp_channel', 'https://whatsapp.com/channel/xyzlawcoaching', 'Official WhatsApp Channel', 'url')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = NOW();

-- Core Courses Initial Seed
INSERT INTO courses (slug, title, short_description, duration, mode, badge, badge_color, icon, is_active, is_featured, sort_order, highlights, subjects, href) VALUES
(
  'civil-judge',
  'Civil Judge Exam Coaching',
  'Complete preparation for TNPSC Civil Judge exam — Prelims, Mains & Viva-Voce. BNS, BNSS & BSA covered.',
  '6 Months Intensive',
  'Online + Offline',
  'Judiciary',
  'navy',
  'gavel',
  true,
  true,
  1,
  ARRAY[
    'Complete Prelims + Mains + Viva coverage',
    'Exclusive Tamil-to-English translation paper classes',
    'Weekly TNPSC-pattern mock tests with evaluation',
    'Full coverage of BNS, BNSS & BSA (new criminal laws)',
    'Handwritten updated notes & judgment writing drills',
    'Flexible online interactive & classroom batches'
  ],
  ARRAY['Civil Law', 'Criminal Major Acts', 'Translation Paper', 'Judgment Writing'],
  '/courses/civil-judge'
),
(
  'app-exam',
  'APP Exam Coaching',
  'TNPSC Assistant Public Prosecutor Grade II — all 3 stages with GS, Law & Interview preparation.',
  '4 Months Fast-Track',
  'Online + Offline',
  'Prosecution',
  'navy',
  'briefcase',
  true,
  true,
  2,
  ARRAY[
    'All 200 Prelims MCQs exhaustively covered',
    'Criminal law special focus on BNS, BNSS & BSA',
    'General Studies and Mental Ability prep',
    'Mains answer writing and mock trials',
    'Interview panel simulation with former prosecutors'
  ],
  ARRAY['Criminal Major Acts', 'Minor Criminal Acts', 'General Studies', 'Aptitude'],
  '/courses/app-exam'
),
(
  'patent-agent',
  'Patent Agent Exam',
  'CGPDTM Patent Agent Exam preparation — IP law, patent drafting, prosecution & procedure.',
  '3 Months Comprehensive',
  'Online',
  'Patent Office',
  'emerald',
  'certificate',
  true,
  false,
  3,
  ARRAY[
    'Indian Patents Act 1970 & Patent Rules 2003',
    'Patent specification & claims drafting workshops',
    'Viva-voce simulation by practicing patent attorneys',
    'Previous 10 years question paper discussion'
  ],
  ARRAY['Patents Act', 'Patent Drafting', 'Viva-Voce'],
  '/courses/patent-agent'
),
(
  'trademark-agent',
  'Trademark Agent Exam',
  'Trade Marks Registry Agent Exam — TM law, filing procedures, opposition & registration.',
  '2 Months Online',
  'Online',
  'TM Registry',
  'emerald',
  'registered',
  true,
  false,
  4,
  ARRAY[
    'Trade Marks Act 1999 & Trade Marks Rules 2017',
    'Filing, examination reports, and opposition proceedings',
    'Real-world portfolio filing case studies',
    'Objective MCQ test series'
  ],
  ARRAY['Trade Marks Act', 'TM Rules & Procedure'],
  '/courses/trademark-agent'
),
(
  'ugc-net-law',
  'UGC-NET Law Coaching',
  'NTA UGC-NET Law paper 1 & 2 preparation for Assistant Professorship and JRF.',
  '5 Months Structured',
  'Online + Offline',
  'Academic',
  'gold',
  'book-open',
  true,
  false,
  5,
  ARRAY[
    'Paper 1 (Teaching & Research Aptitude) mastery',
    'Paper 2 (All 10 Law Modules) detailed analysis',
    'Previous year questions with analytical solutions',
    'Regular timed online mock tests'
  ],
  ARRAY['Jurisprudence', 'Constitutional Law', 'Public International Law', 'Commercial Law'],
  '/courses/ugc-net-law'
),
(
  'set-law',
  'SET Law Exam Coaching',
  'State Eligibility Test coaching for collegiate Assistant Professor appointments in Tamil Nadu.',
  '4 Months Targeted',
  'Online + Offline',
  'Academic',
  'gold',
  'graduation-cap',
  true,
  false,
  6,
  ARRAY[
    'TNSET exam syllabus aligned lectures',
    'Tamil Nadu higher education exam pattern focus',
    'Paper 1 & Paper 2 combined preparation',
    'Weekly doubt clearance and revision sets'
  ],
  ARRAY['Teaching Aptitude', 'Core Law Papers', 'Mock Tests'],
  '/courses/set-law'
)
ON CONFLICT (slug) DO NOTHING;

-- Initial Batches Seed
INSERT INTO batches (course_name, start_date, timing, mode, total_seats, seats_filled, status, is_active, notes) VALUES
(
  'Civil Judge Exam — Morning Regular Batch',
  CURRENT_DATE + INTERVAL '14 days',
  '7:00 AM – 9:00 AM (Mon to Fri)',
  'Online + Classroom',
  30,
  18,
  'filling',
  true,
  'Includes BNS/BNSS materials & translation sessions'
),
(
  'Civil Judge Exam — Weekend Working Professionals',
  CURRENT_DATE + INTERVAL '21 days',
  '10:00 AM – 4:00 PM (Sat & Sun)',
  'Online Live Interactive',
  40,
  22,
  'filling',
  true,
  'Tailored for practicing advocates and court clerks'
),
(
  'APP Exam (Grade II) — Intensive Crash Batch',
  CURRENT_DATE + INTERVAL '28 days',
  '6:00 PM – 8:30 PM (Mon to Fri)',
  'Online Live',
  35,
  12,
  'open',
  true,
  'Complete coverage of Criminal Major Acts + GS'
),
(
  'Patent Agent Examination 2026 Batch',
  CURRENT_DATE + INTERVAL '35 days',
  '7:00 PM – 9:00 PM (Tue, Thu, Sat)',
  'Online',
  25,
  8,
  'open',
  true,
  'Covers Paper 1 Act & Paper 2 Drafting practice'
);

-- Initial Selection Stats Seed
INSERT INTO selection_stats (year, exam_name, count, is_active) VALUES
('2024', 'TNPSC Civil Judge Exam', 12, true),
('2023', 'TNPSC Assistant Public Prosecutor', 7, true),
('2023', 'TNPSC Civil Judge Exam', 9, true),
('2022', 'TNPSC Civil Judge Exam', 8, true),
('2021', 'TNPSC Assistant Public Prosecutor', 5, true);
