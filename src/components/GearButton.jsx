import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function GearButton({ option, text, isSelected, result, onClick, disabled }) {
  // Animation Variants
  const variants = {
    idle: { rotate: 0 },
    spinning: { rotate: 360, transition: { duration: 1, repeat: Infinity, ease: 'linear' } },
    correct: { scale: 1.2, rotate: 0, transition: { type: 'spring', bounce: 0.6 } },
    wrong: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } },
  };

  let state = 'idle';
  if (isSelected && result === null) state = 'spinning';
  if (isSelected && result === 'correct') state = 'correct';
  if (isSelected && result === 'wrong') state = 'wrong';

  const baseStyle =
    'relative w-36 h-36 flex flex-col items-center justify-center p-2 rounded-full transition-colors';
  let colorStyle =
    'bg-white border-8 border-slate-200 text-slate-600 shadow-cartoon hover:scale-105 active:scale-95';

  if (isSelected && result === null)
    colorStyle = 'bg-blue-100 border-8 border-candy-blue text-candy-blue shadow-none';
  if (isSelected && result === 'correct')
    colorStyle =
      'bg-green-100 border-8 border-candy-green text-candy-green shadow-[0_0_30px_rgba(34,197,94,0.6)] scale-110 z-10';
  if (isSelected && result === 'wrong')
    colorStyle = 'bg-red-100 border-8 border-candy-red text-candy-red shadow-none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${colorStyle} disabled:cursor-not-allowed`}
    >
      {/* The Gear Icon */}
      <motion.div
        variants={variants}
        animate={state}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
      >
        <Settings size={140} />
      </motion.div>

      {/* Option Label */}
      <span className="text-4xl font-black mb-1 z-10 filter drop-shadow-sm">{option}</span>

      {/* Answer Text */}
      <span className="text-sm font-bold text-center leading-tight line-clamp-2 z-10 px-2">
        {text}
      </span>
    </button>
  );
}
