import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Loader2, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  Copy, 
  Check, 
  Music, 
  ArrowRight, 
  RotateCcw,
  Bell
} from 'lucide-react';
import { YoutubeIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons';
import AudioWave from './AudioWave';
import { playSuccessChime, playCelebrationFanfare } from '../utils/crypto';

export default function UnlockGate({ config, isPreview = false, onEditInStudio, onOpenOldSongs }) {
  const [steps, setSteps] = useState({
    youtube: 'idle', // 'idle' | 'checking' | 'need_bell' | 'completed'
    instagram: 'idle',
    whatsapp: 'idle',
  });

  const [youtubeAttempts, setYoutubeAttempts] = useState(0);

  const [countdowns, setCountdowns] = useState({
    youtube: 0,
    instagram: 0,
    whatsapp: 0,
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [unlockedAt, setUnlockedAt] = useState(null);
  const audioRef = useRef(null);
  const confettiFiredRef = useRef(false);

  // Calculate overall progress
  const completedCount = Object.values(steps).filter(s => s === 'completed').length;
  const totalSteps = 3;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isFullyUnlocked = completedCount === totalSteps;

  // Trigger celebration on unlock
  useEffect(() => {
    if (isFullyUnlocked && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      setUnlockedAt(Date.now());
      playCelebrationFanfare();

      // Confetti burst
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#00f2fe', '#4facfe', '#ff007f', '#00e676', '#ffea00'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFullyUnlocked]);

  // Handle Action Click
  const handleActionClick = (stepKey, url, durationSeconds = 5) => {
    if (steps[stepKey] === 'completed') return;

    // 1. Open social link in new window/tab
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // 2. Start checking timer
    setSteps(prev => ({ ...prev, [stepKey]: 'checking' }));
    setCountdowns(prev => ({ ...prev, [stepKey]: durationSeconds }));

    const timerInterval = setInterval(() => {
      setCountdowns(prev => {
        const currentVal = prev[stepKey];
        if (currentVal <= 1) {
          clearInterval(timerInterval);
          
          // If YouTube and first attempt: ask for Bell / double confirmation
          if (stepKey === 'youtube' && youtubeAttempts === 0) {
            setYoutubeAttempts(1);
            setSteps(s => ({ ...s, youtube: 'need_bell' }));
          } else {
            setSteps(s => ({ ...s, [stepKey]: 'completed' }));
            playSuccessChime();
          }

          return { ...prev, [stepKey]: 0 };
        }
        return { ...prev, [stepKey]: currentVal - 1 };
      });
    }, 1000);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  const handleCopyLink = () => {
    if (config?.targetUrl) {
      navigator.clipboard.writeText(config.targetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReset = () => {
    setSteps({
      youtube: 'idle',
      instagram: 'idle',
      whatsapp: 'idle',
    });
    setYoutubeAttempts(0);
    setCountdowns({ youtube: 0, instagram: 0, whatsapp: 0 });
    confettiFiredRef.current = false;
    setUnlockedAt(null);
  };

  const defaultCover = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80";

  return (
    <div className={`unlock-gate-wrapper ${isPreview ? 'is-preview' : ''}`}>
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <div className="gate-card">
        {/* Shining Scrolling Marquee Banner */}
        <div className="shining-marquee-bar">
          <div className="shining-glimmer-sweep" />
          <div className="marquee-track">
            <div className="marquee-content">
              <span className="shining-text">🔥 100% FREE DOWNLOAD</span>
              <span className="marquee-dot">•</span>
              <span className="shining-text">⚡ 320 KBPS MASTER AUDIO</span>
              <span className="marquee-dot">•</span>
              <span className="shining-text">🎧 DJ DILLU VIP DROP</span>
              <span className="marquee-dot">•</span>
              <span className="shining-text">🎁 FREE MP3 DOWNLOAD</span>
              <span className="marquee-dot">•</span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span className="shining-text">🔥 100% FREE DOWNLOAD</span>
              <span className="marquee-dot">•</span>
              <span className="shining-text">⚡ 320 KBPS MASTER AUDIO</span>
              <span className="marquee-dot">•</span>
              <span className="shining-text">🎧 DJ DILLU VIP DROP</span>
              <span className="marquee-dot">•</span>
              <span className="shining-text">🎁 FREE MP3 DOWNLOAD</span>
              <span className="marquee-dot">•</span>
            </div>
          </div>
        </div>

        {/* Top Header / Track info */}
        <div className="gate-header">
          <div className="cover-art-container">
            <img 
              src={config?.coverArt || defaultCover} 
              alt={config?.title || "Exclusive Release"} 
              className="cover-art-img"
              onError={(e) => { e.target.src = defaultCover; }}
            />
            <div className="cover-glow" />
            
            {/* Lock Status Overlay Badge */}
            <div className={`lock-badge ${isFullyUnlocked ? 'unlocked' : 'locked'}`}>
              {isFullyUnlocked ? (
                <>
                  <Unlock size={14} className="badge-icon unlock-anim" />
                  <span>UNLOCKED</span>
                </>
              ) : (
                <>
                  <Lock size={14} className="badge-icon lock-pulse" />
                  <span>LOCKED</span>
                </>
              )}
            </div>

            {/* Teaser Audio Player (Optional) */}
            {config?.previewAudioUrl && (
              <button 
                className={`audio-preview-toggle ${isPlayingAudio ? 'playing' : ''}`}
                onClick={toggleAudio}
                title={isPlayingAudio ? "Pause Preview" : "Play Preview"}
              >
                {isPlayingAudio ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                <audio 
                  ref={audioRef} 
                  src={config.previewAudioUrl} 
                  onEnded={() => setIsPlayingAudio(false)} 
                />
              </button>
            )}
          </div>

          <div className="track-details">
            <div className="creator-pill">
              <Sparkles size={12} />
              <span>{config?.artist || "Official Release"}</span>
            </div>
            <h1 className="track-title">{config?.title || "Exclusive Sound / Audio File"}</h1>
            <p className="track-subtitle">
              {isFullyUnlocked 
                ? "🎉 Success! Your VIP download is ready below." 
                : "Complete all 3 quick steps below to get your exclusive MP3 download!"}
            </p>

            <AudioWave isPlaying={isFullyUnlocked || isPlayingAudio} bars={20} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-meta">
            <span className="progress-label">
              {isFullyUnlocked ? "100% Steps Completed" : `Unlock Progress: ${completedCount}/3 Completed`}
            </span>
            <span className="progress-percent">{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div 
              className={`progress-fill ${isFullyUnlocked ? 'full-glow' : ''}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step-by-Step Locker Buttons */}
        <div className="steps-container">
          {/* STEP 1: YOUTUBE */}
          <div className={`step-item ${steps.youtube === 'need_bell' ? 'need-action' : steps.youtube}`}>
            <div className="step-left">
              <div className="step-icon-box youtube-icon-box">
                <YoutubeIcon size={20} />
              </div>
              <div className="step-info">
                <span className="step-tag">Step 1 {steps.youtube === 'need_bell' ? '• Verify' : ''}</span>
                <span className="step-title">
                  {steps.youtube === 'need_bell' 
                    ? "Subscribe & Turn ON 🔔 Bell on YouTube"
                    : "Subscribe to YouTube Channel"}
                </span>
              </div>
            </div>

            <div className="step-right">
              {steps.youtube === 'completed' ? (
                <div className="step-completed-badge">
                  <CheckCircle2 size={18} />
                  <span>Subscribed & Bell Active</span>
                </div>
              ) : steps.youtube === 'checking' ? (
                <button className="step-btn checking" disabled>
                  <Loader2 size={16} className="spin" />
                  <span>Verifying ({countdowns.youtube}s)</span>
                </button>
              ) : steps.youtube === 'need_bell' ? (
                <button 
                  className="step-btn action-youtube-bell pulse-bell"
                  onClick={() => handleActionClick('youtube', config?.youtubeUrl || 'https://youtube.com', 4)}
                  title="Click to confirm Subscription and Bell Icon"
                >
                  <Bell size={14} className="bell-ring" />
                  <span>Hit Bell & Confirm</span>
                  <ExternalLink size={13} />
                </button>
              ) : (
                <button 
                  className="step-btn action-youtube"
                  onClick={() => handleActionClick('youtube', config?.youtubeUrl || 'https://youtube.com', 5)}
                >
                  <span>Subscribe</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>

          {/* STEP 2: INSTAGRAM */}
          <div className={`step-item ${steps.instagram}`}>
            <div className="step-left">
              <div className="step-icon-box instagram-icon-box">
                <InstagramIcon size={20} />
              </div>
              <div className="step-info">
                <span className="step-tag">Step 2</span>
                <span className="step-title">Follow on Instagram</span>
              </div>
            </div>

            <div className="step-right">
              {steps.instagram === 'completed' ? (
                <div className="step-completed-badge">
                  <CheckCircle2 size={18} />
                  <span>Followed</span>
                </div>
              ) : steps.instagram === 'checking' ? (
                <button className="step-btn checking" disabled>
                  <Loader2 size={16} className="spin" />
                  <span>Checking ({countdowns.instagram}s)</span>
                </button>
              ) : (
                <button 
                  className="step-btn action-instagram"
                  onClick={() => handleActionClick('instagram', config?.instagramUrl || 'https://instagram.com')}
                >
                  <span>Follow</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>

          {/* STEP 3: WHATSAPP */}
          <div className={`step-item ${steps.whatsapp}`}>
            <div className="step-left">
              <div className="step-icon-box whatsapp-icon-box">
                <WhatsAppIcon size={20} />
              </div>
              <div className="step-info">
                <span className="step-tag">Step 3</span>
                <span className="step-title">Join WhatsApp Channel</span>
              </div>
            </div>

            <div className="step-right">
              {steps.whatsapp === 'completed' ? (
                <div className="step-completed-badge">
                  <CheckCircle2 size={18} />
                  <span>Joined</span>
                </div>
              ) : steps.whatsapp === 'checking' ? (
                <button className="step-btn checking" disabled>
                  <Loader2 size={16} className="spin" />
                  <span>Checking ({countdowns.whatsapp}s)</span>
                </button>
              ) : (
                <button 
                  className="step-btn action-whatsapp"
                  onClick={() => handleActionClick('whatsapp', config?.whatsappUrl || 'https://whatsapp.com')}
                >
                  <span>Join Channel</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* UNLOCKED DESTINATION CARD */}
        <div className={`unlocked-card-wrapper ${isFullyUnlocked ? 'revealed' : 'locked-hidden'}`}>
          {isFullyUnlocked ? (
            <div className="unlocked-content-card">
              <div className="unlocked-header">
                <div className="unlocked-icon-pulse">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="unlocked-title">Content Successfully Unlocked!</h3>
                  <p className="unlocked-desc">Thank you for supporting the artist. Your file is ready.</p>
                </div>
              </div>

              <div className="unlocked-actions">
                <a 
                  href={config?.targetUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-download-btn pulse-glow"
                >
                  <Download size={20} />
                  <span>Download MP3 / Access Content</span>
                  <ArrowRight size={18} />
                </a>

                <div className="secondary-actions">
                  <button className="secondary-btn" onClick={handleCopyLink}>
                    {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedLink ? "Link Copied!" : "Copy Target Link"}</span>
                  </button>
                  
                  <button className="secondary-btn" onClick={handleReset} title="Test unlock flow again">
                    <RotateCcw size={16} />
                    <span>Reset Flow</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="locked-placeholder">
              <Lock size={20} />
              <span>Unlock all 3 social steps above to reveal the download button</span>
            </div>
          )}
        </div>

        {/* Studio Edit banner if in preview mode */}
        {isPreview && (
          <div className="preview-indicator-bar">
            <span>⚡ Interactive Live Preview Mode</span>
            {onEditInStudio && (
              <button className="btn-inline-link" onClick={onEditInStudio}>
                Edit Details in Creator Studio &rarr;
              </button>
            )}
          </div>
        )}

        {/* Old Songs Download Archive CTA */}
        {onOpenOldSongs && (
          <div className="old-songs-portal-card" onClick={onOpenOldSongs}>
            <div className="old-songs-card-left">
              <div className="old-songs-icon-circle">
                <Music size={18} />
              </div>
              <div className="old-songs-text-group">
                <div className="old-songs-badge-pill">Classic Archive • 25+ Songs</div>
                <h4 className="old-songs-card-title">Old Songs & Classic Mixes Download</h4>
                <p className="old-songs-card-desc">Direct GDrive & MediaFire links for all previous DJ mixes</p>
              </div>
            </div>
            <button className="old-songs-cta-btn" onClick={onOpenOldSongs}>
              <span>Open</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
