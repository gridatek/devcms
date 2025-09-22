import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';
import { glob } from 'glob';
import {
  GenerationResult,
  SchemaInfo,
  TemplateConfig,
  ComponentGenerationConfig
} from '@devcms/shared';

export interface GeneratorOptions {
  templatesPath: string;
  outputPath: string;
  cleanOutput?: boolean;
}

export interface ContentData {
  posts: any[];
  pages: any[];
  categories: any[];
  tags: any[];
  products: any[];
  site: any;
  navigation: any[];
}

export class ComponentGenerator {
  private options: GeneratorOptions;
  private templates: Map<string, TemplateConfig> = new Map();

  constructor(options: GeneratorOptions) {
    this.options = options;
  }

  async generate(schema: SchemaInfo, content: ContentData): Promise<GenerationResult> {
    const startTime = Date.now();
    const result: GenerationResult = {
      success: true,
      generated_files: [],
      errors: [],
      warnings: [],
      execution_time: 0
    };

    try {
      // Clean output directory if requested
      if (this.options.cleanOutput) {
        await fs.emptyDir(this.options.outputPath);
      }

      // Ensure output directory exists
      await fs.ensureDir(this.options.outputPath);

      // Load templates
      await this.loadTemplates();

      // Generate components for each content type
      const generationTasks = [
        this.generatePostComponents(content, result),
        this.generatePageComponents(content, result),
        this.generateCategoryComponents(content, result),
        this.generateProductComponents(content, result),
        this.generateNavigationComponent(content, result),
        this.generateLayoutComponents(content, result)
      ];

      await Promise.all(generationTasks);

      result.execution_time = Date.now() - startTime;

    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Unknown error');
      result.execution_time = Date.now() - startTime;
    }

    return result;
  }

