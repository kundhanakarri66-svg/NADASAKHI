import React from 'react';
import {
  Home,
  Volume2,
  Hand,
  Languages,
  Mic,
  Repeat,
  Bell,
  Settings,
  Shield,
  X
} from 'lucide-react';
import { NavigationItem } from './NavigationItem.tsx';
import { useAlerts } from '../../hooks/useAlerts.ts';

export interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onMobileClose
}) => {
  const { unreadCount } = useAlerts();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/sound-guardian', label: 'Sound Guardian', icon: Volume2 },
    { to: '/sign-to-text', label: 'Sign-to-Text', icon: Hand },
    { to: '/text-to-sign', label: 'Text-to-Sign', icon: Languages },
    { to: '/speech-to-text', label: 'Speech-to-Text', icon: Mic },
    { to: '/communication', label: 'Communication', icon: Repeat },
    {
      to: '/alerts',
      label: 'Alerts',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <Shield className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">
              NĀDASAKHI
            </h1>
            <p className="text-[11px] font-medium text-teal-800 mt-1">
              Smart Accessibility Platform
            </p>
          </div>
        </div>

        {mobileOpen && (
          <button
            onClick={onMobileClose}
            aria-label="Close navigation sidebar"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav aria-label="Main Navigation" className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          Main Menu
        </div>
        {navItems.map((item) => (
          <NavigationItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
            onClick={onMobileClose}
          />
        ))}
      </nav>

      {/* System Status Footnote */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-medium text-slate-700">Platform Online</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
          Step 1 Foundation active. Multi-modal AI engine ready for Step 2.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
