-- MAX World Admin Tables
-- Portfolio, Testimonials, Social Links

-- Portfolio Videos Table
CREATE TABLE IF NOT EXISTS max_portfolio_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  client TEXT,
  category TEXT NOT NULL,
  thumbnail TEXT,
  duration TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS max_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT,
  company TEXT,
  image_url TEXT,
  rating INTEGER DEFAULT 5,
  video_id TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS max_social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  handle TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color TEXT DEFAULT '#00d4ff',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Instagram Posts Table
CREATE TABLE IF NOT EXISTS max_instagram_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  likes TEXT,
  instagram_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Settings Table (for playlist URL, section titles, etc.)
CREATE TABLE IF NOT EXISTS max_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE max_portfolio_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE max_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE max_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE max_instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE max_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for max_portfolio_videos
CREATE POLICY "select_own_portfolio_videos" ON max_portfolio_videos FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_own_portfolio_videos" ON max_portfolio_videos FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_own_portfolio_videos" ON max_portfolio_videos FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_own_portfolio_videos" ON max_portfolio_videos FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for max_testimonials
CREATE POLICY "select_own_testimonials" ON max_testimonials FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_own_testimonials" ON max_testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_own_testimonials" ON max_testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_own_testimonials" ON max_testimonials FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for max_social_links
CREATE POLICY "select_own_social_links" ON max_social_links FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_own_social_links" ON max_social_links FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_own_social_links" ON max_social_links FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_own_social_links" ON max_social_links FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for max_instagram_posts
CREATE POLICY "select_own_instagram_posts" ON max_instagram_posts FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_own_instagram_posts" ON max_instagram_posts FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_own_instagram_posts" ON max_instagram_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_own_instagram_posts" ON max_instagram_posts FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for max_settings
CREATE POLICY "select_own_settings" ON max_settings FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_own_settings" ON max_settings FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_own_settings" ON max_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_own_settings" ON max_settings FOR DELETE
  TO authenticated USING (true);

-- Insert default settings
INSERT INTO max_settings (key, value) VALUES
  ('youtube_playlist_url', 'https://www.youtube.com/playlist?list=PL YOUR_PLAYLIST_ID'),
  ('testimonials_section_title', 'Client Stories'),
  ('testimonials_headline', 'Trusted by Industry Leaders'),
  ('testimonials_description', 'Hear directly from our partners about their experience working with X-ERA Max.'),
  ('portfolio_title', 'Our Work'),
  ('portfolio_subtitle', 'Portfolio'),
  ('portfolio_description', 'Explore our latest projects and see how we bring stories to life through compelling visual content.'),
  ('about_section_title', 'About MAX'),
  ('about_headline', 'Connect With Our World'),
  ('about_description', 'Follow our journey, explore our content, and stay connected with the MAX community.')
ON CONFLICT (key) DO NOTHING;

-- Insert default social links
INSERT INTO max_social_links (platform, handle, url, icon_name, color, display_order) VALUES
  ('Instagram', '@xeramax', 'https://instagram.com/xeramax', 'Instagram', '#E4405F', 1),
  ('YouTube', '@XERAMax', 'https://youtube.com/@xeramax', 'Youtube', '#FF0000', 2),
  ('Twitter', '@xeramax', 'https://twitter.com/xeramax', 'Twitter', '#1DA1F2', 3),
  ('TikTok', '@xeramax', 'https://tiktok.com/@xeramax', 'Music', '#00F2EA', 4)
ON CONFLICT DO NOTHING;

-- Insert sample portfolio videos
INSERT INTO max_portfolio_videos (youtube_id, title, client, category, thumbnail, duration, description, display_order) VALUES
  ('dQw4w9WgXcQ', 'Brand Documentary', 'Global Tech Corp', 'Documentary', 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg', '8:24', 'A compelling brand story showcasing innovation and growth.', 1),
  ('dQw4w9WgXcQ', 'Product Launch Campaign', 'Innovate Labs', 'Commercial', 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg', '3:45', 'High-energy product launch video for maximum impact.', 2),
  ('dQw4w9WgXcQ', 'Corporate Training Series', 'Enterprise Solutions', 'Educational', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', '15:00', 'Comprehensive training content for enterprise teams.', 3),
  ('dQw4w9WgXcQ', 'Event Highlight Reel', 'Tech Conference 2024', 'Event', 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg', '5:30', 'Dynamic highlights from the annual tech conference.', 4),
  ('dQw4w9WgXcQ', 'Social Media Campaign', 'Lifestyle Brand Co', 'Social', 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg', '1:00', 'Viral social content designed for maximum engagement.', 5),
  ('dQw4w9WgXcQ', 'Music Video Production', 'Independent Artist', 'Music', 'https://images.pexels.com/photos/3184605/pexels-photo-3184605.jpeg', '4:15', 'Cinematic music video with stunning visual effects.', 6)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO max_testimonials (quote, author, role, company, image_url, rating, video_id, is_featured, display_order) VALUES
  ('Working with X-ERA Max transformed our content strategy. The quality and professionalism exceeded all expectations.', 'Sarah Chen', 'Head of Content', 'Tech Giant Inc', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200', 5, 'dQw4w9WgXcQ', true, 1),
  ('The ROI we saw from our video campaign was incredible. X-ERA Max delivers results that matter.', 'Michael Torres', 'Marketing Director', 'Global Media Co', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200', 5, NULL, false, 2),
  ('Their team understood our vision from day one. The creative execution was flawless.', 'Emily Watson', 'Creative Lead', 'Innovation Labs', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', 5, NULL, false, 3),
  ('From concept to delivery, everything was handled with precision and creativity.', 'David Park', 'CEO', 'Startup Ventures', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200', 5, 'dQw4w9WgXcQ', true, 4),
  ('The documentary they produced for us won multiple awards. Absolutely brilliant work.', 'Jessica Lee', 'Brand Manager', 'Fortune 500', 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=200', 5, NULL, false, 5),
  ('Professional, creative, and incredibly responsive. A true partner in content creation.', 'Robert Kim', 'VP of Marketing', 'Digital First', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200', 5, 'dQw4w9WgXcQ', false, 6),
  ('X-ERA Max completely revolutionized how we approach video content. Game-changing partnership.', 'Amanda Foster', 'Content Director', 'Creative Studios', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200', 5, NULL, false, 7),
  ('The team delivered beyond our expectations. Every project has been outstanding.', 'James Wright', 'Executive Producer', 'Media House', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200', 5, NULL, false, 8)
ON CONFLICT DO NOTHING;

-- Insert sample Instagram posts
INSERT INTO max_instagram_posts (image_url, likes, display_order) VALUES
  ('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', '2.4K', 1),
  ('https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400', '1.8K', 2),
  ('https://images.pexels.com/photos/2187305/pexels-photo-2187305.jpeg?auto=compress&cs=tinysrgb&w=400', '3.1K', 3),
  ('https://images.pexels.com/photos/111469/pexels-photo-111469.jpeg?auto=compress&cs=tinysrgb&w=400', '956', 4),
  ('https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=400', '2.2K', 5),
  ('https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=400', '1.5K', 6)
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_portfolio_videos_order ON max_portfolio_videos(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON max_testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON max_social_links(display_order);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_order ON max_instagram_posts(display_order);
