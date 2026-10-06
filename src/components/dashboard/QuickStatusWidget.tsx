import React from 'react';
import { StatusIndicator, SystemStatusType } from '../common/StatusIndicator.tsx';
import { LucideIcon } from 'lucide-react';

export interface QuickStatusWidgetProps {
  title: string;
  subtitle: string;
  status: SystemStatusType;
  statusLabel?: string;
  icon: LucideIcon;
}

export const QuickStatusWidget: React.FC<QuickStatusWidgetProps> = ({
  title,
  subtitle,
  status,
  statusLabel,
  icon: Icon
}) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">{title}</span>
        <Icon className="w-4 h-4 text-slate-400" aria-hidden="true" />
      </div>
      <StatusIndicator status={status} label={statusLabel} />
      <p className="text-[11px] text-slate-600 mt-2">{subtitle}</p>
    </div>
  );
};
