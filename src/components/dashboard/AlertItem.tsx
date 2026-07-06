'use client';

import { useState } from 'react';
import { Alert } from '@/lib/mock/data';
import ActionDraftButton from './ActionDraftButton';

interface AlertItemProps {
  alert: Alert;
}

export default function AlertItem({ alert }: AlertItemProps) {
  const [acknowledged, setAcknowledged] = useState(alert.acknowledged);

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 border-red-400/20 bg-red-400/10';
      case 'warning':
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'info':
        return 'text-tem-accent border-tem-accent/20 bg-tem-accent/10';
      default:
        return 'text-tem-neutral-muted border-tem-dark-3';
    }
  };

  const getCategoryIcon = (category: Alert['category']) => {
    switch (category) {
      case 'risk':
        return '⚠️';
      case 'execution':
        return '⚡';
      case 'policy':
        return '📋';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  return (
    <div className={`p-6 border-l-4 ${getSeverityColor(alert.severity)} ${
      !acknowledged ? 'bg-tem-dark-3/30' : ''
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">{getCategoryIcon(alert.category)}</span>
            <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${
              getSeverityColor(alert.severity)
            }`}>
              {alert.severity}
            </span>
            {!acknowledged && (
              <span className="text-xs text-tem-accent font-medium">NEW</span>
            )}
          </div>
          <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
          <p className="text-sm text-tem-neutral-muted mb-2">{alert.message}</p>
          <div className="text-xs text-tem-neutral-muted font-mono">
            {alert.timestamp.toLocaleString()}
          </div>
        </div>
        {!acknowledged && (
          <ActionDraftButton
            action={{
              type: 'acknowledge-alert',
              description: `Acknowledge alert: ${alert.title}`,
              details: alert.message,
            }}
            label="Acknowledge"
            variant="outline"
            size="sm"
            onClick={() => setAcknowledged(true)}
          />
        )}
      </div>
    </div>
  );
}

