import React from 'react';

export default function AudioWave({ isPlaying = true, bars = 16, color = 'var(--accent-glow)' }) {
  return (
    <div className="audio-wave-container" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const heightMultiplier = Math.sin((i / (bars - 1)) * Math.PI) * 0.7 + 0.3;
        const animDelay = `${(i * 0.08).toFixed(2)}s`;
        const animDuration = `${0.6 + (i % 4) * 0.2}s`;
        
        return (
          <span
            key={i}
            className={`wave-bar ${isPlaying ? 'animated' : ''}`}
            style={{
              '--bar-scale': heightMultiplier,
              '--anim-delay': animDelay,
              '--anim-duration': animDuration,
              backgroundColor: color
            }}
          />
        );
      })}
    </div>
  );
}
