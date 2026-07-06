'use client';

import AngularBackdrop from './ui/AngularBackdrop';
import CornerCut from './ui/CornerCut';

export default function OldVsNewSection() {
  const problemItems = [
    "Manual treasury ops and spreadsheets to track on-chain positions.",
    "Fragmented dashboards across custodians, protocols, and chains.",
    "Human-only monitoring, missed opportunities, and overnight risk.",
    "No single audit trail tying actions back to strategy.",
  ];

  const solutionItems = [
    "Autonomous agents execute within your risk parameters 24/7.",
    "Simplified workflows, faster implementation, and agents that adapt to your needs.",
    "Continuous monitoring, rebalancing, and alerts.",
    "Exportable audit logs for every decision and transaction.",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7fff9] min-h-[600px] isolate">
      {/* Angular backdrop geometry */}
      <AngularBackdrop />
      
      {/* Animated diamonds along diagonal line */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <defs>
            <filter id="diamond-glow-oldnew">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Gradient definitions for line strokes */}
            <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#13C7C4" stopOpacity="0" />
              <stop offset="10%" stopColor="#13C7C4" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#13C7C4" stopOpacity="0.4" />
              <stop offset="90%" stopColor="#13C7C4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#13C7C4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#13C7C4" stopOpacity="0" />
              <stop offset="10%" stopColor="#13C7C4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#13C7C4" stopOpacity="0.3" />
              <stop offset="90%" stopColor="#13C7C4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#13C7C4" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Main diagonal path matching the AngularBackdrop diagonal seam exactly */}
          {/* The seam is centered at (720, 400), rotated -25deg, width 140% */}
          <path 
            id="diagonal-path-1" 
            d="M1633 -26 L-193 826" 
            stroke="url(#line-gradient-1)" 
            strokeWidth="3"
            fill="none"
            opacity="1"
            style={{ filter: 'drop-shadow(0 0 6px rgba(19, 199, 196, 0.25))' }}
          />
          
          {/* Second diagonal path - complementary angle (from top-left to bottom-right) */}
          {/* Centered at (720, 400), rotated ~15deg, similar length */}
          <path 
            id="diagonal-path-2" 
            d="M-200 200 L1640 600" 
            stroke="url(#line-gradient-2)" 
            strokeWidth="2.5"
            fill="none"
            opacity="1"
            style={{ filter: 'drop-shadow(0 0 5px rgba(19, 199, 196, 0.2))' }}
          />
          
          {/* Animated diamonds along path 1 (main diagonal) */}
          <g style={{ transform: 'translate3d(0, 0, 0)' }}>
            <polygon 
              points="0,-6 6,0 0,6 -6,0" 
              fill="#8DA7B3" 
              opacity="0.6" 
              filter="url(#diamond-glow-oldnew)"
            >
              <animateMotion 
                dur="20s" 
                repeatCount="indefinite" 
                calcMode="spline" 
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" 
                keyTimes="0; 0.5; 1"
              >
                <mpath href="#diagonal-path-1" />
              </animateMotion>
            </polygon>
            <polygon 
              points="0,-6 6,0 0,6 -6,0" 
              fill="#8DA7B3" 
              opacity="0.6" 
              filter="url(#diamond-glow-oldnew)"
            >
              <animateMotion 
                dur="20s" 
                repeatCount="indefinite" 
                begin="10s"
                calcMode="spline" 
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" 
                keyTimes="0; 0.5; 1"
              >
                <mpath href="#diagonal-path-1" />
              </animateMotion>
            </polygon>
          </g>
          
          {/* Animated diamonds along path 2 */}
          <g style={{ transform: 'translate3d(0, 0, 0)' }}>
            <polygon 
              points="0,-6 6,0 0,6 -6,0" 
              fill="#8DA7B3" 
              opacity="0.5" 
              filter="url(#diamond-glow-oldnew)"
            >
              <animateMotion 
                dur="24s" 
                repeatCount="indefinite" 
                begin="2s"
                calcMode="spline" 
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" 
                keyTimes="0; 0.5; 1"
              >
                <mpath href="#diagonal-path-2" />
              </animateMotion>
            </polygon>
            <polygon 
              points="0,-6 6,0 0,6 -6,0" 
              fill="#8DA7B3" 
              opacity="0.5" 
              filter="url(#diamond-glow-oldnew)"
            >
              <animateMotion 
                dur="24s" 
                repeatCount="indefinite" 
                begin="14s"
                calcMode="spline" 
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" 
                keyTimes="0; 0.5; 1"
              >
                <mpath href="#diagonal-path-2" />
              </animateMotion>
            </polygon>
          </g>
          
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tem-accent via-tem-accent-soft to-tem-accent-deep bg-clip-text text-transparent">
            DeFi Yield Without The Headache
          </h2>
          <p className="text-lg text-tem-neutral-muted max-w-2xl mx-auto">
            See how agentic infrastructure can automate stablecoin allocation, monitoring, and execution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* The Old Way - Problem Card */}
          <div className="rounded-3xl bg-[#F4F6F8] border border-tem-neutral-light p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.15em] text-tem-neutral-muted mb-2 uppercase">
              THE PROBLEM
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-tem-dark-1 mb-6">
              The Old Way
            </h2>
            <ul className="space-y-4">
              {problemItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-tem-neutral-muted mt-2.5" />
                  <p className="text-tem-dark-2 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* The Tempora Labs Way - Solution Card */}
          <div className="rounded-3xl bg-gradient-to-r from-tem-accent via-tem-accent-soft to-tem-accent-deep text-white p-8 md:p-10 shadow-tem-glow relative overflow-hidden">
            {/* Corner cut accent - top right */}
            <CornerCut />
            
            {/* Subtle overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-[0.15em] text-white/80 mb-2 uppercase">
                THE SOLUTION
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                The Tempora Labs Way
              </h2>
              <ul className="space-y-4">
                {solutionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <p className="leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

