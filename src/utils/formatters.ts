/**
 * Utility string and date formatting helpers
 */

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return dateString;
  }
}

export function formatConfidence(score?: number): string {
  if (score === undefined || isNaN(score)) return 'N/A';
  return `${Math.round(score * 100)}%`;
}

export function getSeverityStyles(severity: 'critical' | 'high' | 'medium' | 'low' | 'info'): {
  borderClass: string;
  badgeBg: string;
  badgeText: string;
  accentBg: string;
} {
  switch (severity) {
    case 'critical':
      return {
        borderClass: 'border-l-4 border-l-red-600 border-slate-200',
        badgeBg: 'bg-red-50 text-red-700 border-red-200',
        badgeText: 'Critical Alert',
        accentBg: 'bg-red-500'
      };
    case 'high':
      return {
        borderClass: 'border-l-4 border-l-amber-500 border-slate-200',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        badgeText: 'High Priority',
        accentBg: 'bg-amber-500'
      };
    case 'medium':
      return {
        borderClass: 'border-l-4 border-l-teal-600 border-slate-200',
        badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
        badgeText: 'Notice',
        accentBg: 'bg-teal-600'
      };
    case 'low':
    case 'info':
    default:
      return {
        borderClass: 'border-l-4 border-l-slate-400 border-slate-200',
        badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
        badgeText: 'Info',
        accentBg: 'bg-slate-500'
      };
  }
}
