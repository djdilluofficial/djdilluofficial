import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatorStudio from './components/CreatorStudio';
import UnlockGate from './components/UnlockGate';
import DeployGuideModal from './components/DeployGuideModal';
import { decryptPayload } from './utils/crypto';

const DEFAULT_CONFIG = {
  title: "All Folk + ODia Mix (Dj Ramp Dance Mix)",
  artist: "Dj Dillu",
  coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
  youtubeUrl: "https://youtube.com/@blackhatbeats?sub_confirmation=1",
  instagramUrl: "https://instagram.com/blackhatbeats",
  whatsappUrl: "https://whatsapp.com/channel/0029VaTestChannel",
  targetUrl: "https://www.mediafire.com/file/a4fdrmisdo56d8k/All_Folk_%252B_ODia_Mix_Dj_Ramp_Dance_Mix_Dj_Dillu.mp3/file",
  previewAudioUrl: ""
};

export default function App() {
  const [activeTab, setActiveTab] = useState('gate'); // default to 'gate' (user-facing mode)
  const [currentConfig, setCurrentConfig] = useState(DEFAULT_CONFIG);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Check URL hash/query on load
  useEffect(() => {
    const parseUrlPayload = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      
      const searchParams = new URLSearchParams(search);
      // Admin studio is hidden by default. Only enabled if URL contains ?admin=true or ?studio=true
      if (
        searchParams.get('admin') === 'true' || 
        searchParams.get('studio') === 'true' || 
        hash.includes('admin=true') ||
        hash.includes('studio=true')
      ) {
        setIsAdminMode(true);
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
        {isAdminMode && activeTab === 'studio' ? (
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
