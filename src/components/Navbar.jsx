import React from 'react';
import { Headphones, Sparkles, PlusCircle, Eye, HelpCircle, Music } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './SocialIcons';

export default function Navbar({ activeTab, setActiveTab, isAdminMode = false, onOpenGuide }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={() => setActiveTab('gate')}>
          <div className="brand-icon-wrapper">
            <Headphones className="brand-icon" size={20} />
            <Sparkles className="brand-sparkle" size={12} />
          </div>
          <div className="brand-text">
            <span className="brand-name">DJ Dillu <span className="brand-highlight">Official</span></span>
            <span className="brand-badge">VIP Fan Pass</span>
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
          <button
            className={`old-songs-nav-btn ${activeTab === 'old-songs' ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === 'old-songs' ? 'gate' : 'old-songs')}
            title="Browse & download all old classic songs"
          >
            <Music size={15} />
            <span>Old Songs Download</span>
          </button>

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
            href="https://www.youtube.com/@Dj-Dillu?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-link-btn"
            title="Subscribe on YouTube"
          >
            <YoutubeIcon size={18} />
          </a>

          <a
            href="https://www.instagram.com/djdillu__/"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-link-btn"
            title="Follow on Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
