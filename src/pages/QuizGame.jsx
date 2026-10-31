import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Zap, Award, Volume2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GearButton from '../components/GearButton';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { getQuestionsForLevel } from '../data/questions';
import confetti from 'canvas-confetti';

export default function QuizGame() {
  const { landId, levelId } = useParams();
  const navigate = useNavigate();
  const { addXp, loseHeart, refillHearts, hearts, completeLevel } = useGame();
  const { playSound, speakText } = useSound();

  const [levelData, setLevelData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);

  // Quiz State
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30);
  const [fastAnswerBonus, setFastAnswerBonus] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [totalXpGained, setTotalXpGained] = useState(0);

  const isDaily = landId === 'daily' || levelId === 'mix';

  useEffect(() => {
    const data = getQuestionsForLevel(landId, levelId);
    setLevelData(data);
    setCurrentQuestionIndex(0);
    setCompleted(false);
  }, [landId, levelId]);

  // Timer Countdown
  useEffect(() => {
    if (
      !levelData?.questions?.[currentQuestionIndex] ||
      selectedOption ||
      completed ||
      showExplanation ||
      hearts <= 0
    )
      return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [levelData, currentQuestionIndex, selectedOption, completed, showExplanation, hearts]);

  const currentQuestion = levelData?.questions?.[currentQuestionIndex];

  // Auto-read question text when first appearing
  const handleReadQuestion = () => {
    if (currentQuestion) {
      speakText(currentQuestion.text);
    }
  };

  const handleTimeOut = () => {
    playSound('wrong');
    loseHeart();
    speakText('സമയം കഴിഞ്ഞു! ഉത്തരം ശ്രദ്ധിക്കൂ.');
    setResult('wrong');
    setShowExplanation(true);
  };

  const handleOptionClick = (optionId) => {
    if (selectedOption || showExplanation) return;

    setSelectedOption(optionId);
    playSound('click');

    const correct = optionId === currentQuestion.correct;
    setIsCorrect(correct);
    setResult(correct ? 'correct' : 'wrong');

    if (correct) {
      playSound('correct');
      const isFast = timeLeft >= 22;
      const xpAmount = isFast ? 15 : 10;
      setEarnedXp(xpAmount);
      setTotalXpGained((prev) => prev + xpAmount);
      setFastAnswerBonus(isFast);
      addXp(xpAmount);

      const praises = [
        'മിടുക്കൻ! ശരിയായ ഉത്തരം!',
        'സൂപ്പർ! വളരെ നന്ന്!',
        'അസ്സലായിരിക്കുന്നു!',
        'ഗ്രേറ്റ് ജോബ്!',
      ];
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      speakText(randomPraise);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#fbbf24', '#60a5fa'],
      });

      setTimeout(() => {
        nextQuestion();
      }, 1800);
    } else {
      setTimeout(() => {
        playSound('wrong');
        loseHeart();
        speakText('സാരമില്ല! നമുക്ക് ശരിയായ ഉത്തരം നോക്കാം.');
        setShowExplanation(true);
      }, 400);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setResult(null);
    setFastAnswerBonus(false);
    setEarnedXp(0);
    setTimeLeft(30);

    if (currentQuestionIndex < (levelData?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Level Finished
      playSound('levelUp');
      setCompleted(true);
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.4 },
        colors: ['#ffd700', '#ff00ff', '#00ffff', '#00ff00'],
      });
      speakText('അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ഈ ലെവൽ വിജയകരമായി പൂർത്തിയാക്കി!');
      completeLevel(landId, levelId);
    }
  };

  const handleReturnNavigation = () => {
    if (isDaily) {
      navigate('/map');
    } else {
      navigate(`/land/${landId}`);
    }
  };

  // Hearts exhausted screen
  if (hearts <= 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800 border-4 border-candy-red p-8 rounded-[2.5rem] max-w-md shadow-2xl flex flex-col items-center"
        >
          <div className="text-7xl mb-4 animate-bounce">💔</div>
          <h2 className="text-3xl font-black mb-2 text-candy-red">ഹൃദയങ്ങൾ തീർന്നു!</h2>
          <p className="text-slate-300 text-lg mb-6 font-semibold">
            വിഷമിക്കേണ്ട! ഒന്നു വിശ്രമിച്ച് നമുക്ക് വീണ്ടും തുടങ്ങാം.
          </p>
          <button
            onClick={() => {
              refillHearts();
              setTimeLeft(30);
              setShowExplanation(false);
              setSelectedOption(null);
              playSound('click');
            }}
            className="w-full bg-candy-green hover:bg-candy-green/90 text-white font-black py-4 px-6 rounded-2xl shadow-cartoon text-xl active:translate-y-1 transition-all flex items-center justify-center space-x-2"
          >
            <RotateCcw size={24} />
            <span>ജീവൻ വീണ്ടെടുക്കൂ (Refill Hearts ❤️)</span>
          </button>
          <button
            onClick={handleReturnNavigation}
            className="mt-4 text-slate-400 font-bold hover:text-white"
          >
            തിരികെ പോകാം (Go Back)
          </button>
        </motion.div>
      </div>
    );
  }

  // Victory / Completed Screen
  if (completed) {
    return (
      <div className="min-h-screen bg-candy-green flex flex-col items-center justify-center text-white relative overflow-hidden p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="flex flex-col items-center max-w-md w-full"
        >
          <h1 className="text-6xl font-black mb-2 animate-bounce drop-shadow-lg">വിജയം! 🌟</h1>
          <p className="text-xl font-bold mb-6 text-green-100">VICTORY!</p>

          <div className="bg-white/20 p-8 rounded-[2.5rem] backdrop-blur-md border-4 border-white text-center w-full shadow-2xl mb-8">
            <Award size={80} className="text-yellow-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-black mb-2">ലെവൽ പൂർത്തിയായി!</h3>
            <p className="text-lg opacity-90 mb-4 font-semibold">Level {levelId} Finished</p>
            <div className="bg-white/25 py-3 px-6 rounded-2xl inline-block border-2 border-white/50">
              <span className="text-2xl font-black text-yellow-300">+{totalXpGained + 50} XP</span>
              <span className="text-sm block text-white/80 font-bold">Total Bonus</span>
            </div>
          </div>

          <button
            onClick={handleReturnNavigation}
            className="w-full bg-white text-candy-green font-black py-5 px-10 rounded-full shadow-cartoon text-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white"
          >
            തുടരാം ➔ (Continue)
          </button>
        </motion.div>
      </div>
    );
  }

  // Content Missing / Work In Progress
  if (!levelData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 text-white text-xl font-bold text-center max-w-md">
          <p className="text-4xl mb-4">🚧</p>
          <p className="mb-2">ചോദ്യങ്ങൾ തയ്യാറാകുന്നു...</p>
          <p className="text-slate-400 text-sm mb-6">Questions coming soon for Level {levelId}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-candy-blue text-white px-8 py-3 rounded-2xl text-base font-black shadow-cartoon hover:scale-105 active:scale-95 transition"
          >
            ← തിരികെ പോകാം (Go Back)
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-black text-2xl animate-pulse">
        ചോദ്യം ഒരുങ്ങുന്നു...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center relative overflow-hidden select-none">
      {/* Background Patterns */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Bar */}
      <div className="w-full p-4 flex justify-between items-center text-white z-10 relative max-w-2xl">
        <button
          onClick={handleReturnNavigation}
          className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition shadow-lg border-2 border-white/10 active:scale-95"
          title="Go Back"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Hearts */}
        <div className="flex space-x-1.5 bg-black/40 px-3 py-2 rounded-full border border-white/20">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              size={24}
              className={`filter drop-shadow-md transition-all ${
                i < hearts ? 'fill-candy-red text-candy-red scale-100' : 'text-slate-600 scale-90'
              }`}
            />
          ))}
        </div>

        {/* Timer UI */}
        <div
          className={`font-mono text-xl sm:text-2xl font-black px-4 py-2 rounded-full border-2 border-white/50 shadow-cartoon transition-colors ${
            timeLeft <= 5 ? 'bg-candy-red text-white animate-pulse' : 'bg-candy-blue text-white'
          }`}
        >
          ⏳ {timeLeft}s
        </div>

        {/* Question Counter */}
        <div className="bg-candy-green text-white px-4 py-2 rounded-full font-black text-base sm:text-lg shadow-cartoon border-2 border-white/50">
          {currentQuestionIndex + 1}/{levelData?.questions?.length || 0}
        </div>
      </div>

      {/* Question Card (The Machine Screen) */}
      <div className="flex-1 w-full max-w-lg px-4 py-2 flex flex-col justify-center relative z-10">
        <div className="bg-slate-800 border-[6px] border-slate-600 rounded-[2rem] p-6 mb-6 shadow-2xl relative overflow-hidden transform rotate-0.5">
          {/* Bolts */}
          <div className="absolute top-3 left-3 w-3 h-3 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>
          <div className="absolute top-3 right-3 w-3 h-3 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {levelData.title || `Level ${levelId}`}
            </span>
            <button
              onClick={handleReadQuestion}
              className="flex items-center space-x-1 bg-indigo-600/80 hover:bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold active:scale-95 transition"
            >
              <Volume2 size={16} />
              <span>വായിക്കാം</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-candy-green text-center leading-relaxed drop-shadow-sm font-chembakam my-2">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full place-items-center relative">
          {currentQuestion.options.map((option) => (
            <GearButton
              key={option.id}
              option={option.id.toUpperCase()}
              text={option.text}
              isSelected={selectedOption === option.id}
              result={selectedOption === option.id ? result : null}
              onClick={() => handleOptionClick(option.id)}
              disabled={!!selectedOption || showExplanation}
            />
          ))}

          {/* Floating XP Animation */}
          <AnimatePresence>
            {selectedOption && isCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: -40 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.7, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center z-50"
              >
                <div className="text-6xl mb-1 animate-bounce">🌟</div>
                <div className="bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full border-4 border-candy-yellow shadow-2xl flex flex-col items-center">
                  {fastAnswerBonus && (
                    <span className="text-candy-red font-black text-sm animate-pulse">
                      ⚡ FAST ANSWER!
                    </span>
                  )}
                  <span className="text-candy-green font-black text-2xl">+{earnedXp} XP!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Explanation Modal (The Did You Know / Repair Card) */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-50 border-t-8 border-candy-red max-w-xl mx-auto"
          >
            <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

            <div className="flex items-center space-x-3 mb-3">
              <Zap className="text-candy-red fill-current animate-pulse" size={28} />
              <h3 className="text-2xl font-black text-slate-800">ശരിയായ ഉത്തരം നോക്കാം! 💡</h3>
            </div>

            <p className="text-slate-700 text-base sm:text-lg font-bold mb-6 leading-relaxed bg-red-50 p-4 rounded-2xl border-l-4 border-candy-red">
              {currentQuestion.explanation ||
                'ശ്രമിച്ചത് നല്ല കാര്യം! അടുത്ത ചോദ്യത്തിൽ കൂടുതൽ ശ്രദ്ധിക്കാം.'}
            </p>

            <button
              onClick={nextQuestion}
              className="w-full bg-candy-green hover:bg-candy-green/90 text-white font-black py-4 rounded-2xl shadow-cartoon text-xl active:translate-y-1 border-b-4 border-green-700 transition-all"
            >
              തുടരാം ➔ (Continue)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
