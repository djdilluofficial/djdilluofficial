import React from 'react';
import { X, Terminal, CheckCircle2, Globe, Rocket, Shield } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function DeployGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card deploy-guide-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-badge">
            <Rocket size={24} />
          </div>
          <div>
            <h3 className="modal-title">Deploy Free on GitHub Pages</h3>
            <p className="modal-subtitle">Follow these 3 easy steps to host this app on your free GitHub domain.</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body guide-steps-list">
          {/* Step 1 */}
          <div className="guide-step-card">
            <div className="guide-step-num">1</div>
            <div className="guide-step-content">
              <h4>Create a new repository on GitHub</h4>
              <p>Go to GitHub.com and create a new public repository (e.g. <code>audience-grow</code> or <code>username.github.io</code>).</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="guide-step-card">
            <div className="guide-step-num">2</div>
            <div className="guide-step-content">
              <h4>Push your local files to GitHub</h4>
              <p>Run these terminal commands in your project folder:</p>
              <pre className="code-block">
                <code>{`git init
git add .
git commit -m "Initial commit of AudienceGrow platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`}</code>
              </pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="guide-step-card">
            <div className="guide-step-num">3</div>
            <div className="guide-step-content">
              <h4>Enable GitHub Pages in Settings</h4>
              <p>Go to your GitHub repo <strong>Settings &rarr; Pages</strong>:</p>
              <ul>
                <li><strong>Source:</strong> Select <code>GitHub Actions</code></li>
              </ul>
              <p className="note-text">
                ✅ Our included <code>.github/workflows/deploy.yml</code> will automatically build and publish your site whenever you push changes!
              </p>
            </div>
          </div>

          {/* Security highlight */}
          <div className="security-card">
            <Shield size={20} className="text-cyan" />
            <div>
              <strong>Why this is safe on open-source:</strong>
              <p>All destination MP3 links are encrypted in the URL and never stored in the source code. Anyone can use your hosted app safely without seeing your private files.</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="generate-gate-btn" onClick={onClose}>
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
}
