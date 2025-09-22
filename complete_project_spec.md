# DevCMS Complete Project Implementation Specification

This document contains everything needed to generate the complete DevCMS project with all files, structure, configurations, tests, and functionality.

## Project Overview

**DevCMS** is a database-first, template-driven CMS that generates Angular components from PostgreSQL schema using customizable EJS templates. It features a hybrid architecture with auto-generated content management and full developer freedom for custom functionality.

## Complete Project Structure

```
devcms/
├── package.json                    # Root workspace configuration
├── compose.yml             # Supabase local development stack
├── .gitignore                      # Git ignore patterns
├── README.md                       # Project documentation
├── claude.md                       # Architecture documentation
├── tsconfig.json                   # Root TypeScript configuration
├── .env.example                    # Environment variables template
│
├── database/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql  # Complete database schema
│   │   └── 002_sample_data.sql     # Sample content and settings
│   └── seeds/
│       ├── users.sql               # Sample users
│       ├── content.sql             # Sample blog posts, pages
│       └── settings.sql            # Site configuration
│
├── apps/
│   ├── admin/                      # CMS Admin Angular App
│   │   ├── package.json
│   │   ├── angular.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.spec.json
│   │   ├── tailwind.config.js
│   │   ├── src/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   ├── styles.css
│   │   │   ├── app/
│   │   │   │   ├── app.component.ts
│   │   │   │   ├── app.component.html
│   │   │   │   ├── app.routes.ts
│   │   │   │   ├── core/
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   │   ├── supabase.service.ts
│   │   │   │   │   │   └── notification.service.ts
│   │   │   │   │   ├── guards/
│   │   │   │   │   │   └── auth.guard.ts
│   │   │   │   │   └── interceptors/
│   │   │   │   │       └── auth.interceptor.ts
│   │   │   │   ├── shared/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── header.component.ts
│   │   │   │   │   │   ├── sidebar.component.ts
│   │   │   │   │   │   ├── data-table.component.ts
│   │   │   │   │   │   └── modal.component.ts
│   │   │   │   │   └── pipes/
│   │   │   │   │       └── truncate.pipe.ts
│   │   │   │   ├── features/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   └── dashboard.component.ts
│   │   │   │   │   ├── posts/
│   │   │   │   │   │   ├── post-list.component.ts
│   │   │   │   │   │   ├── post-edit.component.ts
│   │   │   │   │   │   └── posts.service.ts
│   │   │   │   │   ├── pages/
│   │   │   │   │   │   ├── page-list.component.ts
│   │   │   │   │   │   ├── page-edit.component.ts
│   │   │   │   │   │   └── pages.service.ts
│   │   │   │   │   ├── products/
│   │   │   │   │   │   ├── product-list.component.ts
│   │   │   │   │   │   ├── product-edit.component.ts
│   │   │   │   │   │   └── products.service.ts
│   │   │   │   │   ├── media/
│   │   │   │   │   │   ├── media-library.component.ts
│   │   │   │   │   │   └── media.service.ts
│   │   │   │   │   ├── users/
│   │   │   │   │   │   ├── user-list.component.ts
│   │   │   │   │   │   └── users.service.ts
│   │   │   │   │   └── settings/
│   │   │   │   │       ├── site-settings.component.ts
│   │   │   │   │       └── settings.service.ts
│   │   │   │   └── environments/
│   │   │   │       ├── environment.ts
│   │   │   │       └── environment.prod.ts
│   │   │   └── assets/
│   │   └── tests/
│   │       └── e2e/
│   │           └── admin.spec.ts
│   │
│   └── site/                       # Public Site Angular App
│       ├── package.json
│       ├── angular.json
│       ├── tsconfig.json
│       ├── tsconfig.app.json
│       ├── tsconfig.spec.json
│       ├── tailwind.config.js
│       ├── src/
│       │   ├── index.html
│       │   ├── main.ts
│       │   ├── styles.css
│       │   ├── app/
│       │   │   ├── app.component.ts
│       │   │   ├── app.component.html
│       │   │   ├── app.routes.ts
│       │   │   ├── cms/                # Generated components (placeholder)
│       │   │   │   ├── components/
│       │   │   │   ├── pages/
│       │   │   │   ├── services/
│       │   │   │   │   └── data.service.ts
│       │   │   │   └── routing/
│       │   │   │       └── cms.routes.ts
│       │   │   ├── custom/             # Developer custom code
│       │   │   │   ├── components/
│       │   │   │   │   └── contact-form.component.ts
│       │   │   │   ├── pages/
│       │   │   │   │   └── about.component.ts
│       │   │   │   ├── services/
│       │   │   │   └── routes/
│       │   │   │       └── custom.routes.ts
│       │   │   ├── core/
│       │   │   │   ├── services/
│       │   │   │   │   ├── seo.service.ts
│       │   │   │   │   └── route-registry.service.ts
│       │   │   │   └── guards/
│       │   │   ├── shared/
│       │   │   │   ├── components/
│       │   │   │   │   ├── header.component.ts
│       │   │   │   │   ├── footer.component.ts
│       │   │   │   │   └── navigation.component.ts
│       │   │   │   └── pipes/
│       │   │   └── environments/
│       │   │       ├── environment.ts
│       │   │       └── environment.prod.ts
│       │   └── assets/
│       └── tests/
│           └── e2e/
│               ├── site-generation.spec.ts
│               ├── template-regression.spec.ts
│               └── performance.spec.ts
│
├── packages/
│   ├── generator/                  # EJS Template Engine
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── cli/
│   │   │   │   └── index.ts
│   │   │   ├── core/
│   │   │   │   ├── template-engine.ts
│   │   │   │   ├── route-discovery.ts
│   │   │   │   ├── component-generator.ts
│   │   │   │   └── navigation-builder.ts
│   │   │   ├── database/
│   │   │   │   ├── schema-introspector.ts
│   │   │   │   └── content-loader.ts
│   │   │   └── utils/
│   │   │       ├── file.utils.ts
│   │   │       └── string.utils.ts
│   │   └── templates/              # EJS Templates (Customizable)
│   │       ├── components/
│   │       │   ├── blog-post.component.ejs
│   │       │   ├── blog-list.component.ejs
│   │       │   ├── product-page.component.ejs
│   │       │   ├── static-page.component.ejs
│   │       │   └── navigation.component.ejs
│   │       ├── layouts/
│   │       │   ├── default.layout.ejs
│   │       │   └── ecommerce.layout.ejs
│   │       ├── routing/
│   │       │   └── app-routing.module.ejs
│   │       ├── services/
│   │       │   └── data.service.ejs
│   │       └── helpers/
│   │           └── template.helpers.js
│   │
│   ├── api/                        # Backend Edge Functions
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── webhooks/
│   │   │   │   └── content-change.ts
│   │   │   ├── build/
│   │   │   │   └── trigger-build.ts
│   │   │   ├── sync/
│   │   │   │   └── route-sync.ts
│   │   │   ├── search/
│   │   │   │   └── search.ts
│   │   │   └── auth/
│   │   │       └── auth.ts
│   │   └── supabase/
│   │       ├── functions/
│   │       └── config.toml
│   │
│   └── shared/                     # Shared Types & Utilities
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── types/
│       │   │   ├── content.types.ts
│       │   │   ├── site.types.ts
│       │   │   ├── user.types.ts
│       │   │   └── api.types.ts
│       │   ├── utils/
│       │   │   ├── string.utils.ts
│       │   │   ├── date.utils.ts
│       │   │   └── validation.utils.ts
│       │   ├── constants/
│       │   │   ├── content.constants.ts
│       │   │   └── api.constants.ts
│       │   └── validation/
│       │       ├── content.schemas.ts
│       │       └── user.schemas.ts
│       └── index.ts
│
├── tools/                          # Development Tools
│   ├── setup.js                    # Project initialization
│   ├── migrate.js                  # Database migrations
│   └── deploy.js                   # Deployment scripts
│
└── tests/                          # Global Test Configuration
    ├── playwright.config.ts        # Playwright configuration
    ├── global-setup.ts            # Test environment setup
    ├── fixtures/
    │   ├── test-data.sql
    │   └── sample-content.json
    └── utils/
        ├── docker.utils.ts
        └── database.utils.ts
```

## Configuration Files

