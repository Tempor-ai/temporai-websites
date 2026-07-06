'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import GlobalHeader from '@/components/dashboard/shell/GlobalHeader';
import SectionTabs from '@/components/dashboard/shell/SectionTabs';
import ChatPanel from '@/components/dashboard/shell/ChatPanel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when route changes
  useEffect(() => {
    // Reset window scroll position (for navigation from landing page)
    window.scrollTo(0, 0);
    
    // Reset main content scroll position
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-tem-dark-1 flex flex-col">
      {/* Global Header */}
      <GlobalHeader />

      {/* Section Navigation Tabs */}
      <SectionTabs />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Page Content Canvas (Left - dynamic width) */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto min-w-0">
          <div className="max-w-7xl mx-auto p-6 md:p-8">
            {children}
          </div>
        </main>

        {/* Persistent Chat Panel (Right - dynamic width) */}
        <ChatPanel />
      </div>
    </div>
  );
}
