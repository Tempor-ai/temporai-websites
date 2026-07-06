'use client';

interface ActivityTabsProps {
  activeTab: 'transactions' | 'audit-trail';
  onTabChange: (tab: 'transactions' | 'audit-trail') => void;
}

export default function ActivityTabs({ activeTab, onTabChange }: ActivityTabsProps) {
  return (
    <div className="flex gap-1 border-b border-tem-dark-3 mb-6">
      <button
        onClick={() => onTabChange('transactions')}
        className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
          activeTab === 'transactions'
            ? 'border-tem-accent text-tem-accent'
            : 'border-transparent text-tem-neutral-muted hover:text-white'
        }`}
      >
        Transactions
      </button>
      <button
        onClick={() => onTabChange('audit-trail')}
        className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
          activeTab === 'audit-trail'
            ? 'border-tem-accent text-tem-accent'
            : 'border-transparent text-tem-neutral-muted hover:text-white'
        }`}
      >
        Audit Trail
      </button>
    </div>
  );
}

