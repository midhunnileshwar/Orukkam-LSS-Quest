import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MissingLetterView({ question, onAnswer, disabled }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const target = (question.missingLetter || '').toUpperCase();

  const handleWhack = (letter, e) => {
    if (disabled || selectedLetter) return;
    setSelectedLetter(letter);

    const isCorrect = letter.toUpperCase() === target;
    setTimeout(() => {
      onAnswer(isCorrect, letter, e);
    }, 500);
  };

  return (
    <div className="w-full space-y-5 text-center">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-pink-400 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-800">
          🔨 Whack the Missing Letter Mole!
        </span>
      </div>

      {/* Incomplete Word Display */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-2xl inline-block px-8 sm:px-12">
        <div className="font-mono text-3xl sm:text-5xl font-black tracking-widest text-white flex items-center justify-center space-x-2">
          {question.incompleteWord.split(' ').map((char, idx) => {
            if (char === '_') {
              return (
                <span
                  key={idx}
                  className={`inline-block w-8 sm:w-12 border-b-4 ${
                    selectedLetter
                      ? selectedLetter === target
                        ? 'border-emerald-400 text-emerald-400'
                        : 'border-red-400 text-red-400'
                      : 'border-yellow-400 text-yellow-300 animate-pulse'
                  }`}
                >
                  {selectedLetter || '?'}
                </span>
              );
            }
            return <span key={idx}>{char}</span>;
          })}
        </div>
      </div>

      {/* Mole Letter Buttons */}
      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto pt-2">
        {(question.options || []).map((letter, idx) => {
          const isSelected = selectedLetter === letter;
          const isTarget = letter.toUpperCase() === target;

          return (
            <motion.button
              key={idx}
              type="button"
              whileHover={!disabled ? { scale: 1.1, y: -4 } : {}}
              whileTap={!disabled ? { scale: 0.9 } : {}}
              animate={
                isSelected
                  ? isTarget
                    ? { scale: [1, 1.25, 1], y: [0, -10, 0] }
                    : { x: [-6, 6, -6, 6, 0] }
                  : {}
              }
              disabled={disabled}
              onClick={(e) => handleWhack(letter, e)}
              className={`h-16 sm:h-20 rounded-3xl border-4 font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center cursor-pointer transition-all ${
                isSelected
                  ? isTarget
                    ? 'bg-emerald-500 border-emerald-300 text-white shadow-emerald-500/50'
                    : 'bg-red-600 border-red-400 text-white'
                  : 'bg-gradient-to-b from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white border-purple-400 hover:border-yellow-300'
              }`}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
