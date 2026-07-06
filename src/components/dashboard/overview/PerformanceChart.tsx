'use client';

import { useState } from 'react';
import { mockPerformanceData } from '@/lib/mock/data';
import LineChart from './LineChart';

const timeRanges = ['1D', '1W', '1M', '3M', '1Y'] as const;

export default function PerformanceChart() {
  const [selectedRange, setSelectedRange] = useState<typeof timeRanges[number]>('1W');

  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Performance</h3>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                selectedRange === range
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <LineChart data={mockPerformanceData[selectedRange]} timeRange={selectedRange} />
    </div>
  );
}