### Root Package.json
```json
{
  "name": "devcms-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:admin": "npm run dev --workspace=@devcms/admin",
    "dev:site": "npm run dev --workspace=@devcms/site",
    "dev:all": "concurrently \"npm run dev:admin\" \"npm run dev:site\"",
    "build:admin": "npm run build --workspace=@devcms/admin",
    "build:site": "npm run build --workspace=@devcms/site",
    "build:all": "npm run build --workspace=@devcms/admin && npm run build --workspace=@devcms/site",
    "generate:components": "npm run generate --workspace=@devcms/generator",
    "generate:routes": "npm run routes --workspace=@devcms/generator",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:migrate": "node tools/migrate.js",
    "db:seed": "node tools/seed.js",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:reset": "docker compose down -v && docker compose up -d",
    "setup": "node tools/setup.js",
    "deploy": "node tools/deploy.js"
  },-project",
    "generate:components": "npm run generate --workspace=@devcms/generator",
    "generate:routes": "npm run routes --workspace=@devcms/generator",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:migrate": "node tools/migrate.js",
    "db:seed": "node tools/seed.js",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:reset": "docker compose down -v && docker compose up -d",
    "setup": "node tools/setup.js",
    "deploy": "node tools/deploy.js"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "concurrently": "^8.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### Docker Compose Configuration
```yaml
# compose.yml
version: '3.8'

services:
  postgres:
    image: supabase/postgres:15.1.0.117
    container_name: devcms_postgres
    ports:
      - "54322:5432"
    environment:
      POSTGRES_DB: devcms
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_HOST_AUTH_METHOD: trust
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/migrations:/docker-entrypoint-initdb.d

  supabase-studio:
    image: supabase/studio:20231103-ce42139
    container_name: devcms_studio
    ports:
      - "54323:3000"
    environment:
      SUPABASE_URL: http://kong:8000
      SUPABASE_REST_URL: http://localhost:54321/rest/v1/
      SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

  kong:
    image: kong:2.8.1
    container_name: devcms_kong
    ports:
      - "54321:8000"
      - "54444:8443"
    environment:
      KONG_DATABASE: "off"
      KONG_DECLARATIVE_CONFIG: /var/lib/kong/kong.yml
      KONG_DNS_ORDER: LAST,A,CNAME
      KONG_PLUGINS: request-size-limiting,cors,key-auth,acl,basic-auth
      KONG_NGINX_PROXY_PROXY_BUFFER_SIZE: 160k
      KONG_NGINX_PROXY_PROXY_BUFFERS: 64 160k
    volumes:
      - ./supabase/kong.yml:/var/lib/kong/kong.yml

  auth:
    image: supabase/gotrue:v2.132.3
    container_name: devcms_auth
    depends_on:
      - postgres
    environment:
      GOTRUE_API_HOST: 0.0.0.0
      GOTRUE_API_PORT: 9999
      API_EXTERNAL_URL: http://localhost:54321
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://postgres:postgres@postgres:5432/devcms?search_path=auth
      GOTRUE_SITE_URL: http://localhost:4201
      GOTRUE_URI_ALLOW_LIST: http://localhost:4200,http://localhost:4201
      GOTRUE_DISABLE_SIGNUP: false
      GOTRUE_JWT_SECRET: super-secret-jwt-token-with-at-least-32-characters-long
      GOTRUE_JWT_EXP: 3600
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated
      GOTRUE_JWT_ADMIN_ROLES: service_role
      GOTRUE_JWT_AUD: authenticated
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated

  rest:
    image: postgrest/postgrest:v11.2.2
    container_name: devcms_rest
    depends_on:
      - postgres
    ports:
      - "54325:3000"
    environment:
      PGRST_DB_URI: postgres://postgres:postgres@postgres:5432/devcms
      PGRST_DB_SCHEMAS: public
      PGRST_DB_ANON_ROLE: anon
      PGRST_JWT_SECRET: super-secret-jwt-token-with-at-least-32-characters-long
      PGRST_DB_USE_LEGACY_GUCS: "false"

  storage:
    image: supabase/storage-api:v0.46.4
    container_name: devcms_storage
    depends_on:
      - postgres
      - rest
    ports:
      - "54326:5000"
    environment:
      ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      SERVICE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
      POSTGREST_URL: http://rest:3000
      PGRST_JWT_SECRET: super-secret-jwt-token-with-at-least-32-characters-long
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/devcms
      FILE_SIZE_LIMIT: 52428800
      STORAGE_BACKEND: file
      FILE_STORAGE_BACKEND_PATH: /var/lib/storage
      TENANT_ID: stub
      REGION: stub
      GLOBAL_S3_BUCKET: stub
    volumes:
      - storage_data:/var/lib/storage

volumes:
  postgres_data:
  storage_data:
```

### Environment Configuration
```bash
# .env.example
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/devcms
SITE_ID=default-site
NODE_ENV=development
```

## Database Schema

### Complete Database Schema
```sql
-- database/migrations/001_initial_schema.sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================
-- CORE SYSTEM TABLES
-- =============================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'author', 'viewer')),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE profiles IS 'User profiles and roles';
COMMENT ON COLUMN profiles.full_name IS 'text_input:required';
COMMENT ON COLUMN profiles.avatar_url IS 'file_upload:images';
COMMENT ON COLUMN profiles.role IS 'select:admin,editor,author,viewer';
COMMENT ON COLUMN profiles.bio IS 'textarea';

-- Sites/Projects (multi-tenant support)
CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    domain TEXT UNIQUE,
    favicon_url TEXT,
    logo_url TEXT,
    settings JSONB DEFAULT '{}',
    owner_id UUID NOT NULL REFERENCES profiles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE sites IS 'Multi-tenant sites/projects';
COMMENT ON COLUMN sites.name IS 'text_input:required';
COMMENT ON COLUMN sites.slug IS 'slug_input:from=name';
COMMENT ON COLUMN sites.description IS 'textarea';
COMMENT ON COLUMN sites.domain IS 'url_input';
COMMENT ON COLUMN sites.favicon_url IS 'file_upload:images';
COMMENT ON COLUMN sites.logo_url IS 'file_upload:images';
COMMENT ON COLUMN sites.settings IS 'json_editor';

-- Categories (hierarchical taxonomy)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

COMMENT ON TABLE categories IS 'Hierarchical content categories';
COMMENT ON COLUMN categories.name IS 'text_input:required';
COMMENT ON COLUMN categories.slug IS 'slug_input:from=name';
COMMENT ON COLUMN categories.description IS 'textarea';
COMMENT ON COLUMN categories.parent_id IS 'select:categories';
COMMENT ON COLUMN categories.sort_order IS 'number_input';

-- Tags (flat taxonomy)
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#6b7280',
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

COMMENT ON TABLE tags IS 'Content tags';
COMMENT ON COLUMN tags.name IS 'text_input:required';
COMMENT ON COLUMN tags.slug IS 'slug_input:from=name';
COMMENT ON COLUMN tags.description IS 'textarea';
COMMENT ON COLUMN tags.color IS 'color_picker';

-- =============================================
-- CONTENT TABLES
-- =============================================

-- Pages (static content)
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    featured_image_url TEXT,
    template TEXT DEFAULT 'default',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_homepage BOOLEAN DEFAULT FALSE,
    show_in_navigation BOOLEAN DEFAULT FALSE,
    navigation_order INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    author_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

COMMENT ON TABLE pages IS 'Static pages';
COMMENT ON COLUMN pages.title IS 'text_input:required';
COMMENT ON COLUMN pages.slug IS 'slug_input:from=title';
COMMENT ON COLUMN pages.content IS 'rich_text';
COMMENT ON COLUMN pages.excerpt IS 'textarea:maxlength=300';
COMMENT ON COLUMN pages.meta_title IS 'text_input:maxlength=60';
COMMENT ON COLUMN pages.meta_description IS 'textarea:maxlength=160';
COMMENT ON COLUMN pages.featured_image_url IS 'file_upload:images';
COMMENT ON COLUMN pages.template IS 'text_input';
COMMENT ON COLUMN pages.status IS 'select:draft,published,archived';
COMMENT ON COLUMN pages.is_homepage IS 'checkbox';
COMMENT ON COLUMN pages.show_in_navigation IS 'checkbox';
COMMENT ON COLUMN pages.navigation_order IS 'number_input';
COMMENT ON COLUMN pages.published_at IS 'datetime_picker';

-- Blog posts
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    featured_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    author_id UUID NOT NULL REFERENCES profiles(id),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    view_count INTEGER DEFAULT 0,
    reading_time INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

