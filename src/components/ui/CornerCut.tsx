'use client';

/**
 * CornerCut - Layered glass triangle accent for top-right corner
 * Creates a dramatic etched glass effect with layered triangles
 */
export default function CornerCut() {
  return (
    <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none overflow-hidden">
      {/* Outer triangle layer - larger, more visible */}
      <div 
        className="absolute top-0 right-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 70%)',
          clipPath: 'polygon(100% 0%, 100% 60%, 60% 0%)',
          filter: 'blur(0.5px)',
        }}
      />
      
      {/* Middle triangle layer */}
      <div 
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 80%)',
          clipPath: 'polygon(100% 0%, 100% 50%, 50% 0%)',
        }}
      />
      
      {/* Inner triangle layer - smaller, more opaque */}
      <div 
        className="absolute top-0 right-0 w-24 h-24"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
          clipPath: 'polygon(100% 0%, 100% 40%, 60% 0%)',
        }}
      />
      
      {/* Border accent - more visible */}
      <div 
        className="absolute top-0 right-0 w-full h-full"
        style={{
          borderTop: '2px solid rgba(255, 255, 255, 0.15)',
          borderRight: '2px solid rgba(255, 255, 255, 0.15)',
          clipPath: 'polygon(100% 0%, 100% 60%, 60% 0%)',
        }}
      />
      
      {/* Additional highlight */}
      <div 
        className="absolute top-2 right-2 w-16 h-16"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
          clipPath: 'polygon(100% 0%, 100% 30%, 70% 0%)',
        }}
      />
    </div>
  );
}

