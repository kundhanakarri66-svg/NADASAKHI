export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type AlertCategory =
  | 'environmental_sound'
  | 'emergency'
  | 'communication'
  | 'system';

export interface Alert {
  id: string;
  title: string;
  description: string;
  category: AlertCategory;
  severity: AlertSeverity;
  timestamp: string; // ISO 8601 string
  relativeTime: string;
  source: string;
  read: boolean;
  soundType?: string;
  confidenceScore?: number; // 0 to 1
  actionRecommended?: string;
}

export interface AlertFilterOptions {
  severity?: AlertSeverity | 'all';
  category?: AlertCategory | 'all';
  readStatus?: 'all' | 'unread' | 'read';
  searchQuery?: string;
}
