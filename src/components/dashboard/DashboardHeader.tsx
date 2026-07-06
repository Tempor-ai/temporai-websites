'use client';

interface DashboardHeaderProps {
  onChatToggle: () => void;
  isChatOpen: boolean;
}

export default function DashboardHeader({ onChatToggle, isChatOpen }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-tem-dark-2/95 backdrop-blur-sm border-b border-tem-dark-3">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Chat Toggle Button */}
          <button
            onClick={onChatToggle}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isChatOpen
                ? 'bg-tem-accent text-tem-dark-1 shadow-tem-glow'
                : 'bg-tem-dark-3 text-tem-accent border border-tem-accent/20 hover:bg-tem-accent/10'
            }`}
          >
            {isChatOpen ? '💬 Chat' : '💬 Open Chat'}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-tem-dark-3 text-tem-neutral-muted hover:text-white transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-tem-accent rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

