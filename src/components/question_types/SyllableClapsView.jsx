import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SyllableClapsView({ question, onAnswer, disabled }) {
  const [selectedCount, setSelectedCount] = useState(null);
  const target = question.syllablesCount;

  const handleClap = (count, e) => {
    if (disabled || selectedCount !== null) return;
    setSelectedCount(count);

    const isCorrect = count === target;
    setTimeout(() => {
      onAnswer(isCorrect, count, e);
    }, 600);
  };

  return (
    <div className="w-full space-y-5 text-center">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
          👏 Syllable Claps: Clap out the word!
        </span>
      </div>

      {/* Word Card */}
      <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl inline-block max-w-sm w-full">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-5xl mb-3"
        >
          👏
        </motion.div>
        <h3 className="text-3xl sm:text-4xl font-black text-white tracking-wide">
          {question.word}
        </h3>
        {selectedCount !== null && (
          <p className="text-xs font-mono text-yellow-300 mt-2 font-bold animate-fadeIn">
            {question.syllableBreakdown}
          </p>
        )}
      </div>

      {/* 1, 2, 3, 4 Clap Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        {[1, 2, 3, 4].map((num) => {
          const isSelected = selectedCount === num;
          const isTarget = num === target;

          return (
            <motion.button
              key={num}
              type="button"
              whileHover={!disabled ? { scale: 1.06, y: -3 } : {}}
              whileTap={!disabled ? { scale: 0.94 } : {}}
              animate={
                isSelected
                  ? isTarget
                    ? { scale: [1, 1.15, 1] }
                    : { x: [-6, 6, -6, 6, 0] }
                  : {}
              }
              disabled={disabled}
              onClick={(e) => handleClap(num, e)}
              className={`p-4 rounded-3xl border-4 font-black text-lg shadow-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? isTarget
                    ? 'bg-emerald-500 border-emerald-300 text-white'
                    : 'bg-red-600 border-red-400 text-white'
                  : 'bg-gradient-to-b from-slate-700 to-slate-800 hover:from-amber-500 hover:to-orange-500 text-white hover:text-slate-950 border-slate-600 hover:border-yellow-200'
              }`}
            >
              <span className="text-2xl sm:text-3xl font-mono">{num}</span>
              <span className="text-xs mt-1 font-bold">{num === 1 ? 'Clap 👏' : 'Claps 👏'}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
