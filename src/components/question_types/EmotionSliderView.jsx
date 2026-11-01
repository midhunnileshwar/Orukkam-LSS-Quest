import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmotionSliderView({ question, onAnswer, disabled }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (emotionId, e) => {
    if (disabled || selected) return;
    setSelected(emotionId);

    const isCorrect = emotionId === question.correct;
    setTimeout(() => {
      onAnswer(isCorrect, emotionId, e);
    }, 500);
  };

  return (
    <div className="w-full space-y-5 text-center">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-yellow-400 bg-yellow-950/80 px-3 py-1 rounded-full border border-yellow-800">
          🎭 Character Emotion Detective: How does the character feel?
        </span>
      </div>

      {/* Quote Display Card */}
      <div className="bg-slate-800/95 border-4 border-slate-700 rounded-3xl p-6 shadow-2xl max-w-lg mx-auto">
        <p className="text-lg sm:text-xl font-black text-white leading-relaxed italic">
          {question.sentence}
        </p>
      </div>

      {/* Emotion Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
        {(question.emotions || []).map((emo) => {
          const isSelected = selected === emo.id;
          const isTarget = emo.id === question.correct;

          return (
            <motion.button
              key={emo.id}
              type="button"
              whileHover={!disabled ? { scale: 1.08, y: -4 } : {}}
              whileTap={!disabled ? { scale: 0.94 } : {}}
              disabled={disabled}
              onClick={(e) => handleSelect(emo.id, e)}
              className={`p-4 rounded-3xl border-4 font-black shadow-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? isTarget
                    ? 'bg-emerald-500 border-emerald-300 text-white'
                    : 'bg-red-600 border-red-400 text-white'
                  : 'bg-gradient-to-b from-slate-800 to-slate-900 hover:from-purple-600 hover:to-indigo-700 text-white border-slate-700 hover:border-yellow-300'
              }`}
            >
              <span className="text-4xl sm:text-5xl mb-2">{emo.emoji}</span>
              <span className="text-xs font-bold leading-tight">{emo.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
