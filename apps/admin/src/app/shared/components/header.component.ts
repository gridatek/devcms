import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Left side -->
          <div class="flex items-center">
            <!-- Mobile menu button -->
            <button
              type="button"
              (click)="toggleSidebar.emit()"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <!-- Logo and title -->
            <div class="flex items-center ml-4 lg:ml-0">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span class="text-white font-bold text-sm">D</span>
                </div>
              </div>
              <div class="ml-4">
                <h1 class="text-lg font-semibold text-gray-900">DevCMS Admin</h1>
              </div>
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              type="button"
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5 5-5v10zM9 12H4m6 0a6 6 0 100-12 6 6 0 000 12z" />
              </svg>
            </button>

            <!-- User menu -->
            <div class="relative">
              <button
                type="button"
                (click)="showUserMenu = !showUserMenu"
                class="flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="ml-2 text-sm font-medium text-gray-700">
                  {{ getCurrentUserName() }}
                </span>
                <svg class="ml-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- User dropdown menu -->
              <div
                *ngIf="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                (clickOutside)="showUserMenu = false"
              >
                <div class="py-1">
                  <a
                    routerLink="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    (click)="showUserMenu = false"
                  >
                    Your Profile
                  </a>
                  <a
                    routerLink="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    (click)="showUserMenu = false"
                  >
                    Settings
                  </a>
                  <div class="border-t border-gray-100"></div>
                  <button
                    type="button"
                    (click)="signOut()"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);
  showUserMenu = false;

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    if (user?.profile?.first_name && user?.profile?.last_name) {
      return `${user.profile.first_name} ${user.profile.last_name}`;
    }
    return user?.email || 'User';
  }

  async signOut(): Promise<void> {
    this.showUserMenu = false;
    await this.authService.signOut();
  }
}