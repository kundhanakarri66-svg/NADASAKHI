import { useState, useEffect, useCallback } from 'react';
import { Alert, AlertFilterOptions } from '../types/alerts.ts';
import { databaseRepository } from '../services/database/databaseRepository.ts';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<AlertFilterOptions>({
    severity: 'all',
    category: 'all',
    readStatus: 'all',
    searchQuery: ''
  });

  const loadAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await databaseRepository.getAlerts();
      setAlerts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const markAsRead = async (id: string) => {
    await databaseRepository.markAlertAsRead(id);
    setAlerts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = async () => {
    const unread = alerts.filter((a) => !a.read);
    for (const a of unread) {
      await databaseRepository.markAlertAsRead(a.id);
    }
    setAlerts((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const deleteAlert = async (id: string) => {
    await databaseRepository.deleteAlert(id);
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter.severity && filter.severity !== 'all' && alert.severity !== filter.severity) {
      return false;
    }
    if (filter.category && filter.category !== 'all' && alert.category !== filter.category) {
      return false;
    }
    if (filter.readStatus === 'unread' && alert.read) {
      return false;
    }
    if (filter.readStatus === 'read' && !alert.read) {
      return false;
    }
    if (filter.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase();
      return (
        alert.title.toLowerCase().includes(q) ||
        alert.description.toLowerCase().includes(q) ||
        (alert.soundType && alert.soundType.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

  return {
    alerts: filteredAlerts,
    allAlerts: alerts,
    unreadCount,
    loading,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteAlert,
    refresh: loadAlerts
  };
}
