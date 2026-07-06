'use client';

import { mockStrategies } from '@/lib/mock/activity';

interface ActivityFiltersProps {
  dateRange: '7d' | '30d' | '90d' | 'custom';
  onDateRangeChange: (range: '7d' | '30d' | '90d' | 'custom') => void;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  strategy: string;
  onStrategyChange: (strategy: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  statusOptions: string[];
}

export default function ActivityFilters({
  dateRange,
  onDateRangeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  strategy,
  onStrategyChange,
  status,
  onStatusChange,
  statusOptions,
}: ActivityFiltersProps) {
  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-4 border border-tem-dark-3 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-xs font-medium text-tem-neutral-muted mb-2">
            Date Range
          </label>
          <div className="flex gap-2">
            {(['7d', '30d', '90d', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  dateRange === range
                    ? 'bg-tem-accent text-tem-dark-1'
                    : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
                }`}
              >
                {range === '7d' ? '7D' : range === '30d' ? '30D' : range === '90d' ? '90D' : 'Custom'}
              </button>
            ))}
          </div>
          {dateRange === 'custom' && onStartDateChange && onEndDateChange && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="date"
                value={startDate || ''}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="px-3 py-1.5 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white text-xs focus:outline-none focus:border-tem-accent"
              />
              <input
                type="date"
                value={endDate || ''}
                onChange={(e) => onEndDateChange(e.target.value)}
                min={startDate}
                className="px-3 py-1.5 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white text-xs focus:outline-none focus:border-tem-accent"
              />
            </div>
          )}
        </div>

        {/* Strategy */}
        <div>
          <label className="block text-xs font-medium text-tem-neutral-muted mb-2">
            Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => onStrategyChange(e.target.value)}
            className="w-full px-3 py-1.5 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white text-sm focus:outline-none focus:border-tem-accent"
          >
            {mockStrategies.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-tem-neutral-muted mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-1.5 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white text-sm focus:outline-none focus:border-tem-accent"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