COMMENT ON TABLE posts IS 'Blog posts';
COMMENT ON COLUMN posts.title IS 'text_input:required';
COMMENT ON COLUMN posts.slug IS 'slug_input:from=title';
COMMENT ON COLUMN posts.content IS 'rich_text:required';
COMMENT ON COLUMN posts.excerpt IS 'textarea:maxlength=300';
COMMENT ON COLUMN posts.meta_title IS 'text_input:maxlength=60';
COMMENT ON COLUMN posts.meta_description IS 'textarea:maxlength=160';
COMMENT ON COLUMN posts.featured_image_url IS 'file_upload:images';
COMMENT ON COLUMN posts.status IS 'select:draft,published,archived';
COMMENT ON COLUMN posts.is_featured IS 'checkbox';
COMMENT ON COLUMN posts.published_at IS 'datetime_picker';
COMMENT ON COLUMN posts.reading_time IS 'number_input:unit=minutes';

-- Products (e-commerce)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    sku TEXT,
    price DECIMAL(10,2),
    compare_price DECIMAL(10,2),
    inventory_quantity INTEGER DEFAULT 0,
    track_inventory BOOLEAN DEFAULT TRUE,
    weight DECIMAL(8,2),
    dimensions JSONB,
    images JSONB DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
    is_digital BOOLEAN DEFAULT FALSE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, slug),
    UNIQUE(site_id, sku)
);

COMMENT ON TABLE products IS 'E-commerce products';
COMMENT ON COLUMN products.name IS 'text_input:required';
COMMENT ON COLUMN products.slug IS 'slug_input:from=name';
COMMENT ON COLUMN products.description IS 'rich_text';
COMMENT ON COLUMN products.short_description IS 'textarea:maxlength=200';
COMMENT ON COLUMN products.sku IS 'text_input';
COMMENT ON COLUMN products.price IS 'currency:USD';
COMMENT ON COLUMN products.compare_price IS 'currency:USD';
COMMENT ON COLUMN products.inventory_quantity IS 'number_input:min=0';
COMMENT ON COLUMN products.track_inventory IS 'checkbox';
COMMENT ON COLUMN products.weight IS 'number_input:unit=kg';
COMMENT ON COLUMN products.dimensions IS 'json_editor:schema=dimensions';
COMMENT ON COLUMN products.images IS 'file_upload:images:multiple';
COMMENT ON COLUMN products.status IS 'select:draft,active,archived';
COMMENT ON COLUMN products.is_digital IS 'checkbox';

-- =============================================
-- RELATIONSHIP TABLES
-- =============================================

-- Post tags (many-to-many)
CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Product tags (many-to-many)
CREATE TABLE product_tags (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- =============================================
-- NAVIGATION & MENUS
-- =============================================

-- Navigation menus
CREATE TABLE menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    location TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, slug)
);

COMMENT ON TABLE menus IS 'Navigation menus';
COMMENT ON COLUMN menus.name IS 'text_input:required';
COMMENT ON COLUMN menus.slug IS 'slug_input:from=name';
COMMENT ON COLUMN menus.location IS 'select:header,footer,sidebar,mobile';

-- Menu items
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT,
    page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_external BOOLEAN DEFAULT FALSE,
    target TEXT DEFAULT '_self' CHECK (target IN ('_self', '_blank')),
    css_classes TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE menu_items IS 'Menu navigation items';
COMMENT ON COLUMN menu_items.title IS 'text_input:required';
COMMENT ON COLUMN menu_items.url IS 'url_input';
COMMENT ON COLUMN menu_items.page_id IS 'select:pages';
COMMENT ON COLUMN menu_items.parent_id IS 'select:menu_items';
COMMENT ON COLUMN menu_items.sort_order IS 'number_input';
COMMENT ON COLUMN menu_items.is_external IS 'checkbox';
COMMENT ON COLUMN menu_items.target IS 'select:_self,_blank';

-- =============================================
-- MEDIA MANAGEMENT
-- =============================================

-- Media library
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    uploaded_by UUID NOT NULL REFERENCES profiles(id),
    folder_path TEXT DEFAULT '',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE media IS 'Media library files';
COMMENT ON COLUMN media.alt_text IS 'text_input';
COMMENT ON COLUMN media.caption IS 'textarea';
COMMENT ON COLUMN media.folder_path IS 'text_input';

-- =============================================
-- SYSTEM SETTINGS
-- =============================================

-- Site settings (key-value store)
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    value JSONB,
    type TEXT NOT NULL DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json', 'array')),
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, key)
);

