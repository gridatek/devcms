import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-5xl font-bold text-gray-900 mb-6">
              Welcome to DevCMS
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The database-first CMS for developers who want complete control over their content management system.
            </p>
            <div class="flex justify-center space-x-4">
              <a
                routerLink="/blog"
                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View Blog
              </a>
              <a
                href="https://github.com/your-repo/devcms"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Why Choose DevCMS?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for developers who want full control over their content management system.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Database-First</h3>
              <p class="text-gray-600">
                Your PostgreSQL schema drives everything. No abstractions, no limitations.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Template-Driven</h3>
              <p class="text-gray-600">
                Customize components with EJS templates. Full control over HTML output.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Developer-Friendly</h3>
              <p class="text-gray-600">
                TypeScript, Angular, modern tooling. Built by developers, for developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Generate your first components and see DevCMS in action.
          </p>
          <div class="bg-gray-800 text-white p-4 rounded-lg max-w-lg mx-auto text-left">
            <code class="text-green-400">$ npm run generate:components</code>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {}