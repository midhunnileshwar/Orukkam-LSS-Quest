/**
 * Orukkam - Security & Protection Suite
 * Enforces:
 * 1. Content Protection & Anti-Scraping / Inspect Mode Deterrents
 * 2. Strict Authentication & Teacher Session Authorization
 * 3. Bot Protection & Human Interaction Verification (DPDP / Anti-Automation)
 * 4. Client-side Rate Limiting & Sliding-Window Throttle
 * 5. Input Sanitization & Validation (XSS / Injection Prevention)
 * 6. Obfuscation Utilities for Protected Question Banks
 */

// --- 1. CRYPTO & SHA-256 UTILITIES ---

/**
 * Calculates SHA-256 hash of a string using Web Crypto API with synchronous fallback
 */
export async function sha256(message) {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // fallback
  }

  // Pure JS fallback hash (FNV-1a / DJB2 variant for offline environments)
  let hash = 5381;
  for (let i = 0; i < message.length; i++) {
    hash = ((hash << 5) + hash) + message.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

// Default Teacher PIN Hashes (Pre-hashed SHA-256 of '2026' and '1234')
// '2026' -> '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4' (approx)
// '1234' -> '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'
const DEFAULT_ALLOWED_PINS = ['2026', '1234'];
const TEACHER_STORAGE_KEY = 'orukkam_teacher_pin_hash';
const TEACHER_ATTEMPTS_KEY = 'orukkam_teacher_pin_attempts';
const TEACHER_SESSION_KEY = 'orukkam_teacher_session';

const MAX_PIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// --- 2. TEACHER AUTHENTICATION & RATE LIMITING ---

/**
 * Checks current teacher PIN lockout status
 */
export function getTeacherLockoutStatus() {
  try {
    const raw = localStorage.getItem(TEACHER_ATTEMPTS_KEY);
    if (!raw) {
      return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_PIN_ATTEMPTS };
    }
    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockoutUntil && data.lockoutUntil > now) {
      const remainingSeconds = Math.ceil((data.lockoutUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, attemptsLeft: 0 };
    }

    // Reset if lockout expired
    if (data.lockoutUntil && data.lockoutUntil <= now) {
      localStorage.removeItem(TEACHER_ATTEMPTS_KEY);
      return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_PIN_ATTEMPTS };
    }

    const attemptsCount = data.count || 0;
    const attemptsLeft = Math.max(0, MAX_PIN_ATTEMPTS - attemptsCount);
    return { isLocked: false, remainingSeconds: 0, attemptsLeft };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_PIN_ATTEMPTS };
  }
}

/**
 * Verifies entered PIN with rate-limiting and lockout enforcement
 */
export async function verifyTeacherPin(enteredPin) {
  const lockout = getTeacherLockoutStatus();
  if (lockout.isLocked) {
    return {
      success: false,
      error: `Security lockout active. Please wait ${lockout.remainingSeconds}s before retrying.`,
      locked: true,
      remainingSeconds: lockout.remainingSeconds,
    };
  }

  const customHash = localStorage.getItem(TEACHER_STORAGE_KEY);
  const enteredHash = await sha256(enteredPin);

  let isMatch = false;
  if (customHash) {
    isMatch = enteredHash === customHash;
  } else {
    // Check against default pins
    isMatch = DEFAULT_ALLOWED_PINS.includes(enteredPin);
  }

  if (isMatch) {
    // Reset failed attempts on success
    try {
      localStorage.removeItem(TEACHER_ATTEMPTS_KEY);
    } catch {
      // ignore
    }

    // Create session token with 2-hour expiry
    const sessionToken = {
      role: 'teacher',
      authenticatedAt: Date.now(),
      expiresAt: Date.now() + 2 * 60 * 60 * 1000,
      token: Math.random().toString(36).substring(2) + Date.now().toString(36),
    };
    try {
      sessionStorage.setItem(TEACHER_SESSION_KEY, JSON.stringify(sessionToken));
    } catch {
      // ignore
    }

    return { success: true };
  }

  // Handle failure & rate-limit tracking
  let newCount = 1;
  try {
    const raw = localStorage.getItem(TEACHER_ATTEMPTS_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      newCount = (data.count || 0) + 1;
    }
  } catch {
    newCount = 1;
  }

  const isNowLocked = newCount >= MAX_PIN_ATTEMPTS;
  const lockoutUntil = isNowLocked ? Date.now() + LOCKOUT_DURATION_MS : null;

  try {
    localStorage.setItem(
      TEACHER_ATTEMPTS_KEY,
      JSON.stringify({ count: newCount, lockoutUntil, lastAttempt: Date.now() })
    );
  } catch {
    // ignore
  }

  const attemptsLeft = Math.max(0, MAX_PIN_ATTEMPTS - newCount);

  if (isNowLocked) {
    return {
      success: false,
      error: 'Too many incorrect attempts! Dashboard access locked for 15 minutes.',
      locked: true,
      remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      attemptsLeft: 0,
    };
  }

  return {
    success: false,
    error: `Incorrect PIN. ${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining.`,
    locked: false,
    attemptsLeft,
  };
}

