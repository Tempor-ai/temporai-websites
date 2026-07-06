'use client';

export default function DiagonalPattern() {
  return (
    <div 
      className="absolute bottom-0 right-0 w-[70vw] h-full pointer-events-none z-0"
      style={{
        maskImage: 'linear-gradient(to left, transparent 0%, transparent 20%, rgba(255,255,255,0.5) 40%, white 100%)',
        WebkitMaskImage: 'linear-gradient(to left, transparent 0%, transparent 20%, rgba(255,255,255,0.5) 40%, white 100%)',
      }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="diamond-pattern"
            x="0"
            y="0"
            width="70"
            height="70"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45 35 35)"
          >
            <polygon
              points="35,0 70,35 35,70 0,35"
              fill="url(#diamond-gradient)"
              stroke="none"
            />
          </pattern>
          <linearGradient id="diamond-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#267B87" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#55D5D1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#267B87" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#diamond-pattern)"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

