import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';

export default function WordMagnetsView({ question, onAnswer, disabled }) {
  // Give each jumbled word a unique id
  const wordTokens = (question.jumbled || []).map((w, idx) => ({ id: `${w}_${idx}`, word: w }));

  const [placed, setPlaced] = useState([]);
  const placedIds = placed.map((p) => p.id);
  const isFull = placed.length === wordTokens.length && wordTokens.length > 0;

  const handleChipClick = (token) => {
    if (disabled || isFull) return;
    setPlaced((prev) => [...prev, token]);
  };

  const handleRemovePlaced = (index) => {
    if (disabled) return;
    setPlaced((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (disabled) return;
    setPlaced([]);
  };

  const cleanForCompare = (s) => (s || '').toLowerCase().replace(/[.,!?;:"']/g, '').replace(/\s+/g, ' ').trim();

  const handleSubmit = (e) => {
    if (disabled || !isFull) return;

    const userSentence = placed.map((p) => p.word).join(' ');
    const isCorrect = cleanForCompare(userSentence) === cleanForCompare(question.correctSentence);

    onAnswer(isCorrect, userSentence, e);
  };

  return (
    <div className="w-full space-y-4">
      {/* Magnet Board (Sentence Assembly Line) */}
      <div className="bg-slate-800/95 border-4 border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl min-h-[110px] flex flex-wrap gap-2 items-center justify-start relative">
        <div className="w-full flex justify-between items-center pb-2 mb-1 border-b border-slate-700/60">
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
            🧲 Sentence Builder Board:
          </span>
          {placed.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {placed.length === 0 ? (
          <p className="text-slate-500 text-xs sm:text-sm italic py-2">
            Tap the word magnets below in correct order...
          </p>
        ) : (
          placed.map((token, idx) => (
            <motion.button
              key={token.id}
              type="button"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRemovePlaced(idx)}
              disabled={disabled}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-sm sm:text-base shadow-md border-2 border-yellow-200 cursor-pointer active:scale-95 flex items-center space-x-1"
              title="Click to remove"
            >
              <span>{token.word}</span>
              <span className="text-xs opacity-50 ml-1">×</span>
            </motion.button>
          ))
        )}
      </div>

      {/* Available Magnet Chips Tray */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center">
          {wordTokens.map((token) => {
            const isUsed = placedIds.includes(token.id);
            return (
              <motion.button
                key={token.id}
                type="button"
                whileHover={!isUsed && !disabled ? { scale: 1.05 } : {}}
                whileTap={!isUsed && !disabled ? { scale: 0.95 } : {}}
                disabled={isUsed || disabled}
                onClick={() => handleChipClick(token)}
                className={`px-4 py-2 rounded-2xl font-black text-sm sm:text-base border-2 transition-all shadow-md ${
                  isUsed
                    ? 'opacity-20 bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                    : 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white cursor-pointer active:scale-95'
                }`}
              >
                {token.word}
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
        <span>{isFull ? 'Assemble Sentence ✨' : `Tap all ${wordTokens.length} magnets`}</span>
      </motion.button>
    </div>
  );
}
