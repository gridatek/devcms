import { z } from 'zod';

// Post schemas
export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  featured_image: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_featured: z.boolean().default(false),
  category_id: z.string().uuid().optional(),
  tag_ids: z.array(z.string().uuid()).optional()
});

export const UpdatePostSchema = CreatePostSchema.partial().extend({
  id: z.string().uuid()
});

// Page schemas
export const CreatePageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_homepage: z.boolean().default(false),
  show_in_navigation: z.boolean().default(true),
  navigation_order: z.number().default(0),
  template_override: z.string().optional()
});

export const UpdatePageSchema = CreatePageSchema.partial().extend({
  id: z.string().uuid()
});

// Category schemas
export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  parent_id: z.string().uuid().optional(),
  sort_order: z.number().default(0)
});

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string().uuid()
});

// Tag schemas
export const CreateTagSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color').default('#3B82F6')
});

export const UpdateTagSchema = CreateTagSchema.partial().extend({
  id: z.string().uuid()
});

// Product schemas
export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive').optional(),
  sale_price: z.number().min(0, 'Sale price must be positive').optional(),
  sku: z.string().optional(),
  stock_quantity: z.number().int().min(0, 'Stock quantity must be non-negative').default(0),
  status: z.enum(['active', 'inactive', 'out_of_stock']).default('active'),
  featured_image: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  attributes: z.record(z.any()).default({})
});

export const UpdateProductSchema = CreateProductSchema.partial().extend({
  id: z.string().uuid()
});

// Query schemas
export const QueryOptionsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
  filters: z.record(z.any()).optional()
});

// Generation schemas
export const GenerationRequestSchema = z.object({
  site_id: z.string().uuid(),
  content_types: z.array(z.string()).optional(),
  template_overrides: z.record(z.string()).optional(),
  output_path: z.string().optional(),
  clean_output: z.boolean().default(false)
});

// Site settings schema
export const SiteSettingsSchema = z.object({
  theme: z.object({
    primaryColor: z.string(),
    fontFamily: z.string(),
    layout: z.string()
  }),
  seo: z.object({
    siteName: z.string(),
    defaultTitle: z.string(),
    titleTemplate: z.string(),
    defaultDescription: z.string().optional(),
    keywords: z.array(z.string()).optional()
  }),
  features: z.object({
    comments: z.boolean(),
    search: z.boolean(),
    newsletter: z.boolean(),
    analytics: z.string().optional()
  }),
  social: z.object({
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional()
  }).optional()
});

// Export schema-inferred types with different names to avoid conflicts
export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;
export type UpdatePostSchemaType = z.infer<typeof UpdatePostSchema>;
export type CreatePageSchemaType = z.infer<typeof CreatePageSchema>;
export type UpdatePageSchemaType = z.infer<typeof UpdatePageSchema>;
export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
export type CreateTagSchemaType = z.infer<typeof CreateTagSchema>;
export type UpdateTagSchemaType = z.infer<typeof UpdateTagSchema>;
export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;
export type QueryOptionsSchemaType = z.infer<typeof QueryOptionsSchema>;
export type GenerationRequestType = z.infer<typeof GenerationRequestSchema>;
export type SiteSettingsSchemaType = z.infer<typeof SiteSettingsSchema>;