import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'posts',
        loadChildren: () => import('./features/posts/posts.routes').then(m => m.postsRoutes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./features/pages/pages.routes').then(m => m.pagesRoutes)
      },
      {
        path: 'categories',
        loadChildren: () => import('./features/categories/categories.routes').then(m => m.categoriesRoutes)
      },
      {
        path: 'tags',
        loadChildren: () => import('./features/tags/tags.routes').then(m => m.tagsRoutes)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(m => m.productsRoutes)
      },
      {
        path: 'media',
        loadComponent: () => import('./features/media/media-library.component').then(m => m.MediaLibraryComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/site-settings.component').then(m => m.SiteSettingsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];