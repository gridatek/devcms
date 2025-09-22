export interface ContentMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  order: number;
  parent_id?: string;
  children?: NavigationItem[];
  is_external?: boolean;
  target?: '_blank' | '_self';
}

export interface Breadcrumb {
  title: string;
  url: string;
}

export interface ContentContext {
  site: Site;
  page?: Page;
  post?: Post;
  category?: Category;
  tag?: Tag;
  navigation: NavigationItem[];
  breadcrumbs: Breadcrumb[];
  relatedPosts?: Post[];
  pagination?: {
    current: number;
    total: number;
    prev?: string;
    next?: string;
  };
}

export interface SiteSettings {
  theme: {
    primaryColor: string;
    fontFamily: string;
    layout: string;
  };
  seo: {
    siteName: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription?: string;
    keywords?: string[];
  };
  features: {
    comments: boolean;
    search: boolean;
    newsletter: boolean;
    analytics?: string;
  };
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface TemplateData {
  content: Post | Page | Product | any;
  site: Site & { settings: SiteSettings };
  navigation: NavigationItem[];
  breadcrumbs: Breadcrumb[];
  relatedContent?: any[];
  pagination?: {
    current: number;
    total: number;
    prev?: string;
    next?: string;
  };
  seo: ContentMeta;
}

// Import types for content context
import { Site, Page, Post, Category, Tag, Product } from './database';