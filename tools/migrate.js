#!/usr/bin/env node

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  console.log('🗄️  Running database migrations...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/devcms'
  });

  try {
    // Get migration files
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration files:\n`);

    for (const file of migrationFiles) {
      console.log(`📄 Running migration: ${file}`);

      const migrationPath = path.join(migrationsDir, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

      try {
        await pool.query(migrationSQL);
        console.log(`✅ Migration ${file} completed successfully\n`);
      } catch (error) {
        console.error(`❌ Migration ${file} failed:`, error.message);
        throw error;
      }
    }

    console.log('🎉 All migrations completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Check if database is accessible
async function checkDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/devcms'
  });

  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connection successful\n');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Make sure Docker containers are running: docker compose up -d');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function main() {
  await checkDatabase();
  await runMigrations();
}

main();