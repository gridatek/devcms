import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Helper methods for common operations
  async query(table: string) {
    return this.supabase.from(table);
  }

  async insert(table: string, data: any) {
    return this.supabase.from(table).insert(data);
  }

  async update(table: string, id: string, data: any) {
    return this.supabase.from(table).update(data).eq('id', id);
  }

  async delete(table: string, id: string) {
    return this.supabase.from(table).delete().eq('id', id);
  }

  async upload(bucket: string, path: string, file: File) {
    return this.supabase.storage.from(bucket).upload(path, file);
  }

  getPublicUrl(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).getPublicUrl(path);
  }
}