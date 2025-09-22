import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('Component Generation', () => {
  test.beforeEach(async () => {
    // Reset Docker environment with fresh data
    await execAsync('docker-compose down -v && docker-compose up -d');
    await execAsync('npm run db:migrate');
    await execAsync('npm run db:seed');
  });

  test('should generate blog post component from database', async ({ page }) => {
    // Generate components
    await execAsync('npm run generate:components');

    // Verify generated component renders correctly
    await page.goto('/blog/getting-started-devcms');

    // Check that the generated component displays content
    await expect(page.locator('h1')).toContainText('Getting Started with DevCMS');

    // Check category and tags are displayed
    await expect(page.locator('[data-testid="category"]')).toContainText('Technology');
    await expect(page.locator('[data-testid="tags"]')).toContainText('Angular');
  });

  test('should generate blog list component with all posts', async ({ page }) => {
    await execAsync('npm run generate:components');

    await page.goto('/blog');

    // Check that multiple posts are displayed
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

    // Add new post to database
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
        );"
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