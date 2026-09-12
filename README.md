# 🚀 AudienceGrow - Sub2Unlock Social Growth Platform

A high-converting, modern **Sub2Unlock / Social Download Gate** built with **React & Vite**, designed to run **100% free on GitHub Pages** with zero backend or monthly fees.

---

## 🎯 How It Works

1. **Creator Dashboard**: Enter your file/MP3 details, YouTube Channel, Instagram Profile, WhatsApp Channel, and secret destination download link.
2. **Encrypted Link Generation**: The app generates a shareable URL (`yourusername.github.io/#/unlock?data=...`) where the secret destination URL is encrypted.
3. **Locked Visitor Gate**: Visitors must complete 3 social actions:
   - 🔴 **Step 1:** Subscribe to YouTube
   - 📸 **Step 2:** Follow on Instagram
   - 💬 **Step 3:** Join WhatsApp Channel
4. **Smart Verification & Celebration**: Realistic 6-second countdown verification ensures user engagement, followed by a **Confetti Blast 🎉** and the glowing **Download Button & Audio Player** reveal!

---

## 🛡️ Link Security & Protection

- **Zero Hardcoded Private Links in Repository**: Your MP3 or Google Drive download links are never stored in the GitHub repository.
- **Client-Side Dynamic Obfuscation/Masking**: The destination URL is encrypted into the share link parameters and is only decrypted and mounted into the DOM after all 3 steps are verified.
- **Vite Production Bundling**: JavaScript files are minified, mangled, and chunked.

---

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploy Free to GitHub Pages in 2 Minutes

### 1. Initialize Git and Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - AudienceGrow Sub2Unlock platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Navigate to **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, choose **GitHub Actions**.
4. That's it! GitHub will automatically run the included `.github/workflows/deploy.yml` and publish your site at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

---

## 🛠️ Built With

- **React 19**
- **Vite 6**
- **Lucide Icons**
- **Canvas Confetti**
- **QRCode SVG**
- **Web Audio API**
