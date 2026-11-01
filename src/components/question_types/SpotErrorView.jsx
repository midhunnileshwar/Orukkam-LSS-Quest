import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function SpotErrorView({ question, onAnswer, disabled }) {
  const [poppedWord, setPoppedWord] = useState(null);
  const [wrongTappedWord, setWrongTappedWord] = useState(null);

  // Split sentence into words, preserving punctuation
  const words = (question.sentence || '').split(' ');
  const targetWrong = (question.wrongWord || '').toLowerCase().replace(/[.,!?;:"']/g, '').trim();

  const handleWordTap = (word, idx, e) => {
    if (disabled || poppedWord) return;

    const cleanedWord = word.toLowerCase().replace(/[.,!?;:"']/g, '').trim();
    const isErrorWord = cleanedWord === targetWrong;

    if (isErrorWord) {
      setPoppedWord(word);
      setWrongTappedWord(null);
      // Wait a brief moment for the pop animation before resolving
      setTimeout(() => {
        onAnswer(true, word, e);
      }, 900);
    } else {
      setWrongTappedWord(idx);
      setTimeout(() => {
        onAnswer(false, word, e);
      }, 500);
    }
  };

  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <span className="text-xs font-black uppercase tracking-wider text-pink-400 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-800">
          🫧 Tap the INCORRECT word bubble to POP it!
        </span>
      </div>

      {/* Bubble Sentence Board */}
      <div className="bg-slate-800/90 border-4 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-wrap gap-2.5 sm:gap-3 justify-center items-center backdrop-blur-md">
        {words.map((word, idx) => {
          const isPopped = poppedWord === word;
          const isFailedTap = wrongTappedWord === idx;

          return (
            <AnimatePresence key={idx} mode="wait">
              {isPopped ? (
                <motion.div
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-500 text-white font-black px-4 py-2 rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center space-x-1.5"
                >
                  <Sparkles size={16} />
                  <span>{question.correctReplacement || 'playing'}</span>
                  <CheckCircle2 size={16} />
                </motion.div>
              ) : (
                <motion.button
                  type="button"
                  whileHover={!disabled ? { scale: 1.1, y: -2 } : {}}
                  whileTap={!disabled ? { scale: 0.9 } : {}}
                  animate={isFailedTap ? { x: [-6, 6, -6, 6, 0] } : {}}
                  disabled={disabled}
                  onClick={(e) => handleWordTap(word, idx, e)}
                  className={`px-3.5 py-2 rounded-2xl font-black text-sm sm:text-base border-2 transition-all shadow-md cursor-pointer ${
                    isFailedTap
                      ? 'bg-red-600 text-white border-red-400'
                      : 'bg-gradient-to-b from-slate-700 to-slate-800 hover:from-indigo-600 hover:to-indigo-700 text-slate-100 hover:text-white border-slate-600 hover:border-yellow-300'
                  }`}
                >
                  {word}
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400">
        💡 One word in this sentence has a grammar or spelling error. Tap it to pop!
      </p>
    </div>
  );
}
