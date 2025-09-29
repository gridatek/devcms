# DevCMS

**DevCMS** is a database-first, template-driven CMS that generates Angular components from PostgreSQL schema using customizable EJS templates. It features a hybrid architecture with auto-generated content management and full developer freedom for custom functionality.

## 🚀 Quick Start

1. **Prerequisites**:
   - Node.js 20+
   - Docker Desktop or compatible container runtime

2. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd devcms
   npm install
   npm run setup  # Starts Supabase and generates types
   ```

3. **Start development**:
   ```bash
   # Start both admin and site apps
   npm run dev:all

   # Or start individually
   npm run dev:admin  # Admin at http://localhost:4200
   npm run dev:site   # Site at http://localhost:4201
   ```

4. **Access services**:
   - **Admin Panel**: http://localhost:4200
   - **Public Site**: http://localhost:4201
   - **Supabase Studio**: http://localhost:54323
   - **API**: http://localhost:54321
   - **Database**: postgresql://postgres:postgres@localhost:54322/postgres

## 🏗️ Architecture

### Core Concept
- **Database-First**: PostgreSQL schema drives everything - content model, component generation, and API structure
- **Template-Driven**: EJS templates generate Angular components dynamically from database content
- **Hybrid Architecture**: Auto-generated content management with full developer customization freedom

### Project Structure
```
devcms/
├── apps/
│   ├── admin/          # Angular CMS admin interface
│   └── site/           # Public Angular site
├── packages/
│   ├── shared/         # Shared TypeScript types and utilities
│   └── generator/      # Core component generation engine with CLI
│       └── templates/  # EJS templates for component generation
├── database/
│   ├── migrations/     # PostgreSQL schema and sample data
│   └── seeds/          # Sample content for development
└── tools/              # Development and deployment scripts
```

## 📋 Available Commands

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

### Supabase Management
```bash
npm run supabase:start         # Start Supabase local stack
npm run supabase:stop          # Stop Supabase services
npm run supabase:restart       # Restart Supabase services
npm run supabase:reset         # Reset database with migrations
npm run supabase:status        # Show service status
npm run types:generate         # Generate TypeScript types
```

### Build & Deploy
```bash
npm run build:admin           # Build admin app
npm run build:site            # Build site app with static generation
npm run build:all             # Build both apps
```

### Testing
```bash
npm run test:e2e              # Run Playwright tests
npm run test:e2e:ui           # Run Playwright tests with UI
```

## 🛠️ Development Workflow

1. **Design your PostgreSQL schema** in `database/migrations/`
2. **Create or customize EJS templates** in `templates/`
3. **Generate components**:
   ```bash
   npm run generate:components
   ```
4. **Build and test**:
   ```bash
   npm run build:all
   npm run test:e2e
   ```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Supabase Configuration
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/devcms

# Site Configuration
SITE_ID=your-site-id
SITE_SLUG=your-site-slug
```

### Database Schema
The database schema is defined in `database/migrations/001_initial_schema.sql` and includes:

- **Multi-tenant sites** with owner-based access control
- **Content types**: posts, pages, categories, tags, products
- **Media management** with metadata
- **User management** with role-based permissions
- **Full-text search** capabilities
- **Row Level Security (RLS)** for data isolation

### Template System
Templates in `packages/generator/templates/` use EJS syntax and receive:
- Content data from database tables
- Schema metadata for type-safe generation
- Site configuration and navigation
- Relationship information

Example template structure:
```
packages/generator/templates/
├── posts/
│   ├── post-detail.ejs     # Individual post component
│   └── post-list.ejs       # Blog listing component
├── pages/
│   └── page-detail.ejs     # Static page component
├── products/
│   ├── product-detail.ejs  # Product component
│   └── product-list.ejs    # Product catalog component
├── categories/
│   └── category-detail.ejs # Category component
└── shared/
    └── navigation.ejs      # Navigation component
```

## 🚀 Deployment

### Static Site Generation
```bash
npm run build:site        # Generates static site in dist/site
npm run generate:routes    # Updates routing for new content
```

### Database Migration
```bash
npm run db:migrate         # Apply schema changes
npm run generate:components # Regenerate components for schema changes
```

## 🧪 Testing

DevCMS includes comprehensive E2E testing with Playwright:

- **Component generation testing** - Verify components are generated correctly from database content
- **Visual regression testing** - Ensure template changes don't break layouts
- **Performance testing** - Validate Core Web Vitals compliance
- **Cross-browser testing** - Chrome, Firefox, Safari compatibility

Run tests:
```bash
npm run test:e2e           # Headless mode
npm run test:e2e:ui        # Interactive mode
```

## 🤝 Contributing

1. Create feature branch from `main`
2. Make changes following existing patterns
3. Add tests for new functionality
4. Ensure all tests pass: `npm run test:e2e`
5. Submit pull request

## 📚 Documentation

- [CLAUDE.md](./CLAUDE.md) - Architecture and development guide for AI assistants
- [Database Schema](./database/migrations/) - Complete schema documentation
- [Template Documentation](./packages/generator/templates/) - EJS template examples and patterns

## 🔗 Key Features

- ✅ **Database-first architecture** - Schema drives everything
- ✅ **Template-driven component generation** - Customize with EJS
- ✅ **Multi-tenant support** - Multiple sites in one instance
- ✅ **Type-safe development** - Full TypeScript support
- ✅ **Real-time collaboration** - Supabase real-time subscriptions
- ✅ **SEO optimized** - Static site generation + meta tags
- ✅ **Developer friendly** - Hot reload, TypeScript, modern tooling
- ✅ **Production ready** - Docker, migrations, CI/CD support

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**DevCMS** - The database-first CMS for developers who want complete control.