'use client';

import { useState, useMemo } from 'react';
import BaseModal from './BaseModal';

interface ExportAuditLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDraft: (action: { type: string; description: string; details: string }) => void;
}

export default function ExportAuditLogsModal({ isOpen, onClose, onDraft }: ExportAuditLogsModalProps) {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [includeEvents, setIncludeEvents] = useState({
    actions: true,
    alerts: true,
    policyChanges: true,
    systemEvents: false,
  });

  const reviewSummary = useMemo(() => {
    const dateRangeText = dateRange === 'custom'
      ? `from ${startDate || 'start date'} to ${endDate || 'end date'}`
      : `for the last ${dateRange === '7d' ? '7 days' : dateRange === '30d' ? '30 days' : '90 days'}`;
    
    const eventsList = Object.entries(includeEvents)
      .filter(([_, included]) => included)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
      .join(', ');
    
    return `Export audit logs ${dateRangeText} in ${format.toUpperCase()} format. Included event types: ${eventsList || 'none'}.`;
  }, [dateRange, startDate, endDate, format, includeEvents]);

  const handleDraft = () => {
    const dateRangeText = dateRange === 'custom'
      ? `from ${startDate || 'start date'} to ${endDate || 'end date'}`
      : `for the last ${dateRange === '7d' ? '7 days' : dateRange === '30d' ? '30 days' : '90 days'}`;
    
    const eventsList = Object.entries(includeEvents)
      .filter(([_, included]) => included)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
      .join(', ');

    onDraft({
      type: 'export-audit-logs',
      description: `Export audit logs ${dateRangeText} in ${format.toUpperCase()} format`,
      details: reviewSummary,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Export Audit Logs">
      <div className="space-y-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {(['7d', '30d', '90d', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-tem-accent text-tem-dark-1'
                    : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : 'Custom'}
              </button>
            ))}
          </div>
          {dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
                placeholder="Start date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                className="px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
                placeholder="End date"
              />
            </div>
          )}
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Export Format
          </label>
          <div className="flex gap-2">
            {(['csv', 'json', 'pdf'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  format === fmt
                    ? 'bg-tem-accent text-tem-dark-1'
                    : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
                }`}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Include Events */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Include Event Types
          </label>
          <div className="space-y-2">
            {Object.entries(includeEvents).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setIncludeEvents({ ...includeEvents, [key]: e.target.checked })}
                  className="w-4 h-4 rounded bg-tem-dark-3 border-tem-dark-3 text-tem-accent focus:ring-tem-accent"
                />
                <span className="text-sm text-white">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-tem-dark-3 rounded-lg p-4 border border-tem-accent/20">
          <h3 className="text-sm font-semibold text-tem-accent mb-2 font-mono">REVIEW</h3>
          <p className="text-sm text-white leading-relaxed">{reviewSummary}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-tem-dark-3 text-tem-neutral-muted rounded-lg hover:bg-tem-dark-3 hover:text-white transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleDraft}
            className="flex-1 px-4 py-2 bg-tem-accent text-tem-dark-1 font-semibold rounded-lg hover:bg-tem-accent-soft transition-colors shadow-tem-glow"
          >
            Draft in Chat
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

