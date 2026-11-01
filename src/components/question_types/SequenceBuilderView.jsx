import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, Check, RotateCcw } from 'lucide-react';

export default function SequenceBuilderView({ question, onAnswer, disabled }) {
  // Start with items in their initial given order
  const [currentOrder, setCurrentOrder] = useState(() => (question.items || []).map((item) => item.id));

  const itemsMap = (question.items || []).reduce((acc, item) => {
    acc[item.id] = item.text;
    return acc;
  }, {});

  const moveItem = (index, direction) => {
    if (disabled) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    setCurrentOrder((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleReset = () => {
    if (disabled) return;
    setCurrentOrder((question.items || []).map((item) => item.id));
  };

  const handleSubmit = (e) => {
    if (disabled) return;
    const targetSeq = question.correctSequence || [];
    const isCorrect = currentOrder.every((id, idx) => id.toUpperCase() === (targetSeq[idx] || '').toUpperCase());

    onAnswer(isCorrect, currentOrder, e);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400">
          🔢 Arrange in Correct Story Sequence:
        </span>
        {!disabled && (
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

      {/* Sequence Cards Tray */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {currentOrder.map((id, index) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-800 border-2 border-slate-700 hover:border-indigo-500/70 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                  {index + 1}
                </div>
                <div className="text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">
                  <span className="font-bold text-amber-400 mr-1.5">({id})</span>
                  {itemsMap[id]}
                </div>
              </div>

              {/* Move Up / Down Buttons */}
              <div className="flex flex-col space-y-1 flex-shrink-0">
                <button
                  type="button"
                  disabled={index === 0 || disabled}
                  onClick={() => moveItem(index, -1)}
                  className="p-1 rounded-lg bg-slate-700 hover:bg-indigo-600 disabled:opacity-20 disabled:hover:bg-slate-700 text-white transition active:scale-90"
                  aria-label="Move Up"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  disabled={index === currentOrder.length - 1 || disabled}
                  onClick={() => moveItem(index, 1)}
                  className="p-1 rounded-lg bg-slate-700 hover:bg-indigo-600 disabled:opacity-20 disabled:hover:bg-slate-700 text-white transition active:scale-90"
                  aria-label="Move Down"
                >
                  <ArrowDown size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <motion.button
        type="button"
        disabled={disabled}
        onClick={handleSubmit}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-2 text-base sm:text-lg border-2 border-amber-300 cursor-pointer active:scale-98 transition mt-2"
      >
        <Check size={22} />
        <span>Check Sequence Order 🚀</span>
      </motion.button>
    </div>
  );
}
