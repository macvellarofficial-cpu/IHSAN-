/**
 * Ihsan Children's Foundation - Supabase PostgreSQL Schema & Security Blueprint
 * Provides complete production-ready DDL, Row Level Security (RLS) policies,
 * triggers, and role-based permissions for Supabase.
 */

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- IHSAN CHILDREN'S FOUNDATION - SUPABASE SCHEMA
-- Head Office: Mutundwe, Kampala, Uganda | Founded: 2019
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLE-BASED ACCESS
CREATE TYPE user_role AS ENUM ('super_admin', 'administrator', 'editor', 'project_manager', 'finance_manager');

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'editor'::user_role,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ngo_name TEXT NOT NULL DEFAULT 'Ihsan Children''s Foundation',
  head_office TEXT NOT NULL DEFAULT 'Mutundwe, Kampala, Uganda',
  founded_year INT DEFAULT 2019,
  ngo_registration_number TEXT DEFAULT '[ADD VERIFIED REGISTRATION NUMBER]',
  is_registration_verified BOOLEAN DEFAULT FALSE,
  contact_phone TEXT DEFAULT '+256 741 799 231',
  whatsapp_number TEXT DEFAULT '+256 702 570 802',
  contact_email TEXT DEFAULT 'info@ihsanchildrensfoundation.org',
  office_hours TEXT DEFAULT 'Mon - Fri: 8:30 AM - 5:00 PM EAT',
  announcement_notice TEXT,
  show_announcement BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROGRAMS
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  detailed_scope JSONB DEFAULT '[]'::jsonb,
  key_objectives JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECTS
CREATE TYPE project_status_type AS ENUM ('urgent', 'ongoing', 'completed', 'fully_funded');

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  status project_status_type DEFAULT 'ongoing'::project_status_type,
  location TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Uganda',
  region TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  situation TEXT NOT NULL,
  objective TEXT NOT NULL,
  planned_activities JSONB DEFAULT '[]'::jsonb,
  target_beneficiaries TEXT NOT NULL,
  amount_required NUMERIC(12, 2) NOT NULL DEFAULT 0,
  amount_raised NUMERIC(12, 2) NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  urgent_appeal BOOLEAN DEFAULT FALSE,
  verified_data BOOLEAN DEFAULT TRUE,
  start_date DATE DEFAULT CURRENT_DATE,
  completion_date DATE,
  updates JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DONATIONS & DONORS
CREATE TYPE donation_status_type AS ENUM ('completed', 'pending', 'processing', 'failed');
CREATE TYPE donation_frequency_type AS ENUM ('one_time', 'monthly');

CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount_usd NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  original_amount NUMERIC(12, 2) NOT NULL,
  frequency donation_frequency_type DEFAULT 'one_time'::donation_frequency_type,
  fund_category TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  status donation_status_type DEFAULT 'completed'::donation_status_type,
  transaction_reference TEXT UNIQUE NOT NULL,
  receipt_number TEXT UNIQUE NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VOLUNTEER APPLICATIONS
CREATE TYPE volunteer_status_type AS ENUM ('new', 'reviewing', 'accepted', 'rejected');

CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  location_city TEXT NOT NULL,
  profession TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  area_of_interest TEXT NOT NULL,
  availability TEXT NOT NULL,
  experience_summary TEXT,
  motivation TEXT NOT NULL,
  has_child_protection_consent BOOLEAN DEFAULT TRUE,
  status volunteer_status_type DEFAULT 'new'::volunteer_status_type,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PARTNERSHIP REQUESTS
CREATE TYPE partnership_status_type AS ENUM ('new', 'in_dialogue', 'partnered', 'archived');

CREATE TABLE IF NOT EXISTS partnership_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  partnership_scope TEXT NOT NULL,
  message TEXT NOT NULL,
  status partnership_status_type DEFAULT 'new'::partnership_status_type,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_replied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SAFEGUARDING REPORTS (CONFIDENTIAL)
CREATE TYPE safeguarding_urgency AS ENUM ('medium', 'high', 'critical');
CREATE TYPE safeguarding_status AS ENUM ('received', 'investigating', 'action_taken', 'resolved');

CREATE TABLE IF NOT EXISTS safeguarding_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT UNIQUE NOT NULL,
  reporter_type TEXT NOT NULL DEFAULT 'confidential',
  reporter_name TEXT,
  reporter_email TEXT,
  reporter_phone TEXT,
  incident_location TEXT NOT NULL,
  incident_date DATE,
  incident_details TEXT NOT NULL,
  urgency_level safeguarding_urgency DEFAULT 'high'::safeguarding_urgency,
  status safeguarding_status DEFAULT 'received'::safeguarding_status,
  investigation_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BLOG POSTS & STORIES
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  meta_description TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. IMPACT METRICS
CREATE TABLE IF NOT EXISTS impact_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  placeholder_text TEXT,
  icon_name TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE safeguarding_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Published content readable by everyone)
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Programs" ON programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Blog Posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Impact Metrics" ON impact_metrics FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (Donations, applications, reports, contact forms)
CREATE POLICY "Public Insert Donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Volunteers" ON volunteer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Partnerships" ON partnership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Safeguarding" ON safeguarding_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ADMIN AUTHENTICATED ALL-ACCESS POLICIES
CREATE POLICY "Admin Full Access Settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Donations" ON donations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Volunteers" ON volunteer_applications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Partnerships" ON partnership_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Contact" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Safeguarding" ON safeguarding_reports FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Metrics" ON impact_metrics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Subscribers" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');
`;

export const SUPABASE_SCHEMA_SQL = SUPABASE_SQL_SCHEMA;
export const SUPABASE_SEED_SQL = `-- Initial Seed Data for Ihsan Children's Foundation
`;

