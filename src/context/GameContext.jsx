import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../services/firebase';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { sanitizeText, checkRateLimit } from '../utils/security';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const DEFAULT_PROGRESS = {
  maths: { 1: 'current', 2: 'locked', 3: 'locked', 4: 'locked' },
  malayalam: { 1: 'current', 2: 'locked', 3: 'locked' },
  english: { 1: 'current', 2: 'locked', 3: 'locked' },
  evs: { 1: 'current', 2: 'locked', 3: 'locked' },
  gk: { 1: 'current', 2: 'locked', 3: 'locked' },
};

const STORAGE_KEY = 'orukkam_game_state';

const getLocalState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const GameProvider = ({ children }) => {
  const localData = getLocalState() || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Student Identity & Device Registration
  const [isRegistered, setIsRegistered] = useState(Boolean(localData.isRegistered));
  const [name, setName] = useState(localData.name || '');
  const [parentName, setParentName] = useState(localData.parentName || '');
  const [parentConsent, setParentConsent] = useState(Boolean(localData.parentConsent));
  // Medium of Learning ('malayalam' | 'english')
  const [medium, setMedium] = useState(localData.medium || 'malayalam');

  // Game Progress
  const [xp, setXp] = useState(typeof localData.xp === 'number' ? localData.xp : 0);
  // Energy points (Replacing hearts with energy ⚡)
  const [energy, setEnergy] = useState(
    typeof localData.energy === 'number'
      ? localData.energy
      : typeof localData.hearts === 'number'
      ? localData.hearts
      : 5
  );
  const [avatar, setAvatar] = useState(localData.avatar || 'tiger');
  const [progress, setProgress] = useState(localData.progress || DEFAULT_PROGRESS);

  // Persist game state directly to this device's localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        isRegistered,
        name,
        parentName,
        parentConsent,
        medium,
        xp,
        energy,
        hearts: energy,
        avatar,
        progress,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [isRegistered, name, parentName, parentConsent, medium, xp, energy, avatar, progress]);

  // Auth & Cloud Sync (Only for verified Parents/Teachers)
  useEffect(() => {
    let unsubscribeAuth;
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    try {
      if (!auth) {
        setLoading(false);
        return;
      }

      unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
        clearTimeout(safetyTimeout);
        if (currentUser && db) {
          const userRef = doc(db, 'users', currentUser.uid);

          const unsubscribeSnapshot = onSnapshot(
            userRef,
            (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data();
                setUser({ ...currentUser, ...data });
                if (data.parentName) setParentName(data.parentName);
                if (data.medium) setMedium(data.medium);
                if (typeof data.xp === 'number' && data.xp > xp) setXp(data.xp);
                if (typeof data.energy === 'number') setEnergy(data.energy);
                if (data.avatar) setAvatar(data.avatar);
                if (data.progress) setProgress(data.progress);
              } else {
                setUser({ ...currentUser, isNew: true });
              }
              setLoading(false);
            },
            (error) => {
              console.warn('Firestore snapshot notice:', error.message);
              setLoading(false);
            }
          );

          return () => unsubscribeSnapshot();
        } else {
          setUser(null);
          setLoading(false);
        }
      });
    } catch (error) {
      console.warn('Auth initialization notice:', error.message);
      clearTimeout(safetyTimeout);
      setLoading(false);
    }

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // --- Auth Actions ---

  const loginWithGoogle = async () => {
    try {
      if (!auth || !googleProvider) throw new Error('Auth unavailable');
      const result = await signInWithPopup(auth, googleProvider);
      return { success: true, user: result.user };
    } catch (error) {
      if (error.code === 'auth/popup-blocked' || error.message.includes('Cross-Origin')) {
        try {
          const { signInWithRedirect } = await import('firebase/auth');
          await signInWithRedirect(auth, googleProvider);
          return { success: true, pendingRedirect: true };
        } catch (redirectErr) {
          return { success: false, message: redirectErr.message };
        }
      }
      return { success: false, message: error.message };
    }
  };

  const playAsGuest = async () => {
    try {
      if (auth) {
        const { signInAnonymously } = await import('firebase/auth');
        const result = await signInAnonymously(auth);
        return { success: true, user: result.user };
      }
    } catch {
      // Guest local fallback
    }
    const mockGuest = { uid: 'guest-' + Date.now(), isAnonymous: true, isNew: false };
    setUser(mockGuest);
    return { success: true, user: mockGuest };
  };

  const registerWithEmail = async (email, password) => {
    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout clears session and resets device game data
  const logout = async () => {
    try {
      if (auth) await signOut(auth);
    } catch {
      // ignore
    }
    // Clear device state on explicit user logout
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }

    setUser(null);
    setIsRegistered(false);
    setName('');
    setParentName('');
    setParentConsent(false);
    setMedium('malayalam');
    setXp(0);
    setEnergy(5);
    setAvatar('tiger');
    setProgress(DEFAULT_PROGRESS);
  };

  // Save profile and lock in device registration
  const saveProfile = async (profileData) => {
    setIsRegistered(true);
    const cleanName = sanitizeText(profileData.name || name, 40);
    const cleanParentName = sanitizeText(profileData.parentName || parentName, 40);

    if (profileData.name) setName(cleanName);
    if (profileData.avatar) setAvatar(profileData.avatar);
    if (profileData.parentName) setParentName(cleanParentName);
    if (profileData.parentConsent !== undefined) setParentConsent(profileData.parentConsent);
    if (profileData.medium) setMedium(profileData.medium);

    // Save strictly to local device storage only (DPDP compliant - Zero remote data collection)
    try {
      const updated = {
        isRegistered: true,
        name: cleanName,
        parentName: cleanParentName,
        parentConsent: profileData.parentConsent !== undefined ? profileData.parentConsent : parentConsent,
        medium: profileData.medium || medium,
        avatar: profileData.avatar || avatar,
        xp,
        energy,
        hearts: energy,
        progress,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const updateGameState = async (updates) => {
    // Rate limit cloud writes (prevent high frequency API spam)
    if (!checkRateLimit('firestore_sync', 2, 1000)) {
      return;
    }
    if (auth?.currentUser?.uid && db) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, updates);
      } catch {
        // Fallback local
      }
    }
  };

  const addXp = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    updateGameState({ xp: newXp });
  };

  // Energy mechanics: deduct 1 energy on wrong answer
  const loseEnergy = () => {
    setEnergy((prev) => {
      const next = Math.max(0, prev - 1);
      updateGameState({ energy: next });
      return next;
    });
  };

  // Energy mechanics: refill to maximum 5
  const refillEnergy = () => {
    setEnergy(5);
    updateGameState({ energy: 5 });
  };

  const completeLevel = (landId, levelId) => {
    if (!landId || landId === 'daily') {
      addXp(50);
      return;
    }

    const currentLandProgress = progress[landId] ? { ...progress[landId] } : {};
    currentLandProgress[levelId] = 'completed';

    const nextLevel = parseInt(levelId) + 1;
    if (currentLandProgress[nextLevel] !== 'completed') {
      currentLandProgress[nextLevel] = 'current';
    }

    const newProgress = {
      ...progress,
      [landId]: currentLandProgress,
    };

    setProgress(newProgress);
    updateGameState({ progress: newProgress });
    addXp(50);
  };

  const updateLevelStatus = (landId, levelId, status) => {
    if (status === 'completed') {
      completeLevel(landId, levelId);
      return;
    }

    if (!landId || landId === 'daily') return;

    const currentLandProgress = progress[landId] ? { ...progress[landId] } : {};
    currentLandProgress[levelId] = status;

    const newProgress = {
      ...progress,
      [landId]: currentLandProgress,
    };

    setProgress(newProgress);
    updateGameState({ progress: newProgress });
  };

  const getLevelStatus = (landId, levelId) => {
    if (!progress[landId]) return levelId === 1 || levelId === '1' ? 'current' : 'locked';
    return progress[landId]?.[levelId] || (levelId === 1 || levelId === '1' ? 'current' : 'locked');
  };

  return (
    <GameContext.Provider
      value={{
        user,
        loading,
        isRegistered,
        name,
        setName,
        parentName,
        setParentName,
        parentConsent,
        setParentConsent,
        medium,
        setMedium,
        xp,
        energy,
        hearts: energy, // Alias for backward compatibility
        loseEnergy,
        loseHeart: loseEnergy, // Alias for backward compatibility
        refillEnergy,
        refillHearts: refillEnergy, // Alias for backward compatibility
        avatar,
        setAvatar,
        progress,
        addXp,
        completeLevel,
        updateLevelStatus,
        getLevelStatus,
        loginWithGoogle,
        playAsGuest,
        registerWithEmail,
        loginWithEmail,
        logout,
        saveProfile,
      }}
    >
      {!loading && children}
    </GameContext.Provider>
  );
};
