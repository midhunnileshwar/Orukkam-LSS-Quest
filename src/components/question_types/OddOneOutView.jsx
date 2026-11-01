import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OddOneOutView({ question, onAnswer, disabled }) {
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    setSelectedWord(null);
  }, [question.id]);
  const targetOdd = (question.oddOne || '').toLowerCase().trim();

  const handleCardClick = (word, e) => {
    if (disabled || selectedWord) return;
    setSelectedWord(word);

    const isCorrect = word.toLowerCase().trim() === targetOdd;
    setTimeout(() => {
      onAnswer(isCorrect, word, e);
    }, 600);
  };

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
          🔍 Find and Swipe/Tap the ODD ONE OUT!
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
        {(question.words || []).map((word, idx) => {
          const isSelected = selectedWord === word;
          const isTarget = word.toLowerCase().trim() === targetOdd;

          return (
            <motion.button
              key={idx}
              type="button"
              whileHover={!disabled ? { scale: 1.05, y: -4 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              animate={
                isSelected
                  ? isTarget
                    ? { scale: [1, 1.2, 0], rotate: [0, 15, -45], opacity: [1, 1, 0] }
                    : { x: [-8, 8, -8, 8, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
              disabled={disabled}
              onClick={(e) => handleCardClick(word, e)}
              className={`h-24 sm:h-28 rounded-3xl border-4 font-black text-base sm:text-xl shadow-xl flex flex-col items-center justify-center p-3 transition-all cursor-pointer ${
                isSelected
                  ? isTarget
                    ? 'bg-emerald-500 border-emerald-300 text-white'
                    : 'bg-red-600 border-red-400 text-white'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 hover:from-indigo-700 hover:to-indigo-800 text-white border-slate-700 hover:border-yellow-400'
              }`}
            >
              <span>{word}</span>
              <span className="text-[10px] text-slate-400 font-normal mt-1">Tap to eject</span>
            </motion.button>
          );
        })}
      </div>

      {question.instruction && (
        <p className="text-center text-xs text-slate-400">{question.instruction}</p>
      )}
    </div>
  );
}
