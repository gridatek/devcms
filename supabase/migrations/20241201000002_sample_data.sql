-- Insert sample user in auth.users first
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@devcms.local', '$2a$10$dummy.hash.for.dev', NOW(), NOW(), NOW());

-- Insert sample user profile
INSERT INTO profiles (id, first_name, last_name, role) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'John', 'Developer', 'admin');

-- Insert sample site
INSERT INTO sites (id, name, slug, description, owner_id, settings) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'DevCMS Sample Site', 'devcms-sample', 'A sample site for DevCMS demonstration',
'550e8400-e29b-41d4-a716-446655440001',
'{
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter",
    "layout": "modern"
  },
  "seo": {
    "siteName": "DevCMS Sample",
    "defaultTitle": "DevCMS - Database-First CMS",
    "titleTemplate": "%s | DevCMS Sample"
  },
  "features": {
    "comments": true,
    "search": true,
    "newsletter": false
  }
}');

-- Insert sample categories
INSERT INTO categories (id, site_id, name, slug, description) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Technology', 'technology', 'Articles about web development and technology'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Design', 'design', 'UI/UX design and development articles'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'Business', 'business', 'Business and entrepreneurship content');

-- Insert sample tags
INSERT INTO tags (id, site_id, name, slug, color) VALUES
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'Angular', 'angular', '#DD0031'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'TypeScript', 'typescript', '#3178C6'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'PostgreSQL', 'postgresql', '#336791'),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440000', 'CMS', 'cms', '#10B981'),
('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440000', 'Tutorial', 'tutorial', '#F59E0B');

-- Insert sample pages
INSERT INTO pages (id, site_id, title, slug, content, excerpt, status, is_homepage, show_in_navigation, navigation_order, published_at, author_id) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000',
'Welcome to DevCMS', 'home',
'<h1>Welcome to DevCMS</h1><p>The database-first CMS for developers who want complete control over their content management system.</p><p>DevCMS combines the power of PostgreSQL with the flexibility of Angular and the speed of static site generation.</p><h2>Key Features</h2><ul><li><strong>Database-First:</strong> Your PostgreSQL schema drives everything</li><li><strong>Template-Driven:</strong> Customize components with EJS templates</li><li><strong>Developer-Friendly:</strong> Full TypeScript support and modern tooling</li><li><strong>Performance:</strong> Static site generation for lightning-fast sites</li></ul>',
'The database-first CMS for developers who want complete control over their content management system.',
'published', true, false, 0, NOW(), '550e8400-e29b-41d4-a716-446655440001'),

('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000',
'About', 'about',
'<h1>About DevCMS</h1><p>DevCMS is a revolutionary content management system built specifically for developers.</p><p>Unlike traditional CMSs that abstract away database design, DevCMS puts your PostgreSQL schema at the center of everything.</p><h2>Why Database-First?</h2><p>Traditional CMSs force you to work within their constraints. DevCMS flips this around - you design your database schema exactly how you want it, and the CMS adapts to your design.</p><h2>How It Works</h2><ol><li>Design your PostgreSQL schema</li><li>Create EJS templates for component generation</li><li>Run the generator to create Angular components</li><li>Deploy your lightning-fast static site</li></ol>',
'Learn about DevCMS and its database-first philosophy.',
'published', false, true, 10, NOW(), '550e8400-e29b-41d4-a716-446655440001'),

