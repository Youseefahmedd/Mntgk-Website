-- =====================================================
-- MNTGK Database Schema for Supabase
-- =====================================================

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  icon TEXT DEFAULT 'globe',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  category TEXT DEFAULT 'services',
  image_url TEXT,
  live_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages (contact form submissions)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service_type TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read active reviews" ON reviews FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Service role full access (for admin API using service_role key)
CREATE POLICY "Service role full access services" ON services FOR ALL USING (true);
CREATE POLICY "Service role full access projects" ON projects FOR ALL USING (true);
CREATE POLICY "Service role full access reviews" ON reviews FOR ALL USING (true);
CREATE POLICY "Service role full access messages" ON messages FOR ALL USING (true);
