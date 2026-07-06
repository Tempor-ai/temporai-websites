'use client';

export default function RoadmapFaqBridge() {
  return (
    <div className="relative w-full py-12 md:py-16 bg-gradient-to-b from-tem-cream-50 via-tem-cream-100 to-tem-grey-50 overflow-hidden">
      {/* Flowing divider - top */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,0.5 Q360,0.3 720,0.5 T1440,0.5" 
            stroke="url(#flowGradientTop)" 
            strokeWidth="1" 
            fill="none"
          />
          <defs>
            <linearGradient id="flowGradientTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#8DA7B3" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#13C7C4" stopOpacity="0.15" />
              <stop offset="80%" stopColor="#8DA7B3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Flowing divider - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,0.5 Q360,0.7 720,0.5 T1440,0.5" 
            stroke="url(#flowGradientBottom)" 
            strokeWidth="1" 
            fill="none"
          />
          <defs>
            <linearGradient id="flowGradientBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#8DA7B3" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#13C7C4" stopOpacity="0.15" />
              <stop offset="80%" stopColor="#8DA7B3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle gradient wash overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-tem-accent/3 via-transparent to-tem-accent/3 pointer-events-none"
        aria-hidden="true"
      />

      {/* Flowing center line with wave pattern */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <svg 
          className="w-full max-w-5xl h-full" 
          viewBox="0 0 1200 200" 
          preserveAspectRatio="none"
          style={{ height: '100%', minHeight: '200px' }}
        >
          <defs>
            <linearGradient id="centerFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="#13C7C4" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#13C7C4" stopOpacity="0.12" />
              <stop offset="75%" stopColor="#13C7C4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Flowing wave path */}
          <path 
            d="M0,100 Q300,80 600,100 T1200,100" 
            stroke="url(#centerFlow)" 
            strokeWidth="1.5" 
            fill="none"
            style={{
              filter: 'blur(0.5px)',
            }}
          />
          {/* Secondary subtle wave */}
          <path 
            d="M0,100 Q300,120 600,100 T1200,100" 
            stroke="url(#centerFlow)" 
            strokeWidth="1" 
            fill="none"
            style={{
              filter: 'blur(1px)',
              opacity: 0.6,
            }}
          />
        </svg>
      </div>

      {/* Decorative dots along the flow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-tem-accent/20" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-tem-accent/25" aria-hidden="true" />
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-tem-accent/20" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <div className="space-y-4 md:space-y-5">
          {/* Section Label */}
          <div className="text-xs font-semibold text-tem-neutral-muted tracking-wider uppercase">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            WHAT'S NEXT
          </div>

          {/* Headline */}
          <h3 className="text-xl md:text-2xl font-semibold text-tem-dark-1 leading-tight">
            From roadmap to operating reality
          </h3>

          {/* Body Copy */}
          <p className="text-sm md:text-base text-tem-neutral-muted leading-relaxed max-w-3xl">
            Every milestone translates into concrete controls. Execution rules, monitoring, and auditability are built in from day one, not added later as features.
          </p>
        </div>
      </div>
    </div>
  );
}
