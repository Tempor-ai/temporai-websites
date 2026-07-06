'use client';

import { useState, useMemo } from 'react';
import { mockStrategies } from '@/lib/mock/data';
import BaseModal from './BaseModal';

interface PauseStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDraft: (action: { type: string; description: string; details: string }) => void;
}

export default function PauseStrategyModal({ isOpen, onClose, onDraft }: PauseStrategyModalProps) {
  const [strategy, setStrategy] = useState(mockStrategies[0].name);
  const [duration, setDuration] = useState<'indefinite' | 'temporary'>('indefinite');
  const [resumeDate, setResumeDate] = useState('');

  const strategyData = mockStrategies.find(s => s.name === strategy);

  const reviewSummary = useMemo(() => {
    const durationText = duration === 'indefinite'
      ? 'indefinitely until manually resumed'
      : `until ${resumeDate || 'specified date'}`;
    
    return `Pause ${strategy} ${durationText}. This will stop all automated actions for ${strategy} (currently ${strategyData?.allocation}% allocation, ${strategyData?.apy}% APY). Funds will remain in the strategy but no new allocations or rebalancing will occur.`;
  }, [strategy, duration, resumeDate, strategyData]);

  const handleDraft = () => {
    const durationText = duration === 'indefinite'
      ? 'indefinitely until manually resumed'
      : `until ${resumeDate || 'specified date'}`;

    onDraft({
      type: 'pause-strategy',
      description: `Pause ${strategy} ${durationText}`,
      details: reviewSummary,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Pause Strategy">
      <div className="space-y-6">
        {/* Strategy */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Strategy to Pause
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
          >
            {mockStrategies.filter(s => s.status === 'active').map((s) => (
              <option key={s.id} value={s.name}>
                {s.name} ({s.allocation}% allocation, {s.apy}% APY)
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Pause Duration
          </label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setDuration('indefinite')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                duration === 'indefinite'
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              Indefinite
            </button>
            <button
              onClick={() => setDuration('temporary')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                duration === 'temporary'
                  ? 'bg-tem-accent text-tem-dark-1'
                  : 'bg-tem-dark-3 text-tem-neutral-muted hover:text-white'
              }`}
            >
              Temporary
            </button>
          </div>
          {duration === 'temporary' && (
            <input
              type="date"
              value={resumeDate}
              onChange={(e) => setResumeDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
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

