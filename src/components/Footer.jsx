import React from 'react';
import { Shield, Zap, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-badges">
          <div className="footer-badge">
            <Shield size={14} />
            <span>Anti-Bypass Protection</span>
          </div>
          <div className="footer-badge">
            <Zap size={14} />
            <span>100% Free GitHub Pages Ready</span>
          </div>
          <div className="footer-badge">
            <Sparkles size={14} />
            <span>High-Converting Sub2Unlock</span>
          </div>
        </div>
        <p className="footer-copyright">
          AudienceGrow • Built for Creators, Artists & Producers to scale YouTube, Instagram & WhatsApp communities.
        </p>
      </div>
    </footer>
  );
}
