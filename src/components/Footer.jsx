import React from 'react';
import { ShieldCheck, Music, Sparkles } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Real-time VIP Fan & Visitor Tracker */}
        <VisitorCounter variant="full" />

        <div className="footer-badges">
          <div className="footer-badge">
            <ShieldCheck size={16} />
            <span>Official Master Quality</span>
          </div>
          <div className="footer-badge">
            <Music size={16} />
            <span>Direct High-Speed Download</span>
          </div>
          <div className="footer-badge">
            <Sparkles size={16} />
            <span>Exclusive VIP Fan Access</span>
          </div>
        </div>
        <p className="footer-copyright">
          © 2026 DJ Dillu Official • All Rights Reserved. Thank you for supporting the music!
        </p>
      </div>
    </footer>
  );
}
