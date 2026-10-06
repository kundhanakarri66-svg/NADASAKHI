import React from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  Hand,
  Languages,
  Mic,
  Repeat,
  Bell,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  Clock,
  Camera,
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';
import { StatusIndicator } from '../components/common/StatusIndicator.tsx';
import { AlertCard } from '../components/common/AlertCard.tsx';
import { useAlerts } from '../hooks/useAlerts.ts';
import { mockMessages } from '../data/mockMessages.ts';

export const Dashboard: React.FC = () => {
  const { alerts, markAsRead } = useAlerts();
  const recentAlerts = alerts.slice(0, 3);
  const recentMessages = mockMessages.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* 1. Welcome Hero Banner */}
      <section
        aria-labelledby="welcome-heading"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-sm"
      >
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/60 border border-teal-500/30 text-teal-100 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Smart Accessibility Companion</span>
          </div>
          <h1 id="welcome-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            NĀDASAKHI
          </h1>
          <p className="mt-2 text-base sm:text-lg text-teal-100 font-medium leading-relaxed">
            Your intelligent accessibility companion.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-teal-200/90 leading-relaxed">
            Connecting individuals with hearing loss to both the people around them and the sounds around them by bridging environmental sound awareness with two-way sign-language communication.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/sound-guardian">
              <Button
                variant="primary"
                size="md"
                className="bg-white text-teal-900 hover:bg-teal-50 border-white font-semibold"
                icon={<Volume2 className="w-4 h-4 text-teal-800" />}
              >
                Start Sound Guardian
              </Button>
            </Link>
            <Link to="/communication">
              <Button
                variant="outline"
                size="md"
                className="bg-teal-800/80 text-white border-teal-600/60 hover:bg-teal-700/80"
                icon={<Repeat className="w-4 h-4 text-teal-200" />}
              >
                Two-Way Chat
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative subtle ambient illustration */}
        <div
          className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-teal-500/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* 2. Quick Action Cards */}
      <section aria-labelledby="quick-actions-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="quick-actions-heading" className="text-lg font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h2>
          <span className="text-xs text-slate-500">Core Accessibility Modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Sound Guardian */}
          <Link
            to="/sound-guardian"
            className="group p-5 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-teal-400 transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <Volume2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                Sound Guardian
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Monitor important environmental sounds in real-time.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Open Guardian</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Sign-to-Text */}
          <Link
            to="/sign-to-text"
            className="group p-5 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-teal-400 transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <Hand className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                Sign-to-Text
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Convert recognized signs into readable text.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Open Camera</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Text-to-Sign */}
          <Link
            to="/text-to-sign"
            className="group p-5 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-teal-400 transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <Languages className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                Text-to-Sign
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Convert written text into sign communication guidance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Translate Text</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Speech-to-Text */}
          <Link
            to="/speech-to-text"
            className="group p-5 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-teal-400 transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <Mic className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                Speech-to-Text
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Convert spoken communication into live captions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Listen Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. System Status Section */}
      <section aria-labelledby="status-heading">
        <h2 id="status-heading" className="text-lg font-bold text-slate-900 tracking-tight mb-4">
          Hardware & Sensor Status
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Sound Guardian</span>
              <Volume2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            </div>
            <StatusIndicator status="ready" label="Ready" />
            <p className="text-[11px] text-slate-600 mt-2">Acoustic monitor initialized</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Camera</span>
              <Camera className="w-4 h-4 text-slate-400" aria-hidden="true" />
            </div>
            <StatusIndicator status="not_started" label="Not Started" />
            <p className="text-[11px] text-slate-600 mt-2">Awaiting gesture capture</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Speech Recognition</span>
              <Mic className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            </div>
            <StatusIndicator status="ready" label="Ready" />
            <p className="text-[11px] text-slate-600 mt-2">Speech engine standby</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Notifications & Haptics</span>
              <Bell className="w-4 h-4 text-teal-600" aria-hidden="true" />
            </div>
            <StatusIndicator status="ready" label="Available" />
            <p className="text-[11px] text-slate-600 mt-2">Vibration & visual alerts on</p>
          </div>
        </div>
      </section>

      {/* 4. Split Grid: Recent Alerts & Recent Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Alerts */}
        <section aria-labelledby="recent-alerts-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="recent-alerts-heading" className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Alerts
              </h2>
              <p className="text-xs text-slate-500">Auditory events detected in your environment</p>
            </div>
            <Link
              to="/alerts"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        </section>

        {/* Recent Communication */}
        <section aria-labelledby="recent-communication-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="recent-communication-heading" className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Communication
              </h2>
              <p className="text-xs text-slate-500">Transcriptions & sign exchanges</p>
            </div>
            <Link
              to="/communication"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>Open Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="divide-y divide-slate-100">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">
                    {msg.senderName}
                  </span>
                  <span className="text-slate-600 font-mono tabular-nums">
                    {msg.relativeTime}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{msg.text}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-600">
                  <span className="capitalize">{msg.modality.replace('_', ' ')}</span>
                  {msg.signGloss && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-teal-700 font-semibold">
                        [{msg.signGloss}]
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </div>
  );
};
