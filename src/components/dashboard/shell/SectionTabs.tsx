'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/dashboard/overview', label: 'Overview' },
  { href: '/dashboard/activity', label: 'Activity' },
  { href: '/dashboard/alerts', label: 'Alerts' },
];

export default function SectionTabs() {
  const pathname = usePathname();

  return (
    <nav className="h-12 bg-tem-dark-2 border-b border-tem-dark-3 flex items-center px-6 z-20">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              prefetch={true}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-tem-dark-1 text-tem-accent border-t-2 border-tem-accent'
                  : 'text-tem-neutral-muted hover:text-white hover:bg-tem-dark-3'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

