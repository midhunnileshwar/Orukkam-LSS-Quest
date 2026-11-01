/**
 * Orukkam - Real-Time Content & Level Sync Engine
 *
 * Enables real-time level and question updates across all logged-in/playing users:
 * 1. Cloud Real-Time Broadcast: Uses Firestore onSnapshot to push teacher updates
 *    instantly to all student devices across Kerala.
 * 2. Multi-Tab / Local Broadcast: Uses BroadcastChannel & storage events for
 *    instant reflection across tabs on the same device.
 * 3. Offline Resilience: Automatically merges incoming cloud questions into
 *    localStorage for instant offline gameplay.
 */

import { db } from './firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const BROADCAST_CHANNEL_NAME = 'orukkam_realtime_content';
const CUSTOM_QUESTIONS_KEY = 'orukkam_custom_questions';
const DOM_EVENT_NAME = 'orukkam_content_updated';

// Shared BroadcastChannel instance (with fallback if unsupported)
let channel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  }
} catch {
  channel = null;
}

/**
 * Safely merges incoming remote questions into local storage
 */
export function mergeQuestionsIntoLocalStorage(landId, levelId, levelData) {
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    const store = raw ? JSON.parse(raw) : {};

    if (!store[landId]) store[landId] = {};
    store[landId][levelId] = levelData;

    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Could not cache custom questions locally', e);
  }
}

/**
 * Publishes a level update from Teacher Dashboard:
 * - Updates local storage
 * - Pushes to Firestore real-time cloud collection (if db available)
 * - Broadcasts to all local tabs & windows via BroadcastChannel and DOM events
 */
export async function publishLevelUpdate(landId, levelId, levelData) {
  const timestamp = Date.now();

  // 1. Save to local device storage immediately
  mergeQuestionsIntoLocalStorage(landId, levelId, levelData);

  // 2. Broadcast via local BroadcastChannel
  if (channel) {
    try {
      channel.postMessage({
        type: 'LEVEL_UPDATED',
        landId,
        levelId,
        levelData,
        timestamp,
      });
    } catch {
      // ignore
    }
  }

  // 3. Dispatch DOM event for same-window subscribers
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent(DOM_EVENT_NAME, {
          detail: { landId, levelId, levelData, timestamp },
        })
      );
    } catch {
      // ignore
    }
  }

  // 4. Push to Firestore cloud for real-time distribution to all student devices
  if (db) {
    try {
      const contentRef = doc(db, 'game_content', 'published_levels');
      // Update with dot-notation to avoid overwriting other lands/levels
      await setDoc(
        contentRef,
        {
          [`${landId}_${levelId}`]: levelData,
          lastUpdatedLand: landId,
          lastUpdatedLevel: levelId,
          updatedAt: timestamp,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Cloud sync notice (offline mode active):', err.message);
    }
  }
}

/**
 * Subscribes to real-time content updates from Cloud, BroadcastChannel, and Local Storage
 * @param {Function} onUpdate - callback({ landId, levelId, levelData, timestamp, source })
 * @returns {Function} unsubscribe function
 */
export function subscribeToContentUpdates(onUpdate) {
  if (typeof window === 'undefined') return () => {};

  const cleanups = [];

  // 1. Listen to Local BroadcastChannel
  if (channel) {
    const handleBroadcast = (event) => {
      if (event?.data?.type === 'LEVEL_UPDATED') {
        const { landId, levelId, levelData, timestamp } = event.data;
        mergeQuestionsIntoLocalStorage(landId, levelId, levelData);
        onUpdate({
          landId,
          levelId,
          levelData,
          timestamp,
          source: 'broadcast',
        });
      }
    };
    channel.addEventListener('message', handleBroadcast);
    cleanups.push(() => channel.removeEventListener('message', handleBroadcast));
  }

  // 2. Listen to same-window DOM events
  const handleDomEvent = (e) => {
    if (e?.detail) {
      onUpdate({
        ...e.detail,
        source: 'dom',
      });
    }
  };
  window.addEventListener(DOM_EVENT_NAME, handleDomEvent);
  cleanups.push(() => window.removeEventListener(DOM_EVENT_NAME, handleDomEvent));

  // 3. Listen to cross-tab storage events (fallback)
  const handleStorage = (e) => {
    if (e.key === CUSTOM_QUESTIONS_KEY && e.newValue) {
      onUpdate({
        source: 'storage',
        timestamp: Date.now(),
      });
    }
  };
  window.addEventListener('storage', handleStorage);
  cleanups.push(() => window.removeEventListener('storage', handleStorage));

  // 4. Listen to Cloud Firestore real-time updates (cross-device)
  if (db) {
    try {
      const contentRef = doc(db, 'game_content', 'published_levels');
      let isFirstSnapshot = true;

      const unsubscribeFirestore = onSnapshot(
        contentRef,
        (snapshot) => {
          // Skip initial load snapshot to avoid redundant reload triggers
          if (isFirstSnapshot) {
            isFirstSnapshot = false;
            if (snapshot.exists()) {
              const data = snapshot.data();
              // Cache initial cloud questions silently
              Object.keys(data).forEach((key) => {
                if (key.includes('_')) {
                  const [lId, lvlId] = key.split('_');
                  mergeQuestionsIntoLocalStorage(lId, lvlId, data[key]);
                }
              });
            }
            return;
          }

          if (snapshot.exists()) {
            const data = snapshot.data();
            const landId = data.lastUpdatedLand;
            const levelId = data.lastUpdatedLevel;
            const updatedLevelData = data[`${landId}_${levelId}`];

            if (landId && levelId && updatedLevelData) {
              mergeQuestionsIntoLocalStorage(landId, levelId, updatedLevelData);
            }

            onUpdate({
              landId,
              levelId,
              levelData: updatedLevelData,
              timestamp: data.updatedAt || Date.now(),
              source: 'cloud',
            });
          }
        },
        (err) => {
          console.warn('Real-time cloud listener notice:', err.message);
        }
      );

      cleanups.push(unsubscribeFirestore);
    } catch (e) {
      console.warn('Firestore subscription notice:', e);
    }
  }

  return () => {
    cleanups.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
  };
}
