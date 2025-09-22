import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  current?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col w-64 bg-gray-800 h-full">
      <!-- Sidebar header -->
      <div class="flex items-center h-16 px-4 bg-gray-900">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span class="text-white font-bold text-sm">D</span>
          </div>
          <span class="ml-2 text-white font-semibold">DevCMS</span>
        </div>

        <!-- Close button for mobile -->
        <button
          *ngIf="isOpen"
          type="button"
          (click)="toggleSidebar.emit()"
          class="lg:hidden ml-auto p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-600"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <a
          *ngFor="let item of navigation"
          [routerLink]="item.href"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{exact: item.href === '/dashboard'}"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <div [innerHTML]="item.icon" class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300"></div>
          {{ item.name }}
        </a>
      </nav>

      <!-- User info at bottom -->
      <div class="flex-shrink-0 p-4 border-t border-gray-700">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-white">{{ getCurrentUserName() }}</p>
            <p class="text-xs text-gray-400">{{ getCurrentUserRole() }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);

  navigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" /></svg>'
    },
    {
      name: 'Posts',
      href: '/posts',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
    },
    {
      name: 'Pages',
      href: '/pages',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>'
    },
    {
      name: 'Categories',
      href: '/categories',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>'
    },
    {
      name: 'Tags',
      href: '/tags',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>'
    },
    {
      name: 'Products',
      href: '/products',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'
    },
    {
      name: 'Media',
      href: '/media',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
    },
    {
      name: 'Users',
      href: '/users',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
    }
  ];

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    if (user?.profile?.first_name && user?.profile?.last_name) {
      return `${user.profile.first_name} ${user.profile.last_name}`;
    }
    return user?.email?.split('@')[0] || 'User';
  }

  getCurrentUserRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.profile?.role || 'user';
  }
}