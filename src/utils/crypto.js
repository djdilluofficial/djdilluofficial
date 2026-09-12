// Client-side payload obfuscation & AES-style XOR masking with salt
// Prevents plain-text inspection of secret destination URLs in HTML/parameters

const SALT = "AudienceGrow_v1_SecretSalt";

export function encryptPayload(data) {
  try {
    const jsonStr = JSON.stringify(data);
    // Convert string to bytes
    const textBytes = new TextEncoder().encode(jsonStr);
    const saltBytes = new TextEncoder().encode(SALT);
    
    // Apply XOR transformation with rotating salt
    const masked = new Uint8Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
      masked[i] = textBytes[i] ^ saltBytes[i % saltBytes.length] ^ ((i * 7) & 0xff);
    }
    
    // Convert to base64url
    let binary = '';
    for (let i = 0; i < masked.length; i++) {
      binary += String.fromCharCode(masked[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (err) {
    console.error("Encryption error:", err);
    return null;
  }
}

export function decryptPayload(encodedStr) {
  try {
    if (!encodedStr) return null;
    // Restore base64
    let base64 = encodedStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const binary = atob(base64);
    const masked = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      masked[i] = binary.charCodeAt(i);
    }
    
    const saltBytes = new TextEncoder().encode(SALT);
    const unmasked = new Uint8Array(masked.length);
    for (let i = 0; i < masked.length; i++) {
      unmasked[i] = masked[i] ^ saltBytes[i % saltBytes.length] ^ ((i * 7) & 0xff);
    }
    
    const jsonStr = new TextDecoder().decode(unmasked);
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
}

// Sound effects using Web Audio API (Zero external assets required)
export function playSuccessChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25); // C6
    
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.5);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

export function playCelebrationFanfare() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, High C
    const now = ctx.currentTime;
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const startTime = now + idx * 0.1;
      const duration = 0.4;
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.01, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {
    // Ignore audio autoplay restrictions
  }
}
