-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create auth schema for Supabase
CREATE SCHEMA IF NOT EXISTS auth;

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sites table
CREATE TABLE sites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    domain TEXT,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

-- Create tags table
CREATE TABLE tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

-- Create pages table
CREATE TABLE pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_homepage BOOLEAN DEFAULT false,
    show_in_navigation BOOLEAN DEFAULT true,
    navigation_order INTEGER DEFAULT 0,
    template_override TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

-- Create posts table
CREATE TABLE posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    featured_image TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT false,
    reading_time INTEGER,
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES profiles(id),
    category_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

-- Create post_tags junction table
CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create products table (for e-commerce example)
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    sku TEXT,
    stock_quantity INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock')),
    featured_image TEXT,
    gallery JSONB DEFAULT '[]',
    attributes JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

-- Create media table
CREATE TABLE media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    storage_path TEXT NOT NULL,
    uploaded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_revisions table for version control
CREATE TABLE content_revisions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content_type TEXT NOT NULL CHECK (content_type IN ('post', 'page')),
    content_id UUID NOT NULL,
    revision_data JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Sites policies
CREATE POLICY "Anyone can view published sites" ON sites FOR SELECT USING (is_active = true);
CREATE POLICY "Site owners can manage their sites" ON sites FOR ALL USING (auth.uid() = owner_id);

-- Categories policies
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Site owners can manage categories" ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM sites WHERE sites.id = categories.site_id AND sites.owner_id = auth.uid())
);

-- Tags policies
CREATE POLICY "Anyone can view tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Site owners can manage tags" ON tags FOR ALL USING (
    EXISTS (SELECT 1 FROM sites WHERE sites.id = tags.site_id AND sites.owner_id = auth.uid())
);

-- Pages policies
CREATE POLICY "Anyone can view published pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Site owners can manage pages" ON pages FOR ALL USING (
    EXISTS (SELECT 1 FROM sites WHERE sites.id = pages.site_id AND sites.owner_id = auth.uid())
);

-- Posts policies
CREATE POLICY "Anyone can view published posts" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "Site owners can manage posts" ON posts FOR ALL USING (
    EXISTS (SELECT 1 FROM sites WHERE sites.id = posts.site_id AND sites.owner_id = auth.uid())
);

-- Post tags policies
CREATE POLICY "Anyone can view post tags" ON post_tags FOR SELECT USING (true);
CREATE POLICY "Site owners can manage post tags" ON post_tags FOR ALL USING (
    EXISTS (
        SELECT 1 FROM posts
        JOIN sites ON sites.id = posts.site_id
        WHERE posts.id = post_tags.post_id AND sites.owner_id = auth.uid()
    )
);

-- Products policies
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Site owners can manage products" ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM sites WHERE sites.id = products.site_id AND sites.owner_id = auth.uid())
);

-- Media policies
CREATE POLICY "Anyone can view media" ON media FOR SELECT USING (true);
CREATE POLICY "Site owners can manage media" ON media FOR ALL USING (
    EXISTS (SELECT 1 FROM sites WHERE sites.id = media.site_id AND sites.owner_id = auth.uid())
);

-- Content revisions policies
CREATE POLICY "Site owners can view content revisions" ON content_revisions FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM sites s
        JOIN posts p ON p.site_id = s.id
        WHERE p.id = content_revisions.content_id AND s.owner_id = auth.uid()
    ) OR EXISTS (
        SELECT 1 FROM sites s
        JOIN pages pg ON pg.site_id = s.id
        WHERE pg.id = content_revisions.content_id AND s.owner_id = auth.uid()
    )
);

-- Create indexes for performance
CREATE INDEX idx_sites_slug ON sites(slug);
CREATE INDEX idx_sites_owner ON sites(owner_id);
CREATE INDEX idx_categories_site ON categories(site_id);
CREATE INDEX idx_categories_slug ON categories(site_id, slug);
CREATE INDEX idx_tags_site ON tags(site_id);
CREATE INDEX idx_pages_site ON pages(site_id);
CREATE INDEX idx_pages_slug ON pages(site_id, slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_posts_site ON posts(site_id);
CREATE INDEX idx_posts_slug ON posts(site_id, slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published ON posts(published_at);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_products_site ON products(site_id);
CREATE INDEX idx_products_slug ON products(site_id, slug);
CREATE INDEX idx_media_site ON media(site_id);
CREATE INDEX idx_content_revisions_content ON content_revisions(content_type, content_id);

-- Create full-text search indexes
CREATE INDEX idx_posts_search ON posts USING GIN(to_tsvector('english', title || ' ' || COALESCE(content, '') || ' ' || COALESCE(excerpt, '')));
CREATE INDEX idx_pages_search ON pages USING GIN(to_tsvector('english', title || ' ' || COALESCE(content, '') || ' ' || COALESCE(excerpt, '')));
CREATE INDEX idx_products_search ON products USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();