COMMENT ON TABLE settings IS 'Site configuration settings';
COMMENT ON COLUMN settings.key IS 'text_input:required';
COMMENT ON COLUMN settings.type IS 'select:string,number,boolean,json,array';
COMMENT ON COLUMN settings.description IS 'textarea';
COMMENT ON COLUMN settings.is_public IS 'checkbox';

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Core indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_sites_slug ON sites(slug);
CREATE INDEX idx_pages_site_id ON pages(site_id);
CREATE INDEX idx_pages_slug ON pages(site_id, slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_pages_published_at ON pages(published_at);
CREATE INDEX idx_posts_site_id ON posts(site_id);
CREATE INDEX idx_posts_slug ON posts(site_id, slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_products_site_id ON products(site_id);
CREATE INDEX idx_products_slug ON products(site_id, slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_categories_site_id ON categories(site_id);
CREATE INDEX idx_categories_slug ON categories(site_id, slug);
CREATE INDEX idx_tags_site_id ON tags(site_id);
CREATE INDEX idx_tags_slug ON tags(site_id, slug);
CREATE INDEX idx_media_site_id ON media(site_id);

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Sample Data
```sql
-- database/migrations/002_sample_data.sql
-- Insert sample site
INSERT INTO sites (id, name, slug, description, owner_id, settings) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'DevCMS Sample Site', 'devcms-sample', 'A sample site for DevCMS demonstration', 
'550e8400-e29b-41d4-a716-446655440001',
'{
  "theme": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#6B7280",
    "primaryFont": "Inter",
    "secondaryFont": "serif"
  },
  "site_type": "blog",
  "posts_per_page": 12,
  "navigation_style": "horizontal"
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
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'Supabase', 'supabase', '#00D4AA'),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440000', 'Tailwind CSS', 'tailwind-css', '#06B6D4');

-- Insert sample pages
INSERT INTO pages (id, site_id, title, slug, content, excerpt, status, is_homepage, show_in_navigation, navigation_order, published_at, author_id) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 
'Welcome to DevCMS', 'home', 
'<h1>Welcome to DevCMS</h1><p>The database-first CMS for developers who want complete control over their content management system.</p><p>DevCMS combines the power of PostgreSQL with the flexibility of Angular and the speed of static site generation.</p>', 
'The database-first CMS for developers who want complete control over their content management system.',
'published', true, false, 0, NOW(), '550e8400-e29b-41d4-a716-446655440001'),

('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000',
'About', 'about',
'<h1>About DevCMS</h1><p>DevCMS is a revolutionary content management system built specifically for developers.</p><p>Unlike traditional CMSs that abstract away database design, DevCMS puts your PostgreSQL schema at the center of everything.</p>',
'Learn about DevCMS and its database-first philosophy.',
'published', false, true, 10, NOW(), '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample posts
INSERT INTO posts (id, site_id, title, slug, content, excerpt, status, is_featured, published_at, author_id, category_id, reading_time) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440000',
'Getting Started with DevCMS', 'getting-started-devcms',
'<h1>Getting Started with DevCMS</h1><p>DevCMS is a database-first content management system that puts developers in complete control.</p><h2>Key Features</h2><ul><li>Database schema drives everything</li><li>EJS templates for component generation</li><li>Angular for modern web development</li><li>Static site generation for performance</li></ul><p>This guide will help you set up your first DevCMS project.</p>',
'Learn how to get started with DevCMS, the database-first CMS for developers.',
'published', true, NOW(), '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 5),

('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440000',
'Database-First Design Philosophy', 'database-first-design',
'<h1>Database-First Design Philosophy</h1><p>Traditional CMSs force you to work within their constraints. DevCMS flips this around.</p><p>Your PostgreSQL schema IS your content model. No abstractions, no limitations.</p><h2>Benefits</h2><ul><li>Full PostgreSQL feature set</li><li>Type safety throughout</li><li>Version controlled schema</li><li>No vendor lock-in</li></ul>',
'Understanding why database-first design makes DevCMS unique.',
'published', true, NOW() - INTERVAL '1 day', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 7);

-- Insert post-tag relationships
INSERT INTO post_tags (post_id, tag_id) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440020'),
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440021'),
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440022'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440022');

-- Insert sample settings
INSERT INTO settings (site_id, key, value, type, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'site_title', '"DevCMS Sample"', 'string', 'Site title shown in browser tab'),
('550e8400-e29b-41d4-a716-446655440000', 'site_description', '"A sample DevCMS site showcasing database-first design"', 'string', 'Site meta description'),
('550e8400-e29b-41d4-a716-446655440000', 'posts_per_page', '12', 'number', 'Number of posts per page on blog index'),
('550e8400-e29b-41d4-a716-446655440000', 'enable_comments', 'true', 'boolean', 'Enable commenting system'),
('550e8400-e29b-41d4-a716-446655440000', 'analytics_code', '""', 'string', 'Google Analytics tracking code');
```

## Package Configurations

### Admin App Package.json
```json
{
  "name": "@devcms/admin",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "dev": "ng serve --port 4200",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0",
    "@devcms/shared": "*"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.0",
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "@types/jasmine": "~5.1.0",
    "@types/node": "^18.18.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-headless": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "~5.2.0"
  }
}
```

### Site App Package.json
```json
{
  "name": "@devcms/site",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "dev": "ng serve --port 4201",
    "build": "ng build",
    "build:static": "ng build --configuration production",
    "prerender": "ng run site:prerender",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "@angular/ssr": "^17.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0",
    "@devcms/shared": "*"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.0",
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "@types/jasmine": "~5.1.0",
    "@types/node": "^18.18.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-headless": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "~5.2.0"
  }
}
```

### Generator Package.json
```json
{
  "name": "@devcms/generator",
  "version": "1.0.0",
  "bin": {
    "devcms-generate": "dist/cli/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "generate": "node dist/core/component-generator.js",
    "routes": "node dist/core/route-discovery.js",
    "test": "jest"
  },
  "dependencies": {
    "ejs": "^3.1.9",
    "@supabase/supabase-js": "^2.38.0",
    "typescript": "^5.0.0",
    "commander": "^11.0.0",
    "chalk": "^5.0.0",
    "ora": "^7.0.0",
    "fs-extra": "^11.0.0",
    "glob": "^10.0.0",
    "@devcms/shared": "*"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/ejs": "^3.1.0",
    "@types/fs-extra": "^11.0.0",
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

### Shared Package.json
```json
{
  "name": "@devcms/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

## EJS Templates

### Blog Post Component Template
```typescript
// packages/generator/templates/components/blog-post.component.ejs
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-post-<%= post.slug %>',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="max-w-4xl mx-auto px-4 py-8">
      <%_ if (post.featured_image_url) { _%>
      <div class="aspect-w-16 aspect-h-9 mb-8 rounded-xl overflow-hidden">
        <img src="<%= post.featured_image_url %>" 
             alt="<%= post.title %>"
             class="w-full h-full object-cover">
      </div>
      <%_ } _%>

      <header class="mb-8">
        <div class="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-semibold">
            <%= post.category?.name || 'Uncategorized' %>
          </span>
          <span>•</span>
          <time datetime="<%= post.published_at %>">
            <%= new Date(post.published_at).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            }) %>
          </time>
          <%_ if (post.reading_time) { _%>
          <span>•</span>
          <span><%= post.reading_time %> min read</span>
          <%_ } _%>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          <%= post.title %>
        </h1>
        
        <%_ if (post.excerpt) { _%>
        <p class="text-xl text-gray-600 leading-relaxed mb-6">
          <%= post.excerpt %>
        </p>
        <%_ } _%>

        <%_ if (post.author) { _%>
        <div class="flex items-center pt-6 border-t border-gray-200">
          <%_ if (post.author.avatar_url) { _%>
          <img src="<%= post.author.avatar_url %>" 
               alt="<%= post.author.full_name %>"
               class="w-12 h-12 rounded-full mr-4">
          <%_ } _%>
          <div>
            <p class="font-semibold text-gray-900"><%= post.author.full_name %></p>
            <%_ if (post.author.bio) { _%>
            <p class="text-sm text-gray-600"><%= post.author.bio %></p>
            <%_ } _%>
          </div>
        </div>
        <%_ } _%>
      </header>

      <div class="prose prose-lg prose-primary max-w-none">
        <%- post.content %>
      </div>

      <%_ if (post.tags && post.tags.length > 0) { _%>
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex flex-wrap gap-2 mb-8">
          <%_ post.tags.forEach(tag => { _%>
          <a routerLink="/blog/tags/<%= tag.slug %>" 
             class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors">
            <%= tag.name %>
          </a>
          <%_ }); _%>
        </div>
      </footer>
      <%_ } _%>
    </article>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .prose {
      @apply text-gray-800 leading-relaxed;
    }
    
    .prose h2 {
      @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
    }
    
    .prose h3 {
      @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
    }
    
    .prose p {
      @apply mb-4;
    }
    
    .prose blockquote {
      @apply border-l-4 border-primary-500 pl-6 my-6 italic text-gray-700;
    }
    
    .prose code {
      @apply bg-gray-100 px-2 py-1 rounded text-sm;
    }
    
    .prose pre {
      @apply bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto;
    }
    
    .prose img {
      @apply rounded-lg my-6;
    }
  `]
})
export class Post<%= helpers.pascalCase(post.slug) %>Component implements OnInit {
  
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateTags({
      title: '<%= post.meta_title || post.title %>',
      description: '<%= post.meta_description || post.excerpt %>',
      <%_ if (post.featured_image_url) { _%>
      image: '<%= post.featured_image_url %>',
      <%_ } _%>
      type: 'article',
      publishedTime: '<%= post.published_at %>',
      <%_ if (post.author) { _%>
      author: '<%= post.author.full_name %>'
      <%_ } _%>
    });
  }
}
```

### Blog List Component Template
```typescript
// packages/generator/templates/components/blog-list.component.ejs
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url?: string;
  published_at: string;
  reading_time?: number;
  author: {
    full_name: string;
    avatar_url?: string;
  };
  category?: {
    name: string;
    slug: string;
  };
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-8">
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <%= site.name || 'Blog' %>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          <%= site.description || 'Discover insights, tutorials, and thoughts on development and design.' %>
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article *ngFor="let post of posts; trackBy: trackByPostId" 
                 class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          
          <div class="aspect-w-16 aspect-h-9" *ngIf="post.featured_image_url">
            <img [src]="post.featured_image_url" 
                 [alt]="post.title"
                 class="w-full h-full object-cover">
          </div>
          
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 mb-3">
              <span class="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium" 
                    *ngIf="post.category">
                {{ post.category.name }}
              </span>
              <span class="mx-2" *ngIf="post.category">•</span>
              <time [dateTime]="post.published_at">
                {{ formatDate(post.published_at) }}
              </time>
            </div>
            
            <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              <a [routerLink]="['/blog', post.slug]" class="hover:text-primary-600 transition-colors">
                {{ post.title }}
              </a>
            </h2>
            
            <p class="text-gray-600 mb-4 line-clamp-3" *ngIf="post.excerpt">
              {{ post.excerpt }}
            </p>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="flex items-center">
                <img [src]="post.author.avatar_url" 
                     [alt]="post.author.full_name"
                     class="w-8 h-8 rounded-full mr-2"
                     *ngIf="post.author.avatar_url">
                <span class="text-sm text-gray-700">{{ post.author.full_name }}</span>
              </div>
              <span class="text-sm text-gray-500" *ngIf="post.reading_time">
                {{ post.reading_time }} min read
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .aspect-w-16 {
      position: relative;
      padding-bottom: 56.25%;
    }
    
    .aspect-w-16 img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `]
})
export class BlogListComponent {
  posts: BlogPost[] = <%- JSON.stringify(posts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    featured_image_url: p.featured_image_url,
    published_at: p.published_at,
    reading_time: p.reading_time,
    author: {
      full_name: p.author.full_name,
      avatar_url: p.author.avatar_url
    },
    category: p.category ? {
      name: p.category.name,
      slug: p.category.slug
    } : null
  })), null, 2) %>;

  trackByPostId(index: number, post: BlogPost): string {
    return post.id;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
```