  private async loadTemplates(): Promise<void> {
    try {
      const templateFiles = await glob('**/*.ejs', {
        cwd: this.options.templatesPath,
        absolute: true
      });

      for (const templateFile of templateFiles) {
        const relativePath = path.relative(this.options.templatesPath, templateFile);
        const templateName = path.basename(relativePath, '.ejs');
        const contentType = path.dirname(relativePath);

        this.templates.set(templateName, {
          name: templateName,
          path: templateFile,
          content_type: contentType,
          output_pattern: this.getOutputPattern(templateName, contentType)
        });
      }
    } catch (error) {
      throw new Error(`Failed to load templates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getOutputPattern(templateName: string, contentType: string): string {
    // Define output patterns based on template type
    const patterns: Record<string, string> = {
      'post-detail': 'components/posts/post-detail.component.ts',
      'post-list': 'components/posts/post-list.component.ts',
      'page-detail': 'components/pages/page-detail.component.ts',
      'category-detail': 'components/categories/category-detail.component.ts',
      'category-list': 'components/categories/category-list.component.ts',
      'product-detail': 'components/products/product-detail.component.ts',
      'product-list': 'components/products/product-list.component.ts',
      'navigation': 'components/shared/navigation.component.ts',
      'layout': 'components/shared/layout.component.ts'
    };

    return patterns[templateName] || `components/${contentType}/${templateName}.component.ts`;
  }

  private async generatePostComponents(content: ContentData, result: GenerationResult): Promise<void> {
    try {
      // Generate post list component
      const postListTemplate = this.templates.get('post-list');
      if (postListTemplate) {
        const templateData = {
          posts: content.posts,
          site: content.site,
          navigation: content.navigation
        };

        await this.renderTemplate(postListTemplate, templateData, result);
      }

      // Generate individual post components
      for (const post of content.posts) {
        const postDetailTemplate = this.templates.get('post-detail');
        if (postDetailTemplate) {
          const templateData = {
            post,
            site: content.site,
            navigation: content.navigation,
            relatedPosts: this.getRelatedPosts(post, content.posts)
          };

          const outputPath = path.join(
            this.options.outputPath,
            'components/posts',
            `${post.slug}.component.ts`
          );

          await this.renderTemplateToFile(postDetailTemplate.path, templateData, outputPath, result);
        }
      }
    } catch (error) {
      result.errors.push(`Failed to generate post components: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generatePageComponents(content: ContentData, result: GenerationResult): Promise<void> {
    try {
      for (const page of content.pages) {
        const pageDetailTemplate = this.templates.get('page-detail');
        if (pageDetailTemplate) {
          const templateData = {
            page,
            site: content.site,
            navigation: content.navigation
          };

          const outputPath = path.join(
            this.options.outputPath,
            'components/pages',
            `${page.slug}.component.ts`
          );

          await this.renderTemplateToFile(pageDetailTemplate.path, templateData, outputPath, result);
        }
      }
    } catch (error) {
      result.errors.push(`Failed to generate page components: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateCategoryComponents(content: ContentData, result: GenerationResult): Promise<void> {
    try {
      // Generate category list component
      const categoryListTemplate = this.templates.get('category-list');
      if (categoryListTemplate) {
        const templateData = {
          categories: content.categories,
          site: content.site,
          navigation: content.navigation
        };

        await this.renderTemplate(categoryListTemplate, templateData, result);
      }

      // Generate individual category components
      for (const category of content.categories) {
        const categoryDetailTemplate = this.templates.get('category-detail');
        if (categoryDetailTemplate) {
          const categoryPosts = content.posts.filter(post => post.category_id === category.id);
          const templateData = {
            category,
            posts: categoryPosts,
            site: content.site,
            navigation: content.navigation
          };

          const outputPath = path.join(
            this.options.outputPath,
            'components/categories',
            `${category.slug}.component.ts`
          );

          await this.renderTemplateToFile(categoryDetailTemplate.path, templateData, outputPath, result);
        }
      }
    } catch (error) {
      result.errors.push(`Failed to generate category components: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateProductComponents(content: ContentData, result: GenerationResult): Promise<void> {
    try {
      if (content.products.length === 0) return;

      // Generate product list component
      const productListTemplate = this.templates.get('product-list');
      if (productListTemplate) {
        const templateData = {
          products: content.products,
          site: content.site,
          navigation: content.navigation
        };

        await this.renderTemplate(productListTemplate, templateData, result);
      }

      // Generate individual product components
      for (const product of content.products) {
        const productDetailTemplate = this.templates.get('product-detail');
        if (productDetailTemplate) {
          const templateData = {
            product,
            site: content.site,
            navigation: content.navigation
          };

          const outputPath = path.join(
            this.options.outputPath,
            'components/products',
            `${product.slug}.component.ts`
          );

          await this.renderTemplateToFile(productDetailTemplate.path, templateData, outputPath, result);
        }
      }
    } catch (error) {
      result.errors.push(`Failed to generate product components: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateNavigationComponent(content: ContentData, result: GenerationResult): Promise<void> {
    try {
      const navigationTemplate = this.templates.get('navigation');
      if (navigationTemplate) {
        const templateData = {
          navigation: content.navigation,
          site: content.site
        };

        await this.renderTemplate(navigationTemplate, templateData, result);
      }
    } catch (error) {
      result.errors.push(`Failed to generate navigation component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateLayoutComponents(content: ContentData, result: GenerationResult): Promise<void> {
    try {
      const layoutTemplate = this.templates.get('layout');
      if (layoutTemplate) {
        const templateData = {
          site: content.site,
          navigation: content.navigation
        };

        await this.renderTemplate(layoutTemplate, templateData, result);
      }
    } catch (error) {
      result.errors.push(`Failed to generate layout component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async renderTemplate(template: TemplateConfig, data: any, result: GenerationResult): Promise<void> {
    const outputPath = path.join(this.options.outputPath, template.output_pattern);
    await this.renderTemplateToFile(template.path, data, outputPath, result);
  }

  private async renderTemplateToFile(templatePath: string, data: any, outputPath: string, result: GenerationResult): Promise<void> {
    try {
      // Ensure output directory exists
      await fs.ensureDir(path.dirname(outputPath));

      // Render template
      const renderedContent = await ejs.renderFile(templatePath, data, {
        async: true
      });

      // Write to file
      await fs.writeFile(outputPath, renderedContent, 'utf8');
      result.generated_files.push(outputPath);

    } catch (error) {
      result.errors.push(`Failed to render template ${templatePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getRelatedPosts(currentPost: any, allPosts: any[]): any[] {
    return allPosts
      .filter(post =>
        post.id !== currentPost.id &&
        post.category_id === currentPost.category_id
      )
      .slice(0, 3);
  }
}