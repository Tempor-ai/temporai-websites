'use client';

import { useState, useMemo } from 'react';
import { mockPortfolioAllocations, mockKPIs } from '@/lib/mock/data';
import BaseModal from './BaseModal';

interface RebalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDraft: (action: { type: string; description: string; details: string }) => void;
}

export default function RebalanceModal({ isOpen, onClose, onDraft }: RebalanceModalProps) {
  const [fromStrategy, setFromStrategy] = useState(mockPortfolioAllocations[1].name);
  const [toStrategy, setToStrategy] = useState(mockPortfolioAllocations[0].name);
  const [amount, setAmount] = useState(5);
  const [amountType, setAmountType] = useState<'percent' | 'dollar'>('percent');

  const fromStrategyData = mockPortfolioAllocations.find(s => s.name === fromStrategy);
  const toStrategyData = mockPortfolioAllocations.find(s => s.name === toStrategy);

  const reviewSummary = useMemo(() => {
    const totalValue = parseFloat(mockKPIs.totalPortfolioValue.replace('$', '').replace('M', ''));
    const amountValue = amountType === 'percent' 
      ? (totalValue * amount / 100)
      : (amount / 1000000);
    const amountDisplay = amountType === 'percent' ? `${amount}%` : `$${(amountValue * 1000000).toLocaleString()}`;
    
    return `Rebalance ${amountDisplay} from ${fromStrategy} to ${toStrategy}. This will move approximately $${(amountValue * 1000000).toLocaleString()} from ${fromStrategy} (currently ${fromStrategyData?.allocation}% allocation) to ${toStrategy} (currently ${toStrategyData?.allocation}% allocation).`;
  }, [fromStrategy, toStrategy, amount, amountType, fromStrategyData, toStrategyData]);

  const handleDraft = () => {
    const totalValue = parseFloat(mockKPIs.totalPortfolioValue.replace('$', '').replace('M', ''));
    const amountValue = amountType === 'percent' 
      ? (totalValue * amount / 100)
      : (amount / 1000000);
    const amountDisplay = amountType === 'percent' ? `${amount}%` : `$${(amountValue * 1000000).toLocaleString()}`;

    onDraft({
      type: 'rebalance',
      description: `Rebalance ${amountDisplay} from ${fromStrategy} to ${toStrategy}`,
      details: reviewSummary,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Rebalance Portfolio">
      <div className="space-y-6">
        {/* From Strategy */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            From Strategy
          </label>
          <select
            value={fromStrategy}
            onChange={(e) => setFromStrategy(e.target.value)}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
          >
            {mockPortfolioAllocations.map((strategy) => (
              <option key={strategy.name} value={strategy.name}>
                {strategy.name} ({strategy.allocation}% allocation, {strategy.apy}% APY)
              </option>
            ))}
          </select>
        </div>

        {/* To Strategy */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            To Strategy
          </label>
          <select
            value={toStrategy}
            onChange={(e) => setToStrategy(e.target.value)}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
          >
            {mockPortfolioAllocations.filter(s => s.name !== fromStrategy).map((strategy) => (
              <option key={strategy.name} value={strategy.name}>
                {strategy.name} ({strategy.allocation}% allocation, {strategy.apy}% APY)
              </option>
            ))}
          </select>
        </div>

        {/* Amount Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Amount Type
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setAmountType('percent')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                amountType === 'percent'
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              Percentage
            </button>
            <button
              onClick={() => setAmountType('dollar')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                amountType === 'dollar'
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              Dollar Amount
            </button>
          </div>
        </div>

        {/* Amount Slider/Input */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Amount: {amountType === 'percent' ? `${amount}%` : `$${(amount * 100000).toLocaleString()}`}
          </label>
          {amountType === 'percent' ? (
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="50"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-tem-neutral-muted">
                <span>1%</span>
                <span>50%</span>
              </div>
            </div>
          ) : (
            <input
              type="number"
              min="100000"
              max="10000000"
              step="100000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent font-mono"
            />
          )}
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

