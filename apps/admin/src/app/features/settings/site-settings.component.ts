import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-settings',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-6"><h1 class="text-2xl font-semibold">Site Settings</h1><p class="mt-2 text-gray-600">Configure your site</p></div>`
})
export class SiteSettingsComponent {}