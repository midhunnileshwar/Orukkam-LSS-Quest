import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, RotateCcw, Link2 } from 'lucide-react';

const PAIR_COLORS = [
  'bg-indigo-600 border-indigo-400 text-white',
  'bg-emerald-600 border-emerald-400 text-white',
  'bg-amber-500 border-amber-300 text-slate-950 font-black',
  'bg-pink-600 border-pink-400 text-white',
  'bg-cyan-600 border-cyan-400 text-white',
];

export default function MatchFollowingView({ question, onAnswer, disabled }) {
  const pairs = question.pairs || [];

  // Left items stay in original order
  const leftItems = useMemo(() => pairs.map((p) => p.left), [pairs]);

  // Right items are deterministically shuffled so user must actively match
  const rightItems = useMemo(() => {
    const rights = pairs.map((p) => p.right);
    // Reverse/rotate to avoid identical initial alignment
    return rights.length > 2 ? [rights[1], rights[0], ...rights.slice(2)].reverse() : rights.reverse();
  }, [pairs]);

  // Selected left item currently waiting for right pair
  const [selectedLeft, setSelectedLeft] = useState(null);

  // Map of left item -> right item
  const [matches, setMatches] = useState({});

  useEffect(() => {
    setSelectedLeft(null);
    setMatches({});
  }, [question.id]);

  const isAllMatched = Object.keys(matches).length === leftItems.length && leftItems.length > 0;

  const handleLeftClick = (item) => {
    if (disabled) return;
    if (matches[item]) {
      // Unmatch if already matched
      setMatches((prev) => {
        const next = { ...prev };
        delete next[item];
        return next;
      });
      setSelectedLeft(item);
    } else {
      setSelectedLeft(item);
    }
  };

  const handleRightClick = (item) => {
    if (disabled || !selectedLeft) return;

    // Check if this right item is already taken by another left item; if so remove old
    setMatches((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (next[k] === item) delete next[k];
      });
      next[selectedLeft] = item;
      return next;
    });

    setSelectedLeft(null);
  };

  const handleReset = () => {
    if (disabled) return;
    setMatches({});
    setSelectedLeft(null);
  };

  const handleSubmit = (e) => {
    if (disabled || !isAllMatched) return;

    const isCorrect = pairs.every((p) => matches[p.left] === p.right);
    onAnswer(isCorrect, matches, e);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
          <Link2 size={14} />
          <span>Tap item on Left, then tap matching pair on Right:</span>
        </span>
        {Object.keys(matches).length > 0 && !disabled && (
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

      {/* Two-Column Matching Board */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Left Column */}
        <div className="space-y-2.5">
          {leftItems.map((item, idx) => {
            const isSelected = selectedLeft === item;
            const matchedRight = matches[item];
            const colorClass = matchedRight
              ? PAIR_COLORS[idx % PAIR_COLORS.length]
              : isSelected
              ? 'bg-yellow-400 text-slate-950 border-yellow-300 ring-2 ring-yellow-400 font-black'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500';

            return (
              <motion.button
                key={idx}
                type="button"
                whileTap={!disabled ? { scale: 0.97 } : {}}
                disabled={disabled}
                onClick={() => handleLeftClick(item)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-between ${colorClass}`}
              >
                <span>{item}</span>
                {matchedRight && (
                  <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[11px] font-black ml-1.5">
                    ✓
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-2.5">
          {rightItems.map((item, idx) => {
            // Find which left item matched this right item
            const matchedLeft = Object.keys(matches).find((k) => matches[k] === item);
            const matchedIndex = matchedLeft ? leftItems.indexOf(matchedLeft) : -1;
            const colorClass =
              matchedIndex >= 0
                ? PAIR_COLORS[matchedIndex % PAIR_COLORS.length]
                : selectedLeft
                ? 'bg-slate-800 text-slate-200 border-indigo-500/80 hover:bg-slate-700 animate-pulse'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500';

            return (
              <motion.button
                key={idx}
                type="button"
                whileTap={!disabled ? { scale: 0.97 } : {}}
                disabled={disabled}
                onClick={() => handleRightClick(item)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-between ${colorClass}`}
              >
                <span>{item}</span>
                {matchedLeft && (
                  <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[11px] font-black ml-1.5">
                    ✓
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="button"
        disabled={!isAllMatched || disabled}
        onClick={handleSubmit}
        whileHover={isAllMatched && !disabled ? { scale: 1.02 } : {}}
        whileTap={isAllMatched && !disabled ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center space-x-2 shadow-xl transition-all ${
          isAllMatched && !disabled
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-2 border-emerald-300 shadow-emerald-500/30 cursor-pointer animate-bounce'
            : 'bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 cursor-not-allowed'
        }`}
      >
        <Check size={22} />
        <span>{isAllMatched ? 'Check Matches 🎯' : `Connect all pairs to check`}</span>
      </motion.button>
    </div>
  );
}
