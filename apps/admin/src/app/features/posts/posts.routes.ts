import { Routes } from '@angular/router';

export const postsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./post-list.component').then(m => m.PostListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./post-edit.component').then(m => m.PostEditComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./post-edit.component').then(m => m.PostEditComponent)
  }
];