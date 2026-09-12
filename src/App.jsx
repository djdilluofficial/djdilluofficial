import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatorStudio from './components/CreatorStudio';
import UnlockGate from './components/UnlockGate';
import OldSongsArchive from './components/OldSongsArchive';
import DeployGuideModal from './components/DeployGuideModal';
import { decryptPayload } from './utils/crypto';
import latestThumbnail from './assets/latest-thumbnail.png';

const DEFAULT_CONFIG = {
  title: "Jai Phulalo Ludo Budu (Top Odia X Telugu Full Ramp Dance Mix)",
  artist: "Dj Dillu X Dj Mouli Kiran",
  coverArt: latestThumbnail,
  youtubeUrl: "https://www.youtube.com/@Dj-Dillu?sub_confirmation=1",
  instagramUrl: "https://www.instagram.com/djdillu__/",
  whatsappUrl: "https://chat.whatsapp.com/H8eHV3Z3LmDDL16DjzF0jg?s=cl&p=a&mlu=4&ilr=4",
  targetUrl: "https://www.mediafire.com/file/a4fdrmisdo56d8k/All_Folk_%252B_ODia_Mix_Dj_Ramp_Dance_Mix_Dj_Dillu.mp3/file",
  previewAudioUrl: ""
};

export default function App() {
  const [activeTab, setActiveTab] = useState('gate'); // 'gate' | 'old-songs' | 'studio'
  const [currentConfig, setCurrentConfig] = useState(DEFAULT_CONFIG);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Check URL hash/query on load
  useEffect(() => {
    const parseUrlPayload = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      
      const searchParams = new URLSearchParams(search);
      if (
        searchParams.get('admin') === 'true' || 
        searchParams.get('studio') === 'true' || 
        hash.includes('admin=true') ||
        hash.includes('studio=true')
      ) {
        setIsAdminMode(true);
      }

      if (hash.includes('old-songs') || searchParams.get('tab') === 'old-songs') {
        setActiveTab('old-songs');
      }

      let dataParam = null;

      // Check hash e.g. #/unlock?data=... or #data=...
      if (hash.includes('data=')) {
        const match = hash.match(/data=([^&]+)/);
        if (match && match[1]) {
          dataParam = decodeURIComponent(match[1]);
        }
      } else if (search.includes('data=')) {
        dataParam = searchParams.get('data');
      }

      if (dataParam) {
        const decrypted = decryptPayload(dataParam);
        if (decrypted) {
          setCurrentConfig(decrypted);
          setActiveTab('gate');
        }
      }
    };

    parseUrlPayload();
    window.addEventListener('hashchange', parseUrlPayload);
    return () => window.removeEventListener('hashchange', parseUrlPayload);
  }, []);

  return (
    <div className="app-layout">
      {/* Background cyber grid & glow effects */}
      <div className="bg-grid-pattern" />
      <div className="bg-gradient-spotlight top-left" />
      <div className="bg-gradient-spotlight bottom-right" />

      {/* Top Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isAdminMode={isAdminMode}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* In-Between Section Switcher (Latest Release vs Old Songs Archive) */}
        {!isAdminMode && (
          <div className="section-tab-switcher-wrapper">
            <div className="section-tab-switcher">
              <button
                className={`tab-switch-btn ${activeTab === 'gate' ? 'active' : ''}`}
                onClick={() => setActiveTab('gate')}
              >
                <span>⚡ Latest VIP Release</span>
              </button>

              <button
                className={`tab-switch-btn ${activeTab === 'old-songs' ? 'active' : ''}`}
                onClick={() => setActiveTab('old-songs')}
              >
                <span>🎵 Old Songs Download (25+)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'old-songs' ? (
          <OldSongsArchive onBackToGate={() => setActiveTab('gate')} />
        ) : isAdminMode && activeTab === 'studio' ? (
          <CreatorStudio 
            currentConfig={currentConfig}
            onChangeConfig={setCurrentConfig}
            onOpenPreviewGate={() => setActiveTab('gate')}
          />
        ) : (
          <div className="gate-standalone-view">
            <UnlockGate 
              config={currentConfig}
              isPreview={false}
              onOpenOldSongs={() => setActiveTab('old-songs')}
              onEditInStudio={isAdminMode ? () => setActiveTab('studio') : null}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Deployment Instructions Modal (only if in admin mode) */}
      {isAdminMode && (
        <DeployGuideModal 
          isOpen={isGuideOpen} 
          onClose={() => setIsGuideOpen(false)} 
        />
      )}
    </div>
  );
}
