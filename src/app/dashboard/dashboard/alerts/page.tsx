'use client';

import { useMemo } from 'react';
import { mockAlerts, Alert } from '@/lib/mock/data';
import AlertGroup from '@/components/dashboard/alerts/AlertGroup';

export default function AlertsPage() {
  const groupedAlerts = useMemo(() => {
    const groups: Record<'critical' | 'warning' | 'info', Alert[]> = {
      critical: [],
      warning: [],
      info: [],
    };

    mockAlerts.forEach((alert) => {
      groups[alert.severity].push(alert);
    });

    // Sort each group by timestamp (newest first)
    Object.keys(groups).forEach((severity) => {
      groups[severity as keyof typeof groups].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );
    });

    return groups;
  }, []);

  const unresolvedCount = useMemo(() => {
    return mockAlerts.filter((alert) => alert.status === 'unresolved').length;
  }, []);

  return (
    <div className="space-y-8">
      {/* Alert Groups */}
      <div className="space-y-8">
        {/* Critical Alerts */}
        <AlertGroup severity="critical" alerts={groupedAlerts.critical} />

        {/* Warning Alerts */}
        <AlertGroup severity="warning" alerts={groupedAlerts.warning} />

        {/* Info Alerts */}
        <AlertGroup severity="info" alerts={groupedAlerts.info} />
      </div>

      {/* Empty State */}
      {mockAlerts.length === 0 && (
        <div className="bg-tem-dark-2 rounded-xl2 p-12 border border-tem-dark-3 text-center">
          <p className="text-tem-neutral-muted">No alerts at this time</p>
        </div>
      )}
    </div>
  );
}