### App Routing Template
```typescript
// packages/generator/templates/routing/app-routing.module.ejs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Page components
<%_ pages.forEach(page => { _%>
import { Page<%= helpers.pascalCase(page.slug) %>Component } from './cms/pages/<%= page.slug %>.component';
<%_ }); _%>

// Blog components
import { BlogListComponent } from './cms/components/blog-list.component';
<%_ posts.forEach(post => { _%>
import { Post<%= helpers.pascalCase(post.slug) %>Component } from './cms/components/<%= post.slug %>.component';
<%_ }); _%>

// Product components (if any)
<%_ if (products && products.length > 0) { _%>
import { ProductListComponent } from './cms/components/product-list.component';
<%_ products.forEach(product => { _%>
import { Product<%= helpers.pascalCase(product.slug) %>Component } from './cms/components/<%= product.slug %>.component';
<%_ }); _%>
<%_ } _%>

// Custom routes
import { customRoutes } from './custom/routes/custom.routes';

const routes: Routes = [
  // Homepage
  <%_ const homepage = pages.find(p => p.is_homepage); _%>
  <%_ if (homepage) { _%>
  { path: '', component: Page<%= helpers.pascalCase(homepage.slug) %>Component },
  <%_ } else { _%>
  { path: '', component: BlogListComponent },
  <%_ } _%>
  
  // Static pages
  <%_ pages.filter(p => !p.is_homepage).forEach(page => { _%>
  { path: '<%= page.slug %>', component: Page<%= helpers.pascalCase(page.slug) %>Component },
  <%_ }); _%>
  
  // Blog
  { path: 'blog', component: BlogListComponent },
  <%_ posts.forEach(post => { _%>
  { path: 'blog/<%= post.slug %>', component: Post<%= helpers.pascalCase(post.slug) %>Component },
  <%_ }); _%>
  
  <%_ if (products && products.length > 0) { _%>
  // Products
  { path: 'products', component: ProductListComponent },
  <%_ products.forEach(product => { _%>
  { path: 'products/<%= product.slug %>', component: Product<%= helpers.pascalCase(product.slug) %>Component },
  <%_ }); _%>
  <%_ } _%>
  
  // Custom routes
  ...customRoutes,
  
  // 404 fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Core Implementation Files

### Template Engine Core
```typescript
// packages/generator/src/core/template-engine.ts
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import * as path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface TemplateContext {
  site: any;
  posts: any[];
  pages: any[];
  products: any[];
  categories: any[];
  tags: any[];
  helpers: any;
}

export class TemplateEngine {
  private supabase: SupabaseClient;
  private templatesDir: string;
  private outputDir: string;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    this.templatesDir = path.join(__dirname, '../../templates');
    this.outputDir = path.join(process.cwd(), 'apps/site/src/app/cms');
  }

  async generateComponents(siteId: string): Promise<void> {
    console.log('🔥 Starting component generation...');

    // Load data from database
    const context = await this.loadTemplateContext(siteId);

    // Generate different component types
    await this.generateBlogComponents(context);
    await this.generatePageComponents(context);
    await this.generateProductComponents(context);
    await this.generateRoutingModule(context);
    await this.generateServices(context);

    console.log('✅ Component generation complete!');
  }

  private async loadTemplateContext(siteId: string): Promise<TemplateContext> {
    const [site, posts, pages, products, categories, tags] = await Promise.all([
      this.loadSite(siteId),
      this.loadPosts(siteId),
      this.loadPages(siteId),
      this.loadProducts(siteId),
      this.loadCategories(siteId),
      this.loadTags(siteId)
    ]);

    return {
      site,
      posts,
      pages,
      products,
      categories,
      tags,
      helpers: this.getTemplateHelpers()
    };
  }

  private async loadSite(siteId: string) {
    const { data } = await this.supabase
      .from('sites')
      .select('*')
      .eq('id', siteId)
      .single();
    
    return data;
  }

  private async loadPosts(siteId: string) {
    const { data } = await this.supabase
      .from('posts')
      .select(`
        *,
        author:profiles(full_name, avatar_url, bio),
        category:categories(name, slug),
        tags:post_tags(tag:tags(name, slug))
      `)
      .eq('site_id', siteId)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    return data || [];
  }

  private async loadPages(siteId: string) {
    const { data } = await this.supabase
      .from('pages')
      .select('*')
      .eq('site_id', siteId)
      .eq('status', 'published')
      .order('navigation_order');
    
    return data || [];
  }

  private async loadProducts(siteId: string) {
    const { data } = await this.supabase
      .from('products')
      .select(`
        *,
        category:categories(name, slug),
        tags:product_tags(tag:tags(name, slug))
      `)
      .eq('site_id', siteId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    return data || [];
  }

  private async loadCategories(siteId: string) {
    const { data } = await this.supabase
      .from('categories')
      .select('*')
      .eq('site_id', siteId)
      .order('sort_order');
    
    return data || [];
  }

  private async loadTags(siteId: string) {
    const { data } = await this.supabase
      .from('tags')
      .select('*')
      .eq('site_id', siteId)
      .order('usage_count', { ascending: false });
    
    return data || [];
  }

  private async generateBlogComponents(context: TemplateContext): Promise<void> {
    // Generate blog list component
    const blogListTemplate = await this.loadTemplate('components/blog-list.component.ejs');
    const blogListComponent = ejs.render(blogListTemplate, context);
    await this.writeComponent('components/blog-list.component.ts', blogListComponent);

    // Generate individual post components
    for (const post of context.posts) {
      const postTemplate = await this.loadTemplate('components/blog-post.component.ejs');
      const postComponent = ejs.render(postTemplate, { ...context, post });
      await this.writeComponent(`components/${post.slug}.component.ts`, postComponent);
    }
  }

  private async generatePageComponents(context: TemplateContext): Promise<void> {
    for (const page of context.pages) {
      const pageTemplate = await this.loadTemplate('components/static-page.component.ejs');
      const pageComponent = ejs.render(pageTemplate, { ...context, page });
      await this.writeComponent(`pages/${page.slug}.component.ts`, pageComponent);
    }
  }

  private async generateProductComponents(context: TemplateContext): Promise<void> {
    if (context.products.length === 0) return;

    // Generate product list component
    const productListTemplate = await this.loadTemplate('components/product-list.component.ejs');
    const productListComponent = ejs.render(productListTemplate, context);
    await this.writeComponent('components/product-list.component.ts', productListComponent);

    // Generate individual product components
    for (const product of context.products) {
      const productTemplate = await this.loadTemplate('components/product-page.component.ejs');
      const productComponent = ejs.render(productTemplate, { ...context, product });
      await this.writeComponent(`components/${product.slug}.component.ts`, productComponent);
    }
  }

  private async generateRoutingModule(context: TemplateContext): Promise<void> {
    const routingTemplate = await this.loadTemplate('routing/app-routing.module.ejs');
    const routingModule = ejs.render(routingTemplate, context);
    await this.writeComponent('routing/cms.routes.ts', routingModule);
  }

  private async generateServices(context: TemplateContext): Promise<void> {
    const serviceTemplate = await this.loadTemplate('services/data.service.ejs');
    const serviceComponent = ejs.render(serviceTemplate, context);
    await this.writeComponent('services/data.service.ts', serviceComponent);
  }

  private async loadTemplate(templatePath: string): Promise<string> {
    const fullPath = path.join(this.templatesDir, templatePath);
    return fs.readFile(fullPath, 'utf-8');
  }

  private async writeComponent(componentPath: string, content: string): Promise<void> {
    const fullPath = path.join(this.outputDir, componentPath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content, 'utf-8');
    console.log(`📝 Generated: ${componentPath}`);
  }

  private getTemplateHelpers() {
    return {
      pascalCase: (str: string) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toUpperCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      },
      camelCase: (str: string) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      },
      kebabCase: (str: string) => {
        return str.toLowerCase().replace(/\s+/g, '-');
      },
      formatDate: (dateString: string, format: string = 'long') => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: format,
          day: 'numeric'
        });
      },
      truncate: (text: string, length: number = 100) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
      }
    };
  }
}
```

### CLI Interface
```typescript
// packages/generator/src/cli/index.ts
#!/usr/bin/env node
import { program } from 'commander';
import { TemplateEngine } from '../core/template-engine';
import chalk from 'chalk';
import ora from 'ora';

program
  .name('devcms-generate')
  .description('DevCMS component generator')
  .version('1.0.0');

