import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import Background from '../components/Background';
import TeacherAuth from '../components/TeacherAuth';

export default function Welcome() {
  const navigate = useNavigate();
  const { login, user } = useGame();

  const [showLogin, setShowLogin] = useState(false);
  const [showTeacherAuth, setShowTeacherAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  // Secret Teacher Mode Trigger
  const [logoPressTimer, setLogoPressTimer] = useState(null);
  const handleLogoPressStart = () => {
    const timer = setTimeout(() => {
      setShowTeacherAuth(true);
    }, 3000);
    setLogoPressTimer(timer);
  };
  const handleLogoPressEnd = () => {
    if (logoPressTimer) clearTimeout(logoPressTimer);
  };

  const handleTeacherSuccess = () => {
    setShowTeacherAuth(false);
    navigate('/teacher-dashboard');
  };

  const handleStart = () => {
    // Play Sound: POP!
    const audio = new Audio(
      'https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-click-1112.mp3'
    ); // Placeholder URL or local
    // audio.play().catch(e => console.log("Audio play failed", e));

    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#00BFFF'],
    });

    setShowLogin(true);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await loginWithGoogle(); // Changed from login()
    setLoading(false);

    if (result.success) {
      if (result.user.isNew) {
        navigate('/setup');
      } else {
        navigate('/map');
      }
    } else {
      alert("Login Failed: " + result.message);
    }
  };

  return (
    <React.Fragment>
      {/* --- Parallax Background --- */}
      <Background>
        {/* --- Main Content --- */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          {/* Logo Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="mb-12 text-center"
            onMouseDown={handleLogoPressStart}
            onMouseUp={handleLogoPressEnd}
            onTouchStart={handleLogoPressStart}
            onTouchEnd={handleLogoPressEnd}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="cursor-pointer"
            >
              <h1
                className="text-8xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] tracking-tight stroke-black"
                style={{ WebkitTextStroke: '2px #4B5563' }}
              >
                ഒരുക്കം
              </h1>
            </motion.div>
            <div className="mt-4 bg-white/90 px-6 py-2 rounded-full shadow-lg border-2 border-white transform -rotate-2">
              <p className="text-xl font-bold text-slate-600">LSS വിജയത്തിലേക്കുള്ള ആദ്യ ചുവട്</p>
            </div>
          </motion.div>

          {/* Start Button Area */}
          <AnimatePresence mode="wait">
            {!showLogin ? (
              <motion.button
                key="start-btn"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStart}
                className="group relative bg-gradient-to-b from-green-400 to-green-600 w-48 h-48 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,128,0,0.4)] border-4 border-white"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
                <Play size={80} fill="white" className="text-white ml-2 drop-shadow-md" />
                <span className="absolute -bottom-16 text-2xl font-black text-slate-700 bg-white/80 px-4 py-1 rounded-xl">
                  START!
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="login-panel"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl p-6 absolute bottom-0 pb-12"
              >
                {/* --- GOOGLE LOGIN ONLY --- */}
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
                <h2 className="text-2xl font-black text-slate-700 text-center mb-6">
                  ആരുവാ ഇത്? (Who is this?)
                </h2>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 mb-4 transition-all active:scale-95 relative overflow-hidden"
                >
                  <span className="text-2xl">Gw</span>
                  <span>Google വഴി തുടങ്ങാം</span>
                </button>

                <button
                  className="w-full text-slate-400 font-bold py-2"
                  onClick={() => setShowLogin(false)}
                >
                  Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <TeacherAuth
          isOpen={showTeacherAuth}
          onClose={() => setShowTeacherAuth(false)}
          onSuccess={handleTeacherSuccess}
        />
      </Background>
    </React.Fragment>
  );
}

// Helper for 'squash and stretch' physics if needed,
// though framer-motion spring is usually enough.
