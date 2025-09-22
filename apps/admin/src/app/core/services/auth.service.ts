import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: string;
  email: string;
  profile?: {
    first_name?: string;
    last_name?: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public currentUser$ = this.currentUserSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  // Signals for modern Angular
  public isAuthenticated = signal<boolean>(false);
  public currentUser = signal<AuthUser | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async initialize(): Promise<void> {
    try {
      // Get initial session
      const { data: { session } } = await this.supabase.auth.getSession();
      if (session?.user) {
        await this.setUser(session.user);
      }

      // Listen for auth changes
      this.supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await this.setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          this.clearUser();
        }
      });

    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.loadingSubject.next(true);

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await this.setUser(data.user);
        await this.router.navigate(['/dashboard']);
        return { success: true };
      }

      return { success: false, error: 'Unknown error occurred' };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.supabase.auth.signOut();
      this.clearUser();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  private async setUser(user: User): Promise<void> {
    try {
      // Get user profile
      const { data: profile } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const authUser: AuthUser = {
        id: user.id,
        email: user.email!,
        profile: profile || undefined
      };

      this.currentUser.set(authUser);
      this.isAuthenticated.set(true);
      this.currentUserSubject.next(authUser);

    } catch (error) {
      console.error('Error setting user:', error);

      // Fallback to basic user info
      const authUser: AuthUser = {
        id: user.id,
        email: user.email!
      };

      this.currentUser.set(authUser);
      this.isAuthenticated.set(true);
      this.currentUserSubject.next(authUser);
    }
  }

  private clearUser(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.profile?.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isEditor(): boolean {
    return this.hasRole('editor') || this.isAdmin();
  }
}