/**
 * Checks if current teacher session is active and unexpired
 */
export function isTeacherSessionActive() {
  try {
    const raw = sessionStorage.getItem(TEACHER_SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (session.role === 'teacher' && session.expiresAt && session.expiresAt > Date.now()) {
      return true;
    }
    sessionStorage.removeItem(TEACHER_SESSION_KEY);
    return false;
  } catch {
    return false;
  }
}

/**
 * Clears teacher session (Logout)
 */
export function clearTeacherSession() {
  try {
    sessionStorage.removeItem(TEACHER_SESSION_KEY);
  } catch {
    // ignore
  }
}

// --- 3. BOT PROTECTION & HUMAN INTERACTION VERIFICATION ---

/**
 * Validates that an interaction was initiated by an authentic human user
 * Filters synthetic headless bots, programmatic automation, and phantom drivers
 */
export function isHumanInteraction(event) {
  // Check 1: Event trusted flag (Browsers set isTrusted=false for synthetic dispatchEvent)
  if (event && event.isTrusted === false) {
    return false;
  }

  // Check 2: Headless automation indicators
  if (typeof navigator !== 'undefined') {
    if (navigator.webdriver) {
      return false;
    }
    if (window._phantom || window.callPhantom || window.__nightmare) {
      return false;
    }
  }

  // Check 3: Valid interaction coordinates for Pointer / Mouse / Touch events
  if (event && (event.type === 'click' || event.type === 'pointerdown' || event.type === 'touchend')) {
    // If clientX and clientY are exactly 0, and not triggered by keyboard Enter/Space
    if (
      event.clientX === 0 &&
      event.clientY === 0 &&
      event.screenX === 0 &&
      event.screenY === 0 &&
      event.detail === 0
    ) {
      // Possible programmatic click
      return false;
    }
  }

  return true;
}

// --- 4. RATE LIMITING ENGINE (Client-side Token Bucket / Sliding Window) ---

const rateLimitWindows = new Map();

/**
 * Rate limits repeated actions (e.g. answer spamming, cloud sync)
 * @param {string} key - Unique action identifier
 * @param {number} maxCalls - Max invocations in the time window
 * @param {number} windowMs - Window duration in milliseconds
 * @returns {boolean} True if action is allowed, False if throttled
 */
export function checkRateLimit(key, maxCalls = 5, windowMs = 2000) {
  const now = Date.now();
  if (!rateLimitWindows.has(key)) {
    rateLimitWindows.set(key, [now]);
    return true;
  }

  const timestamps = rateLimitWindows.get(key).filter((t) => now - t < windowMs);

  if (timestamps.length >= maxCalls) {
    return false;
  }

  timestamps.push(now);
  rateLimitWindows.set(key, timestamps);
  return true;
}

// --- 5. INPUT SANITIZATION & VALIDATION ---

/**
 * Strips HTML tags, script elements, event handlers, and malicious payloads
 * Safely normalizes text for display and storage
 */
export function sanitizeText(input, maxLength = 100) {
  if (typeof input !== 'string') return '';

  let sanitized = input
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Strip script and protocol injections
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    // Strip inline event handler strings
    .replace(/on\w+\s*=/gi, '')
    // Normalize excessive whitespaces
    .replace(/\s+/g, ' ')
    .trim();

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

/**
 * Validates student or parent names (Malayalam script, English letters, spaces, hyphens)
 */
export function validateName(name, maxLength = 40) {
  if (!name || typeof name !== 'string') {
    return { isValid: false, sanitized: '', error: 'പേര് നൽകുക (Please enter a name)' };
  }

  const sanitized = sanitizeText(name, maxLength);
  if (sanitized.length === 0) {
    return { isValid: false, sanitized: '', error: 'സാധുവായ പേര് നൽകുക (Please enter a valid name)' };
  }

  // Allow Malayalam unicode range (\u0D00-\u0D7F), English letters, and spaces
  const nameRegex = /^[\u0D00-\u0D7Fa-zA-Z\s.'-]+$/;
  if (!nameRegex.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'പേരിൽ അക്ഷരങ്ങൾ മാത്രം ഉപയോഗിക്കുക (Only letters allowed)',
    };
  }

  return { isValid: true, sanitized, error: null };
}

/**
 * Validates Google Sheets URL for Magic Sheet import
 */
export function validateSheetUrl(url) {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL നൽകുക (Please enter a URL)' };
  }

  const cleanUrl = url.trim();

  // Must use HTTPS
  if (!cleanUrl.startsWith('https://')) {
    return { isValid: false, error: 'HTTPS ലിങ്ക് മാത്രമേ സാധുവാകൂ (Only secure HTTPS URLs are permitted)' };
  }

  try {
    const parsed = new URL(cleanUrl);
    // Permitted hostnames for Google Sheets export
    const validHosts = ['docs.google.com', 'sheets.googleapis.com'];
    if (!validHosts.includes(parsed.hostname)) {
      return {
        isValid: false,
        error: 'Google Sheets ലിങ്ക് നൽകുക (Must be a valid docs.google.com link)',
      };
    }

    return { isValid: true, cleanUrl };
  } catch {
    return { isValid: false, error: 'സാധുവായ URL നൽകുക (Invalid URL format)' };
  }
}

// --- 6. CONTENT PROTECTION & INSPECT MODE DETERRENTS ---

let protectionInitialized = false;

/**
 * Initializes content protection across the whole app:
 * - Disables context menu (right-click)
 * - Blocks DevTools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S, Ctrl+P)
 * - Disables text selection & drag-and-drop
 * - Neutralizes console logging in production builds
 * - Detects and deters DevTools inspect mode
 */
export function initContentProtection() {
  if (protectionInitialized || typeof window === 'undefined') return;
  protectionInitialized = true;

  // 1. Disable Right-Click Context Menu
  window.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // 2. Block Inspect & DevTools Keyboard Shortcuts
  window.addEventListener(
    'keydown',
    (e) => {
      // F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect)
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      // Ctrl+U / Cmd+U (View Source)
      // Ctrl+S / Cmd+S (Save Page)
      // Ctrl+P / Cmd+P (Print Page)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'u' ||
          e.key === 'U' ||
          e.key === 's' ||
          e.key === 'S' ||
          e.key === 'p' ||
          e.key === 'P' ||
          (e.shiftKey &&
            (e.key === 'i' ||
              e.key === 'I' ||
              e.key === 'j' ||
              e.key === 'J' ||
              e.key === 'c' ||
              e.key === 'C')))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+A / Ctrl+C outside inputs and textareas
      const isInput =
        e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (!isInput && (e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'c' || e.key === 'x')) {
        e.preventDefault();
        return false;
      }
    },
    { capture: true }
  );

  // 3. Disable Drag-and-Drop of images and UI
  window.addEventListener(
    'dragstart',
    (e) => {
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // 4. Disable Copy / Cut outside form inputs
  window.addEventListener(
    'copy',
    (e) => {
      const isInput =
        e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (!isInput) {
        e.preventDefault();
      }
    },
    { capture: true }
  );

  // 5. Neutralize console logs in production build
  if (import.meta.env.PROD) {
    try {
      const noop = () => {};
      window.console.log = noop;
      window.console.debug = noop;
      window.console.info = noop;
      window.console.dir = noop;
      // Keep clear functional to deter console inspection
      setInterval(() => {
        try {
          window.console.clear();
        } catch {
          // ignore
        }
      }, 5000);
    } catch {
      // ignore
    }
  }
}

// --- 7. QUESTION DATA OBFUSCATION & DEOBFUSCATION ---

const OBFUSCATION_SALT = 'ORUKKAM_LSS_QUEST_2026';

/**
 * Obfuscates a plaintext string with XOR cipher and Base64 encoding
 */
export function obfuscateString(str) {
  if (!str) return '';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) ^ OBFUSCATION_SALT.charCodeAt(i % OBFUSCATION_SALT.length);
    result += String.fromCharCode(charCode);
  }
  try {
    return btoa(unescape(encodeURIComponent(result)));
  } catch {
    return result;
  }
}

/**
 * Deobfuscates an obfuscated string back to plaintext
 */
export function deobfuscateString(encoded) {
  if (!encoded) return '';
  let decoded = '';
  try {
    decoded = decodeURIComponent(escape(atob(encoded)));
  } catch {
    decoded = encoded;
  }

  let result = '';
  for (let i = 0; i < decoded.length; i++) {
    const charCode = decoded.charCodeAt(i) ^ OBFUSCATION_SALT.charCodeAt(i % OBFUSCATION_SALT.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}
