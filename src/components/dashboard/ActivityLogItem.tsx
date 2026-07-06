import { ActivityLog } from '@/lib/mock/data';
import ActionDraftButton from './ActionDraftButton';

interface ActivityLogItemProps {
  log: ActivityLog;
}

export default function ActivityLogItem({ log }: ActivityLogItemProps) {
  const getStatusColor = (status: ActivityLog['status']) => {
    switch (status) {
      case 'executed':
        return 'text-tem-accent';
      case 'confirmed':
        return 'text-tem-accent-soft';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  const getTypeIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'action':
        return '⚡';
      case 'alert':
        return '🔔';
      case 'system':
        return '⚙️';
      default:
        return '📋';
    }
  };

  return (
    <div className="p-6 hover:bg-tem-dark-3/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">{getTypeIcon(log.type)}</span>
            <span className={`text-sm font-medium ${getStatusColor(log.status)}`}>
              {log.status.toUpperCase()}
            </span>
            <span className="text-xs text-tem-neutral-muted font-mono">
              {log.timestamp.toLocaleString()}
            </span>
          </div>
          <div className="text-white font-medium mb-1">{log.description}</div>
          {log.details && (
            <div className="text-sm text-tem-neutral-muted mb-2">{log.details}</div>
          )}
          {log.agent && (
            <div className="text-xs text-tem-accent font-mono">{log.agent}</div>
          )}
        </div>
        {log.status === 'pending' && log.type === 'action' && (
          <ActionDraftButton
            action={{
              type: 'confirm-action',
              description: `Confirm: ${log.description}`,
              details: log.details || '',
            }}
            label="Confirm"
            variant="outline"
            size="sm"
          />
        )}
      </div>
    </div>
  );
}

