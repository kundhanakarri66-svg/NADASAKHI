import React from 'react';
import { Menu, Bell, ShieldAlert, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAlerts } from '../../hooks/useAlerts.ts';
import { useAccessibility } from '../../hooks/useAccessibility.tsx';

export interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const { unreadCount } = useAlerts();
  const { settings, updateSetting } = useAccessibility();

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Overview';
      case '/sound-guardian':
        return 'Environmental Sound Guardian';
      case '/sign-to-text':
        return 'Sign-to-Text Recognition';
      case '/text-to-sign':
        return 'Text-to-Sign Translation';
      case '/speech-to-text':
        return 'Speech-to-Text Transcription';
      case '/communication':
        return 'Two-Way Communication';
      case '/alerts':
        return 'Alerts & History';
      case '/settings':
        return 'Accessibility Settings';
      default:
        return 'Platform';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Current Page */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-teal-600"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link
              to="/dashboard"
              className="text-slate-600 hover:text-slate-800 transition-colors font-medium hidden sm:inline"
            >
              NĀDASAKHI
            </Link>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">
              /
            </span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">
              {getBreadcrumb()}
            </span>
          </nav>
        </div>

        {/* Right: Accessibility Quick Toggles & Notification Bell */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick High-Contrast Toggle */}
          <button
            onClick={() => updateSetting('highContrast', !settings.highContrast)}
            title={settings.highContrast ? 'Disable high contrast' : 'Enable high contrast'}
            aria-label="Toggle High Contrast Mode"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              settings.highContrast
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>High Contrast</span>
          </button>

          {/* Quick Large Text Toggle */}
          <button
            onClick={() => updateSetting('largeText', !settings.largeText)}
            title={settings.largeText ? 'Reset text size' : 'Increase text size'}
            aria-label="Toggle Large Text Mode"
            className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              settings.largeText
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="font-bold text-xs">A+</span>
            <span>Large Text</span>
          </button>

          {/* Environmental Guardian Quick Status */}
          <Link
            to="/sound-guardian"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title="Sound Guardian Status: Ready"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="hidden sm:inline">Guardian</span>
            <span>Ready</span>
          </Link>

          {/* Alerts Shortcut */}
          <Link
            to="/alerts"
            aria-label={`View alerts (${unreadCount} unread)`}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-teal-600"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold font-mono">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Emergency SOS button */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const el = document.getElementById('a11y-live-announcer');
                if (el) el.textContent = 'Emergency assistance alert triggered.';
              }
              alert('Emergency Assistance Simulation: Caregivers and local sound alerts notified.');
            }}
            title="Trigger Emergency Alert"
            aria-label="Emergency SOS Alert"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" aria-hidden="true" />
            <span className="hidden sm:inline">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
