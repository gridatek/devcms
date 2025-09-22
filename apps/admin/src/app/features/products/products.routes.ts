import { Routes } from '@angular/router';
export const productsRoutes: Routes = [
  { path: '', loadComponent: () => import('./product-list.component').then(m => m.ProductListComponent) }
];