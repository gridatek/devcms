import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

// This file will be automatically updated by the generator
// when you run: npm run generate:routes