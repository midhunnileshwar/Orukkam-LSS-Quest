import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockServer } from '../services/mockServer';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    // Load from local storage or default
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('orukkam_xp')) || 0);
    const [hearts, setHearts] = useState(() => parseInt(localStorage.getItem('orukkam_hearts')) || 5);

    // Level Progress: { maths: { 1: 'completed', 2: 'current', 3: 'locked' } }
    // Level Progress: { maths: { 1: 'completed', 2: 'current', 3: 'locked' } }
    const [progress, setProgress] = useState(() => {
        try {
            const saved = localStorage.getItem('orukkam_progress');
            return saved ? JSON.parse(saved) : {
                maths: { 1: 'current', 2: 'locked', 3: 'locked', 4: 'locked' },
                malayalam: { 1: 'current', 2: 'locked' },
                english: { 1: 'current', 2: 'locked' },
                evs: { 1: 'current', 2: 'locked' },
                gk: { 1: 'current', 2: 'locked' }
            };
        } catch (e) {
            console.error("Failed to parse progress", e);
            return {
                maths: { 1: 'current', 2: 'locked' },
                malayalam: { 1: 'current', 2: 'locked' },
                english: { 1: 'current', 2: 'locked' },
                evs: { 1: 'current', 2: 'locked' },
                gk: { 1: 'current', 2: 'locked' }
            };
        }
    });

    // Avatar State
    const [avatar, setAvatar] = useState(() => localStorage.getItem('orukkam_avatar') || 'boy');

    // Auth State
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('orukkam_user');
        return saved ? JSON.parse(saved) : null;
    });

    // Persist
    useEffect(() => {
        localStorage.setItem('orukkam_xp', xp);
        localStorage.setItem('orukkam_hearts', hearts);
        localStorage.setItem('orukkam_progress', JSON.stringify(progress));
        localStorage.setItem('orukkam_avatar', avatar);
        if (user) {
            localStorage.setItem('orukkam_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('orukkam_user');
        }
    }, [xp, hearts, progress, avatar, user]);

    const login = async (username, password) => {
        const result = await mockServer.login(username, password);
        if (result.success) {
            setUser(result.user);
            // Optional: Set avatar from user profile if not set? 
            // setAvatar(result.user.avatar); 
        }
        return result;
    };

    const loginWithPhone = async (phoneNumber) => {
        const result = await mockServer.loginWithPhone(phoneNumber);
        return result;
    };

    const verifyOtp = async (phoneNumber, otp) => {
        const result = await mockServer.verifyOtp(phoneNumber, otp);
        if (result.success) {
            setUser(result.user);
        }
        return result;
    };

    const logout = () => {
        setUser(null);
        mockServer.logActivity('LOGOUT', { username: user?.name });
    };

    const addXp = (amount) => setXp(prev => prev + amount);
    const loseHeart = () => setHearts(prev => Math.max(0, prev - 1));
    const refillHearts = () => setHearts(5);

    const completeLevel = (landId, levelId) => {
        setProgress(prev => {
            const landProgress = { ...prev[landId] };
            landProgress[levelId] = 'completed';

            // Unlock next level
            const nextLevel = parseInt(levelId) + 1;
            if (landProgress[nextLevel]) { // If defined in schema (to be added)
                // Don't overwrite if already completed
                if (landProgress[nextLevel] === 'locked') {
                    landProgress[nextLevel] = 'current';
                }
            } else {
                // Just unlock it effectively if not pre-defined
                landProgress[nextLevel] = 'current';
            }

            return { ...prev, [landId]: landProgress };
        });
        addXp(50); // Bonus for completion
    };

    const getLevelStatus = (landId, levelId) => {
        return progress[landId]?.[levelId] || 'locked';
    };

    return (
        <GameContext.Provider value={{
            xp,
            hearts,
            addXp,
            loseHeart,
            refillHearts,
            completeLevel,
            getLevelStatus,
            progress, // Expose full object for Map calculation
            avatar,
            setAvatar,
            user,
            setUser,
            login,
            loginWithPhone,
            verifyOtp,
            logout
        }}>
            {children}
        </GameContext.Provider>
    );
};
