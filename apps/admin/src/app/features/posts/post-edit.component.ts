import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          {{ isEditing ? 'Edit Post' : 'Create New Post' }}
        </h1>
      </div>

      <form [formGroup]="postForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Main content -->
          <div class="lg:col-span-2 space-y-6">
            <div>
              <label class="form-label">Title *</label>
              <input
                type="text"
                formControlName="title"
                class="form-input"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label class="form-label">Slug</label>
              <input
                type="text"
                formControlName="slug"
                class="form-input"
                placeholder="post-slug"
              />
            </div>

            <div>
              <label class="form-label">Excerpt</label>
              <textarea
                formControlName="excerpt"
                rows="3"
                class="form-input"
                placeholder="Brief description of the post"
              ></textarea>
            </div>

            <div>
              <label class="form-label">Content *</label>
              <textarea
                formControlName="content"
                rows="12"
                class="form-input"
                placeholder="Write your post content here..."
              ></textarea>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <div class="card">
              <div class="card-header">
                <h3 class="text-lg font-medium">Publish</h3>
              </div>
              <div class="card-body space-y-4">
                <div>
                  <label class="form-label">Status</label>
                  <select formControlName="status" class="form-input">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      formControlName="isFeatured"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Featured post</span>
                  </label>
                </div>

                <div class="border-t pt-4">
                  <button
                    type="submit"
                    [disabled]="postForm.invalid"
                    class="btn btn-primary w-full"
                  >
                    {{ isEditing ? 'Update Post' : 'Create Post' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h3 class="text-lg font-medium">Categorization</h3>
              </div>
              <div class="card-body space-y-4">
                <div>
                  <label class="form-label">Category</label>
                  <select formControlName="categoryId" class="form-input">
                    <option value="">Select category</option>
                    <option value="1">Technology</option>
                    <option value="2">Design</option>
                    <option value="3">Business</option>
                  </select>
                </div>

                <div>
                  <label class="form-label">Tags</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h3 class="text-lg font-medium">SEO</h3>
              </div>
              <div class="card-body space-y-4">
                <div>
                  <label class="form-label">Meta Title</label>
                  <input
                    type="text"
                    formControlName="metaTitle"
                    class="form-input"
                    placeholder="SEO title"
                  />
                </div>

                <div>
                  <label class="form-label">Meta Description</label>
                  <textarea
                    formControlName="metaDescription"
                    rows="3"
                    class="form-input"
                    placeholder="SEO description"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `
})
export class PostEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    slug: [''],
    excerpt: [''],
    content: ['', [Validators.required]],
    status: ['draft'],
    isFeatured: [false],
    categoryId: [''],
    metaTitle: [''],
    metaDescription: ['']
  });

  isEditing = false;
  postId: string | null = null;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.postId;

    if (this.isEditing) {
      this.loadPost();
    }

    // Auto-generate slug from title
    this.postForm.get('title')?.valueChanges.subscribe(title => {
      if (title && !this.postForm.get('slug')?.value) {
        const slug = this.generateSlug(title);
        this.postForm.get('slug')?.setValue(slug);
      }
    });
  }

  private loadPost(): void {
    // In a real app, load post data from API
    // For now, using mock data
    if (this.postId === '1') {
      this.postForm.patchValue({
        title: 'Getting Started with DevCMS',
        slug: 'getting-started-devcms',
        excerpt: 'Learn how to get started with DevCMS',
        content: 'DevCMS is a database-first CMS...',
        status: 'published',
        isFeatured: true,
        categoryId: '1'
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formData = this.postForm.value;
      console.log('Saving post:', formData);

      // In a real app, save to API
      this.router.navigate(['/posts']);
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}