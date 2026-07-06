'use client';

import { mockKPIs, mockPortfolioAllocations } from '@/lib/mock/data';
import KPICard from '@/components/dashboard/overview/KPICard';
import DonutChart from '@/components/dashboard/overview/DonutChart';
import PerformanceChart from '@/components/dashboard/overview/PerformanceChart';
import RecentActivityCard from '@/components/dashboard/overview/RecentActivityCard';
import SuggestedActionCard from '@/components/dashboard/overview/SuggestedActionCard';
import StrategiesTable from '@/components/dashboard/overview/StrategiesTable';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          label="Total Portfolio Value"
          value={mockKPIs.totalPortfolioValue}
        />
        <KPICard
          label="Net Yield (Est.)"
          value={mockKPIs.netYield}
        />
        <KPICard
          label="System Status"
          value=""
          status={mockKPIs.systemStatus}
        />
      </div>

      {/* Section 2: Portfolio Allocation & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Allocation */}
        <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
          <h3 className="text-xl font-semibold text-white mb-4">Portfolio Allocation</h3>
          <DonutChart data={mockPortfolioAllocations} />
        </div>

        {/* Performance */}
        <PerformanceChart />
      </div>

      {/* Section 3: Recent Activity & Suggested Action */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard />
        <SuggestedActionCard />
      </div>

      {/* Section 4: Strategies Table */}
      <StrategiesTable />
    </div>
  );
}
