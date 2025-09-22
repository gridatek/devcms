import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  { path: '', loadComponent: () => import('./page-list.component').then(m => m.PageListComponent) },
  { path: 'new', loadComponent: () => import('./page-edit.component').then(m => m.PageEditComponent) },
  { path: ':id', loadComponent: () => import('./page-edit.component').then(m => m.PageEditComponent) }
];