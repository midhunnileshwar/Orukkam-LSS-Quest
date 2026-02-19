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
  const [loginMethod, setLoginMethod] = useState(null); // 'google' | 'phone'
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([
    'Kasaragod',
    'Kannur',
    'Wayanad',
    'Kozhikode',
    'Malappuram',
  ]); // Mock list

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
    // Simulate network delay
    setTimeout(async () => {
      const result = await login('Midhun', 'password'); // Mock login
      setLoading(false);
      if (result.success) {
        // Check callback logic
        if (result.user.isNew) {
          navigate('/setup');
        } else {
          navigate('/map');
        }
      }
    }, 1500);
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
              {/* 
                          Using a text placeholder for logo if image fails, 
                          but typically we'd use the img tag here.
                        */}
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
                {!loginMethod ? (
                  // --- CHOICE SCREEN ---
                  <>
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
                      onClick={() => setLoginMethod('phone')}
                      className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 mb-4 transition-all active:scale-95"
                    >
                      <span>📱</span>
                      <span>മൊബൈൽ നമ്പർ ഉപയോഗിക്കാം</span>
                    </button>

                    <button
                      className="w-full text-slate-400 font-bold py-2"
                      onClick={() => setShowLogin(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  // --- PHONE LOGIN SCREEN ---
                  <PhoneLogin
                    onBack={() => setLoginMethod(null)}
                    onSuccess={() => setShowLogin(false)}
                  />
                )}
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

// Helper Component for Phone Login Flow
function PhoneLogin({ onBack, onSuccess }) {
  const navigate = useNavigate();
  const { loginWithPhone, verifyOtp } = useGame();

  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    const res = await loginWithPhone(phone);
    setLoading(false);
    if (res.success) {
      setStep(2);
    } else {
      setError(res.message);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    const res = await verifyOtp(phone, otp);
    setLoading(false);
    if (res.success) {
      onSuccess();
      // Check if new user
      if (res.user.isNew) {
        navigate('/setup');
      } else {
        navigate('/map');
      }
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="w-full">
      <button onClick={onBack} className="text-sm font-bold text-slate-400 mb-4">
        ← Back
      </button>

      {step === 1 ? (
        <>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Mobile Number</h3>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            className="w-full p-4 rounded-xl border-2 border-slate-200 text-xl font-bold mb-4 outline-none focus:border-green-500"
          />
          {error && <p className="text-red-500 font-bold mb-2">{error}</p>}
          <button
            onClick={handleSendOtp}
            disabled={loading || phone.length < 10}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Get OTP'}
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Enter OTP</h3>
          <p className="text-sm text-slate-500 mb-4">Sent to {phone}</p>
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={otp[i] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const newOtp = otp.split('');
                  newOtp[i] = val;
                  setOtp(newOtp.join(''));
                  // Auto focus next logic could go here
                }}
                className="w-12 h-12 border-2 border-slate-300 rounded-lg text-center text-xl font-bold focus:border-green-500 outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-bold mb-2 text-center">{error}</p>}
          <button
            onClick={handleVerify}
            disabled={loading || otp.length < 4}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </>
      )}
    </div>
  );
}

// Helper for 'squash and stretch' physics if needed,
// though framer-motion spring is usually enough.
