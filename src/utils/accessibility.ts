/**
 * Accessibility helper functions
 */

export function triggerHapticFeedback(pattern: number[] = [100, 50, 100]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration failures if unsupported or blocked
    }
  }
}

export function announceToScreenReader(message: string): void {
  if (typeof document === 'undefined') return;

  let announcer = document.getElementById('a11y-live-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'a11y-live-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }

  announcer.textContent = '';
  setTimeout(() => {
    if (announcer) announcer.textContent = message;
  }, 50);
}
