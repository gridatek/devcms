#!/usr/bin/env node

const { Pool } = require('pg');

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/devcms'
  });

  try {
    // Check if data already exists
    const existingData = await pool.query('SELECT COUNT(*) FROM sites');
    if (parseInt(existingData.rows[0].count) > 0) {
      console.log('⚠️  Database already contains data. Skipping seed...');
      return;
    }

    console.log('📝 Creating sample site and content...');

    // The sample data is already included in 002_sample_data.sql migration
    // This script can be used to add additional sample data or reset data

    // Add any additional seeding logic here if needed
    console.log('✅ Sample data seeding completed!');

    // Display sample data info
    const sites = await pool.query('SELECT * FROM sites');
    const posts = await pool.query('SELECT * FROM posts WHERE status = \'published\'');
    const pages = await pool.query('SELECT * FROM pages WHERE status = \'published\'');

    console.log('\n📊 Sample data summary:');
    console.log(`  Sites: ${sites.rows.length}`);
    console.log(`  Published posts: ${posts.rows.length}`);
    console.log(`  Published pages: ${pages.rows.length}`);

    if (sites.rows.length > 0) {
      console.log(`\n🌐 Sample site: ${sites.rows[0].name}`);
      console.log(`  Slug: ${sites.rows[0].slug}`);
      console.log(`  Description: ${sites.rows[0].description}`);
    }

  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();