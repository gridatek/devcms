import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold text-gray-900 mb-8">Edit Page</h1>
      <form [formGroup]="pageForm" class="space-y-6">
        <div><label class="form-label">Title</label><input formControlName="title" class="form-input" /></div>
        <div><label class="form-label">Content</label><textarea formControlName="content" rows="10" class="form-input"></textarea></div>
        <button type="submit" class="btn btn-primary">Save Page</button>
      </form>
    </div>
  `
})
export class PageEditComponent {
  pageForm = this.fb.group({
    title: ['', Validators.required],
    content: ['']
  });
  constructor(private fb: FormBuilder) {}
}