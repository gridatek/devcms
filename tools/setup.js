#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);

async function setup() {
  console.log('🚀 Setting up DevCMS development environment...\n');

  try {
    // Check if .env exists, if not copy from .env.example
    if (!fs.existsSync('.env')) {
      console.log('📄 Creating .env file from .env.example...');
      fs.copyFileSync('.env.example', '.env');
      console.log('✅ .env file created\n');
    }

    // Install dependencies
    console.log('📦 Installing dependencies...');
    await execAsync('npm install');
    console.log('✅ Dependencies installed\n');

    // Build shared package
    console.log('🔨 Building shared package...');
    await execAsync('npm run build --workspace=@devcms/shared');
    console.log('✅ Shared package built\n');

    // Build generator package
    console.log('🔨 Building generator package...');
    await execAsync('npm run build --workspace=@devcms/generator');
    console.log('✅ Generator package built\n');

    // Start Docker containers
    console.log('🐳 Starting Docker containers...');
    await execAsync('docker-compose up -d');
    console.log('✅ Docker containers started\n');

    // Wait for database to be ready
    console.log('⏳ Waiting for database to be ready...');
    await sleep(10000); // Wait 10 seconds for containers to start

    // Run database migrations
    console.log('🗄️  Running database migrations...');
    await execAsync('node tools/migrate.js');
    console.log('✅ Database migrations completed\n');

    // Seed database with sample data
    console.log('🌱 Seeding database with sample data...');
    await execAsync('node tools/seed.js');
    console.log('✅ Database seeded\n');

    // Generate initial components
    console.log('⚡ Generating initial components...');
    try {
      await execAsync('npm run generate:components');
      console.log('✅ Components generated\n');
    } catch (error) {
      console.log('⚠️  Component generation skipped (will be available after first build)\n');
    }

    console.log('🎉 Setup completed successfully!\n');
    console.log('Next steps:');
    console.log('  1. Start the admin app: npm run dev:admin');
    console.log('  2. Start the site app: npm run dev:site');
    console.log('  3. Or start both: npm run dev:all\n');
    console.log('Services:');
    console.log('  - Admin: http://localhost:4200');
    console.log('  - Site: http://localhost:4201');
    console.log('  - Supabase Studio: http://localhost:54323');
    console.log('  - Database: localhost:54322\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Make sure Docker is running');
    console.error('  2. Check if ports 54321-54325 are available');
    console.error('  3. Verify Node.js version >= 18');
    process.exit(1);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setup();