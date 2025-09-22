export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role: 'admin' | 'editor' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Site {
  id: string;
  name: string;
  slug: string;
  description?: string;
  domain?: string;
  owner_id: string;
  settings: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
}

export interface Page {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published' | 'archived';
  is_homepage: boolean;
  show_in_navigation: boolean;
  navigation_order: number;
  template_override?: string;
  published_at?: string;
  author_id?: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Post {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  reading_time?: number;
  published_at?: string;
  author_id?: string;
  category_id?: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
  category?: Category;
  tags?: Tag[];
}

export interface Product {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  sale_price?: number;
  sku?: string;
  stock_quantity: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  featured_image?: string;
  gallery: string[];
  attributes: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  site_id: string;
  filename: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  width?: number;
  height?: number;
  alt_text?: string;
  caption?: string;
  storage_path: string;
  uploaded_by?: string;
  created_at: string;
}

export interface ContentRevision {
  id: string;
  content_type: 'post' | 'page';
  content_id: string;
  revision_data: Record<string, any>;
  created_by?: string;
  created_at: string;
}