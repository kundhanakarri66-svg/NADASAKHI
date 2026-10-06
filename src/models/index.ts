/**
 * Domain Models & Factory Helpers for NĀDASAKHI
 */

import { Alert, AlertCategory, AlertSeverity } from '../types/alerts.ts';
import { SoundDetection } from '../types/sound.ts';
import { CommunicationMessage } from '../types/communication.ts';

export class AlertModel {
  static create(params: {
    title: string;
    description: string;
    category?: AlertCategory;
    severity?: AlertSeverity;
    source?: string;
    soundType?: string;
    confidenceScore?: number;
    actionRecommended?: string;
  }): Alert {
    return {
      id: `alt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: params.title,
      description: params.description,
      category: params.category || 'environmental_sound',
      severity: params.severity || 'medium',
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now',
      source: params.source || 'Sound Guardian',
      read: false,
      soundType: params.soundType,
      confidenceScore: params.confidenceScore,
      actionRecommended: params.actionRecommended
    };
  }
}

export class SoundDetectionModel {
  static create(params: Partial<SoundDetection> & { label: string }): SoundDetection {
    return {
      id: `snd-${Date.now()}`,
      label: params.label,
      category: params.category || 'household',
      confidence: params.confidence ?? 0.85,
      decibels: params.decibels ?? 65,
      detectedAt: new Date().toISOString(),
      relativeTime: 'Just now',
      isUrgent: params.isUrgent ?? false,
      iconName: params.iconName || 'Volume2'
    };
  }
}
