'use client';

const chips = [
  'Audit-ready by default',
  'Built for funds & DAOs',
];

interface ChipProps {
  label: string;
}

function Chip({ label }: ChipProps) {
  return (
    <div className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/95 border border-slate-200/60 text-xs md:text-sm font-medium text-tem-neutral-muted hover:bg-white hover:text-tem-dark-1 hover:border-slate-300/80 transition-all duration-200 whitespace-nowrap">
      {label}
    </div>
  );
}

export default function SectionDividerChips() {
  return (
    <div 
      className="relative w-full h-24 md:h-[120px] flex items-center justify-center bg-gradient-to-b from-tem-cream-50 via-tem-cream-100 to-tem-grey-50"
      aria-hidden="true"
    >
      {/* Subtle geometric accent - diagonal line segment */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-tem-accent/5 to-transparent"
          style={{
            transform: 'rotate(-0.8deg)',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Hairline divider - behind chips */}
      <div 
        className="absolute left-0 right-0 h-px bg-slate-300/25"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
        aria-hidden="true"
      />

      {/* Tiny diamond shape at center (geometric accent) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-tem-accent/4"
        aria-hidden="true"
      />

      {/* Floating chips - above divider */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 md:gap-4 px-6">
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} />
        ))}
      </div>
    </div>
  );
}

