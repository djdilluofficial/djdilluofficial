import React from 'react';
import { Lock, Sparkles, PlusCircle, Eye, HelpCircle } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Navbar({ activeTab, setActiveTab, isAdminMode = false, onOpenGuide }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={() => isAdminMode && setActiveTab('studio')}>
          <div className="brand-icon-wrapper">
            <Lock className="brand-icon" size={20} />
            <Sparkles className="brand-sparkle" size={12} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Audience<span className="brand-highlight">Grow</span></span>
            <span className="brand-badge">Sub2Unlock</span>
          </div>
        </div>

        {isAdminMode && (
          <nav className="nav-tabs">
            <button
              className={`nav-tab-btn ${activeTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveTab('studio')}
            >
              <PlusCircle size={16} />
              <span>Create Gate</span>
            </button>
            
            <button
              className={`nav-tab-btn ${activeTab === 'gate' ? 'active' : ''}`}
              onClick={() => setActiveTab('gate')}
            >
              <Eye size={16} />
              <span>Preview Gate</span>
            </button>
          </nav>
        )}

        <div className="navbar-actions">
          {isAdminMode && (
            <button
              className="guide-btn"
              onClick={onOpenGuide}
              title="How to deploy for free on GitHub Pages"
            >
              <HelpCircle size={16} />
              <span className="hide-mobile">Deploy Guide</span>
            </button>
          )}

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-link-btn"
            title="AudienceGrow Gate"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
