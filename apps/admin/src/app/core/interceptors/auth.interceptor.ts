import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.getCurrentUser();

  if (user && req.url.includes('supabase')) {
    // Add authorization header for Supabase requests
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.id}` // This would be the actual token in real implementation
      }
    });
    return next(authReq);
  }

  return next(req);
};