import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LevelNode from '../components/LevelNode';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { getAvatarEmoji } from '../data/avatars';

export default function LandView() {
  const { landId } = useParams();
  const navigate = useNavigate();
  const { getLevelStatus, avatar, name, medium } = useGame();
  const { playSound } = useSound();

  const isEnglish = medium === 'english';
  const [openingLevel, setOpeningLevel] = useState(null);

  const levels = Array.from({ length: 10 }, (_, i) => {
    const levelId = i + 1;
    return { id: levelId, status: getLevelStatus(landId, levelId) };
  });

  const currentActiveLevel =
    levels.find((l) => l.status === 'current')?.id ||
    levels.find((l) => l.status === 'completed')?.id ||
    1;

  const theme = {
    maths: {
      bg: 'bg-amber-100',
      accent: 'text-amber-600',
      title: isEnglish ? 'Maths Factory' : 'സംഖ്യാലോകം',
      pattern: 'radial-gradient(circle, #fbbf24 4px, transparent 4px)',
    },
    malayalam: {
      bg: 'bg-lime-100',
      accent: 'text-lime-600',
      title: isEnglish ? 'Malayalam Quest' : 'തേന്മൊഴി',
      pattern: 'radial-gradient(circle, #84cc16 4px, transparent 4px)',
    },
    english: {
      bg: 'bg-indigo-100',
      accent: 'text-indigo-600',
      title: 'English Tent',
      pattern: 'radial-gradient(circle, #6366f1 4px, transparent 4px)',
    },
    evs: {
      bg: 'bg-emerald-100',
      accent: 'text-emerald-600',
      title: isEnglish ? 'EVS Park' : 'പൂമ്പാറ്റ',
      pattern: 'radial-gradient(circle, #10b981 4px, transparent 4px)',
    },
    gk: {
      bg: 'bg-rose-100',
      accent: 'text-rose-600',
      title: isEnglish ? 'GK Library' : 'ചോദ്യ കുടുക്ക',
      pattern: 'radial-gradient(circle, #f43f5e 4px, transparent 4px)',
    },
  }[landId];

  if (!theme) {
    return (
      <div className="text-center mt-20 font-bold text-slate-600">
        {isEnglish ? 'Land Not Found' : 'മേഖല കണ്ടെത്തിയില്ല'}
      </div>
    );
  }

  const handlePlay = (levelId) => {
    if (openingLevel) return;
    setOpeningLevel(levelId);
    playSound('doorOpen');

    setTimeout(() => {
      navigate(`/quiz/${landId}/${levelId}`);
    }, 1100);
  };

  const avatarEmoji = getAvatarEmoji(avatar);

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col relative overflow-hidden select-none`}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 glass-panel m-4 px-4 py-3 shadow-cartoon flex items-center justify-between rounded-full border-4 border-white">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/map')}
            className="p-2 bg-slate-100 rounded-full mr-4 hover:bg-slate-200 transition"
            title={isEnglish ? 'Back to Map' : 'മാപ്പിലേക്ക്'}
          >
            <ArrowLeft size={28} className="text-slate-700" />
          </button>
          <h1
            className={`font-black ${theme.accent} ${
              landId === 'maths' ? 'text-xl' : 'text-2xl'
            }`}
          >
            {theme.title}
          </h1>
        </div>

        {/* Avatar indicator in header */}
        <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
          <span className="text-2xl">{avatarEmoji}</span>
          <span className="font-bold text-xs text-slate-700 max-w-[80px] truncate">
            {name || (isEnglish ? 'Learner' : 'കുട്ടി')}
          </span>
        </div>
      </div>

      {/* The Scrollable Path */}
      <div
        className="flex-1 p-4 overflow-y-auto relative"
        style={{ backgroundImage: theme.pattern, backgroundSize: '32px 32px' }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 400 1200"
          preserveAspectRatio="none"
        >
          <path
            d="M 200 100 Q 300 200, 200 300 T 200 500 T 200 700 T 200 900"
            stroke="white"
            strokeWidth="10"
            fill="none"
            strokeDasharray="20,20"
          />
        </svg>

        <div className="flex flex-col items-center space-y-16 pb-32 pt-10 relative z-10">
          {levels.map((level, index) => {
            const align = index % 2 === 0 ? '-translate-x-16' : 'translate-x-16';
            const hasAvatar = level.id === currentActiveLevel;

            return (
              <div key={level.id} className={`transform ${align} transition-all`}>
                <LevelNode
                  level={level.id}
                  status={level.status}
                  onPlay={handlePlay}
                  hasAvatar={hasAvatar}
                  avatarEmoji={avatarEmoji}
                  avatarName={name || (isEnglish ? 'Me' : 'ഞാൻ')}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Door Opening & Avatar Walk Transition Overlay */}
      <AnimatePresence>
        {openingLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="flex flex-col items-center text-center max-w-sm w-full"
            >
              {/* Magic Door Frame */}
              <div
                className="relative w-60 h-80 bg-amber-950 rounded-t-full border-8 border-amber-600 shadow-2xl flex items-center justify-center overflow-hidden"
                style={{ perspective: '1200px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-300 via-amber-300 to-yellow-100 flex flex-col items-center justify-center">
                  <span className="text-6xl animate-pulse">✨</span>
                  <span className="text-amber-800 font-black text-xs uppercase tracking-widest mt-2">
                    Level {openingLevel}
                  </span>
                </div>

                {/* Left Door */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -110 }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-amber-900 to-amber-800 border-r-2 border-amber-950 flex items-center justify-end pr-3 shadow-2xl"
                >
                  <div className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-amber-950 shadow-md"></div>
                </motion.div>

                {/* Right Door */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 110 }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'right center' }}
                  className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-900 to-amber-800 border-l-2 border-amber-950 flex items-center justify-start pl-3 shadow-2xl"
                >
                  <div className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-amber-950 shadow-md"></div>
                </motion.div>

                {/* Walking Avatar Leaping into Door */}
                <motion.div
                  initial={{ scale: 1.1, y: 50, opacity: 1 }}
                  animate={{
                    scale: [1.1, 1.4, 0.3],
                    y: [50, 0, -40],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.95, times: [0, 0.45, 1], ease: 'easeIn' }}
                  className="z-30 text-7xl select-none filter drop-shadow-2xl"
                >
                  {avatarEmoji}
                </motion.div>
              </div>

              {/* Status Text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-6 text-center"
              >
                <div className="text-yellow-300 font-black text-2xl drop-shadow">
                  {isEnglish
                    ? `Opening Level ${openingLevel}... 🚪✨`
                    : `ലെവൽ ${openingLevel} തുറക്കുന്നു... 🚪✨`}
                </div>
                <p className="text-white/90 font-bold text-sm mt-1">
                  {isEnglish
                    ? `${name || 'Learner'} is entering the level!`
                    : `${name ? `${name} കളിക്കളത്തിലേക്ക് പ്രവേശിക്കുന്നു!` : 'കളിക്കളത്തിലേക്ക് പ്രവേശിക്കുന്നു!'}`}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
