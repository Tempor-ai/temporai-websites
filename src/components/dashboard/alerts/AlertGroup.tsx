'use client';

import { Alert } from '@/lib/mock/data';
import AlertCard from './AlertCard';

interface AlertGroupProps {
  severity: 'critical' | 'warning' | 'info';
  alerts: Alert[];
}

export default function AlertGroup({ severity, alerts }: AlertGroupProps) {
  const getSeverityLabel = () => {
    switch (severity) {
      case 'critical':
        return 'Critical';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      default:
        return severity;
    }
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case 'critical':
        return '🔴';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📋';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getSeverityIcon()}</span>
        <h2 className="text-2xl font-bold text-white">
          {getSeverityLabel()} ({alerts.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

