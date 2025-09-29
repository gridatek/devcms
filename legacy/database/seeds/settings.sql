-- Site configuration and settings

-- Insert default site
INSERT INTO sites (id, name, slug, description, domain, favicon_url, logo_url, settings, owner_id, is_active) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'DevCMS Demo Site', 'default-site',
   'A demonstration site showcasing DevCMS capabilities',
   'localhost:4201',
   '/assets/favicon.ico',
   '/assets/logo.svg',
   '{
     "theme": {
       "primaryColor": "#3b82f6",
       "secondaryColor": "#10b981",
       "fontFamily": "Inter, sans-serif"
     },
     "seo": {
       "defaultTitle": "DevCMS Demo Site",
       "defaultDescription": "Database-first CMS for modern web development",
       "twitterHandle": "@devcms",
       "ogImage": "/assets/og-image.jpg"
     },
     "features": {
       "enableComments": true,
       "enableSearch": true,
       "enableAnalytics": false
     },
     "social": {
       "twitter": "https://twitter.com/devcms",
       "github": "https://github.com/devcms",
       "linkedin": "https://linkedin.com/company/devcms"
     }
   }',
   '550e8400-e29b-41d4-a716-446655440001',
   true);

-- Insert sample categories
INSERT INTO categories (id, site_id, name, slug, description, color, sort_order) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Technology', 'technology', 'Posts about web development, programming, and technology trends.', '#3b82f6', 1),
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Tutorials', 'tutorials', 'Step-by-step guides and how-to articles.', '#10b981', 2),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'News', 'news', 'Latest updates and announcements.', '#f59e0b', 3);

-- Insert sample tags
INSERT INTO tags (id, site_id, name, slug, color) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'Angular', 'angular', '#dd1b16'),
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'Tutorial', 'tutorial', '#10b981'),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'Architecture', 'architecture', '#6366f1'),
  ('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440000', 'Database', 'database', '#059669'),
  ('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440000', 'PostgreSQL', 'postgresql', '#336791');

-- Insert sample media
INSERT INTO media (id, site_id, filename, original_name, mime_type, size_bytes, url, alt_text, metadata, uploaded_by) VALUES
  ('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440000', 'hero-image.jpg', 'hero-image.jpg', 'image/jpeg', 245760, '/assets/images/hero-image.jpg', 'DevCMS Hero Image', '{"width": 1200, "height": 600, "quality": 85}', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440000', 'logo.svg', 'devcms-logo.svg', 'image/svg+xml', 2048, '/assets/images/logo.svg', 'DevCMS Logo', '{"type": "vector", "optimized": true}', '550e8400-e29b-41d4-a716-446655440001');