import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GearButton from '../components/GearButton';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { getQuestionsForLevel } from '../data/questions';
import confetti from 'canvas-confetti';

export default function QuizGame() {
  const { landId, levelId } = useParams();
  const navigate = useNavigate();
  const { addXp, loseHeart, hearts, updateLevelStatus } = useGame();
  const { playSound } = useSound();

  const [levelData, setLevelData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null); // Added result state

  // Quiz State
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30);
  const [fastAnswerBonus, setFastAnswerBonus] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  // Create isDaily flag (derived from levelId or other logic)
  const isDaily = levelId === 'daily';

  useEffect(() => {
    const data = getQuestionsForLevel(landId, levelId);
    setLevelData(data);
  }, [landId, levelId]);

  useEffect(() => {
    if (!levelData?.questions?.[currentQuestionIndex] || selectedOption || completed || showExplanation) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [levelData, currentQuestionIndex, selectedOption, completed, showExplanation]);

  const currentQuestion = levelData?.questions?.[currentQuestionIndex];


  if (completed) {
    return (
      <div className="min-h-screen bg-candy-green flex flex-col items-center justify-center text-white relative overflow-hidden">
        <h1 className="text-6xl font-black mb-4 animate-bounce drop-shadow-lg">VICTORY!</h1>
        <div className="text-9xl mb-8 animate-spin-slow">⭐</div>
        <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-sm border-4 border-white text-center">
          <p className="text-2xl font-bold mb-2">Level Complete!</p>
          <p className="text-xl">+50 XP Earned</p>
        </div>
        <button
          onClick={() => navigate(`/land/${landId}`)}
          className="mt-12 bg-white text-candy-green font-black py-4 px-12 rounded-full shadow-cartoon text-xl hover:scale-105 transition-transform"
        >
          Continue Journey ➔
        </button>
      </div>
    );
  }

  if (!levelData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl font-bold font-chembakam text-center">
          Work in Progress... <br />
          (Questions coming soon for Level {levelId})
          <button
            onClick={() => navigate(-1)}
            className="mt-8 bg-candy-blue px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion)
    return (
      <div className="text-white text-center mt-20 font-black animate-pulse">
        Loading Machine...
      </div>
    );

  const handleOptionClick = (optionId) => {
    if (selectedOption) return; // Prevent multiple selections

    setSelectedOption(optionId);
    playSound('click');

    // Check answer
    const correct = optionId === currentQuestion.correct;
    setIsCorrect(correct);
    setResult(correct ? 'correct' : 'wrong'); // Set result for styling

    if (correct) {
      playSound('correct');
      const isFast = timeLeft >= 25; // Answered within 5 seconds
      const xpAmount = isFast ? 15 : 10;
      setEarnedXp(xpAmount);
      setFastAnswerBonus(isFast);
      addXp(xpAmount); // Add XP for correct answer

      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#4ade80', '#fbbf24', '#60a5fa'] });

      setTimeout(() => {
        nextQuestion();
      }, 2000); // 2 second delay to show animations before moving to next question
    } else {
      setTimeout(() => {
        playSound('wrong');
        loseHeart();
        setShowExplanation(true); // Show explanation for wrong answer
      }, 500);
    }
  };

  // const handleWrong = () => {
  //     setResult('wrong');
  //     loseHeart();
  //     setTimeout(() => setShowExplanation(true), 1000);
  // };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setResult(null); // Reset result state
    setFastAnswerBonus(false);
    setEarnedXp(0);
    setTimeLeft(30);

    if (currentQuestionIndex < levelData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Level Finished
      playSound('levelUp');
      setCompleted(true);
      confetti({ particleCount: 300, spread: 160, origin: { y: 0.4 }, colors: ['#ffd700', '#ff00ff', '#00ffff', '#00ff00'] });
      updateLevelStatus(landId, parseInt(levelId), 'completed');
      // Add extra bonus for full level?
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center relative overflow-hidden">
      {/* Background Patterns */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      {/* Top Bar */}
      <div className="w-full p-4 flex justify-between items-center text-white z-10 relative">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition shadow-lg border-2 border-white/10"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex space-x-2 bg-black/40 px-4 py-2 rounded-full border border-white/20">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              size={28}
              className={`filter drop-shadow-md ${i < hearts ? 'fill-candy-red text-candy-red animate-pulse' : 'text-slate-600'
                }`}
            />
          ))}
        </div>

        {/* Timer UI */}
        <div className={`font-mono text-2xl font-black px-4 py-2 rounded-full border-2 border-white/50 shadow-cartoon transition-colors ${timeLeft <= 5 ? 'bg-candy-red text-white animate-pulse' : 'bg-candy-blue text-white'}`}>
          ⏳ {timeLeft}s
        </div>

        <div className="bg-candy-green text-white px-4 py-2 rounded-full font-black text-lg shadow-cartoon border-2 border-white/50">
          {currentQuestionIndex + 1}/{levelData?.questions?.length || 0}
        </div>
      </div>

      {/* Level Complete Overlay */}
      {isLevelComplete && (
        <div className="absolute inset-0 bg-candy-purple/95 z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in text-center p-8 backdrop-blur-sm">
          <div className="bg-white/10 p-10 rounded-[3rem] border-8 border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <Award
              size={100}
              className="text-candy-yellow drop-shadow-xl mb-4 mx-auto animate-bounce"
            />
            <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">Factory Fixed!</h1>
            <p className="text-2xl text-white/90 mb-8 font-bold">
              You earned {isDaily ? '100' : '3'} Golden Gears!
            </p>
            <button
              onClick={() => navigate(isDaily ? '/map' : `/land/${landId}`)}
              className="bg-white text-candy-purple font-black px-10 py-5 rounded-full shadow-cartoon-lg text-2xl hover:scale-105 transition border-4 border-candy-yellow"
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}

      {/* Question Card (The Machine Screen) */}
      <div className="flex-1 w-full max-w-lg p-6 flex flex-col justify-center relative z-10">
        <div className="bg-slate-800 border-[8px] border-slate-600 rounded-[2rem] p-8 mb-8 shadow-2xl relative overflow-hidden transform rotate-1">
          {/* Screen Glare */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none"></div>

          {/* Bolts */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>
          <div className="absolute top-4 right-4 w-4 h-4 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 bg-slate-500 rounded-full shadow-inner border border-slate-700"></div>

          <h2 className="text-3xl font-black text-candy-green text-center leading-relaxed drop-shadow-sm font-mono">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-8 w-full place-items-center relative">
          {currentQuestion.options.map((option) => (
            <GearButton
              key={option.id}
              option={option.id}
              text={option.text}
              isSelected={selectedOption === option.id}
              result={result}
              onClick={() => handleOptionClick(option.id)}
              disabled={!!selectedOption}
            />
          ))}

          {/* Floating Action Animations */}
          <AnimatePresence>
            {selectedOption && isCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: -50 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center z-50"
              >
                <div className="text-6xl mb-2 animate-bounce">🌟</div>
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-4 border-candy-yellow shadow-2xl flex flex-col items-center">
                  {fastAnswerBonus && (
                    <span className="text-candy-red font-black text-xl animate-pulse mb-1">
                      ⚡ FAST ANSWER!
                    </span>
                  )}
                  <span className="text-candy-green font-black text-3xl">
                    +{earnedXp} XP!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-40 border-t-8 border-candy-red"
          >
            <div className="w-16 h-2 bg-slate-200 rounded-full mx-auto mb-6"></div>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="text-candy-red fill-current animate-pulse" size={32} />
              <h3 className="text-2xl font-black text-candy-red">Machine Jammed!</h3>
            </div>
            <p className="text-slate-600 text-lg font-bold mb-8 leading-relaxed bg-red-50 p-4 rounded-xl border-l-4 border-candy-red">
              {currentQuestion.explanation}
            </p>
            <button
              onClick={nextQuestion}
              className="w-full bg-candy-green text-white font-black py-5 rounded-3xl shadow-cartoon text-xl active:translate-y-1 active:shadow-none border-b-4 border-green-700 transition-all"
            >
              Repair & Continue 🔧
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
