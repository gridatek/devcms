import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-library',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-6"><h1 class="text-2xl font-semibold">Media Library</h1><p class="mt-2 text-gray-600">Manage your media files</p></div>`
})
export class MediaLibraryComponent {}