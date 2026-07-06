import { StatCard as StatCardType } from '@/lib/mock/data';

interface StatCardProps extends StatCardType {}

export default function StatCard({ label, value, subtext, trend }: StatCardProps) {
  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <div className="text-tem-accent font-mono text-sm mb-2">{label}</div>
      <div className="text-4xl font-bold text-white mb-1">{value}</div>
      {subtext && (
        <div className="text-tem-neutral-muted text-sm mb-2">{subtext}</div>
      )}
      {trend && (
        <div className={`text-sm font-medium ${
          trend.isPositive ? 'text-tem-accent' : 'text-red-400'
        }`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}

