import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  Volume2,
  RotateCcw,
  Printer,
  X,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GearButton from '../components/GearButton';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { getQuestionsForLevel } from '../data/questions';
import { getAvatarEmoji } from '../data/avatars';
import confetti from 'canvas-confetti';

export default function QuizGame() {
  const { landId, levelId } = useParams();
  const navigate = useNavigate();
  const { addXp, energy, loseEnergy, refillEnergy, completeLevel, name, avatar, medium } = useGame();
  const { playSound, speakUKEnglish, speakMalayalam } = useSound();

  const isEnglish = medium === 'english';
  const isEnglishTent = landId === 'english';
  const useUKAudio = isEnglish || isEnglishTent;

  const [levelData, setLevelData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);

  // Quiz State
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Requirement 2: Tracking missed questions to enforce 100% correct answers
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [isMasteryMode, setIsMasteryMode] = useState(false);
  const [masteryIndex, setMasteryIndex] = useState(0);
  const [masterySelectedOption, setMasterySelectedOption] = useState(null);

  // Energy Recovery State
  const [recoveryIndex, setRecoveryIndex] = useState(0);
  const [recoverySelectedOption, setRecoverySelectedOption] = useState(null);
  const [recoveredCount, setRecoveredCount] = useState(0);

  // Printable Revision Sheet
  const [showWorksheet, setShowWorksheet] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30);
  const [fastAnswerBonus, setFastAnswerBonus] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [totalXpGained, setTotalXpGained] = useState(0);

  const isDaily = landId === 'daily' || levelId === 'mix';

  useEffect(() => {
    const data = getQuestionsForLevel(landId, levelId, medium);
    setLevelData(data);
    setCurrentQuestionIndex(0);
    setCompleted(false);
    setMissedQuestions([]);
    setIsMasteryMode(false);
    setMasteryIndex(0);
    setRecoveryIndex(0);
    setRecoveredCount(0);
  }, [landId, levelId, medium]);

  // Timer Countdown
  useEffect(() => {
    if (
      !levelData?.questions?.[currentQuestionIndex] ||
      selectedOption ||
      completed ||
      showExplanation ||
      isMasteryMode ||
      energy <= 0
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
  }, [levelData, currentQuestionIndex, selectedOption, completed, showExplanation, isMasteryMode, energy]);

  const currentQuestion = levelData?.questions?.[currentQuestionIndex];

  // Auto-read question text when audio button clicked
  const handleReadQuestion = () => {
    if (!currentQuestion) return;
    if (useUKAudio) {
      speakUKEnglish(currentQuestion.text);
    } else {
      speakMalayalam(currentQuestion.text);
    }
  };

  const handleTimeOut = () => {
    playSound('wrong');
    loseEnergy();

    if (currentQuestion) {
      setMissedQuestions((prev) => {
        if (!prev.find((q) => q.id === currentQuestion.id)) {
          return [...prev, currentQuestion];
        }
        return prev;
      });
    }

    if (useUKAudio) {
      speakUKEnglish('Time is up! Let us see the right answer.');
    } else {
      speakMalayalam('സമയം കഴിഞ്ഞു! ഉത്തരം ശ്രദ്ധിക്കൂ.');
    }

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

      if (useUKAudio) {
        const ukPraises = [
          'Splendid! Well done!',
          'Brilliant! That is correct!',
          'Marvellous work!',
          'Outstanding! Keep it up!',
          'Spot on! Excellent!',
        ];
        speakUKEnglish(ukPraises[Math.floor(Math.random() * ukPraises.length)]);
      } else {
        const mlPraises = [
          'മിടുക്കൻ! ശരിയായ ഉത്തരം!',
          'സൂപ്പർ! വളരെ നന്ന്!',
          'അസ്സലായിരിക്കുന്നു!',
          'ഗ്രേറ്റ് ജോബ്!',
        ];
        speakMalayalam(mlPraises[Math.floor(Math.random() * mlPraises.length)]);
      }

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
      // Wrong answer - Log question for mastery enforcement
      if (currentQuestion) {
        setMissedQuestions((prev) => {
          if (!prev.find((q) => q.id === currentQuestion.id)) {
            return [...prev, currentQuestion];
          }
          return prev;
        });
      }

      setTimeout(() => {
        playSound('wrong');
        loseEnergy();

        if (useUKAudio) {
          speakUKEnglish('Never mind! Let us check the correct answer.');
        } else {
          speakMalayalam('സാരമില്ല! നമുക്ക് ശരിയായ ഉത്തരം നോക്കാം.');
        }

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
      // Reached end of question list
      // REQUIREMENT 2: Without answering 100% of questions correctly, NEVER allow moving to the next level!
      if (missedQuestions.length > 0) {
        // Switch to mastery mode where child must solve missed questions correctly
        setIsMasteryMode(true);
        setMasteryIndex(0);
        setMasterySelectedOption(null);
        if (useUKAudio) {
          speakUKEnglish(
            'You must answer all questions correctly to complete this level! Let us solve the remaining questions.'
          );
        } else {
          speakMalayalam(
            'ഈ ലെവൽ പൂർത്തിയാക്കാൻ എല്ലാ ചോദ്യങ്ങൾക്കും ശരിയായ ഉത്തരം നൽകണം! തെറ്റിയ ചോദ്യങ്ങൾ ശരിയുത്തരം നൽകി പൂർത്തിയാക്കൂ.'
          );
        }
      } else {
        // Complete Victory: 100% score achieved!
        triggerLevelVictory();
      }
    }
  };

  const triggerLevelVictory = () => {
    playSound('levelUp');
    setCompleted(true);
    setIsMasteryMode(false);
    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.4 },
      colors: ['#ffd700', '#ff00ff', '#00ffff', '#00ff00'],
    });

    if (useUKAudio) {
      speakUKEnglish(
        `Congratulations ${name || 'champion'}! You have answered all questions correctly and completed this level!`
      );
    } else {
      speakMalayalam(`അഭിനന്ദനങ്ങൾ ${name || 'കൂട്ടുകാരാ'}! നിങ്ങൾ ഈ ലെവൽ വിജയകരമായി പൂർത്തിയാക്കി!`);
    }

    completeLevel(landId, levelId);
  };

  // --- REQUIREMENT 2: MASTERY SOLVING OF MISSED QUESTIONS ---
  const activeMasteryQuestion = missedQuestions[masteryIndex];

  const handleMasteryOptionClick = (optionId) => {
    if (masterySelectedOption || !activeMasteryQuestion) return;
    setMasterySelectedOption(optionId);

    const isAnswerCorrect = optionId === activeMasteryQuestion.correct;
    if (isAnswerCorrect) {
      playSound('correct');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
      });

      if (useUKAudio) {
        speakUKEnglish('Spot on! Correct answer!');
      } else {
        speakMalayalam('മിടുക്കൻ! ശരിയായ ഉത്തരം!');
      }

      setTimeout(() => {
        // Remove correctly solved question from missed list
        const remaining = missedQuestions.filter((q) => q.id !== activeMasteryQuestion.id);
        setMissedQuestions(remaining);
        setMasterySelectedOption(null);

        if (remaining.length === 0) {
          // All questions now 100% correctly solved!
          triggerLevelVictory();
        } else {
          setMasteryIndex(0);
        }
      }, 1500);
    } else {
      playSound('wrong');
      if (useUKAudio) {
        speakUKEnglish('Not quite. Review the hint and try again!');
      } else {
        speakMalayalam('ശ്രദ്ധിക്കൂ! സഹായക്കുറിപ്പ് നോക്കി ഒന്നുകൂടി ശ്രമിക്കൂ.');
      }
      setTimeout(() => {
        setMasterySelectedOption(null);
      }, 1200);
    }
  };

  const handleReturnNavigation = () => {
    if (isDaily) {
      navigate('/map');
    } else {
      navigate(`/land/${landId}`);
    }
  };

  const handleGoToNextLevel = () => {
    const nextLevel = parseInt(levelId) + 1;
    if (nextLevel <= 10 && !isDaily) {
      navigate(`/quiz/${landId}/${nextLevel}`);
    } else {
      handleReturnNavigation();
    }
  };

  // --- ENERGY RECOVERY HANDLERS ---
  const activeRecoveryQuestions =
    missedQuestions.length > 0 ? missedQuestions : levelData?.questions ? [levelData.questions[0]] : [];
  const activeRecoveryQuestion = activeRecoveryQuestions[recoveryIndex] || activeRecoveryQuestions[0];

  const handleRecoveryOptionClick = (optionId) => {
    if (recoverySelectedOption || !activeRecoveryQuestion) return;
    setRecoverySelectedOption(optionId);

    const isAnswerCorrect = optionId === activeRecoveryQuestion.correct;
    if (isAnswerCorrect) {
      playSound('energyRecharge');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#38bdf8', '#4ade80'],
      });

      const nextRecovered = recoveredCount + 1;
      setRecoveredCount(nextRecovered);

      if (useUKAudio) {
        speakUKEnglish('Energy recharged!');
      } else {
        speakMalayalam('മിടുക്കൻ! ഊർജ്ജം വീണ്ടെടുത്തു!');
      }

      setTimeout(() => {
        setRecoverySelectedOption(null);
        if (recoveryIndex < activeRecoveryQuestions.length - 1) {
          setRecoveryIndex((prev) => prev + 1);
        } else {
          refillEnergy();
          setMissedQuestions([]);
          setRecoveryIndex(0);
          setRecoveredCount(0);
          setTimeLeft(30);
          setShowExplanation(false);
          setSelectedOption(null);
          playSound('levelUp');
        }
      }, 1500);
    } else {
      playSound('wrong');
      if (useUKAudio) {
        speakUKEnglish('Review the hint and try again.');
      } else {
        speakMalayalam('സഹായക്കുറിപ്പ് നോക്കി ഒന്നുകൂടി ശ്രമിക്കൂ.');
      }
      setTimeout(() => {
        setRecoverySelectedOption(null);
      }, 1200);
    }
  };

  const avatarEmoji = getAvatarEmoji(avatar);

  // =========================================================================
  // VIEW: ENERGY EXHAUSTED -> RECHARGE & LEARN SESSION
  // =========================================================================
  if (energy <= 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-white select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-slate-950 to-slate-950 pointer-events-none" />

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-900 border-4 border-amber-500 rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col items-center"
        >
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-4xl animate-bounce">
              ⚡
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-amber-400 font-chembakam text-center mb-1">
            {isEnglish ? 'Recharge Your Energy! ⚡' : 'ഊർജ്ജം വീണ്ടെടുക്കാം!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-bold text-center mb-5">
            {isEnglish
              ? 'Recharge & Learn Challenge • Answer correctly to regain energy!'
              : 'Recharge & Learn Challenge • ശരിയായ ഉത്തരം കണ്ടെത്തി ഊർജ്ജം വീണ്ടെടുക്കൂ!'}
          </p>

          <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 mb-6">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-1">
              Energy:
            </span>
            {[...Array(5)].map((_, i) => (
              <Zap
                key={i}
                size={22}
                className={
                  i < recoveredCount
                    ? 'fill-amber-400 text-amber-400 animate-pulse'
                    : 'text-slate-600'
                }
              />
            ))}
          </div>

          {activeRecoveryQuestion && (
            <div className="w-full bg-slate-800/90 border-2 border-slate-700 rounded-2xl p-5 mb-5 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-700">
                  {isEnglish
                    ? `Question ${recoveryIndex + 1}/${activeRecoveryQuestions.length}`
                    : `പഠന ചോദ്യം ${recoveryIndex + 1}/${activeRecoveryQuestions.length}`}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {isEnglish ? 'Touch right answer 💡' : 'ശരിയുത്തരം തൊടൂ 💡'}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white mb-3 font-chembakam leading-relaxed">
                {activeRecoveryQuestion.text}
              </h3>

              <div className="bg-amber-950/40 border-l-4 border-amber-400 p-3 rounded-r-xl mb-4 text-xs sm:text-sm text-amber-200">
                <span className="font-bold">{isEnglish ? '💡 Learning Note: ' : '💡 പഠനക്കുറിപ്പ്: '}</span>
                {activeRecoveryQuestion.explanation ||
                  (isEnglish
                    ? 'Read the question carefully and choose the correct answer.'
                    : 'ചോദ്യം ശ്രദ്ധയോടെ വായിച്ചുനോക്കി ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കൂ.')}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {activeRecoveryQuestion.options.map((opt) => {
                  const isChosen = recoverySelectedOption === opt.id;
                  const isRightAnswer = opt.id === activeRecoveryQuestion.correct;
                  let btnBg = 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600';

                  if (isChosen) {
                    btnBg = isRightAnswer
                      ? 'bg-emerald-600 text-white border-emerald-400 scale-102'
                      : 'bg-rose-600 text-white border-rose-400';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleRecoveryOptionClick(opt.id)}
                      disabled={!!recoverySelectedOption}
                      className={`p-3 rounded-xl border-2 font-bold text-sm transition-all flex items-center space-x-2 text-left ${btnBg}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-xs flex-shrink-0">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="line-clamp-2">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              refillEnergy();
              setMissedQuestions([]);
              setTimeLeft(30);
              setShowExplanation(false);
              setSelectedOption(null);
              playSound('energyRecharge');
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-cartoon text-base active:translate-y-1 transition-all flex items-center justify-center space-x-2 border-2 border-white"
          >
            <RotateCcw size={20} />
            <span>{isEnglish ? 'Full Recharge & Continue (⚡)' : 'മുഴുവൻ ഊർജ്ജവും നിറച്ച് തുടരുക (Full Recharge ⚡)'}</span>
          </button>

          <button
            onClick={handleReturnNavigation}
            className="mt-4 text-slate-400 font-bold hover:text-white text-sm"
          >
            {isEnglish ? '← Return to Map' : '← തിരികെ മാപ്പിലേക്ക് (Return to Map)'}
          </button>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: REQUIREMENT 2 - MASTERY MODE (SOLVE ALL MISSED QUESTIONS TO PASS)
  // =========================================================================
  if (isMasteryMode && activeMasteryQuestion) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-white select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 pointer-events-none" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-900 border-4 border-indigo-500 rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-4 border-indigo-400 flex items-center justify-center text-3xl mb-3 animate-pulse">
            🎯
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-indigo-400 text-center mb-1 font-chembakam">
            {isEnglish ? 'Master Remaining Questions! 🎯' : 'ബാക്കിയുള്ള ചോദ്യങ്ങൾ ശരിയാക്കൂ! 🎯'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-bold text-center mb-5">
            {isEnglish
              ? 'All questions must be answered correctly to complete this level!'
              : 'ഈ ലെവൽ പൂർത്തിയാക്കാൻ എല്ലാ ചോദ്യങ്ങൾക്കും ശരിയായ ഉത്തരം നൽകണം!'}
          </p>

          <div className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-5 mb-5 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-700">
                {isEnglish
                  ? `Remaining: ${missedQuestions.length}`
                  : `ബാക്കിയുള്ള ചോദ്യങ്ങൾ: ${missedQuestions.length}`}
              </span>
              <span className="text-xs text-amber-300 font-bold">
                {isEnglish ? 'Choose correct answer' : 'ശരിയുത്തരം തൊടൂ 💡'}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white mb-3 font-chembakam leading-relaxed">
              {activeMasteryQuestion.text}
            </h3>

            <div className="bg-indigo-950/40 border-l-4 border-indigo-400 p-3 rounded-r-xl mb-4 text-xs sm:text-sm text-indigo-200">
              <span className="font-bold">{isEnglish ? '💡 Hint / Learning Note: ' : '💡 പഠനക്കുറിപ്പ്: '}</span>
              {activeMasteryQuestion.explanation ||
                (isEnglish
                  ? 'Think carefully and select the right answer.'
                  : 'ചോദ്യം വീണ്ടും ശ്രദ്ധിച്ച് ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കൂ.')}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {activeMasteryQuestion.options.map((opt) => {
                const isChosen = masterySelectedOption === opt.id;
                const isRightAnswer = opt.id === activeMasteryQuestion.correct;
                let btnBg = 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600';

                if (isChosen) {
                  btnBg = isRightAnswer
                    ? 'bg-emerald-600 text-white border-emerald-400 scale-102'
                    : 'bg-rose-600 text-white border-rose-400';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleMasteryOptionClick(opt.id)}
                    disabled={!!masterySelectedOption}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all flex items-center space-x-2 text-left ${btnBg}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-xs flex-shrink-0">
                      {opt.id.toUpperCase()}
                    </span>
                    <span className="line-clamp-2">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleReturnNavigation}
            className="text-slate-400 hover:text-white font-bold text-sm"
          >
            {isEnglish ? '← Return to Map' : '← തിരികെ മാപ്പിലേക്ക് (Return to Map)'}
          </button>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: LEVEL COMPLETED VICTORY SCREEN (ONLY REACHED UPON 100% CORRECT)
  // =========================================================================
  if (completed) {
    const nextLevel = parseInt(levelId) + 1;
    const hasNextLevel = nextLevel <= 10 && !isDaily;

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden p-4 sm:p-6 text-center select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-950 to-slate-950 pointer-events-none" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="flex flex-col items-center max-w-md w-full relative z-10"
        >
          {/* Kid Avatar & Name Celebratory Card */}
          <div className="relative mb-2">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-2xl flex items-center justify-center text-6xl"
            >
              {avatarEmoji}
            </motion.div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full border border-amber-600 shadow-md whitespace-nowrap">
              {name || (isEnglish ? 'Learner' : 'കൂട്ടുകാരൻ')}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-1 font-chembakam text-yellow-300 drop-shadow-md">
            {isEnglish
              ? `Congratulations ${name || 'Champion'}! 🎉`
              : `അഭിനന്ദനങ്ങൾ ${name || 'കൂട്ടുകാരാ'}! 🎉`}
          </h1>
          <p className="text-emerald-300 text-sm font-bold mb-5">
            {isEnglish
              ? 'You have answered all questions correctly and completed this level!'
              : 'നിങ്ങൾ എല്ലാ ചോദ്യങ്ങളും ശരിയായി പൂർത്തിയാക്കി വിജയിച്ചിരിക്കുന്നു!'}
          </p>

          {/* XP & Door Animation Card */}
          <div className="bg-slate-900/90 border-4 border-emerald-500/80 p-6 rounded-[2.5rem] backdrop-blur-md text-center w-full shadow-2xl mb-6 relative overflow-hidden">
            <div className="mb-4 flex flex-col items-center">
              <div
                className="relative w-36 h-48 bg-amber-950 rounded-t-full border-4 border-amber-500 shadow-lg flex items-center justify-center overflow-hidden"
                style={{ perspective: '600px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-300 via-amber-400 to-yellow-100 flex flex-col items-center justify-center">
                  <Sparkles size={36} className="text-amber-800 animate-spin-slow" />
                  <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest mt-1">
                    {hasNextLevel ? `Level ${nextLevel}` : 'Champion'}
                  </span>
                </div>

                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -100 }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute left-0 top-0 bottom-0 w-1/2 bg-amber-800 border-r border-amber-950 flex items-center justify-end pr-1"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow"></div>
                </motion.div>

                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 100 }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'right center' }}
                  className="absolute right-0 top-0 bottom-0 w-1/2 bg-amber-800 border-l border-amber-950 flex items-center justify-start pl-1"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow"></div>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.25, 0.4], opacity: [1, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, ease: 'easeIn' }}
                  className="z-20 text-4xl"
                >
                  {avatarEmoji}
                </motion.div>
              </div>

              <span className="text-xs font-black text-amber-300 mt-2 flex items-center space-x-1">
                <span>
                  {isEnglish
                    ? '🚪 Door to next level is opening...'
                    : '🚪 അടുത്ത ലെവലിലേക്ക് വാതിൽ തുറക്കുന്നു...'}
                </span>
              </span>
            </div>

            <div className="bg-emerald-950/60 py-2.5 px-6 rounded-2xl inline-block border-2 border-emerald-500/50">
              <span className="text-2xl font-black text-yellow-300">+{totalXpGained + 50} XP</span>
              <span className="text-xs block text-emerald-200 font-bold">Total Bonus</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 w-full">
            {hasNextLevel ? (
              <button
                onClick={handleGoToNextLevel}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-black py-4 px-6 rounded-2xl shadow-cartoon text-xl active:translate-y-1 transition-all border-2 border-white flex items-center justify-center space-x-2"
              >
                <span>{isEnglish ? `Next Level ${nextLevel}` : `അടുത്ത ലെവലിലേക്ക് (Level ${nextLevel})`}</span>
                <span className="text-2xl">➔</span>
              </button>
            ) : (
              <button
                onClick={handleReturnNavigation}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-black py-4 px-6 rounded-2xl shadow-cartoon text-xl active:translate-y-1 transition-all border-2 border-white"
              >
                {isEnglish ? 'Back to Map ➔' : 'മാപ്പിലേക്ക് തിരികെ പോകാം ➔'}
              </button>
            )}

            <button
              onClick={() => setShowWorksheet(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3.5 px-6 rounded-2xl shadow-cartoon text-base active:translate-y-1 transition-all border-2 border-indigo-300 flex items-center justify-center space-x-2"
            >
              <BookOpen size={20} />
              <span>
                {isEnglish
                  ? 'What I Have Learned (PDF / Print) 📄'
                  : 'ഞാൻ പഠിച്ച കാര്യങ്ങൾ (PDF / Print) 📄'}
              </span>
            </button>

            {hasNextLevel && (
              <button
                onClick={handleReturnNavigation}
                className="text-slate-400 hover:text-white font-bold text-sm pt-1"
              >
                {isEnglish ? 'Back to Map' : 'മാപ്പിലേക്ക് തിരികെ പോകാം (Back to Map)'}
              </button>
            )}
          </div>
        </motion.div>

        {/* Printable Revision Worksheet Modal */}
        <AnimatePresence>
          {showWorksheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            >
              <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border-4 border-indigo-500">
                <div className="p-4 bg-indigo-600 text-white flex items-center justify-between print:hidden">
                  <div className="flex items-center space-x-2">
                    <BookOpen size={22} />
                    <span className="font-black text-lg">
                      {isEnglish ? 'What I Have Learned' : 'ഞാൻ പഠിച്ച കാര്യങ്ങൾ'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-4 py-2 rounded-xl font-black text-xs flex items-center space-x-1.5 shadow transition"
                    >
                      <Printer size={16} />
                      <span>{isEnglish ? 'Print / Save PDF' : 'പ്രിന്റ് / സേവ് PDF'}</span>
                    </button>
                    <button
                      onClick={() => setShowWorksheet(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>

                <div id="printable-worksheet" className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  <div className="border-b-4 border-indigo-600 pb-4 text-center">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-bold">
                      <span>LSS Quest • Primary Learning</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-indigo-700">
                      {isEnglish ? 'What I Have Learned' : 'ഞാൻ പഠിച്ച കാര്യങ്ങൾ'}
                    </h2>
                    <p className="text-sm font-bold text-slate-600 mt-1">
                      {levelData?.title || `Level ${levelId}`}
                    </p>

                    <div className="mt-3 flex items-center justify-center space-x-4 bg-indigo-50 p-2 rounded-xl text-xs sm:text-sm font-bold text-indigo-950">
                      <span>👤 {isEnglish ? 'Student' : 'വിദ്യാർത്ഥി'}: {name || 'LSS Scholar'}</span>
                      <span>⭐ Score: 100% Correct</span>
                      <span>🛡️ Status: Completed</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {levelData?.questions?.map((q, idx) => {
                      const correctOpt = q.options.find((o) => o.id === q.correct);
                      return (
                        <div
                          key={q.id || idx}
                          className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 page-break-inside-avoid"
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <h4 className="font-black text-slate-800 text-sm sm:text-base leading-snug">
                              {q.text}
                            </h4>
                          </div>

                          <div className="ml-8 space-y-1.5">
                            <div className="flex items-center space-x-2 text-emerald-700 font-black text-xs sm:text-sm bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                              <span>
                                {isEnglish ? 'Correct Answer: ' : 'ശരിയായ ഉത്തരം: '}
                                {correctOpt?.text || q.correct}
                              </span>
                            </div>

                            {q.explanation && (
                              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed font-semibold">
                                <span className="font-bold text-indigo-600">
                                  {isEnglish ? 'Learning Note: ' : 'പഠനക്കുറിപ്പ്: '}
                                </span>
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t-2 border-slate-200 pt-4 text-center text-[10px] text-slate-400">
                    Generated locally on student device • DPDP Act 2023 Compliant • Orukkam LSS Quest
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Content Missing / Work In Progress
  if (!levelData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800 p-8 rounded-3xl border-4 border-slate-700 text-white text-xl font-bold text-center max-w-md">
          <p className="text-4xl mb-4">🚧</p>
          <p className="mb-2">{isEnglish ? 'Questions preparing...' : 'ചോദ്യങ്ങൾ തയ്യാറാകുന്നു...'}</p>
          <p className="text-slate-400 text-sm mb-6">
            {isEnglish
              ? `Questions coming soon for Level ${levelId}`
              : `Level ${levelId}-ലേക്കുള്ള ചോദ്യങ്ങൾ ഉടൻ ലഭ്യമാകും`}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-candy-blue text-white px-8 py-3 rounded-2xl text-base font-black shadow-cartoon hover:scale-105 active:scale-95 transition"
          >
            {isEnglish ? '← Go Back' : '← തിരികെ പോകാം (Go Back)'}
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-black text-2xl animate-pulse">
        {isEnglish ? 'Loading Question...' : 'ചോദ്യം ഒരുങ്ങുന്നു...'}
      </div>
    );
  }

  // =========================================================================
  // NORMAL QUIZ GAME VIEW
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center relative overflow-hidden select-none">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Bar with Energy Bolts */}
      <div className="w-full p-4 flex justify-between items-center text-white z-10 relative max-w-2xl">
        <button
          onClick={handleReturnNavigation}
          className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition shadow-lg border-2 border-white/10 active:scale-95"
          title={isEnglish ? 'Go Back' : 'തിരികെ പോകാം'}
        >
          <ArrowLeft size={28} />
        </button>

        <div className="flex items-center space-x-1.5 bg-black/50 px-3 py-2 rounded-full border border-amber-400/40 shadow-inner">
          <span className="text-xs font-black text-amber-300 mr-1 hidden sm:inline">ENERGY</span>
          {[...Array(5)].map((_, i) => (
            <Zap
              key={i}
              size={24}
              className={`filter drop-shadow-md transition-all ${
                i < energy
                  ? 'fill-amber-400 text-amber-400 scale-100 animate-pulse'
                  : 'text-slate-600 scale-90'
              }`}
            />
          ))}
        </div>

        <div
          className={`font-mono text-xl sm:text-2xl font-black px-4 py-2 rounded-full border-2 border-white/50 shadow-cartoon transition-colors ${
            timeLeft <= 5 ? 'bg-candy-red text-white animate-pulse' : 'bg-candy-blue text-white'
          }`}
        >
          ⏳ {timeLeft}s
        </div>

        <div className="bg-candy-green text-white px-4 py-2 rounded-full font-black text-base sm:text-lg shadow-cartoon border-2 border-white/50">
          {currentQuestionIndex + 1}/{levelData?.questions?.length || 0}
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 w-full max-w-lg px-4 py-2 flex flex-col justify-center relative z-10">
        <div className="bg-slate-800 border-[6px] border-slate-600 rounded-[2rem] p-6 mb-6 shadow-2xl relative overflow-hidden transform rotate-0.5">
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
              <span>{isEnglish ? 'Listen' : 'വായിക്കാം'}</span>
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

      {/* Explanation Modal */}
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
              <h3 className="text-2xl font-black text-slate-800">
                {isEnglish ? 'Let us check the answer! 💡' : 'ശരിയായ ഉത്തരം നോക്കാം! 💡'}
              </h3>
            </div>

            <p className="text-slate-700 text-base sm:text-lg font-bold mb-6 leading-relaxed bg-red-50 p-4 rounded-2xl border-l-4 border-candy-red">
              {currentQuestion.explanation ||
                (isEnglish
                  ? 'Good try! Look at the explanation carefully.'
                  : 'ശ്രമിച്ചത് നല്ല കാര്യം! അടുത്ത ചോദ്യത്തിൽ കൂടുതൽ ശ്രദ്ധിക്കാം.')}
            </p>

            <button
              onClick={nextQuestion}
              className="w-full bg-candy-green hover:bg-candy-green/90 text-white font-black py-4 rounded-2xl shadow-cartoon text-xl active:translate-y-1 border-b-4 border-green-700 transition-all"
            >
              {isEnglish ? 'Continue ➔' : 'തുടരാം ➔ (Continue)'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
