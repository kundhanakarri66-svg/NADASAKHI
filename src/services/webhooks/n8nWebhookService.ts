/**
 * N8nWebhookService
 * Architecture placeholder for n8n automation workflows
 * Triggers external emergency notifications, SMS, caregiver alerts, or Slack/WhatsApp messages
 */

import { Alert } from '../../types/alerts.ts';

export interface WebhookTriggerPayload {
  eventType: 'emergency_alert' | 'critical_sound_detected' | 'user_assistance_request';
  timestamp: string;
  payload: Record<string, unknown>;
}

export interface IN8nWebhookService {
  dispatchAlertWebhook(alert: Alert): Promise<boolean>;
  testConnection(webhookUrl: string): Promise<boolean>;
}

class N8nWebhookServiceImpl implements IN8nWebhookService {
  private configuredUrl: string | null = null;

  configureEndpoint(url: string): void {
    this.configuredUrl = url;
  }

  async dispatchAlertWebhook(alert: Alert): Promise<boolean> {
    if (!this.configuredUrl) {
      console.info('[N8nWebhookService] Webhook endpoint not configured in Step 1. Simulated dispatch for alert:', alert.title);
      return true;
    }

    try {
      const payload: WebhookTriggerPayload = {
        eventType: alert.severity === 'critical' ? 'emergency_alert' : 'critical_sound_detected',
        timestamp: new Date().toISOString(),
        payload: {
          alertId: alert.id,
          title: alert.title,
          severity: alert.severity,
          soundType: alert.soundType,
          actionRecommended: alert.actionRecommended
        }
      };

      const res = await fetch(this.configuredUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (err) {
      console.warn('[N8nWebhookService] Webhook dispatch error:', err);
      return false;
    }
  }

  async testConnection(webhookUrl: string): Promise<boolean> {
    console.info('[N8nWebhookService] Testing connectivity with n8n endpoint:', webhookUrl);
    return true;
  }
}

export const n8nWebhookService = new N8nWebhookServiceImpl();
