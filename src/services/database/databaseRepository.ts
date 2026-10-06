/**
 * DatabaseRepository
 * Abstraction layer compatible with Supabase / Firebase / Cloud Firestore
 * Provides clean CRUD interface without hardcoding external dependencies in Step 1.
 */

import { Alert } from '../../types/alerts.ts';
import { CommunicationMessage } from '../../types/communication.ts';
import { AccessibilitySettings } from '../../types/settings.ts';
import { mockAlerts } from '../../data/mockAlerts.ts';
import { mockMessages } from '../../data/mockMessages.ts';

export interface IDatabaseRepository {
  // Alerts
  getAlerts(): Promise<Alert[]>;
  saveAlert(alert: Alert): Promise<Alert>;
  markAlertAsRead(id: string): Promise<boolean>;
  deleteAlert(id: string): Promise<boolean>;

  // Messages / Communication
  getMessages(): Promise<CommunicationMessage[]>;
  sendMessage(msg: Omit<CommunicationMessage, 'id' | 'timestamp' | 'relativeTime'>): Promise<CommunicationMessage>;

  // Settings
  getSettings(): Promise<AccessibilitySettings>;
  updateSettings(settings: Partial<AccessibilitySettings>): Promise<AccessibilitySettings>;
}

class InMemoryDatabaseRepository implements IDatabaseRepository {
  private alerts: Alert[] = [...mockAlerts];
  private messages: CommunicationMessage[] = [...mockMessages];
  private settings: AccessibilitySettings = {
    largeText: false,
    highContrast: false,
    reducedMotion: false,
    vibrationAlerts: true,
    browserNotifications: true,
    visualFlashAlerts: true,
    soundAlertSensitivity: 'medium',
    preferredSignLanguage: 'ISL',
    language: 'en',
    theme: 'light'
  };

  async getAlerts(): Promise<Alert[]> {
    return [...this.alerts];
  }

  async saveAlert(alert: Alert): Promise<Alert> {
    this.alerts.unshift(alert);
    return alert;
  }

  async markAlertAsRead(id: string): Promise<boolean> {
    const alert = this.alerts.find((a) => a.id === id);
    if (alert) {
      alert.read = true;
      return true;
    }
    return false;
  }

  async deleteAlert(id: string): Promise<boolean> {
    const initialLen = this.alerts.length;
    this.alerts = this.alerts.filter((a) => a.id !== id);
    return this.alerts.length < initialLen;
  }

  async getMessages(): Promise<CommunicationMessage[]> {
    return [...this.messages];
  }

  async sendMessage(msg: Omit<CommunicationMessage, 'id' | 'timestamp' | 'relativeTime'>): Promise<CommunicationMessage> {
    const newMsg: CommunicationMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now'
    };
    this.messages.push(newMsg);
    return newMsg;
  }

  async getSettings(): Promise<AccessibilitySettings> {
    return { ...this.settings };
  }

  async updateSettings(updated: Partial<AccessibilitySettings>): Promise<AccessibilitySettings> {
    this.settings = { ...this.settings, ...updated };
    return { ...this.settings };
  }
}

export const databaseRepository: IDatabaseRepository = new InMemoryDatabaseRepository();