program
  .command('components')
  .description('Generate Angular components from database content')
  .option('-s, --site-id <siteId>', 'Site ID to generate components for')
  .action(async (options) => {
    const spinner = ora('Loading content from database...').start();
    
    try {
      const siteId = options.siteId || process.env.SITE_ID || 'default-site';
      const engine = new TemplateEngine();
      
      spinner.text = 'Generating Angular components...';
      await engine.generateComponents(siteId);
      
      spinner.succeed(chalk.green('✅ Components generated successfully!'));
    } catch (error) {
      spinner.fail(chalk.red('❌ Generation failed'));
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('watch')
  .description('Watch for database changes and regenerate components')
  .option('-s, --site-id <siteId>', 'Site ID to watch')
  .action(async (options) => {
    console.log(chalk.blue('👀 Watching for database changes...'));
    // Implementation would use Supabase real-time subscriptions
  });

program.parse();
```

## Playwright Test Examples

### Test Configuration
```typescript
// tests/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4201',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: [
    {
      command: 'npm run docker:up',
      port: 54321,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev:site',
      port: 4201,
      reuseExistingServer: !process.env.CI,
    }
  ],
});
```

### Component Generation Test
```typescript
// apps/site/tests/e2e/site-generation.spec.ts
import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('Component Generation', () => {
  test.beforeEach(async () => {
    // Reset Docker environment with fresh data
    await execAsync('docker compose down -v && docker compose up -d');
    await execAsync('npm run db:migrate');
    await execAsync('npm run db:seed');
  });

  test('should generate blog post component from database', async ({ page }) => {
    // 1. Verify sample post exists in database
    await page.goto('http://localhost:54323'); // Supabase Studio
    // Could verify via direct database query instead
    
    // 2. Generate components
    await execAsync('npm run generate:components');
    
    // 3. Verify generated component renders correctly
    await page.goto('/blog/getting-started-devcms');
    
    // Check that the generated component displays content
    await expect(page.locator('h1')).toContainText('Getting Started with DevCMS');
    await expect(page.locator('article')).toContainText('DevCMS is a database-first content management system');
    
    // Verify meta tags are generated
    const title = await page.title();
    expect(title).toContain('Getting Started');
    
    // Check category and tags are displayed
    await expect(page.locator('[data-testid="category"]')).toContainText('Technology');
    await expect(page.locator('[data-testid="tags"]')).toContainText('Angular');
  });

  test('should generate blog list component with all posts', async ({ page }) => {
    await execAsync('npm run generate:components');
    
    await page.goto('/blog');
    
    // Should show sample posts
    await expect(page.locator('article')).toHaveCount(2);
    await expect(page.locator('h2').first()).toContainText('Getting Started with DevCMS');
    await expect(page.locator('h2').nth(1)).toContainText('Database-First Design Philosophy');
  });

  test('should update components when database content changes', async ({ page }) => {
    // Initial generation
    await execAsync('npm run generate:components');
    
    // Verify initial state
    await page.goto('/blog');
    await expect(page.locator('article')).toHaveCount(2);
    
    // Add new post to database (simulate admin interface action)
    await execAsync(`
      docker exec devcms_postgres psql -U postgres -d devcms -c "
        INSERT INTO posts (site_id, title, slug, content, status, published_at, author_id, category_id) 
        VALUES (
          '550e8400-e29b-41d4-a716-446655440000',
          'New Test Post',
          'new-test-post',
          '<p>This is a new test post content.</p>',
          'published',
          NOW(),
          '550e8400-e29b-41d4-a716-446655440001',
          '550e8400-e29b-41d4-a716-446655440010'
        );
      "
    `);
    
    // Regenerate components
    await execAsync('npm run generate:components');
    
    // Verify new post appears
    await page.reload();
    await expect(page.locator('article')).toHaveCount(3);
    await expect(page.locator('h2').first()).toContainText('New Test Post');
    
    // Verify individual post page was generated
    await page.goto('/blog/new-test-post');
    await expect(page.locator('h1')).toContainText('New Test Post');
  });
});
```

### Visual Regression Test
```typescript
// apps/site/tests/e2e/template-regression.spec.ts
import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('Template Visual Regression', () => {
  test.beforeEach(async () => {
    await execAsync('docker compose up -d');
    await execAsync('npm run generate:components');
  });

  test('blog post layout visual consistency', async ({ page }) => {
    await page.goto('/blog/getting-started-devcms');
    
    // Wait for content to load
    await expect(page.locator('h1')).toBeVisible();
    
    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('blog-post-layout.png', {
      fullPage: true,
      threshold: 0.2
    });
  });

  test('blog list layout visual consistency', async ({ page }) => {
    await page.goto('/blog');
    
    await expect(page.locator('article').first()).toBeVisible();
    
    await expect(page).toHaveScreenshot('blog-list-layout.png', {
      fullPage: true,
      threshold: 0.2
    });
  });

  test('responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog/getting-started-devcms');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveScreenshot('blog-post-mobile.png', {
      fullPage: true,
      threshold: 0.2
    });
  });

  test('template customization does not break layout', async ({ page }) => {
    // Modify template (simulate developer customization)
    // This would involve changing EJS template and regenerating
    
    await execAsync('npm run generate:components');
    
    await page.goto('/blog/getting-started-devcms');
    
    // Verify layout still works after template changes
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    
    // Check no broken layouts
    const hasHorizontalScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScrollbar).toBe(false);
  });
});
```

### Performance Test
```typescript
// apps/site/tests/e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('blog post meets Core Web Vitals', async ({ page }) => {
    await page.goto('/blog/getting-started-devcms');
    
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const metrics = {
            FCP: 0,
            LCP: 0,
            FID: 0
          };
          
          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              metrics.FCP = entry.startTime;
            }
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.LCP = entry.startTime;
            }
            if (entry.entryType === 'first-input') {
              metrics.FID = entry.processingStart - entry.startTime;
            }
          });
          
          resolve(metrics);
        });
        
        observer.observe({ 
          entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] 
        });
        
        // Fallback timeout
        setTimeout(() => resolve({ FCP: 0, LCP: 0, FID: 0 }), 5000);
      });
    });

    // Core Web Vitals thresholds
    expect(performanceMetrics.FCP).toBeLessThan(1800); // First Contentful Paint < 1.8s
    expect(performanceMetrics.LCP).toBeLessThan(2500); // Largest Contentful Paint < 2.5s
    expect(performanceMetrics.FID).toBeLessThan(100);  // First Input Delay < 100ms
  });

  test('static assets are optimized', async ({ page }) => {
    const response = await page.goto('/blog/getting-started-devcms');
    
    // Check response headers for optimization
    expect(response?.headers()['content-encoding']).toBeTruthy(); // Should be compressed
    expect(response?.status()).toBe(200);
    
    // Check that CSS is minified and optimized
    const cssResponse = await page.goto('/styles.css');
    const cssContent = await cssResponse?.text();
    expect(cssContent?.includes('\n')).toBe(false); // Should be minified
  });

  test('page loads without render blocking', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/blog');
    await expect(page.locator('h1')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000); // Should load in under 2 seconds
  });
});
```

## Additional Implementation Files

### TypeScript Shared Types
```typescript
// packages/shared/src/types/content.types.ts
export interface Site {
  id: string;
  name: string;
  slug: string;
  description?: string;
  domain?: string;
  favicon_url?: string;
  logo_url?: string;
  settings: Record<string, any>;
  owner_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'editor' | 'author' | 'viewer';
  bio?: string;
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
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  usage_count: number;
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
  featured_image_url?: string;
  template: string;
  status: 'draft' | 'published' | 'archived';
  is_homepage: boolean;
  show_in_navigation: boolean;
  navigation_order: number;
  published_at?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
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
  featured_image_url?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  published_at?: string;
  author_id: string;
  category_id?: string;
  view_count: number;
  reading_time?: number;
  created_at: string;
  updated_at: string;
  // Relations
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
  short_description?: string;
  sku?: string;
  price?: number;
  compare_price?: number;
  inventory_quantity: number;
  track_inventory: boolean;
  weight?: number;
  dimensions?: Record<string, any>;
  images: string[];
  status: 'draft' | 'active' | 'archived';
  is_digital: boolean;
  category_id?: string;
  created_at: string;
  updated_at: string;
  // Relations
  category?: Category;
  tags?: Tag[];
}

