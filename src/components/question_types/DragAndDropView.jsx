import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';

export default function DragAndDropView({ question, onAnswer, disabled }) {
  // Map of slot index (1, 2, 3...) to selected word
  const [filledSlots, setFilledSlots] = useState({});
  const [activeSlot, setActiveSlot] = useState(1);
  const [dragOverSlot, setDragOverSlot] = useState(null);

  // Reset state whenever question changes so previous answers never leak
  useEffect(() => {
    setFilledSlots({});
    setActiveSlot(1);
    setDragOverSlot(null);
  }, [question.id]);

  const totalSlots = Object.keys(question.correctAnswers || {}).length;
  const isAllFilled = Object.keys(filledSlots).length >= totalSlots;

  // Words already used in any slot
  const usedWords = Object.values(filledSlots);

  const handleChipClick = (word) => {
    if (disabled) return;
    if (usedWords.includes(word)) return;

    // Find the next empty slot, or use activeSlot
    let targetSlot = activeSlot;
    if (filledSlots[targetSlot]) {
      // Find lowest empty slot
      for (let i = 1; i <= totalSlots; i++) {
        if (!filledSlots[i]) {
          targetSlot = i;
          break;
        }
      }
    }

    setFilledSlots((prev) => ({
      ...prev,
      [targetSlot]: word,
    }));

    // Advance active slot to next empty
    for (let i = 1; i <= totalSlots; i++) {
      if (i !== targetSlot && !filledSlots[i]) {
        setActiveSlot(i);
        break;
      }
    }
  };

  const handleDropOnSlot = (word, slotNum) => {
    if (disabled || !word) return;

    setFilledSlots((prev) => {
      const next = { ...prev };
      // If word was in another slot, clear that slot
      Object.keys(next).forEach((k) => {
        if (next[k] === word) {
          delete next[k];
        }
      });
      next[slotNum] = word;
      return next;
    });

    // Advance active slot to next empty slot
    for (let i = 1; i <= totalSlots; i++) {
      if (i !== slotNum && !filledSlots[i]) {
        setActiveSlot(i);
        break;
      }
    }
  };

  const handleRemoveSlot = (slotNum) => {
    if (disabled) return;
    setFilledSlots((prev) => {
      const next = { ...prev };
      delete next[slotNum];
      return next;
    });
    setActiveSlot(slotNum);
  };

  const handleReset = () => {
    if (disabled) return;
    setFilledSlots({});
    setActiveSlot(1);
    setDragOverSlot(null);
  };

  const handleSubmit = (e) => {
    if (disabled || !isAllFilled) return;

    let allCorrect = true;
    for (let i = 1; i <= totalSlots; i++) {
      const expected = (question.correctAnswers[i] || '').toLowerCase().trim();
      const actual = (filledSlots[i] || '').toLowerCase().trim();
      if (expected !== actual) {
        allCorrect = false;
        break;
      }
    }

    onAnswer(allCorrect, filledSlots, e);
  };

  // Helper to split text by blank markers like (1), (2), (3), (4)
  const renderTextWithBlanks = () => {
    const rawText = question.text || '';
    const parts = rawText.split(/(\(\d+\))/g);

    return (
      <div className="leading-loose text-base sm:text-lg text-slate-100 font-medium">
        {parts.map((part, idx) => {
          const match = part.match(/\((\d+)\)/);
          if (match) {
            const slotNum = parseInt(match[1], 10);
            const filledWord = filledSlots[slotNum];
            const isActive = activeSlot === slotNum;
            const isTargeted = dragOverSlot === slotNum;

            return (
              <span
                key={idx}
                className="inline-block mx-1 align-middle"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  if (dragOverSlot !== slotNum) setDragOverSlot(slotNum);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragOverSlot((prev) => (prev === slotNum ? null : prev));
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverSlot(null);
                  const word = e.dataTransfer.getData('text/plain');
                  if (word) {
                    handleDropOnSlot(word, slotNum);
                  }
                }}
              >
                {filledWord ? (
                  <motion.button
                    type="button"
                    draggable={!disabled}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', filledWord);
                      e.dataTransfer.effectAllowed = 'copyMove';
                    }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    onClick={() => handleRemoveSlot(slotNum)}
                    disabled={disabled}
                    className={`inline-flex items-center space-x-1 font-black px-3 py-1 rounded-xl shadow-md border-2 transition active:scale-95 text-sm sm:text-base cursor-grab active:cursor-grabbing ${
                      isTargeted
                        ? 'bg-yellow-300 text-slate-950 border-white ring-4 ring-yellow-400'
                        : 'bg-yellow-400 hover:bg-yellow-300 text-slate-900 border-yellow-200'
                    }`}
                    title="Click or drag to change"
                  >
                    <span>{filledWord}</span>
                    <span className="text-xs bg-slate-900/20 rounded-full px-1.5 py-0.5 ml-1">×</span>
                  </motion.button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveSlot(slotNum)}
                    disabled={disabled}
                    className={`inline-block min-w-[75px] sm:min-w-[95px] text-center px-3 py-1.5 rounded-xl border-2 border-dashed font-bold text-xs sm:text-sm transition-all ${
                      isTargeted
                        ? 'border-yellow-300 bg-yellow-400/40 text-white ring-4 ring-yellow-400 scale-105'
                        : isActive
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 animate-pulse'
                        : 'border-slate-500 bg-slate-800/80 text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    ({slotNum}) {isTargeted ? 'Drop Here' : '___'}
                  </button>
                )}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full space-y-5">
      {/* Passage Card */}
      <div className="bg-slate-800/90 border-4 border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl relative backdrop-blur-sm">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700/80">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center space-x-1.5">
            <span>🧩 Drag words into blanks (or tap to place)</span>
          </span>
          {Object.keys(filledSlots).length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-slate-700 transition"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {renderTextWithBlanks()}
      </div>

      {/* Available Word Chips Bank */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Drag chips to blanks or tap:
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
          {(question.options || []).map((word, index) => {
            const isUsed = usedWords.includes(word);
            return (
              <motion.button
                key={index}
                type="button"
                draggable={!isUsed && !disabled}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', word);
                  e.dataTransfer.effectAllowed = 'copyMove';
                }}
                whileHover={!isUsed && !disabled ? { scale: 1.05 } : {}}
                whileTap={!isUsed && !disabled ? { scale: 0.95 } : {}}
                disabled={isUsed || disabled}
                onClick={() => handleChipClick(word)}
                className={`px-4 py-2 rounded-2xl font-black text-sm sm:text-base border-2 transition-all shadow-md select-none ${
                  isUsed
                    ? 'opacity-30 bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed line-through'
                    : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white cursor-grab active:cursor-grabbing active:scale-95'
                }`}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Submit Action Button */}
      <div className="pt-2">
        <motion.button
          type="button"
          disabled={!isAllFilled || disabled}
          onClick={handleSubmit}
          whileHover={isAllFilled && !disabled ? { scale: 1.02 } : {}}
          whileTap={isAllFilled && !disabled ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center space-x-2 shadow-xl transition-all ${
            isAllFilled && !disabled
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-2 border-emerald-300 shadow-emerald-500/30 cursor-pointer animate-bounce'
              : 'bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 cursor-not-allowed'
          }`}
        >
          <Check size={22} />
          <span>{isAllFilled ? 'Check Answer 🚀' : `Fill all ${totalSlots} blanks to check`}</span>
        </motion.button>
      </div>
    </div>
  );
}