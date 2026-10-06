import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  AlertTriangle,
  Bell,
  Flame,
  Coffee,
  HeartPulse,
  Activity,
  Sliders,
  ShieldAlert,
  Info
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';
import { StatusIndicator } from '../components/common/StatusIndicator.tsx';
import { mockSoundDetections } from '../data/mockSoundDetections.ts';
import { SoundDetection } from '../types/sound.ts';
import { formatConfidence } from '../utils/formatters.ts';

export const SoundGuardian: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [sensitivity, setSensitivity] = useState(65);
  const [detections, setDetections] = useState<SoundDetection[]>(mockSoundDetections);

  const toggleMonitoring = () => {
    setIsMonitoring((prev) => !prev);
  };

  const getSoundIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bell':
        return <Bell className="w-4 h-4 text-teal-600" aria-hidden="true" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 text-amber-600" aria-hidden="true" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-red-600" aria-hidden="true" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-slate-600" aria-hidden="true" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4 text-rose-600" aria-hidden="true" />;
      default:
        return <Volume2 className="w-4 h-4 text-teal-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Environmental Awareness"
        title="Sound Guardian"
        description="Environmental sound awareness for everyday safety. Identifies critical ambient acoustic events such as alarms, doorbells, crying, and horns."
        actions={
          <Button
            variant={isMonitoring ? 'danger' : 'primary'}
            size="md"
            icon={isMonitoring ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            onClick={toggleMonitoring}
          >
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
        }
      />

      {/* Step 1 Architecture Notice */}
      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <strong className="font-semibold text-teal-950">Step 1 Architecture Preview:</strong>{' '}
          Acoustic service interfaces and audio capture abstractions are structured. Real-time TensorFlow.js audio models and browser Web Audio API classifications will connect in Step 2.
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Microphone Status */}
        <Card title="Microphone Status" subtitle="Audio capture pipeline">
          <div className="flex items-center justify-between">
            <div>
              <StatusIndicator
                status={isMonitoring ? 'active' : 'idle'}
                label={isMonitoring ? 'Listening (Active)' : 'Standby (Paused)'}
              />
              <p className="text-xs text-slate-500 mt-2">
                {isMonitoring
                  ? 'Analyzing acoustic frequency spectrum'
                  : 'Click Start Monitoring to listen'}
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                isMonitoring ? 'bg-teal-100 text-teal-700 animate-pulse' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Mic className="w-6 h-6" />
            </div>
          </div>

          {/* Decibel Level Meter Bar */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Ambient Acoustic Energy</span>
              <span className="font-mono tabular-nums font-semibold">
                {isMonitoring ? '48 dB' : '0 dB'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isMonitoring ? 'w-[48%] bg-teal-600' : 'w-0'
                }`}
              />
            </div>
          </div>
        </Card>

        {/* Card 2: Detection Sensitivity */}
        <Card title="Detection Sensitivity" subtitle="Adjust threshold for background noise">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
                Trigger Threshold
              </span>
              <span className="font-mono font-bold text-teal-800 tabular-nums">
                {sensitivity}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
              aria-label="Detection Sensitivity Level"
            />
            <p className="text-[11px] text-slate-500">
              Higher sensitivity triggers alerts for softer sounds like knocks and kettle whistles.
            </p>
          </div>
        </Card>

        {/* Card 3: Safety Guard Alert Modes */}
        <Card title="Sensory Output" subtitle="Feedback channels for hearing loss">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
              <span className="text-slate-700 font-medium">Haptic Vibration</span>
              <span className="text-emerald-700 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
              <span className="text-slate-700 font-medium">Visual Strobe / Flash</span>
              <span className="text-emerald-700 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-slate-700 font-medium">Caregiver Dispatch</span>
              <span className="text-slate-500 font-semibold">Configured</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Recent Detections */}
      <section aria-labelledby="detections-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id="detections-heading" className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Detected Sounds
            </h2>
            <p className="text-xs text-slate-500">Acoustic fingerprint log with classification confidence</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDetections([])}
            disabled={detections.length === 0}
          >
            Clear Log
          </Button>
        </div>

        {detections.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Activity className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-800">No sounds recorded yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Environmental sound recognition will monitor your acoustic surroundings once started.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {detections.map((detection) => (
              <div
                key={detection.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2.5 rounded-lg shrink-0 ${
                      detection.isUrgent
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {getSoundIcon(detection.iconName)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 truncate">
                        {detection.label}
                      </span>
                      {detection.isUrgent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                          URGENT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <span className="capitalize">{detection.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{detection.decibels} dB</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {formatConfidence(detection.confidence)} confidence
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-slate-600 tabular-nums">
                    {detection.relativeTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
