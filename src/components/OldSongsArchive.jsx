import React, { useState } from 'react';
import { 
  Music, 
  Download, 
  Play, 
  Search, 
  Sparkles, 
  ArrowLeft, 
  ExternalLink,
  Disc3,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { OLD_SONGS_DATABASE } from '../data/oldSongs';

export default function OldSongsArchive({ onBackToGate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter categories
  const categories = ['All', 'Top Telugu Folk', 'Full Bass', 'Dance Mix', 'Tapori Blast', 'Rela Re Rela'];

  const filteredSongs = OLD_SONGS_DATABASE.filter(song => {
    const matchesSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          song.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || song.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="old-songs-archive-container">
      {/* Header Banner */}
      <div className="archive-header-card">
        <div className="archive-header-top">
          <button className="back-to-gate-btn" onClick={onBackToGate}>
            <ArrowLeft size={16} />
            <span>Back to Latest VIP Release</span>
          </button>
          
          <div className="archive-badge">
            <Sparkles size={13} />
            <span>Official Classic Archive</span>
          </div>
        </div>

        <div className="archive-title-section">
          <div className="archive-icon-box">
            <Disc3 size={28} className="spin-slow" />
          </div>
          <div>
            <h1 className="archive-main-title">DJ Dillu Old Songs & Classic Mixes</h1>
            <p className="archive-subtitle">
              Browse and download all {OLD_SONGS_DATABASE.length}+ classic Folk, Full Bass, and Tapori DJ remixes.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="archive-controls">
          <div className="archive-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search old songs, dialogue mixes, folk tracks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="archive-search-input"
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>

          <div className="category-chips">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' && <Flame size={13} />}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Songs Table / List */}
      <div className="archive-songs-card">
        <div className="archive-list-meta">
          <span className="results-count">Showing {filteredSongs.length} Tracks</span>
          <span className="direct-hint">⚡ All files hosted on High-Speed Google Drive</span>
        </div>

        <div className="archive-songs-grid">
          {filteredSongs.map((song, idx) => (
            <div key={song.id || idx} className="archive-song-row">
              <div className="song-left-col">
                <div className="song-num-box">
                  <Music size={16} />
                </div>
                <div className="song-details">
                  <h3 className="song-name">{song.name}</h3>
                  <span className="song-category-tag">{song.category}</span>
                </div>
              </div>

              <div className="song-actions-col">
                <a 
                  href={song.listenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="song-action-btn listen-btn"
                  title="Listen / Preview Track"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Listen</span>
                </a>

                <a 
                  href={song.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="song-action-btn download-btn"
                  title="Direct Download MP3"
                >
                  <Download size={14} />
                  <span>Download MP3</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}

          {filteredSongs.length === 0 && (
            <div className="no-songs-found">
              <p>No songs found matching "{searchTerm}". Try a different search term!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
