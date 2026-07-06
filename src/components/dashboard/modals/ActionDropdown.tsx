'use client';

import { useState, useRef, useEffect } from 'react';
import RebalanceModal from './RebalanceModal';
import AllocateCapitalModal from './AllocateCapitalModal';
import PauseStrategyModal from './PauseStrategyModal';
import ExportAuditLogsModal from './ExportAuditLogsModal';

interface ActionDropdownProps {
  onDraft: (action: { type: string; description: string; details: string }) => void;
}

export default function ActionDropdown({ onDraft }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const actions = [
    { id: 'rebalance', label: 'Rebalance', icon: '⚖️' },
    { id: 'allocate', label: 'Allocate Capital', icon: '💰' },
    { id: 'pause', label: 'Pause Strategy', icon: '⏸️' },
    { id: 'export', label: 'Export Audit Logs', icon: '📥' },
  ];

  const handleActionClick = (actionId: string) => {
    setActiveModal(actionId);
    setIsOpen(false);
  };

  const handleDraft = (action: { type: string; description: string; details: string }) => {
    onDraft(action);
    setActiveModal(null);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-tem-accent text-tem-dark-1 font-semibold rounded-lg hover:bg-tem-accent-soft transition-colors shadow-tem-glow text-sm"
        >
          + New Action
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-tem-dark-2 border border-tem-dark-3 rounded-lg shadow-lg z-50">
            <div className="p-2">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-tem-dark-3 text-white text-sm transition-colors text-left"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <RebalanceModal
        isOpen={activeModal === 'rebalance'}
        onClose={() => setActiveModal(null)}
        onDraft={handleDraft}
      />
      <AllocateCapitalModal
        isOpen={activeModal === 'allocate'}
        onClose={() => setActiveModal(null)}
        onDraft={handleDraft}
      />
      <PauseStrategyModal
        isOpen={activeModal === 'pause'}
        onClose={() => setActiveModal(null)}
        onDraft={handleDraft}
      />
      <ExportAuditLogsModal
        isOpen={activeModal === 'export'}
        onClose={() => setActiveModal(null)}
        onDraft={handleDraft}
      />
    </>
  );
}

