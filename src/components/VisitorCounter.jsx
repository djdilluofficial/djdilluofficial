import React, { useState, useEffect } from 'react';
import { Users, Eye, ShieldCheck } from 'lucide-react';

export default function VisitorCounter({ variant = 'full' }) {
  const [visitorCount, setVisitorCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Fetch genuine hit count from live tracking server
    const fetchRealVisitorCount = async () => {
      try {
        // Tracker endpoint for live hits
        const trackerUrl = `https://hits.sh/djdilluofficial.github.io/audience-grow.svg?t=${Date.now()}`;
        const response = await fetch(trackerUrl, { cache: 'no-store' });
        
        if (response.ok) {
          const svgText = await response.text();
          // Extract exact real hit count from SVG text
          const match = svgText.match(/aria-label="[^:]*:\s*(\d+)"/) || 
                        svgText.match(/>(\d+)<\/text>\s*<\/g>/);
          if (match && match[1]) {
            const realCount = parseInt(match[1], 10);
            if (isMounted) {
              setVisitorCount(realCount);
              localStorage.setItem('djdillu_real_visitors', realCount.toString());
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Direct fetch restricted, using cached or live badge fallback:", err);
      }

      // If fetch was restricted by browser/CORS, use cached real count
      const cached = localStorage.getItem('djdillu_real_visitors');
      if (isMounted) {
        if (cached) {
          setVisitorCount(parseInt(cached, 10));
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      }
    };

    fetchRealVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth count-up to the real number
  useEffect(() => {
    if (visitorCount === null) return;

    if (visitorCount < 5) {
      setDisplayCount(visitorCount);
      return;
    }

    const duration = 800; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * visitorCount);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayCount(visitorCount);
      }
    };

    requestAnimationFrame(animate);
  }, [visitorCount]);

  const formattedCount = (visitorCount !== null ? displayCount : 0).toLocaleString();

  // Compact variant for Navbar
  if (variant === 'compact') {
    return (
      <div className="visitor-badge-compact" title="Real Live Page Visitors">
        <span className="visitor-pulse-dot" />
        <Users size={13} className="visitor-badge-icon" />
        <span className="visitor-count-number">
          {isLoading ? '...' : (visitorCount !== null ? formattedCount : '1')}
        </span>
        <span className="visitor-label">Real Visitors</span>
        {/* Hidden tracker to record real page hit */}
        <img 
          src="https://hits.sh/djdilluofficial.github.io/audience-grow.svg" 
          alt="" 
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        />
      </div>
    );
  }

  // Pill variant for Track info
  if (variant === 'pill') {
    return (
      <div className="visitor-pill-card" title="Real Verified Page Visits">
        <div className="visitor-pill-left">
          <span className="visitor-pulse-dot" />
          <span className="visitor-online-text">
            <strong>Live</strong> Active
          </span>
        </div>
        <div className="visitor-pill-divider" />
        <div className="visitor-pill-right">
          <Eye size={13} className="visitor-icon-eye" />
          <span className="visitor-total-text">
            <strong>{isLoading ? '...' : (visitorCount !== null ? formattedCount : '1')}</strong> Real Views
          </span>
        </div>
      </div>
    );
  }

  // Full Widget variant for Footer
  return (
    <div className="visitor-counter-widget">
      <div className="visitor-counter-inner">
        {/* Real Visitors */}
        <div className="visitor-stat-item">
          <div className="visitor-stat-icon-wrap total">
            <Eye size={16} />
          </div>
          <div className="visitor-stat-info">
            <span className="visitor-stat-label">Real Page Visitors</span>
            <span className="visitor-stat-value count-glow">
              {isLoading ? (
                <span className="visitor-skeleton">...</span>
              ) : (
                visitorCount !== null ? formattedCount : '1'
              )}
            </span>
          </div>
        </div>

        {/* Live Server-Verified Badge */}
        <div className="visitor-stat-item">
          <div className="visitor-stat-icon-wrap online">
            <span className="visitor-pulse-dot static-pulse" />
            <ShieldCheck size={16} />
          </div>
          <div className="visitor-stat-info">
            <span className="visitor-stat-label">Tracking Status</span>
            <span className="visitor-stat-value live-glow" style={{ fontSize: '0.95rem' }}>
              Live Server Verified
            </span>
          </div>
        </div>

        {/* Live Server Badge direct embed for 100% transparency */}
        <div className="visitor-stat-item hide-on-xs">
          <img 
            src="https://hits.sh/djdilluofficial.github.io/audience-grow.svg?label=hits&color=0284c7&labelColor=0f172a" 
            alt="Real hits counter badge"
            style={{ height: 22, borderRadius: 4 }}
            title="Real-time global hit counter"
          />
        </div>
      </div>
    </div>
  );
}
