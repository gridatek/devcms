import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Pages</h1>
          <p class="mt-2 text-sm text-gray-700">Manage your static pages.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a routerLink="/pages/new" class="btn btn-primary">Add page</a>
        </div>
      </div>

      <div class="mt-8">
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Navigation</th>
              <th>Date</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let page of pages">
              <td class="font-medium">
                <a [routerLink]="['/pages', page.id]" class="text-blue-600 hover:text-blue-900">
                  {{ page.title }}
                </a>
              </td>
              <td><span [ngClass]="'badge-' + page.status" class="badge">{{ page.status }}</span></td>
              <td>{{ page.showInNavigation ? 'Yes' : 'No' }}</td>
              <td class="text-gray-500">{{ page.date | date:'short' }}</td>
              <td class="text-right">
                <a [routerLink]="['/pages', page.id]" class="text-blue-600 hover:text-blue-900 mr-4">Edit</a>
                <button (click)="deletePage(page.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PageListComponent {
  pages = [
    { id: '1', title: 'About', status: 'published', showInNavigation: true, date: new Date() },
    { id: '2', title: 'Contact', status: 'published', showInNavigation: true, date: new Date() }
  ];

  deletePage(id: string): void {
    if (confirm('Are you sure?')) {
      this.pages = this.pages.filter(p => p.id !== id);
    }
  }
}