export interface Media {
  id: string;
  site_id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  width?: number;
  height?: number;
  alt_text?: string;
  caption?: string;
  uploaded_by: string;
  folder_path: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface Menu {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  location?: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
  items?: MenuItem[];
}

export interface MenuItem {
  id: string;
  menu_id: string;
  title: string;
  url?: string;
  page_id?: string;
  parent_id?: string;
  sort_order: number;
  is_external: boolean;
  target: '_self' | '_blank';
  css_classes?: string;
  icon?: string;
  created_at: string;
  children?: MenuItem[];
}

export interface Setting {
  id: string;
  site_id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json' | 'array';
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
```

### API Types
```typescript
// packages/shared/src/types/api.types.ts
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
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

export interface GenerationRequest {
  site_id: string;
  content_types?: string[];
  force_regeneration?: boolean;
}

export interface GenerationResponse {
  success: boolean;
  generated_files: string[];
  errors?: string[];
  duration_ms: number;
}

export interface RouteInfo {
  path: string;
  component: string;
  title?: string;
  description?: string;
  source: 'cms' | 'custom';
  show_in_navigation?: boolean;
  navigation_order?: number;
}

export interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
  order: number;
  external?: boolean;
}
```

### Utility Functions
```typescript
// packages/shared/src/utils/string.utils.ts
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function pascalCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function camelCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function kebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function truncate(text: string, length: number = 100, suffix: string = '...'): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + suffix;
}

export function extractTextFromHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = extractTextFromHtml(content).split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function generateExcerpt(content: string, length: number = 150): string {
  const plainText = extractTextFromHtml(content);
  return truncate(plainText, length);
}
```

### Date Utilities
```typescript
// packages/shared/src/utils/date.utils.ts
export function formatDate(date: string | Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const d = new Date(date);
  
  const formats = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'long', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  };
  
  return d.toLocaleDateString('en-US', formats[format] as any);
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2628000 },
    { name: 'week', seconds: 604800 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 }
  ];
  
  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}

export function isValidDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

export function toISOString(date: string | Date): string {
  return new Date(date).toISOString();
}
```

## Admin App Implementation

### Admin App Component
```typescript
// apps/admin/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/components/header.component';
import { SidebarComponent } from './shared/components/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>
      
      <div class="flex">
        <app-sidebar class="w-64 bg-white shadow-sm"></app-sidebar>
        
        <main class="flex-1 p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initialize authentication
    this.authService.initialize();
  }
}
```

### Auth Service
```typescript
// apps/admin/src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { Profile } from '@devcms/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async initialize(): Promise<void> {
    try {
      const { data: { session } } = await this.supabaseService.client.auth.getSession();
      
      if (session?.user) {
        await this.loadUserProfile(session.user.id);
      }

      // Listen for auth changes
      this.supabaseService.client.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await this.loadUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        await this.loadUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.supabaseService.client.auth.signOut();
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  private async loadUserProfile(userId: string): Promise<void> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      this.currentUserSubject.next(data);
    } catch (error) {
      console.error('Load user profile error:', error);
    }
  }

  get currentUser(): Profile | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
