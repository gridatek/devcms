import { Pool } from 'pg';

export interface ContentData {
  posts: any[];
  pages: any[];
  categories: any[];
  tags: any[];
  products: any[];
  site: any;
  navigation: any[];
}

export class ContentLoader {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/devcms'
    });
  }

  async loadForSite(siteId: string): Promise<ContentData> {
    try {
      const [site, posts, pages, categories, tags, products] = await Promise.all([
        this.loadSite(siteId),
        this.loadPosts(siteId),
        this.loadPages(siteId),
        this.loadCategories(siteId),
        this.loadTags(siteId),
        this.loadProducts(siteId)
      ]);

      const navigation = this.buildNavigation(pages);

      return {
        site,
        posts,
        pages,
        categories,
        tags,
        products,
        navigation
      };
    } catch (error) {
      throw new Error(`Content loading failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async loadSite(siteId: string): Promise<any> {
    const query = `
      SELECT s.*, p.first_name, p.last_name
      FROM sites s
      LEFT JOIN profiles p ON s.owner_id = p.id
      WHERE s.slug = $1 OR s.id = $1
      LIMIT 1;
    `;

    const result = await this.pool.query(query, [siteId]);
    if (result.rows.length === 0) {
      throw new Error(`Site not found: ${siteId}`);
    }

    return result.rows[0];
  }

  private async loadPosts(siteId: string): Promise<any[]> {
    const query = `
      SELECT
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        pr.first_name,
        pr.last_name,
        COALESCE(
          json_agg(
            json_build_object(
              'id', t.id,
              'name', t.name,
              'slug', t.slug,
              'color', t.color
            )
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) as tags
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN profiles pr ON p.author_id = pr.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.site_id = (SELECT id FROM sites WHERE slug = $1 OR id = $1)
        AND p.status = 'published'
      GROUP BY p.id, c.name, c.slug, pr.first_name, pr.last_name
      ORDER BY p.published_at DESC;
    `;

    const result = await this.pool.query(query, [siteId]);
    return result.rows.map(row => ({
      ...row,
      author: row.first_name ? {
        first_name: row.first_name,
        last_name: row.last_name
      } : null,
      category: row.category_name ? {
        name: row.category_name,
        slug: row.category_slug
      } : null,
      tags: Array.isArray(row.tags) ? row.tags : []
    }));
  }

  private async loadPages(siteId: string): Promise<any[]> {
    const query = `
      SELECT
        p.*,
        pr.first_name,
        pr.last_name
      FROM pages p
      LEFT JOIN profiles pr ON p.author_id = pr.id
      WHERE p.site_id = (SELECT id FROM sites WHERE slug = $1 OR id = $1)
        AND p.status = 'published'
      ORDER BY p.navigation_order, p.title;
    `;

    const result = await this.pool.query(query, [siteId]);
    return result.rows.map(row => ({
      ...row,
      author: row.first_name ? {
        first_name: row.first_name,
        last_name: row.last_name
      } : null
    }));
  }

  private async loadCategories(siteId: string): Promise<any[]> {
    const query = `
      SELECT *
      FROM categories
      WHERE site_id = (SELECT id FROM sites WHERE slug = $1 OR id = $1)
      ORDER BY sort_order, name;
    `;

    const result = await this.pool.query(query, [siteId]);
    return result.rows;
  }

  private async loadTags(siteId: string): Promise<any[]> {
    const query = `
      SELECT *
      FROM tags
      WHERE site_id = (SELECT id FROM sites WHERE slug = $1 OR id = $1)
      ORDER BY name;
    `;

    const result = await this.pool.query(query, [siteId]);
    return result.rows;
  }

  private async loadProducts(siteId: string): Promise<any[]> {
    const query = `
      SELECT *
      FROM products
      WHERE site_id = (SELECT id FROM sites WHERE slug = $1 OR id = $1)
        AND status = 'active'
      ORDER BY name;
    `;

    const result = await this.pool.query(query, [siteId]);
    return result.rows;
  }

  private buildNavigation(pages: any[]): any[] {
    return pages
      .filter(page => page.show_in_navigation)
      .map(page => ({
        id: page.id,
        title: page.title,
        url: page.is_homepage ? '/' : `/${page.slug}`,
        order: page.navigation_order,
        is_external: false,
        target: '_self',
        children: []
      }))
      .sort((a, b) => a.order - b.order);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}