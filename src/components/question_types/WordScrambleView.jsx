import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';

export default function WordScrambleView({ question, onAnswer, disabled }) {
  const correctLetters = (question.correctWord || '').toUpperCase().split('');
  const scrambledList = (question.scrambled || []).map((l, idx) => ({ id: `${l}_${idx}`, letter: l.toUpperCase() }));

  // Placed letter objects: [{ id, letter }]
  const [placed, setPlaced] = useState([]);

  useEffect(() => {
    setPlaced([]);
  }, [question.id]);

  // Remaining available letter objects in tray
  const placedIds = placed.map((p) => p.id);
  const isFull = placed.length === correctLetters.length;

  const handleTileClick = (tile) => {
    if (disabled || isFull) return;
    setPlaced((prev) => [...prev, tile]);
  };

  const handleRemovePlaced = (index) => {
    if (disabled) return;
    setPlaced((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (disabled) return;
    setPlaced([]);
  };

  const handleSubmit = (e) => {
    if (disabled || !isFull) return;

    const spelled = placed.map((p) => p.letter).join('');
    const isCorrect = spelled === question.correctWord.toUpperCase();
    onAnswer(isCorrect, spelled, e);
  };

  return (
    <div className="w-full space-y-5">
      {/* Clue Bar */}
      <div className="bg-slate-800/90 border-2 border-amber-500/40 p-4 rounded-2xl text-center shadow-lg">
        <span className="text-xs font-black uppercase text-amber-400 tracking-wider block mb-1">
          🚂 Train Bogies Letter Clue:
        </span>
        <p className="text-slate-200 text-sm sm:text-base font-semibold">{question.clue}</p>
      </div>

      {/* Train Carriages (Placed Slots) */}
      <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 overflow-x-auto py-2">
        <div className="text-3xl sm:text-4xl pr-1 select-none">🚂</div>
        {correctLetters.map((_, idx) => {
          const item = placed[idx];
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={item ? { scale: [0.8, 1.05, 1] } : {}}
              onClick={() => item && handleRemovePlaced(idx)}
              className={`w-9 h-12 sm:w-12 sm:h-16 rounded-xl flex items-center justify-center font-black text-lg sm:text-2xl shadow-lg border-2 transition-all cursor-pointer ${
                item
                  ? 'bg-gradient-to-t from-yellow-500 to-amber-300 text-slate-950 border-yellow-200 active:scale-95'
                  : 'bg-slate-800/80 border-slate-700 border-dashed text-slate-600'
              }`}
            >
              {item ? item.letter : '_'}
            </motion.div>
          );
        })}
      </div>

      {/* Scrambled Letters Tray */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-2">
          <span className="text-xs font-bold text-slate-400">Tap letters to load the train:</span>
          {placed.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {scrambledList.map((tile) => {
            const isUsed = placedIds.includes(tile.id);
            return (
              <motion.button
                key={tile.id}
                type="button"
                whileHover={!isUsed && !disabled ? { scale: 1.1 } : {}}
                whileTap={!isUsed && !disabled ? { scale: 0.9 } : {}}
                disabled={isUsed || disabled}
                onClick={() => handleTileClick(tile)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl font-black text-lg sm:text-xl border-2 transition-all shadow-md flex items-center justify-center ${
                  isUsed
                    ? 'opacity-20 bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white cursor-pointer active:scale-95'
                }`}
              >
                {tile.letter}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="button"
        disabled={!isFull || disabled}
        onClick={handleSubmit}
        whileHover={isFull && !disabled ? { scale: 1.02 } : {}}
        whileTap={isFull && !disabled ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center space-x-2 shadow-xl transition-all ${
          isFull && !disabled
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-2 border-emerald-300 shadow-emerald-500/30 cursor-pointer animate-bounce'
            : 'bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 cursor-not-allowed'
        }`}
      >
        <Check size={22} />
        <span>{isFull ? 'Spell Word & Launch Train 🚂' : `Tap all ${correctLetters.length} letters`}</span>
      </motion.button>
    </div>
  );
}
