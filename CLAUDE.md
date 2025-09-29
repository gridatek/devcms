# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevCMS is a database-first, template-driven CMS that generates Angular components from PostgreSQL schema using customizable EJS templates. It features a hybrid architecture with auto-generated content management and full developer freedom for custom functionality.

## Architecture

### Core Concept
- **Database-First**: PostgreSQL schema drives everything - content model, component generation, and API structure
- **Template-Driven**: EJS templates generate Angular components dynamically from database content
- **Hybrid Architecture**: Auto-generated content management with full developer customization freedom

### Workspace Structure
```
devcms/
├── apps/
│   ├── admin/          # Angular CMS admin interface (port 4200)
│   └── site/           # Public Angular site (port 4201)
├── packages/
│   ├── shared/         # Shared TypeScript types and utilities
│   └── generator/      # Core component generation engine with CLI
│       └── templates/  # EJS templates for component generation
├── database/
│   ├── migrations/     # PostgreSQL schema and sample data
│   └── seeds/          # Sample content for development
└── tools/              # Development and deployment scripts
```

## Common Development Commands

### Project Setup
```bash
npm run setup                    # Initialize project and database
npm run docker:up               # Start Supabase local stack
npm run db:migrate              # Run database migrations
npm run db:seed                 # Insert sample data
```

### Development
```bash
npm run dev:admin              # Start admin app (localhost:4200)
npm run dev:site               # Start site app (localhost:4201)
npm run dev:all                # Start both apps concurrently
```

### Component Generation
```bash
npm run generate:components    # Generate Angular components from database content
npm run generate:routes        # Generate routing configuration from content
```

### Build & Test
```bash
npm run build:admin           # Build admin app
npm run build:site            # Build site app with static generation
npm run build:all             # Build both apps
npm run test:e2e              # Run Playwright tests
npm run test:e2e:ui           # Run Playwright tests with UI
```

### Package-Specific Commands
```bash
# Build individual packages (required before apps)
npm run build --workspace=@devcms/shared
npm run build --workspace=@devcms/generator

# Run single test file
npx playwright test tests/e2e/site-generation.spec.ts
npx playwright test --headed  # Run with browser visible
```

## Database & Local Services

### Supabase Stack (via Docker Compose)
- **Database**: PostgreSQL on port 54322
- **API**: PostgREST on port 54325
- **Auth**: GoTrue on port 54321
- **Studio**: Supabase Studio on port 54323
- **Storage**: Supabase Storage API

### Key Environment Variables
```
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=[provided in .env.example]
SUPABASE_SERVICE_ROLE_KEY=[provided in .env.example]
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/devcms
SITE_ID=default-site
```

## Core Architecture Patterns

### Database Schema Structure
- `auth.users` - Supabase auth users (required by profiles FK)
- `profiles` - User profiles with roles (admin, editor, user)
- `sites` - Multi-tenant site configuration with owner references
- `posts` - Blog posts with categories, tags, and metadata
- `pages` - Static pages with navigation control
- `categories`/`tags` - Content organization
- `products` - E-commerce product catalog
- `media` - File storage with metadata

### Authentication & RLS
- Uses Supabase auth with custom `auth.uid()`, `auth.role()`, `auth.email()` functions
- Row Level Security (RLS) policies control data access
- Site owners can manage their own content
- Public content is accessible to anonymous users

### Template System
- EJS templates in `packages/generator/templates/` directory drive component generation
- Templates use database schema introspection to generate type-safe Angular components
- Route discovery automatically creates navigation from database content
- Support for custom template overrides and component extensions

### Component Generation Flow
1. CLI introspects PostgreSQL schema via `packages/generator/src/database/schema-introspector.ts`
2. Loads content from database via `packages/generator/src/database/content-loader.ts`
3. Applies EJS templates via `packages/generator/src/core/component-generator.ts`
4. Updates routing configuration via `packages/generator/src/core/route-discovery.ts`
5. Preserves custom component modifications

## TypeScript Architecture

### Package Dependencies
- `@devcms/shared` must be built before other packages (contains shared types)
- `@devcms/generator` must be built before component generation
- Apps depend on both shared packages

### Type System
- Shared types in `packages/shared/src/types/`
- API request/response interfaces in `types/api.ts`
- Database schema types in `types/database.ts`
- Zod schemas for validation in `schemas/index.ts` (exported as `*SchemaType` to avoid conflicts)

### Common TypeScript Issues
- Duplicate exports between `schemas/index.ts` and `types/api.ts` - use different naming conventions
- Missing `pg` dependency for migration scripts
- Server-side vs client-side code (avoid DOM APIs in shared packages)

## Testing Strategy

### E2E Testing with Playwright
- Config in `tests/playwright.config.ts`
- Tests expect basic Angular app functionality, not specific generated content
- Tests are resilient to missing routes and handle timeouts gracefully
- Focus on app stability rather than specific database content

### Test Debugging
- Use `npm run test:e2e:ui` for interactive debugging
- Tests run against localhost:4201 (site app)
- Playwright will start apps automatically in local development
- In CI, apps are started manually before tests run

### CI Pipeline Architecture
1. Install dependencies and build packages in dependency order
2. Start Docker services (Supabase stack)
3. Run database migrations and seed data
4. Generate components and routes from database content
5. Build both Angular applications
6. Start both apps (admin:4200, site:4201) with health checks
7. Run Playwright E2E tests
8. Upload test results and show logs on failure

## Development Notes

### Monorepo Management
- Uses npm workspaces for package management
- Build order matters: shared → generator → apps
- Workspace commands use `--workspace=@devcms/package-name` syntax

### Angular Architecture
- Angular 17+ with standalone components and signals
- Both apps use modern Angular features (router, HttpClient, etc.)
- Apps are independent but share types from `@devcms/shared`
- TailwindCSS for styling across all applications

### Database Integration
- PostgreSQL with Supabase extensions
- Migration scripts in `tools/migrate.js` with automatic database creation
- Sample data in `database/migrations/002_sample_data.sql`
- RLS policies enforce multi-tenant data isolation

### Common Development Issues
- Docker containers must be running before migration/seeding
- Angular dev servers need time to start (30+ seconds in CI)
- Component generation requires database content to exist
- Missing auth.users records will cause FK constraint violations in profiles table