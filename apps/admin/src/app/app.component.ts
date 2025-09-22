import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';
import { HeaderComponent } from './shared/components/header.component';
import { SidebarComponent } from './shared/components/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Loading overlay -->
      <div *ngIf="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
          <div class="spinner"></div>
          <span class="text-gray-700">Loading...</span>
        </div>
      </div>

      <!-- Authentication Layout -->
      <div *ngIf="!authService.isAuthenticated(); else authenticatedLayout" class="min-h-screen flex items-center justify-center">
        <router-outlet></router-outlet>
      </div>

      <!-- Authenticated Layout -->
      <ng-template #authenticatedLayout>
        <div class="flex h-screen">
          <!-- Sidebar -->
          <app-sidebar
            [isOpen]="isSidebarOpen"
            (toggleSidebar)="toggleSidebar()"
            class="hidden lg:block">
          </app-sidebar>

          <!-- Mobile sidebar overlay -->
          <div
            *ngIf="isSidebarOpen"
            class="fixed inset-0 z-40 lg:hidden"
            (click)="closeSidebar()">
            <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>

          <!-- Mobile sidebar -->
          <div
            *ngIf="isSidebarOpen"
            class="fixed inset-y-0 left-0 z-50 w-64 lg:hidden transform transition-transform duration-300 ease-in-out">
            <app-sidebar
              [isOpen]="isSidebarOpen"
              (toggleSidebar)="toggleSidebar()">
            </app-sidebar>
          </div>

          <!-- Main content -->
          <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <app-header (toggleSidebar)="toggleSidebar()"></app-header>

            <!-- Page content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <router-outlet></router-outlet>
            </main>
          </div>
        </div>
      </ng-template>

      <!-- Notifications -->
      <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <div
          *ngFor="let notification of notificationService.notifications$ | async"
          class="max-w-sm w-full shadow-lg rounded-lg pointer-events-auto transform transition-all duration-300"
          [ngClass]="{
            'bg-green-500': notification.type === 'success',
            'bg-red-500': notification.type === 'error',
            'bg-yellow-500': notification.type === 'warning',
            'bg-blue-500': notification.type === 'info'
          }">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Success icon -->
                <svg *ngIf="notification.type === 'success'" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <!-- Error icon -->
                <svg *ngIf="notification.type === 'error'" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <!-- Warning icon -->
                <svg *ngIf="notification.type === 'warning'" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <!-- Info icon -->
                <svg *ngIf="notification.type === 'info'" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-white">
                  {{ notification.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  (click)="notificationService.removeNotification(notification.id)"
                  class="inline-flex text-white hover:text-gray-200 focus:outline-none">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  isSidebarOpen = false;
  isLoading = false;

  constructor(
    public authService: AuthService,
    public notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize authentication state
    this.authService.initialize();

    // Listen for route changes to close mobile sidebar
    this.router.events.subscribe(() => {
      this.closeSidebar();
    });

    // Listen for loading state changes
    this.authService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}