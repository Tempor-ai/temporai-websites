'use client';

import { AuditEvent } from '@/lib/mock/activity';

interface AuditTrailTableProps {
  events: AuditEvent[];
  onRowClick: (event: AuditEvent) => void;
}

export default function AuditTrailTable({ events, onRowClick }: AuditTrailTableProps) {
  const getEventTypeColor = (type: AuditEvent['eventType']) => {
    switch (type) {
      case 'action':
        return 'text-tem-accent';
      case 'policy-change':
        return 'text-tem-accent-soft';
      case 'system-event':
        return 'text-tem-neutral-muted';
      case 'alert':
        return 'text-yellow-400';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  const getStatusColor = (status: AuditEvent['status']) => {
    switch (status) {
      case 'success':
        return 'text-tem-accent';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  const formatEventType = (type: AuditEvent['eventType']) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-tem-dark-2 rounded-xl2 border border-tem-dark-3 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tem-dark-3">
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Event Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Actor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Related Strategy</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-tem-neutral-muted">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => onRowClick(event)}
                  className="border-b border-tem-dark-3 hover:bg-tem-dark-3/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 text-sm text-white font-mono">
                    {event.time.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getEventTypeColor(event.eventType)}`}>
                      {formatEventType(event.eventType)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white font-mono">{event.actor}</td>
                  <td className="py-3 px-4 text-sm text-tem-neutral-muted">
                    {event.relatedStrategy || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

