import * as fs from 'fs-extra';
import * as path from 'path';
import { RouteConfig } from '@devcms/shared';

export class RouteDiscovery {

  async generateRoutes(content: any): Promise<RouteConfig[]> {
    const routes: RouteConfig[] = [];

    // Add homepage route
    const homepage = content.pages.find((page: any) => page.is_homepage);
    if (homepage) {
      routes.push({
        path: '',
        component: `Page${this.pascalCase(homepage.slug)}Component`,
        data: { page: homepage }
      });
    }

    // Add page routes
    content.pages
      .filter((page: any) => !page.is_homepage)
      .forEach((page: any) => {
        routes.push({
          path: page.slug,
          component: `Page${this.pascalCase(page.slug)}Component`,
          data: { page }
        });
      });

    // Add blog routes
    if (content.posts.length > 0) {
      routes.push({
        path: 'blog',
        component: 'BlogComponent',
        data: { posts: content.posts }
      });

      // Individual post routes
      content.posts.forEach((post: any) => {
        routes.push({
          path: `blog/${post.slug}`,
          component: `Post${this.pascalCase(post.slug)}Component`,
          data: { post }
        });
      });
    }

    // Add category routes
    content.categories.forEach((category: any) => {
      const categoryPosts = content.posts.filter((post: any) => post.category_id === category.id);
      routes.push({
        path: `category/${category.slug}`,
        component: `Category${this.pascalCase(category.slug)}Component`,
        data: { category, posts: categoryPosts }
      });
    });

    // Add product routes if products exist
    if (content.products.length > 0) {
      routes.push({
        path: 'products',
        component: 'ProductListComponent',
        data: { products: content.products }
      });

      content.products.forEach((product: any) => {
        routes.push({
          path: `products/${product.slug}`,
          component: `Product${this.pascalCase(product.slug)}Component`,
          data: { product }
        });
      });
    }

    return routes;
  }

  async writeRoutesFile(routes: RouteConfig[], outputPath: string): Promise<void> {
    const routeImports = this.generateRouteImports(routes);
    const routeDefinitions = this.generateRouteDefinitions(routes);

    const routesFileContent = `import { Routes } from '@angular/router';

// Generated component imports
${routeImports}

export const routes: Routes = [
${routeDefinitions}
  {
    path: '**',
    redirectTo: ''
  }
];
`;

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, routesFileContent, 'utf8');
  }

  private generateRouteImports(routes: RouteConfig[]): string {
    const components = new Set<string>();

    routes.forEach(route => {
      components.add(route.component);
    });

    return Array.from(components)
      .map(component => {
        const kebabCase = this.kebabCase(component.replace('Component', ''));
        if (component.startsWith('Post')) {
          return `import { ${component} } from './components/posts/${kebabCase}.component';`;
        } else if (component.startsWith('Page')) {
          return `import { ${component} } from './components/pages/${kebabCase}.component';`;
        } else if (component.startsWith('Category')) {
          return `import { ${component} } from './components/categories/${kebabCase}.component';`;
        } else if (component.startsWith('Product')) {
          return `import { ${component} } from './components/products/${kebabCase}.component';`;
        } else if (component === 'BlogComponent') {
          return `import { ${component} } from './components/posts/post-list.component';`;
        } else {
          return `import { ${component} } from './components/shared/${kebabCase}.component';`;
        }
      })
      .join('\n');
  }

  private generateRouteDefinitions(routes: RouteConfig[]): string {
    return routes
      .map(route => {
        const routeObj = {
          path: `'${route.path}'`,
          component: route.component
        };

        if (route.data) {
          // Add data as comments for reference
          routeObj['// data'] = JSON.stringify(route.data, null, 2).replace(/\n/g, '\n    // ');
        }

        const routeStr = Object.entries(routeObj)
          .map(([key, value]) => {
            if (key.startsWith('//')) {
              return `    ${key}: ${value}`;
            }
            return `    ${key}: ${value}`;
          })
          .join(',\n');

        return `  {\n${routeStr}\n  }`;
      })
      .join(',\n');
  }

  private pascalCase(str: string): string {
    return str
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  private kebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
}