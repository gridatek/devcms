import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private autoRemoveTimeouts = new Map<string, any>();

  show(notification: Omit<Notification, 'id'>): void {
    const id = this.generateId();
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, newNotification]);

    // Auto remove after duration
    if (newNotification.duration > 0) {
      const timeout = setTimeout(() => {
        this.removeNotification(id);
      }, newNotification.duration);

      this.autoRemoveTimeouts.set(id, timeout);
    }
  }

  success(message: string, duration?: number): void {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration?: number): void {
    this.show({ type: 'error', message, duration: duration || 7000 });
  }

  warning(message: string, duration?: number): void {
    this.show({ type: 'warning', message, duration });
  }

  info(message: string, duration?: number): void {
    this.show({ type: 'info', message, duration });
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);

    // Clear timeout if exists
    const timeout = this.autoRemoveTimeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.autoRemoveTimeouts.delete(id);
    }
  }

  clear(): void {
    this.notificationsSubject.next([]);
    // Clear all timeouts
    this.autoRemoveTimeouts.forEach(timeout => clearTimeout(timeout));
    this.autoRemoveTimeouts.clear();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}