import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock, Radio } from 'lucide-react';

export type SystemStatusType = 'ready' | 'active' | 'warning' | 'error' | 'idle' | 'not_started';

export interface StatusIndicatorProps {
  status: SystemStatusType;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showIcon = true,
  className = ''
}) => {
  const configs: Record<
    SystemStatusType,
    { text: string; bg: string; textClass: string; border: string; icon: React.ReactNode }
  > = {
    ready: {
      text: 'Ready',
      bg: 'bg-emerald-50',
      textClass: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
    },
    active: {
      text: 'Active',
      bg: 'bg-teal-50',
      textClass: 'text-teal-700',
      border: 'border-teal-200',
      icon: <Radio className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
    },
    warning: {
      text: 'Attention',
      bg: 'bg-amber-50',
      textClass: 'text-amber-800',
      border: 'border-amber-200',
      icon: <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
    },
    error: {
      text: 'Disconnected',
      bg: 'bg-rose-50',
      textClass: 'text-rose-700',
      border: 'border-rose-200',
      icon: <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
    },
    idle: {
      text: 'Standby',
      bg: 'bg-slate-100',
      textClass: 'text-slate-700',
      border: 'border-slate-200',
      icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />
    },
    not_started: {
      text: 'Not Started',
      bg: 'bg-slate-100',
      textClass: 'text-slate-600',
      border: 'border-slate-200',
      icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />
    }
  };

  const config = configs[status] || configs.idle;
  const displayText = label || config.text;

  return (
    <div
      role="status"
      aria-label={`Status: ${displayText}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${config.bg} ${config.textClass} ${config.border} ${className}`}
    >
      {showIcon && config.icon}
      <span>{displayText}</span>
    </div>
  );
};
