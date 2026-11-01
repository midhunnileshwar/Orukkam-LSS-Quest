import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function ConversationBranchingView({ question, onAnswer, disabled }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [question.id]);

  const handleChoice = (optionId, e) => {
    if (disabled || selected) return;
    setSelected(optionId);

    const isCorrect = optionId === question.correct;
    setTimeout(() => {
      onAnswer(isCorrect, optionId, e);
    }, 500);
  };

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <span className="text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
          💬 Choose Your Reply & Dialogue Path
        </span>
      </div>

      {/* Speaker Dialogue Card */}
      <div className="bg-slate-800/95 border-4 border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl relative">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase mb-2">
          <MessageSquare size={16} />
          <span>{question.speaker || 'Dialogue Scene'}</span>
        </div>
        <p className="text-slate-100 text-sm sm:text-base font-semibold leading-relaxed">
          {question.prompt || question.text}
        </p>
      </div>

      {/* Reply Speech Bubbles */}
      <div className="space-y-3 pt-1">
        {(question.options || []).map((opt) => {
          const isSelected = selected === opt.id;
          const isTarget = opt.id === question.correct;

          return (
            <motion.button
              key={opt.id}
              type="button"
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              disabled={disabled}
              onClick={(e) => handleChoice(opt.id, e)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-3 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-start space-x-3 ${
                isSelected
                  ? isTarget
                    ? 'bg-emerald-600 border-emerald-300 text-white'
                    : 'bg-red-600 border-red-400 text-white'
                  : 'bg-gradient-to-r from-slate-800 to-indigo-950/90 hover:from-indigo-600 hover:to-indigo-700 text-white border-slate-700 hover:border-yellow-300'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                {opt.id.toUpperCase()}
              </span>
              <span className="leading-relaxed flex-1">{opt.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
