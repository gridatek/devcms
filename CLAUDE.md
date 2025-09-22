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
├── database/
│   ├── migrations/     # PostgreSQL schema and sample data
│   └── seeds/          # Sample content for development
├── templates/          # EJS templates for component generation
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
- `sites` - Multi-tenant site configuration
- `posts` - Blog posts with categories, tags, and metadata
- `pages` - Static pages with navigation control
- `categories`/`tags` - Content organization
- `users`/`profiles` - User management with roles
- `media` - File storage with metadata

### Template System
- EJS templates in `/templates/` directory drive component generation
- Templates use database schema introspection to generate type-safe Angular components
- Route discovery automatically creates navigation from database content
- Support for custom template overrides and component extensions

### Component Generation Flow
1. CLI introspects PostgreSQL schema
2. Loads content from database via Supabase
3. Applies EJS templates to generate Angular components
4. Updates routing configuration automatically
5. Preserves custom component modifications

## Testing Strategy

### E2E Testing with Playwright
- Component generation from database content
- Visual regression testing for template consistency
- Performance testing for Core Web Vitals
- Cross-browser compatibility testing

### Test Data Management
- Docker-based test isolation with fresh database per test
- Sample data seeding via SQL scripts
- Database state manipulation for testing dynamic generation

## Development Notes

- The project uses npm workspaces for monorepo management
- Angular 17+ with standalone components and signals
- TailwindCSS for styling across all applications
- TypeScript strict mode enabled throughout
- Supabase provides real-time subscriptions and auth out of the box