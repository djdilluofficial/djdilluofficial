import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Link2, 
  MessageCircle, 
  FileAudio, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink, 
  Trash2, 
  Eye, 
  Share2, 
  Layers, 
  Flame, 
  CheckCircle, 
  Download,
  Music2,
  X
} from 'lucide-react';
import { YoutubeIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons';
import { QRCodeSVG } from 'qrcode.react';
import UnlockGate from './UnlockGate';
import { encryptPayload } from '../utils/crypto';

const PRESET_COVERS = [
  {
    name: "Cyber Neon",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Dark Studio",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Retro Synth",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Midnight Vibes",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Golden Acoustic",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Electronic Beat",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80"
  }
];

export default function CreatorStudio({ currentConfig, onChangeConfig, onOpenPreviewGate }) {
  const [formData, setFormData] = useState(currentConfig);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedGates, setSavedGates] = useState([]);
  const [activePreviewDevice, setActivePreviewDevice] = useState('mobile');

  // Load saved gates from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('audience_grow_saved_gates');
      if (saved) {
        setSavedGates(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChangeConfig(updated);
  };

  const handleGenerateLink = (e) => {
    e?.preventDefault();

    if (!formData.title || !formData.targetUrl) {
      alert("Please provide at least a Title and Destination Target Link!");
      return;
    }

    // Encrypt payload
    const encrypted = encryptPayload(formData);
    if (!encrypted) {
      alert("Error generating encrypted link.");
      return;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const finalUrl = `${baseUrl}#/unlock?data=${encrypted}`;
    setGeneratedUrl(finalUrl);
    setShowShareModal(true);

    // Save into history
    try {
      const newEntry = {
        id: Date.now().toString(),
        title: formData.title,
        artist: formData.artist,
        coverArt: formData.coverArt,
        url: finalUrl,
        date: new Date().toLocaleDateString(),
        targetUrl: formData.targetUrl
      };
      const updatedHistory = [newEntry, ...savedGates.filter(g => g.title !== formData.title)].slice(0, 10);
      setSavedGates(updatedHistory);
      localStorage.setItem('audience_grow_saved_gates', JSON.stringify(updatedHistory));
    } catch {
      // ignore
    }
  };

  const handleCopyGenerated = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDeleteSaved = (id) => {
    const filtered = savedGates.filter(g => g.id !== id);
    setSavedGates(filtered);
    localStorage.setItem('audience_grow_saved_gates', JSON.stringify(filtered));
  };

  return (
    <div className="creator-studio-container">
      {/* Hero Header */}
      <div className="studio-hero">
        <div className="studio-hero-badge">
          <Flame size={14} className="badge-flame" />
          <span>Audience Growth Engine</span>
        </div>
        <h1 className="studio-title">Create a Viral <span className="text-gradient">Sub2Unlock</span> Gate</h1>
        <p className="studio-subtitle">
          Lock your secret MP3s, beat packs, or downloads behind YouTube, Instagram & WhatsApp follows. Works 100% free on GitHub Pages!
        </p>
      </div>

      <div className="studio-grid">
        {/* Left Column: Form Builder */}
        <div className="studio-form-panel">
          <div className="panel-card">
            <div className="panel-card-header">
              <div className="panel-title-group">
                <Layers size={20} className="panel-icon" />
                <h2 className="panel-title">Gate Configuration</h2>
              </div>
              <span className="panel-pill">Step-by-Step Builder</span>
            </div>

            <form onSubmit={handleGenerateLink} className="builder-form">
              {/* Section 1: Content Info */}
              <div className="form-section">
                <h3 className="section-label">1. Content Details</h3>
                
                <div className="form-group">
                  <label className="input-label">Track / File Title *</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="e.g. Midnight Waves (Official VIP MP3)"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Artist / Channel Name</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="e.g. DJ Shadow / Blackhat Music"
                    value={formData.artist}
                    onChange={(e) => handleChange('artist', e.target.value)}
                  />
                </div>

                {/* Preset Cover Selector */}
                <div className="form-group">
                  <label className="input-label">Cover Artwork</label>
                  <input
                    type="url"
                    className="custom-input"
                    placeholder="Paste image URL (or pick a preset below)"
                    value={formData.coverArt}
                    onChange={(e) => handleChange('coverArt', e.target.value)}
                  />
                  <div className="cover-preset-row">
                    {PRESET_COVERS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`cover-preset-btn ${formData.coverArt === preset.url ? 'active' : ''}`}
                        onClick={() => handleChange('coverArt', preset.url)}
                        title={preset.name}
                      >
                        <img src={preset.url} alt={preset.name} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2: Social Lock Steps */}
              <div className="form-section">
                <h3 className="section-label">2. Social Action Links (The 3 Locks)</h3>

                <div className="form-group">
                  <label className="input-label flex-between">
                    <span className="flex-row gap-1">
                      <YoutubeIcon size={16} className="text-red" />
                      <span>YouTube Channel URL</span>
                    </span>
                    <span className="label-hint">Step 1</span>
                  </label>
                  <input
                    type="url"
                    className="custom-input"
                    placeholder="https://youtube.com/@yourchannel?sub_confirmation=1"
                    value={formData.youtubeUrl}
                    onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label flex-between">
                    <span className="flex-row gap-1">
                      <InstagramIcon size={16} className="text-pink" />
                      <span>Instagram Profile URL</span>
                    </span>
                    <span className="label-hint">Step 2</span>
                  </label>
                  <input
                    type="url"
                    className="custom-input"
                    placeholder="https://instagram.com/yourhandle"
                    value={formData.instagramUrl}
                    onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label flex-between">
                    <span className="flex-row gap-1">
                      <WhatsAppIcon size={16} className="text-green" />
                      <span>WhatsApp Channel / Community Link</span>
                    </span>
                    <span className="label-hint">Step 3</span>
                  </label>
                  <input
                    type="url"
                    className="custom-input"
                    placeholder="https://whatsapp.com/channel/..."
                    value={formData.whatsappUrl}
                    onChange={(e) => handleChange('whatsappUrl', e.target.value)}
                  />
                </div>
              </div>

              {/* Section 3: Secret Target Link */}
              <div className="form-section highlight-section">
                <h3 className="section-label">3. Destination Content (Secret Link)</h3>
                
                <div className="form-group">
                  <label className="input-label flex-between">
                    <span className="flex-row gap-1">
                      <FileAudio size={16} className="text-cyan" />
                      <span>Target MP3 / Google Drive / Download URL *</span>
                    </span>
                    <span className="label-badge">Encrypted 🔒</span>
                  </label>
                  <input
                    type="url"
                    className="custom-input target-input"
                    placeholder="https://drive.google.com/... or direct MP3 link"
                    value={formData.targetUrl}
                    onChange={(e) => handleChange('targetUrl', e.target.value)}
                    required
                  />
                  <p className="input-subtext">
                    This link is encrypted and only unveiled to visitors after completing all 3 social steps.
                  </p>
                </div>

                <div className="form-group">
                  <label className="input-label">Optional 10s Audio Preview URL (MP3)</label>
                  <input
                    type="url"
                    className="custom-input"
                    placeholder="https://actions.google.com/sounds/v1/science_fiction/scifi_laser.ogg"
                    value={formData.previewAudioUrl || ''}
                    onChange={(e) => handleChange('previewAudioUrl', e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="generate-gate-btn">
                <Sparkles size={20} />
                <span>Generate Encrypted Share Link</span>
              </button>
            </form>
          </div>

          {/* Saved Campaigns Section */}
          {savedGates.length > 0 && (
            <div className="panel-card saved-gates-panel">
              <div className="panel-card-header">
                <div className="panel-title-group">
                  <Share2 size={18} />
                  <h3 className="panel-title">Recent Locked Campaigns</h3>
                </div>
                <span className="panel-count">{savedGates.length}</span>
              </div>

              <div className="saved-list">
                {savedGates.map((gate) => (
                  <div key={gate.id} className="saved-item">
                    <img src={gate.coverArt || PRESET_COVERS[0].url} alt="" className="saved-thumb" />
                    <div className="saved-info">
                      <h4 className="saved-title">{gate.title}</h4>
                      <span className="saved-meta">{gate.artist} • {gate.date}</span>
                    </div>
                    <div className="saved-actions">
                      <button 
                        className="icon-action-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(gate.url);
                          alert("Link copied to clipboard!");
                        }}
                        title="Copy Shareable Link"
                      >
                        <Copy size={16} />
                      </button>
                      <a 
                        href={gate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-action-btn"
                        title="Open Gate in New Tab"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button 
                        className="icon-action-btn danger"
                        onClick={() => handleDeleteSaved(gate.id)}
                        title="Delete from History"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Mockup Device Preview */}
        <div className="studio-preview-panel">
          <div className="preview-sticky-wrap">
            <div className="preview-header-bar">
              <div className="preview-title-group">
                <Eye size={18} />
                <span>Live Visitor Gate Preview</span>
              </div>
              <div className="device-toggle-buttons">
                <button
                  className={`device-btn ${activePreviewDevice === 'mobile' ? 'active' : ''}`}
                  onClick={() => setActivePreviewDevice('mobile')}
                >
                  Mobile Mockup
                </button>
                <button
                  className={`device-btn ${activePreviewDevice === 'full' ? 'active' : ''}`}
                  onClick={() => setActivePreviewDevice('full')}
                >
                  Full Width
                </button>
              </div>
            </div>

            <div className={`preview-frame-container ${activePreviewDevice}`}>
              <div className="mockup-phone-shell">
                <div className="phone-camera-notch" />
                <div className="phone-screen-scroll">
                  <UnlockGate 
                    config={formData} 
                    isPreview={true} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share / QR Code Modal */}
      {showShareModal && (
        <div className="modal-backdrop" onClick={() => setShowShareModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-badge">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="modal-title">Your Unlock Link is Ready!</h3>
                <p className="modal-subtitle">Share this link in your YouTube description, Instagram Bio, or TikTok caption.</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Copy URL Field */}
              <div className="share-url-box">
                <input 
                  type="text" 
                  readOnly 
                  value={generatedUrl} 
                  className="share-url-input"
                />
                <button 
                  className={`copy-url-btn ${copiedLink ? 'copied' : ''}`}
                  onClick={handleCopyGenerated}
                >
                  {copiedLink ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>

              {/* QR Code Section */}
              <div className="qr-code-section">
                <div className="qr-code-wrapper">
                  <QRCodeSVG 
                    value={generatedUrl} 
                    size={160}
                    bgColor="#0e1320"
                    fgColor="#00f2fe"
                    level="Q"
                    includeMargin={true}
                  />
                </div>
                <div className="qr-code-info">
                  <h4>Scan with Mobile Camera</h4>
                  <p>Great for video streams, flyers, or quick mobile testing.</p>
                  <div className="modal-action-row">
                    <a 
                      href={generatedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="open-gate-btn"
                    >
                      <span>Open Live Gate</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
