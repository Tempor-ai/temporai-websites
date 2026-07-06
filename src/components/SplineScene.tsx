'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(
  async () => {
    const mod = await import('@splinetool/react-spline');
    return mod;
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    ),
  }
);

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className = '' }: SplineSceneProps) {
  // Use scene URL as key to force re-initialization if scene changes
  const sceneKey = useMemo(() => scene, [scene]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Spline
        key={sceneKey}
        scene={scene}
      />
    </div>
  );
}
