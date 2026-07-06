'use client';

import { useState, useEffect, useCallback } from 'react';
import { mockStrategies, Strategy, NodeAIPortfolio, portfolioToStrategies } from '@/lib/mock/data';
import ActionDraftButton from '@/components/dashboard/ActionDraftButton';
import useBoxStorage from '@/hooks/useBoxStorage';

// Configuration - should match ChatPanel
const MIND_TYPE = "DrHiroAgent";
const MIND_ID = "testing_abc";

interface ActionModalProps {
  strategy: Strategy;
  onClose: () => void;
}

function ActionModal({ strategy, onClose }: ActionModalProps) {
  const actions = [
    {
      type: 'rebalance',
      description: `Rebalance ${strategy.name} allocation`,
      details: `Adjust allocation percentage for ${strategy.name}`,
    },
    {
      type: 'withdraw',
      description: `Withdraw from ${strategy.name}`,
      details: `Withdraw funds from ${strategy.name} strategy`,
    },
    {
      type: 'pause',
      description: `Pause ${strategy.name}`,
      details: `Temporarily pause ${strategy.name} strategy`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Actions for {strategy.name}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <ActionDraftButton
              key={index}
              action={action}
              label={action.description}
              variant="outline"
              size="md"
              onClick={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for table rows
function TableSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <tr key={i} className="border-b border-tem-dark-3 animate-pulse">
          <td className="py-3 px-4"><div className="h-4 bg-tem-dark-3 rounded w-32"></div></td>
          <td className="py-3 px-4"><div className="h-4 bg-tem-dark-3 rounded w-20"></div></td>
          <td className="py-3 px-4 text-right"><div className="h-4 bg-tem-dark-3 rounded w-12 ml-auto"></div></td>
          <td className="py-3 px-4 text-right"><div className="h-4 bg-tem-dark-3 rounded w-12 ml-auto"></div></td>
          <td className="py-3 px-4"><div className="h-4 bg-tem-dark-3 rounded w-16"></div></td>
          <td className="py-3 px-4 text-center"><div className="h-4 bg-tem-dark-3 rounded w-6 mx-auto"></div></td>
        </tr>
      ))}
    </>
  );
}

export default function StrategiesTable() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { unbox, loading: storageLoading, error: storageError } = useBoxStorage({
    mindType: MIND_TYPE,
    mindId: MIND_ID,
  });

  // Fetch portfolio data from storage
  const fetchPortfolio = useCallback(async () => {
    console.log('[StrategiesTable] Fetching portfolio from storage...');
    setIsLoading(true);

    try {
      const result = await unbox<NodeAIPortfolio>('portfolio');

      if (result.ok && result.content) {
        console.log('[StrategiesTable] Portfolio fetched:', result.content);
        const converted = portfolioToStrategies(result.content);
        console.log('[StrategiesTable] Converted to strategies:', converted);
        setStrategies(converted);
        setDataSource('live');
        setLastUpdated(new Date());
      } else {
        console.log('[StrategiesTable] No portfolio found, using mock data');
        setStrategies(mockStrategies);
        setDataSource('mock');
      }
    } catch (err) {
      console.error('[StrategiesTable] Error fetching portfolio:', err);
      setStrategies(mockStrategies);
      setDataSource('mock');
    } finally {
      setIsLoading(false);
    }
  }, [unbox]);

  // Fetch on mount and set up polling
  useEffect(() => {
    fetchPortfolio();

    // Poll every 30 seconds for updates
    const interval = setInterval(fetchPortfolio, 30000);

    return () => clearInterval(interval);
  }, [fetchPortfolio]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-tem-accent';
      case 'pending':
        return 'text-yellow-400';
      case 'paused':
        return 'text-tem-neutral-muted';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  return (
    <>
      <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Strategies / Assets</h3>
          <div className="flex items-center gap-3">
            {/* Data source indicator */}
            <span className={`text-xs px-2 py-1 rounded ${
              dataSource === 'live'
                ? 'bg-tem-accent/20 text-tem-accent'
                : 'bg-tem-dark-3 text-tem-neutral-muted'
            }`}>
              {dataSource === 'live' ? 'LIVE' : 'MOCK'}
            </span>
            {/* Refresh button */}
            <button
              onClick={fetchPortfolio}
              disabled={storageLoading}
              className="p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors disabled:opacity-50"
              title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Refresh'}
            >
              <svg
                className={`w-4 h-4 ${storageLoading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Error message */}
        {storageError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            Failed to fetch portfolio: {storageError}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-tem-dark-3">
                <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Type</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Allocation %</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Est. APY</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton />
              ) : strategies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-tem-neutral-muted">
                    No strategies configured. Use the chat to set up your portfolio.
                  </td>
                </tr>
              ) : (
                strategies.map((strategy) => (
                  <tr
                    key={strategy.id}
                    className="border-b border-tem-dark-3 hover:bg-tem-dark-3/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-white font-medium">{strategy.name}</td>
                    <td className="py-3 px-4 text-sm text-tem-neutral-muted">{strategy.type}</td>
                    <td className="py-3 px-4 text-sm text-white text-right font-mono">{strategy.allocation}%</td>
                    <td className="py-3 px-4 text-sm text-tem-accent text-right font-mono">{strategy.apy}%</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${getStatusColor(strategy.status)}`}>
                        {strategy.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedStrategy(strategy)}
                        className="p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors"
                        aria-label="Actions"
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStrategy && (
        <ActionModal
          strategy={selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
        />
      )}
    </>
  );
}
