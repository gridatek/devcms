import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Posts</h1>
          <p class="mt-2 text-sm text-gray-700">
            Manage your blog posts and articles.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a
            routerLink="/posts/new"
            class="btn btn-primary"
          >
            Add post
          </a>
        </div>
      </div>

      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th class="relative"><span class="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr *ngFor="let post of posts">
                    <td class="font-medium">
                      <a [routerLink]="['/posts', post.id]" class="text-blue-600 hover:text-blue-900">
                        {{ post.title }}
                      </a>
                    </td>
                    <td>
                      <span [ngClass]="'badge-' + post.status" class="badge">
                        {{ post.status }}
                      </span>
                    </td>
                    <td class="text-gray-500">{{ post.category || '-' }}</td>
                    <td class="text-gray-500">{{ post.author || '-' }}</td>
                    <td class="text-gray-500">{{ post.date | date:'short' }}</td>
                    <td class="text-right text-sm font-medium">
                      <a [routerLink]="['/posts', post.id]" class="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </a>
                      <button (click)="deletePost(post.id)" class="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PostListComponent {
  posts = [
    { id: '1', title: 'Getting Started with DevCMS', status: 'published', category: 'Technology', author: 'John Developer', date: new Date() },
    { id: '2', title: 'Database-First Design', status: 'draft', category: 'Technology', author: 'John Developer', date: new Date() }
  ];

  deletePost(id: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.posts = this.posts.filter(p => p.id !== id);
    }
  }
}