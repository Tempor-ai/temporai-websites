'use client';

import { mockActivityLogs } from '@/lib/mock/data';
import ActionDraftButton from '@/components/dashboard/ActionDraftButton';

export default function RecentActivityCard() {
  const recentActivities = mockActivityLogs.slice(0, 5);

  const getTypeIcon = (type: string) => {
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

  const getStatusColor = (status: string) => {
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

  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-tem-dark-3 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{getTypeIcon(activity.type)}</span>
                <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status.toUpperCase()}
                </span>
                <span className="text-xs text-tem-neutral-muted font-mono">
                  {activity.timestamp.toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-white font-medium">{activity.description}</div>
              {activity.details && (
                <div className="text-xs text-tem-neutral-muted mt-1">{activity.details}</div>
              )}
            </div>
            <ActionDraftButton
              action={{
                type: 'explain-activity',
                description: `Explain this activity: ${activity.description}`,
                details: activity.details || '',
              }}
              label="Explain"
              variant="outline"
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

