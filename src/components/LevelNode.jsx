import React from 'react';
import { Star, Lock, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LevelNode({ level, status, onPlay }) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  return (
    <div className="relative flex flex-col items-center group">
      {/* Stars Pop-up */}
      {isCompleted && (
        <div className="flex space-x-1 mb-1 absolute -top-8 animate-bounce-gentle">
          {[1, 2, 3].map((s) => (
            <Star key={s} size={20} className="text-yellow-400 fill-yellow-400 drop-shadow-sm" />
          ))}
        </div>
      )}

      {/* The Node Button */}
      <motion.button
        whileHover={!isLocked ? { scale: 1.15, rotate: 5 } : {}}
        whileTap={!isLocked ? { scale: 0.9 } : { x: [0, -5, 5, -5, 5, 0] }}
        onClick={() => !isLocked && onPlay(level)}
        className={`
          w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-cartoon-sm border-[6px] transition-all
          ${isCompleted ? 'bg-candy-yellow border-white text-white' : ''}
          ${
            isCurrent
              ? 'bg-candy-green border-white text-white animate-pulse-slow ring-4 ring-green-200'
              : ''
          }
          ${isLocked ? 'bg-slate-200 border-slate-300 text-slate-400' : ''}
        `}
      >
        {isCompleted ? (
          <span className="text-4xl font-black">{level}</span>
        ) : isCurrent ? (
          <Play size={40} className="fill-white ml-1" />
        ) : (
          <Lock size={32} />
        )}
      </motion.button>

      {/* Label */}
      {!isLocked && (
        <span className="mt-2 font-black text-sm text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
          Level {level}
        </span>
      )}
    </div>
  );
}
