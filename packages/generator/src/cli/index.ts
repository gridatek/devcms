#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { ComponentGenerator } from '../core/component-generator';
import { RouteDiscovery } from '../core/route-discovery';
import { SchemaIntrospector } from '../database/schema-introspector';
import { ContentLoader } from '../database/content-loader';

const program = new Command();

program
  .name('devcms-generate')
  .description('DevCMS component generator')
  .version('1.0.0');

program
  .command('components')
  .description('Generate Angular components from database content')
  .option('-s, --site-id <siteId>', 'Site ID to generate components for')
  .option('-o, --output <path>', 'Output directory for generated components')
  .option('-t, --templates <path>', 'Custom templates directory')
  .option('--clean', 'Clean output directory before generation')
  .action(async (options) => {
    const spinner = ora('Loading content from database...').start();

    try {
      const siteId = options.siteId || process.env.SITE_ID || 'default-site';
      const outputPath = options.output || './src/app/generated';
      const templatesPath = options.templates || './templates';

      // Load database schema and content
      const schemaIntrospector = new SchemaIntrospector();
      const contentLoader = new ContentLoader();

      spinner.text = 'Introspecting database schema...';
      const schema = await schemaIntrospector.introspect();

      spinner.text = 'Loading site content...';
      const content = await contentLoader.loadForSite(siteId);

      // Generate components
      spinner.text = 'Generating Angular components...';
      const generator = new ComponentGenerator({
        templatesPath,
        outputPath,
        cleanOutput: options.clean
      });

      const result = await generator.generate(schema, content);

      spinner.succeed(chalk.green(`Generated ${result.generated_files.length} components successfully!`));

      if (result.warnings.length > 0) {
        console.log(chalk.yellow('\nWarnings:'));
        result.warnings.forEach(warning => console.log(chalk.yellow(`  - ${warning}`)));
      }

      if (result.errors.length > 0) {
        console.log(chalk.red('\nErrors:'));
        result.errors.forEach(error => console.log(chalk.red(`  - ${error}`)));
      }

      console.log(chalk.blue(`\nExecution time: ${result.execution_time}ms`));

    } catch (error) {
      spinner.fail(chalk.red('Component generation failed'));
      console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
      process.exit(1);
    }
  });

program
  .command('routes')
  .description('Generate routing configuration from database content')
  .option('-s, --site-id <siteId>', 'Site ID to generate routes for')
  .option('-o, --output <path>', 'Output file for routing configuration')
  .action(async (options) => {
    const spinner = ora('Loading content for route generation...').start();

    try {
      const siteId = options.siteId || process.env.SITE_ID || 'default-site';
      const outputPath = options.output || './src/app/app.routes.ts';

      const contentLoader = new ContentLoader();
      const routeDiscovery = new RouteDiscovery();

      spinner.text = 'Loading site content...';
      const content = await contentLoader.loadForSite(siteId);

      spinner.text = 'Generating routes...';
      const routes = await routeDiscovery.generateRoutes(content);

      spinner.text = 'Writing routing configuration...';
      await routeDiscovery.writeRoutesFile(routes, outputPath);

      spinner.succeed(chalk.green(`Generated routing configuration with ${routes.length} routes!`));

    } catch (error) {
      spinner.fail(chalk.red('Route generation failed'));
      console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
      process.exit(1);
    }
  });

program
  .command('schema')
  .description('Introspect and display database schema')
  .action(async () => {
    const spinner = ora('Introspecting database schema...').start();

    try {
      const schemaIntrospector = new SchemaIntrospector();
      const schema = await schemaIntrospector.introspect();

      spinner.succeed(chalk.green('Schema introspection complete!'));

      console.log(chalk.blue('\nDatabase Schema:'));
      schema.tables.forEach(table => {
        console.log(chalk.yellow(`\n  ${table.name}:`));
        table.columns.forEach(column => {
          const nullable = column.nullable ? '?' : '';
          const pk = column.is_primary_key ? ' (PK)' : '';
          const fk = column.is_foreign_key ? ' (FK)' : '';
          console.log(`    ${column.name}${nullable}: ${column.type}${pk}${fk}`);
        });
      });

    } catch (error) {
      spinner.fail(chalk.red('Schema introspection failed'));
      console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
      process.exit(1);
    }
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
  process.exit(1);
});

program.parse(process.argv);