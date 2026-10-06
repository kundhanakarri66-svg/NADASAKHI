import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Eye,
  Sliders,
  Bell,
  Smartphone,
  Globe,
  Languages,
  Palette,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Card } from '../components/common/Card.tsx';
import { Toggle } from '../components/common/Toggle.tsx';
import { Button } from '../components/common/Button.tsx';
import { useAccessibility } from '../hooks/useAccessibility.tsx';
import { notificationService } from '../services/notifications/notificationService.ts';

export const Settings: React.FC = () => {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const [saveBanner, setSaveBanner] = useState(false);

  const handleTestVibration = () => {
    notificationService.triggerVibration([250, 100, 250, 100, 400]);
    notificationService.triggerVisualFlash();
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2500);
  };

  const handleTestNotification = async () => {
    const perm = await notificationService.requestPermission();
    if (perm === 'granted') {
      notificationService.sendAlert({
        title: 'NĀDASAKHI Notification Test',
        body: 'Alert delivery and tactile vibration are functioning properly.'
      });
    }
    notificationService.triggerVisualFlash();
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Preferences & Adjustments"
        title="Accessibility Settings"
        description="Fine-tune visual contrast, haptic feedback sensations, auditory sensitivity thresholds, and language preferences."
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={resetSettings}
          >
            Reset to Defaults
          </Button>
        }
      />

      {saveBanner && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Feedback pulse and visual flash triggered successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Visual Accessibility */}
        <Card
          title="Visual Accessibility"
          subtitle="Display adjustments for optimal readability and focus"
        >
          <div className="divide-y divide-slate-100">
            <Toggle
              id="large-text-toggle"
              label="Large Text Mode (A+)"
              description="Increases base typography sizing by 15% across headings, captions, and conversation feeds."
              checked={settings.largeText}
              onChange={(val) => updateSetting('largeText', val)}
            />

            <Toggle
              id="high-contrast-toggle"
              label="High Contrast Mode"
              description="Enhances border weight and intensifies contrast ratios to exceed WCAG AAA standards."
              checked={settings.highContrast}
              onChange={(val) => updateSetting('highContrast', val)}
            />

            <Toggle
              id="reduced-motion-toggle"
              label="Reduced Motion"
              description="Suppresses transitions, pulses, and UI transforms for vestibular safety."
              checked={settings.reducedMotion}
              onChange={(val) => updateSetting('reducedMotion', val)}
            />

            <Toggle
              id="visual-flash-toggle"
              label="Visual Flash on Urgent Sound"
              description="Briefly illuminates screen borders when critical alarms (fire, vehicle horns) are detected."
              checked={settings.visualFlashAlerts}
              onChange={(val) => updateSetting('visualFlashAlerts', val)}
            />
          </div>
        </Card>

        {/* Section 2: Sensory Alerts & Haptics */}
        <Card
          title="Haptics & Sensory Alerts"
          subtitle="Tactile feedback for users with profound hearing loss"
        >
          <div className="divide-y divide-slate-100">
            <Toggle
              id="vibration-toggle"
              label="Vibration Feedback"
              description="Triggers distinctive motor vibration pulses on mobile devices upon sound detection."
              checked={settings.vibrationAlerts}
              onChange={(val) => updateSetting('vibrationAlerts', val)}
            />

            <Toggle
              id="notifications-toggle"
              label="System & Browser Notifications"
              description="Dispatches system-level push popups even if the application tab is in the background."
              checked={settings.browserNotifications}
              onChange={(val) => updateSetting('browserNotifications', val)}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<Smartphone className="w-4 h-4" />}
              onClick={handleTestVibration}
            >
              Test Haptic Vibration
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Bell className="w-4 h-4" />}
              onClick={handleTestNotification}
            >
              Test Notification
            </Button>
          </div>
        </Card>

        {/* Section 3: Sound Guardian Sensitivity */}
        <Card
          title="Sound Guardian Sensitivity"
          subtitle="Acoustic detection threshold configuration"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Acoustic Alert Sensitivity Level
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['low', 'medium', 'high'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateSetting('soundAlertSensitivity', lvl)}
                    className={`p-3 rounded-lg border font-medium text-center capitalize transition-colors cursor-pointer ${
                      settings.soundAlertSensitivity === lvl
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold">{lvl}</span>
                    <span className="text-[10px] opacity-80">
                      {lvl === 'low' ? 'Only loud sounds (>80dB)' : lvl === 'medium' ? 'Standard (>60dB)' : 'High sensitivity (>40dB)'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              In quiet domestic environments, set to <strong>High</strong> to catch soft door chimes. In busy outdoor or transit stations, set to <strong>Low</strong> to prevent horn fatigue.
            </p>
          </div>
        </Card>

        {/* Section 4: Language & Regional Dialects */}
        <Card
          title="Language & Regional Settings"
          subtitle="Preferred sign language dialect and interface language"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label htmlFor="sign-dialect" className="font-semibold text-slate-700 block mb-1.5">
                Sign Language Standard
              </label>
              <select
                id="sign-dialect"
                value={settings.preferredSignLanguage}
                onChange={(e) => updateSetting('preferredSignLanguage', e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-teal-700"
              >
                <option value="ISL">Indian Sign Language (ISL)</option>
                <option value="ASL">American Sign Language (ASL)</option>
                <option value="BSL">British Sign Language (BSL)</option>
              </select>
            </div>

            <div>
              <label htmlFor="ui-lang" className="font-semibold text-slate-700 block mb-1.5">
                Spoken & Caption Language
              </label>
              <select
                id="ui-lang"
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-teal-700"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            <div>
              <label htmlFor="app-theme" className="font-semibold text-slate-700 block mb-1.5">
                Application Theme
              </label>
              <select
                id="app-theme"
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-teal-700"
              >
                <option value="light">Light (Calm Accessible Slate)</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
