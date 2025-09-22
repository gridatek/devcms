import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <div class="max-w-4xl mx-auto px-4 py-16">
        <header class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p class="text-xl text-gray-600">
            This page will be automatically generated from your database content.
          </p>
        </header>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <div class="mb-4">
            <svg class="w-16 h-16 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-blue-900 mb-4">
            Generate Your Blog Components
          </h2>
          <p class="text-blue-800 mb-6">
            Run the component generator to create blog posts from your database content.
          </p>
          <div class="bg-blue-900 text-white p-4 rounded-lg text-left max-w-md mx-auto">
            <code class="text-blue-200">$ npm run generate:components</code>
          </div>
        </div>

        <div class="mt-12 text-center">
          <a
            routerLink="/"
            class="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  `
})
export class BlogComponent {}