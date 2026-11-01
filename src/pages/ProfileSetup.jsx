import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { ArrowRight, Volume2, ShieldCheck, Lock, CheckCircle2, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AVATAR_LIST, getAvatarName } from '../data/avatars';
import { validateName, sanitizeText, isHumanInteraction } from '../utils/security';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const {
    saveProfile,
    user,
    name: currentName,
    parentName: currentParentName,
    medium: currentMedium,
  } = useGame();
  const { playSound, speakUKEnglish, speakMalayalam } = useSound();

  // Step 1: Medium of Learning (Choose English vs Malayalam right at the start!)
  // Step 2: Parent Verification & DPDP Consent Gate
  // Step 3: Student Nickname
  // Step 4: Hero Avatar Selection -> Ready to play!
  const [step, setStep] = useState(1);

  // Medium of Learning ('malayalam' | 'english')
  const [selectedMedium, setSelectedMedium] = useState(currentMedium || 'malayalam');
  const isEnglish = selectedMedium === 'english';

  // Parental Consent State (DPDP Act Section 9)
  const [parentName, setParentName] = useState(currentParentName || user?.displayName || '');
  const [consentChecked, setConsentChecked] = useState(false);

  // Student State
  const [studentName, setStudentName] = useState(currentName || '');
  const [selectedAvatar, setSelectedAvatar] = useState('tiger');

  // Input Validation & Bot Trapping State
  const [nameError, setNameError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (step === 1) {
      if (isEnglish) {
        speakUKEnglish('Please choose your medium of study.');
      } else {
        speakMalayalam('പഠന മാധ്യമം തിരഞ്ഞെടുക്കൂ! Please choose your medium of study.');
      }
    } else if (step === 2) {
      if (isEnglish) {
        speakUKEnglish('Parents or guardians, please complete this verification.');
      } else {
        speakMalayalam('മാതാപിതാക്കൾ അല്ലെങ്കിൽ രക്ഷിതാവ് ഈ ഭാഗം പൂരിപ്പിക്കുക.');
      }
    } else if (step === 3) {
      if (isEnglish) {
        speakUKEnglish('What is your name?');
      } else {
        speakMalayalam('എന്താണ് നിന്റെ പേര്? What is your name?');
      }
    } else if (step === 4) {
      if (isEnglish) {
        speakUKEnglish('Choose your adventure companion!');
      } else {
        speakMalayalam('നിനക്ക് ഇഷ്ടപ്പെട്ട കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ! Choose your hero!');
      }
    }
  }, [step, isEnglish]);

  const handleNext = (e) => {
    // Bot check: block synthetic / automated dispatch events
    if (e && !isHumanInteraction(e)) return;
    // Honeypot trap: if filled, automated bot is running
    if (honeypot.trim()) return;

    playSound('pop');
    if (step === 1 && selectedMedium) {
      setStep(2);
      setNameError('');
    } else if (step === 2) {
      const val = validateName(parentName);
      if (!val.isValid) {
        setNameError(val.error);
        return;
      }
      setNameError('');
      if (consentChecked) {
        setStep(3);
      }
    } else if (step === 3) {
      const val = validateName(studentName);
      if (!val.isValid) {
        setNameError(val.error);
        return;
      }
      setNameError('');
      setStep(4);
    } else if (step === 4 && selectedAvatar) {
      handleFinish(e);
    }
  };

  const handleFinish = async (e) => {
    if (e && !isHumanInteraction(e)) return;
    if (honeypot.trim()) return;

    playSound('correct');
    const sanitizedParent = sanitizeText(parentName, 40);
    const sanitizedStudent = sanitizeText(studentName, 40) || (isEnglish ? 'Scholar' : 'കുട്ടി');

    await saveProfile({
      parentName: sanitizedParent,
      parentConsent: true,
      medium: selectedMedium,
      name: sanitizedStudent,
      avatar: selectedAvatar,
      isNew: false,
    });

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });

    if (isEnglish) {
      speakUKEnglish('Brilliant! Let us begin the quest!');
    } else {
      speakMalayalam('രജിസ്ട്രേഷൻ പൂർത്തിയായി! നമുക്ക് ഒരുമിച്ച് ജയിക്കാം!');
    }

    setTimeout(() => navigate('/map'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 sm:p-6 text-white overflow-y-auto relative select-none">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-15 pointer-events-none">
        <div className="absolute top-8 left-8 text-8xl">✨</div>
        <div className="absolute bottom-8 right-8 text-8xl">🌟</div>
      </div>

      <motion.div
        key={step}
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -150, opacity: 0 }}
        className="w-full max-w-lg z-10 my-4"
      >
        {/* --- STEP 1: CHOOSE MEDIUM OF LEARNING --- */}
        {step === 1 && (
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-white/20 shadow-2xl text-center">
            <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-500/40">
              <BookOpen size={30} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-2">
              {isEnglish ? 'Choose Medium of Learning' : 'പഠന മാധ്യമം തിരഞ്ഞെടുക്കൂ'}
            </h2>
            <p className="text-purple-200 text-sm font-semibold mb-6">
              {isEnglish
                ? 'Select your preferred language for study and voice guidance'
                : 'Choose your Medium of Learning'}
            </p>

            <div className="grid grid-cols-1 gap-4 mb-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedMedium('english');
                  playSound('pop');
                  speakUKEnglish('English Medium selected with UK English audio.');
                }}
                className={`p-5 rounded-2xl border-4 text-left transition-all flex items-center justify-between ${
                  selectedMedium === 'english'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 border-yellow-300 shadow-cartoon scale-102'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🇬🇧</span>
                    <span className="text-xl font-black">English Medium</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 pl-8">
                    All questions, text and voice feedback strictly in English.
                  </p>
                </div>
                {selectedMedium === 'english' && (
                  <CheckCircle2 size={24} className="text-yellow-300 flex-shrink-0 ml-2" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedMedium('malayalam');
                  playSound('pop');
                  speakMalayalam('മലയാളം മീഡിയം തിരഞ്ഞെടുത്തു');
                }}
                className={`p-5 rounded-2xl border-4 text-left transition-all flex items-center justify-between ${
                  selectedMedium === 'malayalam'
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 border-yellow-300 shadow-cartoon scale-102'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🌴</span>
                    <span className="text-xl font-black font-malayalam">
                      മലയാളം മീഡിയം (Malayalam)
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 pl-8">
                    എല്ലാ വിഷയങ്ങളും മലയാളത്തിൽ (English Tent-ൽ UK ഇംഗ്ലീഷ് ഓഡിയോ).
                  </p>
                </div>
                {selectedMedium === 'malayalam' && (
                  <CheckCircle2 size={24} className="text-yellow-300 flex-shrink-0 ml-2" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: PARENTAL CONSENT GATE (DPDP ACT 2023) --- */}
        {step === 2 && (
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-white/20 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <ShieldCheck size={28} />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  DPDP Act 2023 & Cyber Safety
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {isEnglish
                    ? 'Parent / Guardian Consent'
                    : 'രക്ഷിതാവിന്റെ അനുമതി (Parental Registration)'}
                </h2>
              </div>
            </div>

            {/* Cyber Safety Warning Callout */}
            <div className="bg-amber-950/60 border border-amber-500/40 rounded-2xl p-4 mb-5 text-xs text-amber-200 space-y-2">
              <div className="flex items-center space-x-1.5 font-black text-amber-300">
                <Lock size={15} />
                <span>
                  {isEnglish
                    ? 'Cyber Safety & Privacy Notice'
                    : 'ഡിജിറ്റൽ സുരക്ഷാ മുന്നറിയിപ്പ് (Cyber Safety Notice)'}
                </span>
              </div>
              <p className="leading-relaxed">
                {isEnglish
                  ? 'In compliance with Section 9 of the Digital Personal Data Protection Act (DPDP Act, 2023), no student personal data or activity is stored on remote servers or tracked online.'
                  : 'കേന്ദ്ര ഡിജിറ്റൽ വ്യക്തിവിവര സംരക്ഷണ നിയമം (DPDP Act, 2023 Section 9) പ്രകാരം കുട്ടികളുടെ സ്വകാര്യത സംരക്ഷിക്കുന്നതിനായി വ്യക്തിഗത വിവരങ്ങൾ ഇൻ്റർനെറ്റിൽ സൂക്ഷിക്കുകയോ ട്രാക്ക് ചെയ്യുകയോ ചെയ്യുന്നില്ല.'}
              </p>
              <p className="leading-relaxed text-amber-300/90 font-medium">
                {isEnglish
                  ? 'All learning progress is safely preserved on this device only. Parents or guardians must complete this registration for the child.'
                  : 'ഈ ആപ്പ് കുട്ടിയുടെ ഗെയിം ലെവലുകൾ നിങ്ങളുടെ സ്വന്തം ഫോണിൽ (Local Storage) മാത്രമേ പൂർണ്ണ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നുള്ളൂ. കുട്ടിക്കുവേണ്ടി മാതാപിതാക്കൾ രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക.'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isEnglish
                    ? 'Parent / Guardian Full Name:'
                    : 'മാതാപിതാക്കളുടെ / രക്ഷിതാവിന്റെ പേര് (Parent/Guardian Name):'}
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={parentName}
                  onChange={(e) => {
                    setParentName(e.target.value);
                    setNameError('');
                  }}
                  placeholder={isEnglish ? 'Parent Name...' : 'പേര് നൽകൂ...'}
                  className="w-full bg-slate-800 border-2 border-slate-600 focus:border-emerald-400 rounded-xl p-3.5 text-white font-bold outline-none text-base"
                  autoFocus
                />
                {nameError && step === 2 && (
                  <p className="text-red-400 text-xs font-bold mt-1.5">{nameError}</p>
                )}
              </div>

              <label className="flex items-start space-x-3 cursor-pointer bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 hover:border-slate-500 transition">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300 font-semibold leading-relaxed">
                  {isEnglish
                    ? 'As a parent/guardian, I give consent for my child to participate in learning with the LSS Quest application. Student privacy is fully preserved on this device.'
                    : 'രക്ഷിതാവ് എന്ന നിലയിൽ ഞാൻ എന്റെ കുട്ടിയെ LSS Quest ആപ്പിലൂടെ പഠനത്തിനായി പങ്കെടുപ്പിക്കുവാൻ സമ്മതിക്കുന്നു. കുട്ടിയുടെ സ്വകാര്യത പൂർണ്ണമായി സംരക്ഷിക്കപ്പെടും.'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* --- STEP 3: STUDENT NICKNAME --- */}
        {step === 3 && (
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-7xl mb-4">
              👋
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2 drop-shadow-md">
              {isEnglish ? 'What is your name?' : 'നിന്റെ പേര് എന്താണ്?'}
            </h2>
            <p className="text-purple-100 font-bold mb-6 text-sm">
              {isEnglish
                ? '(Enter your nickname • Device-only Local Storage)'
                : '(വീട്ടുപേരോ വിളിപ്പേരോ നൽകാം • Device-only Local Storage)'}
            </p>

            <input
              type="text"
              maxLength={40}
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                setNameError('');
              }}
              className="w-full text-center text-3xl sm:text-4xl p-5 rounded-3xl text-slate-800 font-black outline-none border-6 border-white/50 focus:border-yellow-400 shadow-2xl placeholder:text-slate-300"
              placeholder={isEnglish ? 'Enter nickname...' : 'പേര് നൽകൂ...'}
              autoFocus
            />

            {nameError && step === 3 && (
              <p className="text-red-200 bg-red-900/60 border border-red-500/50 py-1.5 px-3 rounded-xl text-xs font-bold mt-3 inline-block">
                {nameError}
              </p>
            )}

            <button
              onClick={() => {
                if (isEnglish) {
                  speakUKEnglish('What is your name?');
                } else {
                  speakMalayalam('എന്താണ് നിന്റെ പേര്?');
                }
              }}
              className="mt-4 inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm transition"
            >
              <Volume2 size={18} />
              <span>{isEnglish ? 'Listen' : 'ശബ്ദം കേൾക്കാം'}</span>
            </button>
          </div>
        )}

        {/* --- STEP 4: HERO AVATAR --- */}
        {step === 4 && (
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2">
              {isEnglish ? 'Choose Your Hero Companion!' : 'കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ!'}
            </h2>
            <p className="text-purple-100 font-bold mb-6">
              {isEnglish ? 'Pick your favourite character' : 'Choose your companion'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {AVATAR_LIST.map((avi) => (
                <motion.button
                  key={avi.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedAvatar(avi.id);
                    playSound('pop');
                  }}
                  className={`p-4 rounded-3xl border-4 ${
                    selectedAvatar === avi.id
                      ? 'border-yellow-400 bg-white/30 shadow-cartoon'
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  } backdrop-blur-md transition-all flex flex-col items-center`}
                >
                  <div className="text-5xl mb-2">{avi.emoji}</div>
                  <div className="font-extrabold text-sm sm:text-base">
                    {getAvatarName(avi.id, isEnglish)}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* --- NAVIGATION BUTTON --- */}
        <div className="mt-8 flex justify-center">
          <motion.button
            layout
            disabled={
              (step === 1 && !selectedMedium) ||
              (step === 2 && (!parentName.trim() || !consentChecked)) ||
              (step === 3 && !studentName.trim()) ||
              (step === 4 && !selectedAvatar)
            }
            onClick={(e) => handleNext(e)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-black text-lg flex items-center space-x-2 shadow-[0_6px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {step === 1 ? (
              <>
                <span>{isEnglish ? 'Continue' : 'തുടരുക'}</span>
                <ArrowRight size={24} />
              </>
            ) : step === 2 ? (
              <>
                <CheckCircle2 size={22} />
                <span>
                  {isEnglish
                    ? 'Consent & Continue'
                    : 'അനുമതി നൽകി തുടരുക (Consent & Continue)'}
                </span>
              </>
            ) : step === 4 ? (
              <>
                <span>{isEnglish ? 'Start Quest! 🚀' : 'കളി തുടങ്ങാം! (Start Quest) 🚀'}</span>
              </>
            ) : (
              <>
                <span>{isEnglish ? 'Next' : 'അടുത്തത് (Next)'}</span>
                <ArrowRight size={24} />
              </>
            )}
          </motion.button>
        </div>
        {/* Bot Trap Honeypot (Invisible to humans, triggers if populated by bot automation) */}
        <input
          type="text"
          name="user_agent_verification"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex="-1"
          autoComplete="off"
          className="opacity-0 absolute pointer-events-none -z-50 h-0 w-0"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
