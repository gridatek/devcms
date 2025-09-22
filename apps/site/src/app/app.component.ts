import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-white">
      <!-- This will be replaced by generated components -->
      <router-outlet></router-outlet>

      <!-- Fallback content for initial setup -->
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DevCMS
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Your database-first CMS is ready! Generate components from your content to see your site.
        </p>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left max-w-2xl mx-auto">
          <h2 class="text-lg font-semibold text-blue-900 mb-3">Getting Started:</h2>
          <ol class="text-blue-800 space-y-2">
            <li>1. Run <code class="bg-blue-100 px-2 py-1 rounded text-sm">npm run generate:components</code></li>
            <li>2. Components will be generated in <code class="bg-blue-100 px-2 py-1 rounded text-sm">src/app/generated/</code></li>
            <li>3. Routes will be automatically updated</li>
            <li>4. Your site will reflect your database content</li>
          </ol>
        </div>
      </div>
    </div>
  `,
  styles: [`
    code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
  `]
})
export class AppComponent {
  title = 'DevCMS Site';
}