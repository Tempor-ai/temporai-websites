'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ActionDropdown from '@/components/dashboard/modals/ActionDropdown';
import { mockAlerts } from '@/lib/mock/data';

type SystemStatus = 'healthy' | 'warning' | 'action-required';

export default function GlobalHeader() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('healthy');
  const [selectedOrg, setSelectedOrg] = useState('Tempora Labs');
  
  // Calculate unresolved alerts from mock data
  const unreadAlerts = useMemo(() => {
    return mockAlerts.filter((alert) => alert.status === 'unresolved').length;
  }, []);

  const handleDraftAction = (action: { type: string; description: string; details: string }) => {
    // Draft action to chat
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('draftAction', { detail: action });
      window.dispatchEvent(event);
    }
  };

  const getStatusColor = (status: SystemStatus) => {
    switch (status) {
      case 'healthy':
        return 'bg-tem-accent text-tem-dark-1';
      case 'warning':
        return 'bg-yellow-400 text-tem-dark-1';
      case 'action-required':
        return 'bg-red-400 text-white';
    }
  };

  const getStatusLabel = (status: SystemStatus) => {
    switch (status) {
      case 'healthy':
        return 'Healthy';
      case 'warning':
        return 'Warning';
      case 'action-required':
        return 'Action Required';
    }
  };

  return (
    <header className="h-14 bg-tem-dark-2 border-b border-tem-dark-3 flex items-center justify-between px-6 z-30">
      {/* Left: Logo + Org Selector */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-white hover:text-tem-accent transition-colors">
          TemporaLabs
        </Link>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className="px-3 py-1.5 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white text-sm font-medium hover:border-tem-accent/50 focus:outline-none focus:border-tem-accent transition-colors"
          >
            <option value="Tempora Labs">Tempora Labs</option>
            <option value="Org 2">Org 2</option>
            <option value="Org 3">Org 3</option>
          </select>
        </div>

        {/* System Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(systemStatus)}`}>
          {getStatusLabel(systemStatus)}
        </div>
      </div>

      {/* Right: Actions + Icons */}
      <div className="flex items-center gap-4">
        {/* + New Action Dropdown */}
        <ActionDropdown onDraft={handleDraftAction} />

        {/* Alerts Bell */}
        <Link
          href="/dashboard/alerts"
          prefetch={true}
          className="relative p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors"
        >
          <span className="text-xl">🔔</span>
          {unreadAlerts > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-tem-accent text-tem-dark-1 text-xs font-bold rounded-full flex items-center justify-center">
              {unreadAlerts > 9 ? '9+' : unreadAlerts}
            </span>
          )}
        </Link>

        {/* Settings Gear */}
        <Link
          href="/dashboard/settings"
          prefetch={true}
          className="p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors"
          aria-label="Settings"
        >
          <span className="text-xl">⚙️</span>
        </Link>

        {/* User Avatar/Menu */}
        <div className="w-8 h-8 rounded-full bg-tem-accent flex items-center justify-center text-tem-dark-1 font-semibold cursor-pointer hover:bg-tem-accent-soft transition-colors">
          U
        </div>
      </div>
    </header>
  );
}