```

### Posts Service
```typescript
// apps/admin/src/app/features/posts/posts.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../../core/services/supabase.service';
import { Post, ApiResponse, PaginatedResponse } from '@devcms/shared';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {}

  async getPosts(siteId: string, page = 1, limit = 20): Promise<PaginatedResponse<Post>> {
    try {
      const { data, error, count } = await this.supabaseService.client
        .from('posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url),
          category:categories(name, slug),
          tags:post_tags(tag:tags(name, slug))
        `, { count: 'exact' })
        .eq('site_id', siteId)
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        data: data || [],
        pagination: {
          page,
          per_page: limit,
          total: count || 0,
          total_pages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      console.error('Get posts error:', error);
      throw error;
    }
  }

  async getPost(id: string): Promise<Post | null> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url),
          category:categories(name, slug),
          tags:post_tags(tag:tags(name, slug))
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get post error:', error);
      return null;
    }
  }

  async createPost(post: Partial<Post>): Promise<Post | null> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('posts')
        .insert([post])
        .select('*')
        .single();

      if (error) throw error;
      
      // Refresh posts list
      this.refreshPosts(post.site_id!);
      
      return data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;
      
      // Refresh posts list
      this.refreshPosts(updates.site_id!);
      
      return data;
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  }

  async deletePost(id: string, siteId: string): Promise<boolean> {
    try {
      const { error } = await this.supabaseService.client
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Refresh posts list
      this.refreshPosts(siteId);
      
      return true;
    } catch (error) {
      console.error('Delete post error:', error);
      return false;
    }
  }

  async publishPost(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabaseService.client
        .from('posts')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Publish post error:', error);
      return false;
    }
  }

  private async refreshPosts(siteId: string): Promise<void> {
    try {
      const response = await this.getPosts(siteId);
      this.postsSubject.next(response.data || []);
    } catch (error) {
      console.error('Refresh posts error:', error);
    }
  }
}
```

### Post List Component
```typescript
// apps/admin/src/app/features/posts/post-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostsService } from './posts.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '@devcms/shared';
import { DataTableComponent } from '../../shared/components/data-table.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DataTableComponent],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Posts</h1>
          <p class="text-gray-600">Manage your blog posts and articles</p>
        </div>
        <a routerLink="/posts/new" 
           class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          New Post
        </a>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex space-x-4">
            <input type="text" 
                   placeholder="Search posts..."
                   [(ngModel)]="searchTerm"
                   (input)="onSearch()"
                   class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            
            <select [(ngModel)]="statusFilter" 
                    (change)="onFilterChange()"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <app-data-table 
          [data]="filteredPosts"
          [columns]="tableColumns"
          [loading]="loading"
          (rowAction)="onRowAction($event)">
        </app-data-table>

        <div class="p-6 border-t border-gray-200 flex justify-between items-center"
             *ngIf="pagination.total > 0">
          <span class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.per_page + 1 }} to 
            {{ Math.min(pagination.page * pagination.per_page, pagination.total) }} 
            of {{ pagination.total }} posts
          </span>
          
          <div class="flex space-x-2">
            <button (click)="previousPage()" 
                    [disabled]="pagination.page === 1"
                    class="px-3 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button (click)="nextPage()" 
                    [disabled]="pagination.page === pagination.total_pages"
                    class="px-3 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  loading = false;
  searchTerm = '';
  statusFilter = '';
  
  pagination = {
    page: 1,
    per_page: 20,
    total: 0,
    total_pages: 0
  };

  tableColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'author.full_name', label: 'Author', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'published_at', label: 'Published', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.loadPosts();
  }

  async loadPosts() {
    if (!this.authService.currentUser) return;

    this.loading = true;
    try {
      const response = await this.postsService.getPosts(
        'default-site', // TODO: Get from context
        this.pagination.page,
        this.pagination.per_page
      );
      
      this.posts = response.data || [];
      this.pagination = response.pagination;
      this.applyFilters();
    } catch (error) {
      console.error('Load posts error:', error);
    } finally {
      this.loading = false;
    }
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.posts];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.content?.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(post => post.status === this.statusFilter);
    }

    this.filteredPosts = filtered;
  }

  async onRowAction(event: { action: string, item: Post }) {
    switch (event.action) {
      case 'edit':
        // Navigate to edit
        break;
      case 'delete':
        await this.deletePost(event.item);
        break;
      case 'publish':
        await this.publishPost(event.item);
        break;
    }
  }

  async deletePost(post: Post) {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    try {
      await this.postsService.deletePost(post.id, post.site_id);
      await this.loadPosts();
    } catch (error) {
      console.error('Delete post error:', error);
    }
  }

  async publishPost(post: Post) {
    try {
      await this.postsService.publishPost(post.id);
      await this.loadPosts();
    } catch (error) {
      console.error('Publish post error:', error);
    }
  }

  async previousPage() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
      await this.loadPosts();
    }
  }

  async nextPage() {
    if (this.pagination.page < this.pagination.total_pages) {
      this.pagination.page++;
      await this.loadPosts();
    }
  }
}
```

## Site App Implementation

### Site App Component
```typescript
// apps/site/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header.component';
import { FooterComponent } from './shared/components/footer.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>
      
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    // Set default SEO tags
    this.seoService.updateTags({
      title: 'DevCMS Sample Site',
      description: 'A sample site built with DevCMS - the database-first CMS for developers',
      type: 'website'
    });
  }
}
```

### SEO Service
```typescript
// apps/site/src/app/core/services/seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoTags {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
  publishedTime?: string;
  author?: string;
  keywords?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  updateTags(tags: SeoTags): void {
    // Update title
    if (tags.title) {
      this.titleService.setTitle(tags.title);
    }

    // Update description
    if (tags.description) {
      this.metaService.updateTag({ name: 'description', content: tags.description });
    }

    // Update keywords
    if (tags.keywords && tags.keywords.length > 0) {
      this.metaService.updateTag({ name: 'keywords', content: tags.keywords.join(', ') });
    }

    // Open Graph tags
    if (tags.title) {
      this.metaService.updateTag({ property: 'og:title', content: tags.title });
    }
    
    if (tags.description) {
      this.metaService.updateTag({ property: 'og:description', content: tags.description });
    }
    
    if (tags.image) {
      this.metaService.updateTag({ property: 'og:image', content: tags.image });
    }
    
    if (tags.type) {
      this.metaService.updateTag({ property: 'og:type', content: tags.type });
    }
    
    if (tags.url) {
      this.metaService.updateTag({ property: 'og:url', content: tags.url });
    }

    // Twitter Card tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    
    if (tags.title) {
      this.metaService.updateTag({ name: 'twitter:title', content: tags.title });
    }
    
    if (tags.description) {
      this.metaService.updateTag({ name: 'twitter:description', content: tags.description });
    }
    
    if (tags.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: tags.image });
    }

    // Article specific tags
    if (tags.type === 'article') {
      if (tags.publishedTime) {
        this.metaService.updateTag({ property: 'article:published_time', content: tags.publishedTime });
      }
      
      if (tags.author) {
        this.metaService.updateTag({ property: 'article:author', content: tags.author });
      }
    }
  }

  generateStructuredData(type: string, data: any): void {
    let structuredData: any = {
      '@context': 'https://schema.org'
    };

    switch (type) {
      case 'article':
        structuredData = {
          ...structuredData,
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          image: data.image,
          datePublished: data.publishedTime,
          dateModified: data.modifiedTime || data.publishedTime,
          author: {
            '@type': 'Person',
            name: data.author
          }
        };
        break;
      
      case 'website':
        structuredData = {
          ...structuredData,
          '@type': 'WebSite',
          name: data.title,
          description: data.description,
          url: data.url
        };
        break;
      
      case 'product':
        structuredData = {
          ...structuredData,
          '@type': 'Product',
          name: data.name,
          description: data.description,
          image: data.images,
          sku: data.sku,
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'USD',
            availability: data.inStock ? 'InStock' : 'OutOfStock'
          }
        };
        break;
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}
```

### Site Header Component
```typescript
// apps/site/src/app/shared/components/header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { NavigationItem } from '@devcms/shared';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center">
              <img *ngIf="site?.logo_url" 
                   [src]="site.logo_url" 
                   [alt]="site.name"
                   class="h-8 w-auto mr-3">
              <span class="text-xl font-bold text-gray-900">
                {{ site?.name || 'DevCMS Site' }}
              </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a *ngFor="let item of navigationItems" 
                 [routerLink]="item.external ? null : item.path"
                 [href]="item.external ? item.path : null"
                 [target]="item.external ? '_blank' : null"
                 class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                 routerLinkActive="text-blue-600 font-semibold"
                 [routerLinkActiveOptions]="{ exact: item.path === '/' }">
                {{ item.title }}
              </a>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button (click)="toggleMobileMenu()" 
                  class="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path [attr.d]="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile menu -->
        <div [class.hidden]="!mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a *ngFor="let item of navigationItems" 
               [routerLink]="item.external ? null : item.path"
               [href]="item.external ? item.path : null"
               [target]="item.external ? '_blank' : null"
               class="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
               routerLinkActive="text-blue-600 bg-blue-50"
               (click)="closeMobileMenu()">
              {{ item.title }}
            </a>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  site: any = null;
  navigationItems: NavigationItem[] = [];
  mobileMenuOpen = false;

  // This data would typically be loaded from generated navigation service
  // For now, using static data as example
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.loadNavigationData();
  }

  private loadNavigationData() {
    // This would be generated by the template engine
    this.site = {
      name: 'DevCMS Sample Site',
      logo_url: null
    };

    this.navigationItems = [
      { title: 'Home', path: '/', order: 0, external: false },
      { title: 'Blog', path: '/blog', order: 10, external: false },
      { title: 'About', path: '/about', order: 20, external: false }
    ];
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
```

### Custom Contact Form Component
```typescript
// apps/site/src/app/custom/components/contact-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input type="text" 
                     id="name"
                     formControlName="name"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     [class.border-red-500]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
              <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched" 
                   class="mt-1 text-sm text-red-600">
                Name is required
              </div>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input type="email" 
                     id="email"
                     formControlName="email"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
              <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" 
                   class="mt-1 text-sm text-red-600">
                <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email</span>
              </div>
            </div>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input type="text" 
                   id="subject"
                   formControlName="subject"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   [class.border-red-500]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched">
            <div *ngIf="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched" 
                 class="mt-1 text-sm text-red-600">
              Subject is required
            </div>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea id="message"
                      formControlName="message"
                      rows="5"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
            </textarea>
            <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" 
                 class="mt-1 text-sm text-red-600">
              Message is required
            </div>
          </div>
          
          <div class="flex justify-end">
            <button type="submit" 
                    [disabled]="contactForm.invalid || submitting"
                    class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <span *ngIf="!submitting">Send Message</span>
              <span *ngIf="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>
          </div>
        </form>
        
        <div *ngIf="submitted && !submitting" 
             class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex">
            <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">Message sent successfully!</h3>
              <p class="mt-1 text-sm text-green-700">Thank you for your message. We'll get back to you soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  submitting = false;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    
    try {
      // Here you would typically send the form data to your API
      // For demo purposes, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', this.contactForm.value);
      
      this.submitted = true;
      this.contactForm.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      this.submitting = false;
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }
}
```

## Development Tools

### Setup Script
```javascript
// tools/setup.js
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up DevCMS development environment...');

async function setup() {
  try {
    // Check if Docker is installed
    console.log('📦 Checking Docker installation...');
    try {
      execSync('docker --version', { stdio: 'ignore' });
      execSync('docker compose --version', { stdio: 'ignore' });
    } catch (error) {
      throw new Error('Docker and Docker Compose are required. Please install them first.');
    }

    // Copy environment file
    console.log('📝 Setting up environment variables...');
    if (!fs.existsSync('.env')) {
      fs.copyFileSync('.env.example', '.env');
      console.log('✅ Created .env file from .env.example');
    }

    // Start Docker services
    console.log('🐳 Starting Docker services...');
    execSync('docker compose up -d', { stdio: 'inherit' });

    // Wait for services to be ready
    console.log('⏳ Waiting for services to be ready...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Run database migrations
    console.log('🗄️ Running database migrations...');
    execSync('node tools/migrate.js', { stdio: 'inherit' });

    // Install workspace dependencies
    console.log('📚 Installing workspace dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Build shared package
    console.log('🔧 Building shared package...');
    execSync('npm run build --workspace=@devcms/shared', { stdio: 'inherit' });

    // Generate initial components
    console.log('⚙️ Generating initial components...');
    execSync('npm run generate:components', { stdio: 'inherit' });

    console.log('\n✅ Setup complete!');
    console.log('\n🎉 You can now start development:');
    console.log('  npm run dev:admin  # Start admin interface (http://localhost:4200)');
    console.log('  npm run dev:site   # Start public site (http://localhost:4201)');
    console.log('  npm run dev:all    # Start both applications');
    console.log('\n📊 Access Supabase Studio: http://localhost:54323');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();
```

### Migration Script
```javascript
// tools/migrate.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🗄️ Running database migrations...');

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration files`);

    for (const file of migrationFiles) {
      console.log(`📝 Running migration: ${file}`);
      const filePath = path.join(migrationsDir, file);
      
      execSync(`docker exec devcms_postgres psql -U postgres -d devcms -f /docker-entrypoint-initdb.d/${file}`, {
        stdio: 'pipe'
      });
      
      console.log(`✅ Completed: ${file}`);
    }

    console.log('🎉 All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
```

This complete specification contains everything needed to generate the entire DevCMS project:

## ✅ Complete Implementation Includes:

1. **Project Structure** - Full workspace organization
2. **Database Schema** - Complete PostgreSQL schema with sample data
3. **Configuration Files** - All package.json, Docker Compose, and config files
4. **EJS Templates** - Blog post, list, and routing templates
5. **Core Implementation** - Template engine, CLI, and generation logic
6. **Admin App** - Complete Angular admin interface with CRUD operations
7. **Site App** - Public-facing Angular application with SEO
8. **Testing Suite** - Playwright tests for generation, visual regression, and performance
9. **Shared Libraries** - TypeScript types, utilities, and validation
10. **Development Tools** - Setup scripts, migration tools, and Docker configuration

The specification is comprehensive enough for an AI assistant to generate a fully functional DevCMS project with all files, folder structure, dependencies, and implementation details.