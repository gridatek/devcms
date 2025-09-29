import { ContentMeta } from '../types/content';

export function generateMetaTags(meta: ContentMeta): string {
  const tags: string[] = [];

  // Basic meta tags
  if (meta.title) {
    tags.push(`<title>${escapeHtml(meta.title)}</title>`);
    tags.push(`<meta name="title" content="${escapeHtml(meta.title)}">`);
  }

  if (meta.description) {
    tags.push(`<meta name="description" content="${escapeHtml(meta.description)}">`);
  }

  if (meta.keywords?.length) {
    tags.push(`<meta name="keywords" content="${meta.keywords.join(', ')}">`);
  }

  if (meta.author) {
    tags.push(`<meta name="author" content="${escapeHtml(meta.author)}">`);
  }

  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}">`);
  }

  // Open Graph tags
  if (meta.og_title) {
    tags.push(`<meta property="og:title" content="${escapeHtml(meta.og_title)}">`);
  }

  if (meta.og_description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(meta.og_description)}">`);
  }

  if (meta.og_image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(meta.og_image)}">`);
  }

  // Twitter Card tags
  if (meta.twitter_card) {
    tags.push(`<meta name="twitter:card" content="${meta.twitter_card}">`);
  }

  if (meta.twitter_title) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.twitter_title)}">`);
  }

  if (meta.twitter_description) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.twitter_description)}">`);
  }

  if (meta.twitter_image) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(meta.twitter_image)}">`);
  }

  return tags.join('\n  ');
}

export function generateStructuredData(type: 'Article' | 'WebPage' | 'Product', data: any): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;
}

export function createSitemap(urls: Array<{ url: string; lastmod?: string; changefreq?: string; priority?: number }>): string {
  const urlEntries = urls.map(entry => {
    const urlTag = [
      '  <url>',
      `    <loc>${escapeHtml(entry.url)}</loc>`
    ];

    if (entry.lastmod) {
      urlTag.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }

    if (entry.changefreq) {
      urlTag.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    }

    if (entry.priority) {
      urlTag.push(`    <priority>${entry.priority}</priority>`);
    }

    urlTag.push('  </url>');
    return urlTag.join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export function generateRobotsTxt(sitemapUrl?: string, disallowPaths: string[] = []): string {
  const lines = ['User-agent: *'];

  if (disallowPaths.length > 0) {
    disallowPaths.forEach(path => {
      lines.push(`Disallow: ${path}`);
    });
  } else {
    lines.push('Disallow:');
  }

  if (sitemapUrl) {
    lines.push('');
    lines.push(`Sitemap: ${sitemapUrl}`);
  }

  return lines.join('\n');
}

function escapeHtml(text: string): string {
  // Server-side safe HTML escaping
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}