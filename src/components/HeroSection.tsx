'use client';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-tem-hero flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tem-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tem-accent-soft rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-tem-accent/20 border border-tem-accent/30 rounded-lg mb-6">
                <span className="text-tem-accent font-mono text-sm">Autonomous Infrastructure</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Agentic Finance
                <span className="block text-tem-accent">Reimagined</span>
              </h1>
              <p className="text-xl text-tem-neutral-muted leading-relaxed max-w-2xl">
                Smart AI vault orchestration, monitoring, and execution — built for funds, treasuries, and institutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-tem-accent-gradient text-tem-dark-1 font-semibold rounded-lg shadow-tem-glow hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-tem-accent text-tem-accent font-semibold rounded-lg hover:bg-tem-accent/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Stat Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
              <div className="text-tem-accent font-mono text-sm mb-2">Total Assets</div>
              <div className="text-3xl font-bold mb-1">$2.4B</div>
              <div className="text-tem-neutral-muted text-xs">+12.5% MoM</div>
            </div>
            <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
              <div className="text-tem-accent font-mono text-sm mb-2">Active Vaults</div>
              <div className="text-3xl font-bold mb-1">1,247</div>
              <div className="text-tem-neutral-muted text-xs">+8.2% MoM</div>
            </div>
            <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
              <div className="text-tem-accent font-mono text-sm mb-2">Uptime</div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-tem-neutral-muted text-xs">Last 30 days</div>
            </div>
            <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
              <div className="text-tem-accent font-mono text-sm mb-2">Transactions</div>
              <div className="text-3xl font-bold mb-1">45.2K</div>
              <div className="text-tem-neutral-muted text-xs">This month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






