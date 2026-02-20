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
  getDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Game State
  const [xp, setXp] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [avatar, setAvatar] = useState('boy');
  const [progress, setProgress] = useState({
    maths: { 1: 'current', 2: 'locked', 3: 'locked', 4: 'locked' },
    malayalam: { 1: 'current', 2: 'locked' },
    english: { 1: 'current', 2: 'locked' },
    evs: { 1: 'current', 2: 'locked' },
    gk: { 1: 'current', 2: 'locked' },
  });

  // Listen for Auth Changes & Realtime DB Updates
  useEffect(() => {
    let unsubscribeAuth;
    // Safety timeout to prevent infinite blank screen
    const safetyTimeout = setTimeout(() => {
      console.warn("Auth listener timed out, forcing app load");
      setLoading(false);
    }, 3000);

    try {
      unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
        clearTimeout(safetyTimeout);
        if (currentUser) {
          // User logged in, listen to their Firestore document
          const userRef = doc(db, "users", currentUser.uid);

          const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUser({ ...currentUser, ...data }); // Merge Auth + DB data
              setXp(data.xp || 0);
              setHearts(data.hearts || 5);
              setAvatar(data.avatar || 'boy');
              if (data.progress) setProgress(data.progress);
            } else {
              // New User (Doc doesn't exist yet) - ProfileSetup will handle creation
              setUser({ ...currentUser, isNew: true });
            }
            setLoading(false);
          }, (error) => {
            console.error("Firestore snapshot error:", error);
            setLoading(false); // Ensure we don't hang on error
          });

          return () => unsubscribeSnapshot();
        } else {
          // User logged out
          setUser(null);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Auth initialization error:", error);
      clearTimeout(safetyTimeout);
      setLoading(false);
    }

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // --- Actions ---

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Check if new user doc exists handled in use effect
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Google Login Error", error);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // --- Database Updates ---

  const saveProfile = async (profileData) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, {
      ...profileData,
      xp,
      hearts,
      progress,
      createdAt: new Date()
    }, { merge: true });

    // Update local state immediately to reflect changes
    setAvatar(profileData.avatar);
  };

  const updateGameState = async (updates) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, updates);
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
    const newProgress = { ...progress };
    const landProgress = { ...newProgress[landId] };
    landProgress[levelId] = 'completed';

    // Unlock next level
    const nextLevel = parseInt(levelId) + 1;
    // Simple logic: just unlock next ID
    landProgress[nextLevel] = 'current';

    newProgress[landId] = landProgress;
    setProgress(newProgress);

    // Update DB
    updateGameState({ progress: newProgress });
    addXp(50);
  };

  const getLevelStatus = (landId, levelId) => {
    return progress[landId]?.[levelId] || 'locked';
  };

  return (
    <GameContext.Provider
      value={{
        user,
        loading,
        xp,
        hearts,
        avatar,
        progress,
        addXp,
        loseHeart,
        refillHearts,
        completeLevel,
        getLevelStatus,
        loginWithGoogle,
        logout,
        saveProfile,
        setAvatar // Kept for compatibility, though saveProfile is preferred
      }}
    >
      {!loading && children}
    </GameContext.Provider>
  );
};
