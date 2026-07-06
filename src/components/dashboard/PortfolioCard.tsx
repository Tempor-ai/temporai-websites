import { PortfolioMetric } from '@/lib/mock/data';

interface PortfolioCardProps {
  metrics: PortfolioMetric[];
}

export default function PortfolioCard({ metrics }: PortfolioCardProps) {
  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <h3 className="text-xl font-semibold text-white mb-4">Portfolio Allocation</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-white font-medium mb-1">{metric.name}</div>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
            </div>
            <div className={`text-sm font-medium ${
              metric.changeType === 'positive' 
                ? 'text-tem-accent' 
                : metric.changeType === 'negative'
                ? 'text-red-400'
                : 'text-tem-neutral-muted'
            }`}>
              {metric.changeType === 'positive' && '↑'}
              {metric.changeType === 'negative' && '↓'}
              {metric.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

