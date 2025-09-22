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

// Check if database is accessible and create if needed
async function checkDatabase() {
  const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/devcms';
  
  // First try connecting to the database
  let pool = new Pool({ connectionString: dbUrl });

  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connection successful\n');
    await pool.end();
    return;
  } catch (error) {
    await pool.end();
    
    // If database doesn't exist, try to create it
    if (error.code === '3D000') { // database does not exist
      console.log('📋 Database does not exist, creating it...');
      
      // Connect to postgres database to create our database
      const adminDbUrl = dbUrl.replace('/devcms', '/postgres');
      const adminPool = new Pool({ connectionString: adminDbUrl });
      
      try {
        await adminPool.query('CREATE DATABASE devcms');
        console.log('✅ Database created successfully\n');
      } catch (createError) {
        if (createError.code !== '42P04') { // ignore "already exists" error
          console.error('❌ Failed to create database:', createError.message);
          process.exit(1);
        }
      } finally {
        await adminPool.end();
      }
      
      // Now test connection to the new database
      pool = new Pool({ connectionString: dbUrl });
      try {
        await pool.query('SELECT 1');
        console.log('✅ Database connection successful after creation\n');
      } catch (finalError) {
        console.error('❌ Database connection failed after creation:', finalError.message);
        process.exit(1);
      } finally {
        await pool.end();
      }
    } else {
      console.error('❌ Database connection failed:', error.message);
      console.error('Make sure Docker containers are running: docker compose up -d');
      process.exit(1);
    }
  }
}

async function main() {
  await checkDatabase();
  await runMigrations();
}

main();