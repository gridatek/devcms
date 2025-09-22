import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-6"><h1 class="text-2xl font-semibold">Tags</h1><p class="mt-2 text-gray-600">Manage content tags</p></div>`
})
export class TagListComponent {}