('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440000',
'Contact', 'contact',
'<h1>Contact Us</h1><p>Have questions about DevCMS? We would love to hear from you!</p><h2>Get In Touch</h2><p>Whether you are getting started with DevCMS or need help with advanced features, our community is here to help.</p><div class="bg-blue-50 p-6 rounded-lg"><h3>Community Support</h3><p>Join our GitHub discussions for community support and to share your DevCMS projects.</p></div>',
'Get in touch with the DevCMS team and community.',
'published', false, true, 20, NOW(), '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample posts
INSERT INTO posts (id, site_id, title, slug, content, excerpt, status, is_featured, published_at, author_id, category_id, reading_time) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440000',
'Getting Started with DevCMS', 'getting-started-devcms',
'<h1>Getting Started with DevCMS</h1><p>DevCMS is a database-first content management system that puts developers in complete control.</p><h2>Key Features</h2><ul><li>Database schema drives everything</li><li>EJS templates for component generation</li><li>Angular for modern web development</li><li>Static site generation for performance</li></ul><p>This guide will help you set up your first DevCMS project.</p><h2>Installation</h2><pre><code>npm install -g @devcms/cli
devcms init my-site
cd my-site
npm run setup</code></pre><h2>Database Design</h2><p>Start by designing your PostgreSQL schema. DevCMS will introspect your database and generate components based on your tables and relationships.</p><h2>Template Customization</h2><p>Create custom EJS templates to control exactly how your content is rendered as Angular components.</p>',
'Learn how to get started with DevCMS, the database-first CMS for developers.',
'published', true, NOW(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 5),

('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440000',
'Database-First Design Philosophy', 'database-first-design',
'<h1>Database-First Design Philosophy</h1><p>Traditional CMSs force you to work within their constraints. DevCMS flips this around.</p><p>Your PostgreSQL schema IS your content model. No abstractions, no limitations.</p><h2>Benefits</h2><ul><li>Full PostgreSQL feature set</li><li>Type safety throughout</li><li>Version controlled schema</li><li>No vendor lock-in</li></ul><h2>Schema Design Best Practices</h2><p>When designing your schema for DevCMS, consider these best practices:</p><ol><li><strong>Use meaningful table names</strong> - They become your content types</li><li><strong>Add proper indexes</strong> - Performance matters for content sites</li><li><strong>Use JSONB for flexible data</strong> - Store configuration and metadata</li><li><strong>Implement proper relationships</strong> - Foreign keys drive component relationships</li></ol><h2>Example Schema</h2><pre><code>CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES authors(id)
);</code></pre>',
'Understanding why database-first design makes DevCMS unique.',
'published', true, NOW() - INTERVAL '1 day', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 7),

('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440000',
'Template System Deep Dive', 'template-system-deep-dive',
'<h1>Template System Deep Dive</h1><p>DevCMS uses EJS templates to generate Angular components from your database content.</p><h2>How Templates Work</h2><p>Templates receive data from your database and generate Angular component files. The template engine provides access to:</p><ul><li>Content data from your tables</li><li>Schema metadata</li><li>Relationship information</li><li>Site configuration</li></ul><h2>Template Structure</h2><pre><code>&lt;%= content.title %&gt;
&lt;div class="content"&gt;
  &lt;%- content.body %&gt;
&lt;/div&gt;
&lt;% if (content.tags) { %&gt;
  &lt;div class="tags"&gt;
    &lt;% content.tags.forEach(tag => { %&gt;
      &lt;span class="tag"&gt;&lt;%= tag.name %&gt;&lt;/span&gt;
    &lt;% }) %&gt;
  &lt;/div&gt;
&lt;% } %&gt;</code></pre><h2>Advanced Features</h2><p>The template system supports advanced features like partial templates, helper functions, and conditional rendering based on content type.</p>',
'Deep dive into DevCMS template system and component generation.',
'published', false, NOW() - INTERVAL '2 days', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 8);

-- Insert post-tag relationships
INSERT INTO post_tags (post_id, tag_id) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440020'), -- Getting Started -> Angular
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440021'), -- Getting Started -> TypeScript
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440023'), -- Getting Started -> CMS
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440024'), -- Getting Started -> Tutorial
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440022'), -- Database-First -> PostgreSQL
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440023'), -- Database-First -> CMS
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440020'), -- Template System -> Angular
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440021'), -- Template System -> TypeScript
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440023'); -- Template System -> CMS

-- Insert sample products
INSERT INTO products (id, site_id, name, slug, description, price, sku, stock_quantity, status, attributes) VALUES
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440000',
'DevCMS Pro License', 'devcms-pro-license',
'Professional license for DevCMS with advanced features and priority support.',
99.00, 'DEVCMS-PRO-001', 999, 'active',
'{
  "features": ["Advanced templates", "Priority support", "Commercial license", "Advanced analytics"],
  "license_type": "commercial",
  "support_level": "priority"
}'),

('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440000',
'Custom Template Pack', 'custom-template-pack',
'Beautiful, pre-built templates for common content types and layouts.',
29.00, 'DEVCMS-TMPL-001', 50, 'active',
'{
  "includes": ["Blog templates", "Portfolio templates", "E-commerce templates", "Landing pages"],
  "compatibility": "DevCMS 1.0+",
  "format": "EJS"
}');

-- Insert sample media
INSERT INTO media (id, site_id, filename, original_filename, mime_type, file_size, width, height, alt_text, storage_path, uploaded_by) VALUES
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440000',
'hero-image.jpg', 'hero-background.jpg', 'image/jpeg', 245760, 1920, 1080,
'DevCMS hero background showing modern web development workspace',
'/uploads/2024/hero-image.jpg', '550e8400-e29b-41d4-a716-446655440001'),

('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440000',
'database-diagram.png', 'database-schema-diagram.png', 'image/png', 89234, 800, 600,
'Database schema diagram showing DevCMS table relationships',
'/uploads/2024/database-diagram.png', '550e8400-e29b-41d4-a716-446655440001');