-- Sample content for development

-- Insert sample blog posts
INSERT INTO posts (id, site_id, title, slug, content, excerpt, meta_description, featured_image_url, status, published_at, author_id, category_id, reading_time) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 'Getting Started with DevCMS', 'getting-started-devcms',
   '<h1>Getting Started with DevCMS</h1><p>DevCMS is a database-first content management system that puts developers in complete control.</p><h2>Key Features</h2><ul><li>Database schema drives everything</li><li>EJS templates for component generation</li><li>Angular for modern web development</li><li>Static site generation for performance</li></ul><p>This guide will help you set up your first DevCMS project.</p>',
   'Learn how to get started with DevCMS, the database-first CMS for developers.',
   'Learn how to get started with DevCMS, the database-first CMS for developers.',
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
   'published', NOW() - INTERVAL '7 days', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', 5),

  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', 'Database-First Design Philosophy', 'database-first-design-philosophy',
   '<h1>Database-First Design Philosophy</h1><p>Why we chose to put the database at the center of our CMS architecture.</p><h2>Traditional vs Database-First</h2><p>Most CMSs start with the UI and work backwards. We start with data structure and generate everything from there.</p><h2>Benefits</h2><ul><li>Type safety throughout the stack</li><li>Automatic API generation</li><li>Schema-driven validation</li><li>Easy data migrations</li></ul>',
   'Understanding the database-first approach that powers DevCMS.',
   'Understanding the database-first approach that powers DevCMS and why it matters.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
   'published', NOW() - INTERVAL '3 days', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 8);

-- Insert sample pages
INSERT INTO pages (id, site_id, title, slug, content, meta_description, status, is_homepage, sort_order, author_id, category_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440000', 'Welcome to DevCMS', 'home',
   '<div class="hero-section"><h1>Welcome to DevCMS</h1><p class="lead">The database-first CMS that puts developers in control.</p><a href="/blog" class="btn btn-primary">Read Our Blog</a></div><div class="features"><h2>Why Choose DevCMS?</h2><div class="feature-grid"><div class="feature"><h3>Database-First</h3><p>Your PostgreSQL schema drives everything.</p></div><div class="feature"><h3>Template-Driven</h3><p>EJS templates generate Angular components.</p></div><div class="feature"><h3>Developer-Friendly</h3><p>Full control with zero lock-in.</p></div></div></div>',
   'DevCMS - Database-first CMS for modern web development',
   'published', true, 1, '550e8400-e29b-41d4-a716-446655440001', null),

  ('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440000', 'About DevCMS', 'about',
   '<h1>About DevCMS</h1><p>DevCMS was built by developers, for developers who want complete control over their content management system.</p><h2>Our Mission</h2><p>To provide a content management system that doesn''t get in your way. We believe your database schema should drive your CMS, not the other way around.</p><h2>The Team</h2><p>Built with ❤️ by a team of full-stack developers who were tired of fighting with traditional CMSs.</p>',
   'Learn about DevCMS and our mission to empower developers.',
   'published', false, 2, '550e8400-e29b-41d4-a716-446655440001', null);

-- Insert post tags relationships
INSERT INTO post_tags (post_id, tag_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020'),  -- Angular
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440021'),  -- Tutorial
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440022'),  -- Architecture
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440023');  -- Database