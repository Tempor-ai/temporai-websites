'use client';

import { useState } from 'react';
import { PerformanceDataPoint } from '@/lib/mock/data';
import ActionDraftButton from '@/components/dashboard/ActionDraftButton';

interface LineChartProps {
  data: PerformanceDataPoint[];
  timeRange: string;
}

export default function LineChart({ data, timeRange }: LineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  if (data.length === 0) return null;

  const height = 200;
  const padding = 40;
  const chartHeight = height - padding * 2;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;

  // Use viewBox for responsive SVG
  const viewBoxWidth = 600;
  const chartWidth = viewBoxWidth - padding * 2;

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
    return { ...point, x, y, index };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="relative w-full overflow-hidden">
      <svg 
        viewBox={`0 0 ${viewBoxWidth} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-[200px]"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#13C7C4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#13C7C4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={padding + ratio * chartHeight}
            x2={viewBoxWidth - padding}
            y2={padding + ratio * chartHeight}
            stroke="#1C3244"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray={ratio === 0 || ratio === 1 ? '0' : '2,2'}
          />
        ))}

        {/* Area */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#13C7C4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points and event markers */}
        {points.map((point) => {
          if (point.event) {
            return (
              <g key={point.index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="#13C7C4"
                  stroke="#0B1524"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(point.index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          }
          return (
            <circle
              key={point.index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#13C7C4"
              opacity={hoveredPoint === point.index ? 1 : 0.6}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(point.index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}
      </svg>

      {/* Event marker tooltips and actions */}
      {points
        .filter((p) => p.event && hoveredPoint === p.index)
        .map((point) => {
          // Calculate tooltip position relative to container
          const tooltipLeft = Math.min(
            Math.max(0, (point.x / viewBoxWidth) * 100 - 10),
            80
          );
          
          return (
            <div
              key={point.index}
              className="absolute bg-tem-dark-3 border border-tem-accent/20 rounded-lg p-3 shadow-lg z-10"
              style={{
                left: `${tooltipLeft}%`,
                top: `${point.y - 60}px`,
                width: '200px',
                maxWidth: '90%',
              }}
            >
              <div className="text-xs font-mono text-tem-accent mb-1">{point.event!.type}</div>
              <div className="text-xs text-white mb-2">{point.event!.description}</div>
              <div className="text-xs text-tem-neutral-muted font-mono mb-2">
                {point.date.toLocaleDateString()}
              </div>
              <ActionDraftButton
                action={{
                  type: 'explain-event',
                  description: `Explain the ${point.event!.type} on ${point.date.toLocaleDateString()}`,
                  details: point.event!.description,
                }}
                label="Explain in Chat"
                variant="outline"
                size="sm"
              />
            </div>
          );
        })}
    </div>
  );
}
