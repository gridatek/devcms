export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DatabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: DatabaseError | null;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface CreatePostRequest {
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  status?: 'draft' | 'published' | 'archived';
  is_featured?: boolean;
  category_id?: string;
  tag_ids?: string[];
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

export interface CreatePageRequest {
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  status?: 'draft' | 'published' | 'archived';
  is_homepage?: boolean;
  show_in_navigation?: boolean;
  navigation_order?: number;
  template_override?: string;
}

export interface UpdatePageRequest extends Partial<CreatePageRequest> {
  id: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  sort_order?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
  color?: string;
}

export interface UpdateTagRequest extends Partial<CreateTagRequest> {
  id: string;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  description?: string;
  price?: number;
  sale_price?: number;
  sku?: string;
  stock_quantity?: number;
  status?: 'active' | 'inactive' | 'out_of_stock';
  featured_image?: string;
  gallery?: string[];
  attributes?: Record<string, any>;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface FileUploadRequest {
  file: File;
  alt_text?: string;
  caption?: string;
}