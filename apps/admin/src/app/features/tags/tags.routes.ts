import { Routes } from '@angular/router';
export const tagsRoutes: Routes = [
  { path: '', loadComponent: () => import('./tag-list.component').then(m => m.TagListComponent) }
];