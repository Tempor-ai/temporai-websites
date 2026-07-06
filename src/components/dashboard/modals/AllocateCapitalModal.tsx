'use client';

import { useState, useMemo } from 'react';
import { mockPortfolioAllocations, mockKPIs } from '@/lib/mock/data';
import BaseModal from './BaseModal';

interface AllocateCapitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDraft: (action: { type: string; description: string; details: string }) => void;
}

export default function AllocateCapitalModal({ isOpen, onClose, onDraft }: AllocateCapitalModalProps) {
  const [strategy, setStrategy] = useState(mockPortfolioAllocations[0].name);
  const [amount, setAmount] = useState(1000000);
  const [source, setSource] = useState<'external' | 'rebalance'>('external');

  const strategyData = mockPortfolioAllocations.find(s => s.name === strategy);

  const reviewSummary = useMemo(() => {
    const sourceText = source === 'external' 
      ? 'from external capital'
      : 'by rebalancing from existing strategies';
    
    return `Allocate $${amount.toLocaleString()} to ${strategy} ${sourceText}. This will increase ${strategy}'s allocation from ${strategyData?.allocation}% to approximately ${((strategyData?.allocation || 0) + (amount / parseFloat(mockKPIs.totalPortfolioValue.replace('$', '').replace('M', '')) / 1000000 * 100)).toFixed(1)}% of the portfolio. Expected APY: ${strategyData?.apy}%.`;
  }, [strategy, amount, source, strategyData]);

  const handleDraft = () => {
    const sourceText = source === 'external' 
      ? 'from external capital'
      : 'by rebalancing from existing strategies';

    onDraft({
      type: 'allocate-capital',
      description: `Allocate $${amount.toLocaleString()} to ${strategy} ${sourceText}`,
      details: reviewSummary,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Allocate Capital">
      <div className="space-y-6">
        {/* Strategy */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Target Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
          >
            {mockPortfolioAllocations.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name} ({s.allocation}% allocation, {s.apy}% APY)
              </option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Capital Source
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSource('external')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                source === 'external'
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              External Capital
            </button>
            <button
              onClick={() => setSource('rebalance')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                source === 'rebalance'
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              Rebalance
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Allocation Amount
          </label>
          <div className="space-y-2">
            <input
              type="number"
              min="100000"
              max="10000000"
              step="100000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent font-mono"
            />
            <div className="flex justify-between text-xs text-tem-neutral-muted">
              <span>$100K</span>
              <span>$10M</span>
            </div>
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

