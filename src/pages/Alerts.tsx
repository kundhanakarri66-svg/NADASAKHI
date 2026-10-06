import React from 'react';
import {
  Bell,
  CheckCheck,
  Filter,
  Search,
  ShieldAlert,
  Volume2,
  Trash2,
  Info
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Button } from '../components/common/Button.tsx';
import { AlertCard } from '../components/common/AlertCard.tsx';
import { EmptyState } from '../components/common/EmptyState.tsx';
import { useAlerts } from '../hooks/useAlerts.ts';
import { AlertSeverity } from '../types/alerts.ts';

export const Alerts: React.FC = () => {
  const {
    alerts,
    allAlerts,
    unreadCount,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteAlert
  } = useAlerts();

  const handleSeverityFilter = (severity: AlertSeverity | 'all') => {
    setFilter((prev) => ({ ...prev, severity }));
  };

  const handleReadStatusFilter = (readStatus: 'all' | 'unread' | 'read') => {
    setFilter((prev) => ({ ...prev, readStatus }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Sensory Security"
        title="Alert & Event History"
        description="Comprehensive audit log of acoustic occurrences, environmental notifications, and safety alarms detected by Sound Guardian."
        actions={
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="secondary"
                size="md"
                icon={<CheckCheck className="w-4 h-4" />}
                onClick={markAllAsRead}
              >
                Mark All Read
              </Button>
            )}
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alert title or source..."
              value={filter.searchQuery || ''}
              onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-teal-700 focus:border-teal-700"
            />
          </div>

          {/* Read Status Filter buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
            <button
              onClick={() => handleReadStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filter.readStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({allAlerts.length})
            </button>
            <button
              onClick={() => handleReadStatusFilter('unread')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filter.readStatus === 'unread'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => handleReadStatusFilter('read')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filter.readStatus === 'read'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Severity Badges Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium">Filter Severity:</span>
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => handleSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer capitalize ${
                filter.severity === sev
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onMarkAsRead={markAsRead}
              onDelete={deleteAlert}
            />
          ))
        ) : (
          <EmptyState
            icon={Bell}
            title="No alerts match the criteria"
            description="Try resetting your filters or search keywords to view the event history."
            actionLabel="Reset Filters"
            onAction={() =>
              setFilter({
                severity: 'all',
                category: 'all',
                readStatus: 'all',
                searchQuery: ''
              })
            }
          />
        )}
      </div>
    </div>
  );
};
