'use client';

import { Alert } from '@/lib/mock/data';
import ActionDraftButton from '@/components/dashboard/ActionDraftButton';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-red-400/50 bg-red-400/10';
      case 'warning':
        return 'border-yellow-400/50 bg-yellow-400/10';
      case 'info':
        return 'border-tem-accent/50 bg-tem-accent/10';
      default:
        return 'border-tem-dark-3 bg-tem-dark-2';
    }
  };

  const getSeverityBadgeColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-400 text-white';
      case 'warning':
        return 'bg-yellow-400 text-tem-dark-1';
      case 'info':
        return 'bg-tem-accent text-tem-dark-1';
      default:
        return 'bg-tem-dark-3 text-tem-neutral-muted';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'unresolved':
        return 'text-red-400';
      case 'acknowledged':
        return 'text-yellow-400';
      case 'resolved':
        return 'text-tem-accent';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  const handleDraftResponse = () => {
    const action = {
      type: 'alert-response',
      description: `Respond to alert: ${alert.title}`,
      details: `Alert: ${alert.title}\nAffected Strategy: ${alert.affectedStrategy || 'N/A'}\nRecommended Action: ${alert.recommendedAction || 'Review alert'}\nMessage: ${alert.message}`,
    };

    if (typeof window !== 'undefined') {
      const event = new CustomEvent('draftAction', { detail: action });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className={`rounded-xl2 p-6 border-2 ${getSeverityColor(alert.severity)}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityBadgeColor(alert.severity)}`}>
              {alert.severity.toUpperCase()}
            </span>
            <span className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
              {alert.status.toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{alert.title}</h3>
          <p className="text-sm text-tem-neutral-muted mb-4">{alert.message}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-tem-neutral-muted mb-1 font-mono">AFFECTED STRATEGY</div>
          <div className="text-sm text-white font-medium">
            {alert.affectedStrategy || 'N/A'}
          </div>
        </div>
        <div>
          <div className="text-xs text-tem-neutral-muted mb-1 font-mono">TIMESTAMP</div>
          <div className="text-sm text-white font-mono">
            {alert.timestamp.toLocaleString()}
          </div>
        </div>
      </div>

      {alert.recommendedAction && (
        <div className="bg-tem-dark-3 rounded-lg p-4 mb-4 border border-tem-accent/20">
          <div className="text-xs text-tem-accent font-mono mb-2">RECOMMENDED ACTION</div>
          <p className="text-sm text-white">{alert.recommendedAction}</p>
        </div>
      )}

      <div className="flex justify-end">
        <ActionDraftButton
          action={{
            type: 'alert-response',
            description: `Respond to alert: ${alert.title}`,
            details: `Alert: ${alert.title}\nAffected Strategy: ${alert.affectedStrategy || 'N/A'}\nRecommended Action: ${alert.recommendedAction || 'Review alert'}\nMessage: ${alert.message}`,
          }}
          label="Draft Response"
          variant="primary"
        />
      </div>
    </div>
  );
}

