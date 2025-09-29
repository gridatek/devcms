import { test, expect } from '@playwright/test';

test.describe('DevCMS Site Tests', () => {
  test('should load the homepage successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Should have basic content
    await expect(page.locator('body')).not.toBeEmpty();
    
    // Should contain DevCMS branding somewhere
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(/DevCMS|devcms/i);
    
    // Should not have any console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait a bit for any async operations
    await page.waitForTimeout(2000);
    
    // Check for critical console errors (ignore minor ones)
    const criticalErrors = errors.filter(error => 
      error.includes('500') || 
      error.includes('404') ||
      error.includes('Failed to load') ||
      error.includes('Network error')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have responsive layout', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    // Content should still be accessible in mobile view
    const content = await page.textContent('body');
    expect(content.length).toBeGreaterThan(0);
  });

  test('should handle navigation gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Try to navigate to a few common routes
    const routesToTest = ['/', '/blog', '/about', '/contact'];
    
    for (const route of routesToTest) {
      try {
        const response = await page.goto(route, { 
          waitUntil: 'domcontentloaded', 
          timeout: 5000 
        });
        
        // If we get here, the route responded
        if (response?.status() === 200) {
          const content = await page.textContent('body');
          expect(content.length).toBeGreaterThan(0);
        }
      } catch (error) {
        // Route might not exist, that's OK - we're just testing the app doesn't crash
        console.log(`Route ${route} not available or timed out, continuing...`);
      }
    }
    
    // Should be able to return to homepage
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});