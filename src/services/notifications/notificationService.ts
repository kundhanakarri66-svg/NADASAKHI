/**
 * NotificationService
 * Architecture wrapper for Browser Notifications and Vibration API
 * Crucial for haptic / accessible alerts for users with hearing loss
 */

export interface AppNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  vibratePattern?: number[];
  tag?: string;
}

export interface INotificationService {
  requestPermission(): Promise<NotificationPermission>;
  sendAlert(payload: AppNotificationPayload): boolean;
  triggerVibration(pattern?: number[]): boolean;
  triggerVisualFlash(): void;
}

class NotificationServiceImpl implements INotificationService {
  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }
    return await Notification.requestPermission();
  }

  sendAlert(payload: AppNotificationPayload): boolean {
    // 1. Vibration feedback (accessible for hearing loss)
    if (payload.vibratePattern) {
      this.triggerVibration(payload.vibratePattern);
    } else {
      this.triggerVibration([200, 100, 200]);
    }

    // 2. Desktop notification
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(payload.title, {
          body: payload.body,
          icon: payload.icon || '/favicon.ico',
          tag: payload.tag
        });
        return true;
      } catch (e) {
        console.warn('[NotificationService] Failed to display notification:', e);
      }
    }
    return false;
  }

  triggerVibration(pattern: number[] = [200, 100, 200]): boolean {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        return navigator.vibrate(pattern);
      } catch {
        return false;
      }
    }
    return false;
  }

  triggerVisualFlash(): void {
    if (typeof document === 'undefined') return;
    const flashEl = document.createElement('div');
    flashEl.className = 'fixed inset-0 bg-amber-400/30 pointer-events-none z-50 transition-opacity duration-300';
    document.body.appendChild(flashEl);
    setTimeout(() => {
      flashEl.style.opacity = '0';
      setTimeout(() => flashEl.remove(), 300);
    }, 150);
  }
}

export const notificationService = new NotificationServiceImpl();
