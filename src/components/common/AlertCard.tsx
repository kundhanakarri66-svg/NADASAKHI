import React from 'react';
import { Alert } from '../../types/alerts.ts';
import { getSeverityStyles } from '../../utils/formatters.ts';
import { Bell, AlertTriangle, ShieldAlert, Check, Trash2, Volume2 } from 'lucide-react';

export interface AlertCardProps {
  alert: Alert;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onMarkAsRead,
  onDelete
}) => {
  const styles = getSeverityStyles(alert.severity);

  const getIcon = () => {
    switch (alert.severity) {
      case 'critical':
        return <ShieldAlert className="w-5 h-5 text-red-600" aria-hidden="true" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-amber-600" aria-hidden="true" />;
      default:
        return <Bell className="w-5 h-5 text-teal-600" aria-hidden="true" />;
    }
  };

  return (
    <article
      aria-label={`Alert: ${alert.title}, Severity: ${alert.severity}`}
      className={`bg-white rounded-lg p-4 transition-all duration-150 border ${styles.borderClass} ${
        !alert.read ? 'bg-white shadow-sm' : 'bg-slate-50/70 opacity-90'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5 p-2 bg-slate-100 rounded-lg shrink-0">
            {getIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${styles.badgeBg}`}
              >
                {styles.badgeText}
              </span>
              {!alert.read && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                  NEW
                </span>
              )}
              <span className="text-xs text-slate-600 font-mono tabular-nums">
                {alert.relativeTime}
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-900 truncate">
              {alert.title}
            </h3>
            <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
              {alert.description}
            </p>

            {alert.actionRecommended && (
              <div className="mt-2 text-xs font-medium text-teal-900 bg-teal-50/70 p-2 rounded-md border border-teal-100/70">
                <span className="font-semibold text-teal-800">Suggested Action:</span>{' '}
                {alert.actionRecommended}
              </div>
            )}

            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              {alert.soundType && (
                <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                  <Volume2 className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  {alert.soundType}
                </span>
              )}
              {alert.confidenceScore !== undefined && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {Math.round(alert.confidenceScore * 100)}% confidence
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="text-slate-600 truncate">{alert.source}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {!alert.read && onMarkAsRead && (
            <button
              onClick={() => onMarkAsRead(alert.id)}
              title="Mark as read"
              aria-label={`Mark ${alert.title} as read`}
              className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(alert.id)}
              title="Delete alert"
              aria-label={`Delete alert: ${alert.title}`}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
