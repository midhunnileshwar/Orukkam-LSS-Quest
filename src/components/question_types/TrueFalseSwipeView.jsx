import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function TrueFalseSwipeView({ question, onAnswer, disabled }) {
  const [answered, setAnswered] = useState(null);

  const x = useMotionValue(0);

  useEffect(() => {
    setAnswered(null);
    x.set(0);
  }, [question.id, x]);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const background = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(239, 68, 68, 0.4)', 'rgba(30, 41, 59, 0.95)', 'rgba(16, 185, 129, 0.4)']
  );

  const handleDecision = (userBool, e) => {
    if (disabled || answered !== null) return;
    setAnswered(userBool);

    const isCorrect = userBool === question.isTrue;
    setTimeout(() => {
      onAnswer(isCorrect, userBool, e);
    }, 500);
  };

  const handleDragEnd = (_, info) => {
    if (disabled || answered !== null) return;
    if (info.offset.x > 100) {
      handleDecision(true);
    } else if (info.offset.x < -100) {
      handleDecision(false);
    }
  };

  return (
    <div className="w-full space-y-5 text-center">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
          ⚡ Statement Slasher: Swipe or Tap True / False!
        </span>
      </div>

      {/* Swipeable Statement Card */}
      <motion.div
        style={{ x, rotate, background }}
        drag={disabled || answered !== null ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        className="max-w-md mx-auto border-4 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative cursor-grab active:cursor-grabbing select-none backdrop-blur-md"
      >
        {question.speaker && (
          <div className="text-xs font-black uppercase text-amber-400 tracking-wider mb-2">
            🗣️ {question.speaker} says:
          </div>
        )}
        <p className="text-lg sm:text-2xl font-black text-white leading-relaxed">
          {question.statement}
        </p>
        <p className="text-[11px] text-slate-400 mt-4 italic">
          👈 Swipe LEFT for False • Swipe RIGHT for True 👉
        </p>
      </motion.div>

      {/* Big Action Buttons */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
        <motion.button
          type="button"
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          disabled={disabled || answered !== null}
          onClick={(e) => handleDecision(false, e)}
          className={`py-4 px-5 rounded-2xl border-4 font-black text-base sm:text-lg flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer ${
            answered === false
              ? question.isTrue === false
                ? 'bg-emerald-500 border-emerald-300 text-white'
                : 'bg-red-600 border-red-400 text-white'
              : 'bg-red-950/80 hover:bg-red-900 border-red-500 text-red-200'
          }`}
        >
          <X size={22} />
          <span>FALSE (തെറ്റ്)</span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          disabled={disabled || answered !== null}
          onClick={(e) => handleDecision(true, e)}
          className={`py-4 px-5 rounded-2xl border-4 font-black text-base sm:text-lg flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer ${
            answered === true
              ? question.isTrue === true
                ? 'bg-emerald-500 border-emerald-300 text-white'
                : 'bg-red-600 border-red-400 text-white'
              : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500 text-emerald-200'
          }`}
        >
          <Check size={22} />
          <span>TRUE (ശരി)</span>
        </motion.button>
      </div>
    </div>
  );
}
