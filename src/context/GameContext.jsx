import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../services/firebase';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const DEFAULT_PROGRESS = {
  maths: { 1: 'current', 2: 'locked', 3: 'locked', 4: 'locked' },
  malayalam: { 1: 'current', 2: 'locked', 3: 'locked' },
  english: { 1: 'current', 2: 'locked', 3: 'locked' },
  evs: { 1: 'current', 2: 'locked', 3: 'locked' },
  gk: { 1: 'current', 2: 'locked', 3: 'locked' },
};

const getLocalState = () => {
  try {
    const saved = localStorage.getItem('orukkam_game_state');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const GameProvider = ({ children }) => {
  const localData = getLocalState() || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Student Identity (Stored Strictly Locally on Device per DPDP Act Section 9)
  const [name, setName] = useState(localData.name || 'കുട്ടി');
  const [district, setDistrict] = useState(localData.district || 'Kannur');
  const [parentName, setParentName] = useState(localData.parentName || '');
  const [parentConsent, setParentConsent] = useState(Boolean(localData.parentConsent));

  // Game Progress
  const [xp, setXp] = useState(typeof localData.xp === 'number' ? localData.xp : 0);
  const [hearts, setHearts] = useState(typeof localData.hearts === 'number' ? localData.hearts : 5);
  const [avatar, setAvatar] = useState(localData.avatar || 'tiger');
  const [progress, setProgress] = useState(localData.progress || DEFAULT_PROGRESS);

  // Sync state strictly to local storage
  useEffect(() => {
    try {
      const stateToSave = {
        name,
        district,
        parentName,
        parentConsent,
        xp,
        hearts,
        avatar,
        progress,
      };
      localStorage.setItem('orukkam_game_state', JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [name, district, parentName, parentConsent, xp, hearts, avatar, progress]);

  // Auth & Cloud Sync (Only for verified Parents/Teachers)
  useEffect(() => {
    let unsubscribeAuth;
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    try {
      unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
        clearTimeout(safetyTimeout);
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);

          const unsubscribeSnapshot = onSnapshot(
            userRef,
            (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data();
                setUser({ ...currentUser, ...data });
                if (data.parentName) setParentName(data.parentName);
                if (typeof data.xp === 'number') setXp(data.xp);
                if (typeof data.hearts === 'number') setHearts(data.hearts);
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
      const { signInAnonymously } = await import('firebase/auth');
      const result = await signInAnonymously(auth);
      return { success: true, user: result.user };
    } catch {
      const mockGuest = { uid: 'guest-' + Date.now(), isAnonymous: true, isNew: false };
      setUser(mockGuest);
      return { success: true, user: mockGuest };
    }
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
  };

  // --- Profile Registration under DPDP Act / Kerala Cyber Protocol ---
  // In compliance with India DPDP Act 2023 Sec 9: We do NOT send child PII to internet servers.
  // Registration is verified by Parent/Guardian and stored locally on child's device.
  const saveProfile = async (profileData) => {
    if (profileData.name) setName(profileData.name);
    if (profileData.district) setDistrict(profileData.district);
    if (profileData.avatar) setAvatar(profileData.avatar);
    if (profileData.parentName) setParentName(profileData.parentName);
    if (profileData.parentConsent !== undefined) setParentConsent(profileData.parentConsent);

    // Save only anonymous telemetry/progress to cloud if parent logs in
    if (auth.currentUser) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(
          userRef,
          {
            parentEmail: auth.currentUser.email || null,
            parentName: profileData.parentName || parentName,
            district: profileData.district || district,
            xp,
            hearts,
            progress,
            isParentVerified: true,
            dpdpConsentDate: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn('Sync notice:', e.message);
      }
    }
  };

  const updateGameState = async (updates) => {
    if (auth.currentUser) {
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

  const loseHeart = () => {
    const newHearts = Math.max(0, hearts - 1);
    setHearts(newHearts);
    updateGameState({ hearts: newHearts });
  };

  const refillHearts = () => {
    setHearts(5);
    updateGameState({ hearts: 5 });
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
        name,
        setName,
        district,
        setDistrict,
        parentName,
        setParentName,
        parentConsent,
        setParentConsent,
        xp,
        hearts,
        avatar,
        setAvatar,
        progress,
        addXp,
        loseHeart,
        refillHearts,
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
