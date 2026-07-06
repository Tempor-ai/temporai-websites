'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

const navItems = [
  { href: '/dashboard/overview', label: 'Overview', icon: '📊' },
  { href: '/dashboard/activity', label: 'Activity', icon: '📋' },
  { href: '/dashboard/alerts', label: 'Alerts', icon: '🔔' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardSidebar({ isOpen, onToggle, currentPath }: DashboardSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-tem-dark-2 border-r border-tem-dark-3 transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-tem-dark-3">
          <div className="flex items-center justify-between">
            {isOpen ? (
              <h1 className="text-xl font-bold text-white">TemporaLabs</h1>
            ) : (
              <h1 className="text-xl font-bold text-white">TL</h1>
            )}
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors"
              aria-label="Toggle sidebar"
            >
              {isOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-tem-dark-3 text-tem-accent border border-tem-accent/20'
                    : 'text-tem-neutral-muted hover:bg-tem-dark-3 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-tem-dark-3">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-tem-dark-3 ${
            isOpen ? '' : 'justify-center'
          }`}>
            <div className="w-8 h-8 rounded-full bg-tem-accent flex items-center justify-center text-tem-dark-1 font-semibold">
              U
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">User Account</div>
                <div className="text-xs text-tem-neutral-muted truncate">user@temporalabs.io</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

