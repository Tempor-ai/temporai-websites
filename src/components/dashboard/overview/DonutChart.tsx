'use client';

import { useState } from 'react';
import { PortfolioAllocation } from '@/lib/mock/data';

interface DonutChartProps {
  data: PortfolioAllocation[];
  size?: number;
}

export default function DonutChart({ data, size = 200 }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 20;
  const innerRadius = radius * 0.6;

  let currentAngle = -90; // Start at top

  const createArc = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + outerRadius * Math.cos(start);
    const y1 = centerY + outerRadius * Math.sin(start);
    const x2 = centerX + outerRadius * Math.cos(end);
    const y2 = centerY + outerRadius * Math.sin(end);
    
    const x3 = centerX + innerRadius * Math.cos(end);
    const y3 = centerY + innerRadius * Math.sin(end);
    const x4 = centerX + innerRadius * Math.cos(start);
    const y4 = centerY + innerRadius * Math.sin(start);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');
  };

  const segments = data.map((item, index) => {
    const angle = (item.allocation / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      ...item,
      startAngle,
      endAngle,
      path: createArc(startAngle, endAngle, radius, innerRadius),
      index,
    };
  });

  const handleSegmentHover = (index: number) => {
    setHoveredIndex(index);
    // Position tooltip at center of chart
    setTooltipPosition({
      x: size / 2,
      y: size / 2,
    });
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative">
        <svg width={size} height={size} className="mb-4">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.4}
              onMouseEnter={() => handleSegmentHover(index)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setTooltipPosition(null);
              }}
              className="transition-opacity cursor-pointer"
              style={{ filter: hoveredIndex === index ? 'brightness(1.2)' : 'none' }}
            />
          ))}
        </svg>
        
        {/* Tooltip */}
        {hoveredIndex !== null && tooltipPosition && data[hoveredIndex] && (
          <div
            className="absolute bg-tem-dark-3 border border-tem-accent/20 rounded-lg p-3 shadow-lg z-10 pointer-events-none"
            style={{
              left: tooltipPosition.x - 100,
              top: tooltipPosition.y - 100,
              width: '200px',
            }}
          >
            <div className="text-sm font-semibold text-white mb-1">{data[hoveredIndex].name}</div>
            <div className="text-xs text-tem-neutral-muted mb-1">
              Allocation: <span className="text-tem-accent font-mono">{data[hoveredIndex].allocation}%</span>
            </div>
            <div className="text-xs text-tem-neutral-muted mb-1">
              Est. APY: <span className="text-tem-accent font-mono">{data[hoveredIndex].apy}%</span>
            </div>
            <div className="text-xs text-tem-neutral-muted">
              Type: <span className="text-tem-accent">{data[hoveredIndex].type}</span>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2 w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              hoveredIndex === index ? 'bg-tem-dark-3' : ''
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-white">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white">{item.allocation}%</div>
              <div className="text-xs text-tem-neutral-muted">{item.apy}% APY</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

