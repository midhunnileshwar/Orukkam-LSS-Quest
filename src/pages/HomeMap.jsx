import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Star, LogOut, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import Background from '../components/Background';
import { getAvatarEmoji } from '../data/avatars';

export default function HomeMap() {
  const navigate = useNavigate();
  const { xp, progress, avatar, name, medium } = useGame();
  const { isMuted, setIsMuted, playSound } = useSound();
  const [selectedLand, setSelectedLand] = useState(null);
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 85 });

  const isEnglish = medium === 'english';

  // Calculate Progress for each Land
  const getLandProgress = (landId) => {
    const landLevels = progress?.[landId] || {};
    const totalLevels = 4; // Total core levels per subject in this stage
    const completed = Object.values(landLevels).filter((s) => s === 'completed').length;
    return Math.min(100, (completed / totalLevels) * 100);
  };

  const lands = [
    {
      id: 'maths',
      name: isEnglish ? 'Maths Factory' : 'സംഖ്യാലോകം',
      color: 'from-amber-400 to-orange-500',
      icon: '🧮',
      x: 20,
      y: 28,
      status: getLandProgress('maths'),
    },
    {
      id: 'malayalam',
      name: isEnglish ? 'Malayalam Quest' : 'തേന്മൊഴി',
      color: 'from-lime-400 to-green-600',
      icon: '📝',
      x: 80,
      y: 28,
      status: getLandProgress('malayalam'),
    },
    {
      id: 'english',
      name: 'English Tent',
      color: 'from-indigo-400 to-blue-600',
      icon: '⛺',
      x: 50,
      y: 48,
      status: getLandProgress('english'),
    },
    {
      id: 'evs',
      name: isEnglish ? 'EVS Park' : 'പൂമ്പാറ്റ',
      color: 'from-emerald-400 to-teal-600',
      icon: '🦋',
      x: 24,
      y: 68,
      status: getLandProgress('evs'),
    },
    {
      id: 'gk',
      name: isEnglish ? 'GK Library' : 'ചോദ്യ കുടുക്ക',
      color: 'from-rose-400 to-red-600',
      icon: '💡',
      x: 76,
      y: 68,
      status: getLandProgress('gk'),
    },
  ];

  const handleLandClick = (land) => {
    setAvatarPos({ x: land.x, y: land.y });
    playSound('pop');

    setTimeout(() => {
      setSelectedLand(land.id);
      setTimeout(() => {
        navigate(`/land/${land.id}`);
      }, 450);
    }, 500);
  };

  useEffect(() => {
    setAvatarPos({ x: 50, y: 85 });
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    playSound('click');
  };

  return (
    <Background>
      <div className="relative w-full h-full min-h-screen flex flex-col select-none">
        {/* Header UI */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-start pointer-events-none">
          {/* User Profile */}
          <div className="pointer-events-auto">
            <motion.button
              onClick={() => navigate('/profile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-cartoon border-4 border-white transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-sky-400 flex items-center justify-center text-3xl border-2 border-white">
                {getAvatarEmoji(avatar)}
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-extrabold text-slate-800 leading-tight">
                  {name || (isEnglish ? 'Learner' : 'കൂട്ടുകാരൻ')}
                </p>
                <p className="text-xs font-bold text-slate-500">CM Kids Quest</p>
              </div>
            </motion.button>
          </div>

          {/* XP & Controls */}
          <div className="flex flex-col items-end space-y-2 pointer-events-auto">
            <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 font-black px-5 py-2 rounded-full shadow-cartoon border-4 border-white transform rotate-1">
              <Award size={24} />
              <span className="text-xl">{xp} XP</span>
            </div>

            <div className="flex space-x-2">
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white p-3 rounded-full shadow-cartoon border-2 border-slate-100 text-slate-600 hover:bg-slate-50"
                title={isMuted ? (isEnglish ? 'Unmute Sound' : 'ശബ്ദം നൽകാം') : (isEnglish ? 'Mute Sound' : 'നിശബ്ദമാക്കാം')}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-rose-500 hover:bg-rose-600 p-3 rounded-full shadow-cartoon border-2 border-white text-white"
                title={isEnglish ? 'Return to Home' : 'ഹോം പേജിലേക്ക്'}
              >
                <LogOut size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* MAP AREA */}
        <div className="flex-1 relative w-full h-full overflow-hidden">
          {/* Map Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <path
              d="M 50% 85% Q 20% 60% 20% 28%"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="14,14"
              fill="none"
            />
            <path
              d="M 50% 85% Q 80% 60% 80% 28%"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="14,14"
              fill="none"
            />
            <path
              d="M 50% 85% L 50% 48%"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="14,14"
              fill="none"
            />
            <path
              d="M 50% 85% Q 30% 80% 24% 68%"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="14,14"
              fill="none"
            />
            <path
              d="M 50% 85% Q 70% 80% 76% 68%"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="14,14"
              fill="none"
            />
          </svg>

          {/* Start Point */}
          <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <div className="w-32 h-16 bg-green-600/30 rounded-[100%] blur-xl transform scale-x-150" />
            <div className="text-center font-black text-xs text-white/80 bg-black/20 px-3 py-1 rounded-full">
              START POINT
            </div>
          </div>

          {/* Lands */}
          {lands.map((land) => (
            <motion.button
              key={land.id}
              onClick={() => handleLandClick(land)}
              className="absolute z-10 group cursor-pointer"
              style={{ left: `${land.x}%`, top: `${land.y}%` }}
              initial={{ scale: 0 }}
              animate={{
                scale: selectedLand === land.id ? 4 : 1,
                opacity: selectedLand && selectedLand !== land.id ? 0 : 1,
                x: '-50%',
                y: '-50%',
              }}
              whileHover={{ scale: selectedLand ? 4 : 1.1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div
                className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br ${land.color} 
                  shadow-cartoon-lg border-4 border-white flex flex-col items-center justify-center
                  group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all`}
              >
                <span className="text-4xl sm:text-5xl mb-1 filter drop-shadow-md transform group-hover:-translate-y-1 transition-transform">
                  {land.icon}
                </span>
                <span className="text-white font-black text-xs sm:text-sm drop-shadow-md bg-black/20 px-2 py-0.5 rounded-lg">
                  {land.name}
                </span>

                {/* Progress Pill */}
                <div className="absolute -bottom-3 bg-white px-2 py-0.5 rounded-full border-2 border-slate-100 shadow-sm flex items-center space-x-1">
                  <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${land.status}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-600">
                    {Math.round(land.status)}%
                  </span>
                </div>

                {land.status >= 100 && (
                  <div className="absolute -top-3 -right-3 text-yellow-300 drop-shadow-lg animate-bounce">
                    <Star size={30} fill="currentColor" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}

          {/* Avatar Character */}
          <motion.div
            className="absolute z-20 pointer-events-none"
            animate={{
              left: `${avatarPos.x}%`,
              top: `${avatarPos.y}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
              restDelta: 0.001,
            }}
            style={{ x: '-50%', y: '-90%' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="text-6xl filter drop-shadow-2xl">{getAvatarEmoji(avatar)}</div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-[100%] blur-sm" />
            </motion.div>
          </motion.div>
        </div>

        {/* Daily Mix Floating Button */}
        <div className="absolute bottom-6 right-6 z-30">
          <motion.button
            onClick={() => {
              playSound('click');
              navigate('/quiz/daily/mix');
            }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            className="bg-candy-purple hover:bg-candy-purple/90 text-white p-4 sm:px-6 rounded-[2rem] shadow-cartoon-lg border-4 border-white flex items-center space-x-2 transition-transform"
          >
            <span className="text-3xl">🎲</span>
            <div className="text-left hidden sm:block">
              <span className="font-black text-lg block leading-tight">
                {isEnglish ? 'Daily Mix' : 'ഡെയ്‌ലി മിക്സ്'}
              </span>
              <span className="text-xs text-white/80 font-bold">
                {isEnglish ? 'Daily Challenge' : 'ദിവസേനയുള്ള ചലഞ്ച്'}
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </Background>
  );
}
