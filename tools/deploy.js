#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);

async function deploy() {
  console.log('🚀 Deploying DevCMS...\n');

  try {
    const environment = process.env.DEPLOY_ENVIRONMENT || 'development';
    console.log(`📍 Deploying to: ${environment}\n`);

    // Build all applications
    console.log('🔨 Building applications...');
    await execAsync('npm run build:all');
    console.log('✅ Applications built successfully\n');

    // Generate components from latest database content
    console.log('⚡ Generating components from database...');
    await execAsync('npm run generate:components');
    console.log('✅ Components generated\n');

    // Build site with generated components
    console.log('🏗️  Building site with generated components...');
    await execAsync('npm run build:site');
    console.log('✅ Site built with generated components\n');

    // Run database migrations if needed
    if (environment === 'production') {
      console.log('🗄️  Running production database migrations...');
      await execAsync('npm run db:migrate');
      console.log('✅ Database migrations completed\n');
    }

    // Copy static files and assets
    console.log('📁 Copying static assets...');
    await copyStaticAssets();
    console.log('✅ Static assets copied\n');

    // Generate sitemap and robots.txt
    console.log('🗺️  Generating SEO files...');
    await generateSEOFiles();
    console.log('✅ SEO files generated\n');

    // Deployment summary
    console.log('🎉 Deployment completed successfully!\n');
    console.log('📊 Deployment Summary:');
    console.log(`  Environment: ${environment}`);
    console.log(`  Timestamp: ${new Date().toISOString()}`);
    console.log(`  Admin Build: dist/admin/`);
    console.log(`  Site Build: dist/site/`);

    if (environment === 'development') {
      console.log('\n🌐 Local URLs:');
      console.log('  Admin: http://localhost:4200');
      console.log('  Site: http://localhost:4201');
      console.log('  Database: localhost:54322');
      console.log('  Supabase Studio: http://localhost:54323');
    }

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

async function copyStaticAssets() {
  const staticFiles = [
    { src: '.env.example', dest: 'dist/' },
    { src: 'README.md', dest: 'dist/' },
    { src: 'database/', dest: 'dist/' }
  ];

  for (const file of staticFiles) {
    try {
      await execAsync(`cp -r ${file.src} ${file.dest}`);
    } catch (error) {
      // Files might not exist, continue
    }
  }
}

async function generateSEOFiles() {
  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${process.env.STATIC_SITE_URL || 'http://localhost:4201'}/sitemap.xml`;

  fs.writeFileSync('dist/site/robots.txt', robotsTxt);

  // Generate basic sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.STATIC_SITE_URL || 'http://localhost:4201'}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${process.env.STATIC_SITE_URL || 'http://localhost:4201'}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  fs.writeFileSync('dist/site/sitemap.xml', sitemapXml);
}

deploy();