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
  const { loginWithGoogle, playAsGuest, registerWithEmail, loginWithEmail, user } = useGame();

  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState('choose'); // 'choose', 'email-login', 'email-register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showTeacherAuth, setShowTeacherAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

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
    setAuthMode('choose');
    setAuthError(null);
  };

  const executeAuth = async (authFunction, ...args) => {
    setLoading(true);
    setAuthError(null);
    const result = await authFunction(...args);
    setLoading(false);

    if (result.success) {
      if (result.pendingRedirect) {
        // Do nothing, page will redirect to Google
        return;
      }
      if (result.user.isNew || result.user.isAnonymous) {
        navigate('/setup');
      } else {
        navigate('/map');
      }
    } else {
      setAuthError(result.message);
    }
  };

  const handleGoogleLogin = () => executeAuth(loginWithGoogle);
  const handleGuestLogin = () => executeAuth(playAsGuest);

  const handleEmailAction = () => {
    if (!email || !password) {
      setAuthError("Please enter email and password.");
      return;
    }
    if (authMode === 'email-register') {
      executeAuth(registerWithEmail, email, password);
    } else {
      executeAuth(loginWithEmail, email, password);
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
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

                {authError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm font-semibold text-center">
                    {authError}
                  </div>
                )}

                {authMode === 'choose' ? (
                  <>
                    <h2 className="text-2xl font-black text-slate-700 text-center mb-6">
                      തുടങ്ങാം! (Let's Start!)
                    </h2>

                    <button
                      onClick={handleGuestLogin}
                      disabled={loading}
                      className="w-full bg-candy-blue hover:bg-candy-blue/90 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center mb-3 shadow-[0_6px_0_0_#2563eb] active:translate-y-1 active:shadow-none transition-all"
                    >
                      <span className="text-xl">🚀 ലോഗിൻ ചെയ്യാതെ കളിക്കാം (Play as Guest)</span>
                    </button>

                    <div className="relative flex py-4 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink-0 mx-4 text-slate-400 font-bold text-sm">അല്ലെങ്കിൽ (OR)</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-2xl flex items-center justify-center space-x-3 mb-3 transition-all"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Google വഴി</span>
                    </button>

                    <button
                      onClick={() => setAuthMode('email-register')}
                      disabled={loading}
                      className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-2xl mb-4 transition-all"
                    >
                      📧 സ്വയം റെജിസ്റ്റർ ചെയ്യാം (Register Email)
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-slate-700 text-center mb-6">
                      {authMode === 'email-register' ? 'പുതിയ അക്കൗണ്ട്' : 'ഇമെയിൽ ലോഗിൻ'}
                    </h2>

                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-200 text-lg font-bold mb-3 outline-none focus:border-candy-blue"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-200 text-lg font-bold mb-4 outline-none focus:border-candy-blue"
                    />

                    <button
                      onClick={handleEmailAction}
                      disabled={loading}
                      className="w-full bg-candy-green hover:bg-candy-green/90 text-white font-bold py-4 px-6 rounded-2xl mb-3 shadow-[0_6px_0_0_#16a34a] active:translate-y-1 active:shadow-none transition-all text-xl"
                    >
                      {loading ? 'കാത്തിരിക്കൂ...' : (authMode === 'email-register' ? 'രജിസ്റ്റർ ചെയ്യുക' : 'ലോഗിൻ ചെയ്യുക')}
                    </button>

                    <div className="text-center mt-4">
                      <span className="text-slate-500 font-semibold text-sm">
                        {authMode === 'email-register' ? 'ഏற்கனவே അക്കൗണ്ട് ഉണ്ടോ? ' : 'പുതിയ ആളാണോ? '}
                      </span>
                      <button
                        onClick={() => setAuthMode(authMode === 'email-register' ? 'email-login' : 'email-register')}
                        className="text-candy-blue font-bold hover:underline"
                      >
                        {authMode === 'email-register' ? 'ലോഗിൻ ചെയ്യുക' : 'രജിസ്റ്റർ ചെയ്യുക'}
                      </button>
                    </div>
                  </>
                )}

                <button
                  className="w-full text-slate-400 font-bold py-4 mt-2"
                  onClick={() => {
                    if (authMode !== 'choose') {
                      setAuthMode('choose');
                    } else {
                      setShowLogin(false);
                    }
                  }}
                >
                  {authMode !== 'choose' ? '← Back' : 'Cancel'}
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
