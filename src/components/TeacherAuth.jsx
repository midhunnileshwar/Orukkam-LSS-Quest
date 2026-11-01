import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Delete, ShieldAlert, Lock } from 'lucide-react';
import {
  verifyTeacherPin,
  getTeacherLockoutStatus,
  isHumanInteraction,
} from '../utils/security';

export default function TeacherAuth({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lockoutInfo, setLockoutInfo] = useState(() => getTeacherLockoutStatus());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Poll lockout countdown timer when locked
  useEffect(() => {
    if (!isOpen) return;

    const initial = getTeacherLockoutStatus();
    setLockoutInfo(initial);

    const interval = setInterval(() => {
      const status = getTeacherLockoutStatus();
      setLockoutInfo(status);
      if (!status.isLocked && lockoutInfo.isLocked) {
        setError(false);
        setErrorMessage('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, lockoutInfo.isLocked]);

  const handleNumClick = (num, event) => {
    if (lockoutInfo.isLocked) return;
    if (event && !isHumanInteraction(event)) return;

    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setError(false);
      setErrorMessage('');
    }
  };

  const handleDelete = (event) => {
    if (lockoutInfo.isLocked) return;
    if (event && !isHumanInteraction(event)) return;
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async (event) => {
    if (event && !isHumanInteraction(event)) return;
    if (lockoutInfo.isLocked || pin.length !== 4 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await verifyTeacherPin(pin);
      if (result.success) {
        setError(false);
        setErrorMessage('');
        setPin('');
        onSuccess();
      } else {
        setError(true);
        setErrorMessage(result.error || 'Incorrect PIN');
        setPin('');
        setLockoutInfo(getTeacherLockoutStatus());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLockoutTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 select-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-700 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎓</span>
                <h2 className="text-xl font-bold text-slate-200">Teacher Access</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Lockout Warning Banner */}
            {lockoutInfo.isLocked ? (
              <div className="bg-red-950/80 border border-red-500/60 rounded-2xl p-4 mb-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-red-900/60 text-red-300 flex items-center justify-center mx-auto">
                  <ShieldAlert size={22} />
                </div>
                <h3 className="font-bold text-red-300 text-sm">Security Lockout Active</h3>
                <p className="text-xs text-red-200 leading-relaxed">
                  Too many incorrect PIN attempts. Rate limiter has temporarily locked teacher
                  access for security.
                </p>
                <div className="text-lg font-black text-white font-mono bg-black/40 py-1.5 rounded-lg border border-red-900/50">
                  ⏳ {formatLockoutTime(lockoutInfo.remainingSeconds)}
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-400 text-center mb-4">
                  Enter 4-digit teacher security PIN to access Content Room
                </p>

                {/* PIN Dots Display */}
                <div
                  className={`flex justify-center space-x-4 mb-6 ${
                    error ? 'animate-shake' : ''
                  }`}
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        i < pin.length ? 'bg-indigo-400 border-indigo-400 scale-110' : 'border-slate-600'
                      } ${error ? 'border-red-500 bg-red-500' : ''}`}
                    />
                  ))}
                </div>

                {/* Error / Attempt Message */}
                {errorMessage && (
                  <p className="text-red-400 text-center text-xs font-semibold -mt-4 mb-4">
                    {errorMessage}
                  </p>
                )}

                {/* Secure Keypad */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={(e) => handleNumClick(num, e)}
                      disabled={lockoutInfo.isLocked || isSubmitting}
                      className="h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-2xl font-bold transition-all shadow-md"
                    >
                      {num}
                    </button>
                  ))}
                  <div className="h-14 flex items-center justify-center text-slate-600">
                    <Lock size={18} />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleNumClick(0, e)}
                    disabled={lockoutInfo.isLocked || isSubmitting}
                    className="h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-2xl font-bold transition-all shadow-md"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e)}
                    disabled={lockoutInfo.isLocked || isSubmitting}
                    className="h-14 rounded-2xl bg-slate-800/60 hover:bg-red-950/60 text-red-300 disabled:opacity-40 flex items-center justify-center transition active:scale-95"
                    aria-label="Delete"
                  >
                    <Delete size={22} />
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  disabled={pin.length !== 4 || lockoutInfo.isLocked || isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-98"
                >
                  {isSubmitting ? 'Verifying...' : 'Enter Teacher Dashboard'}
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
