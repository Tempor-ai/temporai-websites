'use client';

interface AngularBackdropProps {
  variant?: 'default' | 'leftPanel';
}

/**
 * AngularBackdrop - Dramatic angular/diamond geometric shapes for section backgrounds
 * Inspired by nevermined.ai's glass/embossed geometry aesthetic
 * 
 * @param variant - 'default' for full section backdrop, 'leftPanel' for left column only
 */
export default function AngularBackdrop({ variant = 'default' }: AngularBackdropProps) {
  if (variant === 'leftPanel') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden isolate">
        {/* Large diamond - bottom left */}
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rotate-45"
          style={{
            background: 'linear-gradient(135deg, rgba(19, 199, 196, 0.05) 0%, rgba(19, 199, 196, 0.08) 50%, transparent 100%)',
            border: '1px solid rgba(19, 199, 196, 0.06)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Medium diamond - mid left */}
        <div 
          className="absolute top-1/3 left-[5%] w-64 h-64 rotate-12"
          style={{
            background: 'linear-gradient(45deg, rgba(19, 199, 196, 0.04) 0%, transparent 70%)',
            border: '1px solid rgba(19, 199, 196, 0.05)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Diagonal panel - left edge */}
        <div 
          className="absolute top-1/2 left-0 w-48 h-32 rotate-[15deg]"
          style={{
            background: 'linear-gradient(135deg, rgba(19, 199, 196, 0.06) 0%, transparent 60%)',
            border: '1px solid rgba(19, 199, 196, 0.05)',
            clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Small diamond - top left */}
        <div 
          className="absolute top-[10%] left-[8%] w-40 h-40 rotate-[30deg]"
          style={{
            background: 'linear-gradient(225deg, rgba(19, 199, 196, 0.04) 0%, transparent 80%)',
            border: '1px solid rgba(19, 199, 196, 0.04)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden isolate">
      {/* Large diamond shape - bottom right - more dramatic (flipped from left) */}
      <div 
        className="absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rotate-[-45deg]"
        style={{
          background: 'linear-gradient(225deg, rgba(19, 199, 196, 0.12) 0%, rgba(19, 199, 196, 0.18) 50%, transparent 100%)',
          border: '2px solid rgba(19, 199, 196, 0.15)',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Medium diamond - top left - larger and more visible (flipped from right) */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rotate-[-12deg]"
        style={{
          background: 'linear-gradient(315deg, rgba(19, 199, 196, 0.1) 0%, rgba(19, 199, 196, 0.15) 50%, transparent 70%)',
          border: '2px solid rgba(19, 199, 196, 0.12)',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Diagonal seam - center - flipped from upper left to bottom right, now upper right to bottom left */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[2px] rotate-[-25deg] origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(19, 199, 196, 0.15) 15%, rgba(19, 199, 196, 0.25) 50%, rgba(19, 199, 196, 0.15) 85%, transparent 100%)',
          boxShadow: '0 0 8px rgba(19, 199, 196, 0.2)',
        }}
      />

      {/* Angular panel - center right - larger (flipped from left) */}
      <div 
        className="absolute top-1/3 right-[5%] w-80 h-56 rotate-[-15deg]"
        style={{
          background: 'linear-gradient(225deg, rgba(19, 199, 196, 0.12) 0%, rgba(19, 199, 196, 0.08) 60%, transparent 100%)',
          border: '2px solid rgba(19, 199, 196, 0.12)',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Additional diamond - bottom left - larger (flipped from right) */}
      <div 
        className="absolute bottom-[10%] left-[5%] w-72 h-72 rotate-[-30deg]"
        style={{
          background: 'linear-gradient(135deg, rgba(19, 199, 196, 0.1) 0%, rgba(19, 199, 196, 0.15) 50%, transparent 80%)',
          border: '2px solid rgba(19, 199, 196, 0.1)',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Additional large angular shape - top center (flipped rotation) */}
      <div 
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-96 h-64 rotate-[20deg]"
        style={{
          background: 'linear-gradient(315deg, rgba(19, 199, 196, 0.08) 0%, transparent 70%)',
          border: '2px solid rgba(19, 199, 196, 0.1)',
          clipPath: 'polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}

