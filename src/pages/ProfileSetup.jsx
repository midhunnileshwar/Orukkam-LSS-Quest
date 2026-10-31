import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { ArrowRight, Volume2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AVATAR_LIST } from '../data/avatars';

const DISTRICTS = [
  'Kasaragod',
  'Kannur',
  'Wayanad',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Thrissur',
  'Ernakulam',
  'Idukki',
  'Kottayam',
  'Alappuzha',
  'Pathanamthitta',
  'Kollam',
  'Thiruvananthapuram',
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const {
    saveProfile,
    user,
    name: currentName,
    district: currentDistrict,
    parentName: currentParentName,
  } = useGame();
  const { speakText, playSound } = useSound();

  // Steps:
  // 1: Parent Verification & DPDP Consent Gate
  // 2: Student Nickname
  // 3: Hero Avatar
  // 4: District
  const [step, setStep] = useState(1);

  // Parental Consent State (DPDP Act Section 9)
  const [parentName, setParentName] = useState(currentParentName || user?.displayName || '');
  const [consentChecked, setConsentChecked] = useState(false);

  // Student State
  const [studentName, setStudentName] = useState(currentName || '');
  const [selectedAvatar, setSelectedAvatar] = useState('tiger');
  const [selectedDistrict, setSelectedDistrict] = useState(currentDistrict || 'Kannur');

  useEffect(() => {
    if (step === 1) {
      speakText('മാതാപിതാക്കൾ അല്ലെങ്കിൽ രക്ഷിതാവ് ഈ ഭാഗം പൂരിപ്പിക്കുക.');
    } else if (step === 2) {
      speakText('എന്താണ് നിന്റെ പേര്? What is your name?');
    } else if (step === 3) {
      speakText('നിനക്ക് ഇഷ്ടപ്പെട്ട കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ! Choose your hero!');
    } else if (step === 4) {
      speakText('നീ ഏത് ജില്ലയിലാണ് പഠിക്കുന്നത്? Which district are you from?');
    }
  }, [step]);

  const handleNext = () => {
    playSound('pop');
    if (step === 1 && parentName.trim() && consentChecked) {
      setStep(2);
    } else if (step === 2 && studentName.trim()) {
      setStep(3);
    } else if (step === 3 && selectedAvatar) {
      setStep(4);
    } else if (step === 4 && selectedDistrict) {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    playSound('correct');
    await saveProfile({
      parentName: parentName.trim(),
      parentConsent: true,
      name: studentName.trim() || 'കുട്ടി',
      district: selectedDistrict,
      avatar: selectedAvatar,
      isNew: false,
    });

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });

    speakText('രജിസ്ട്രേഷൻ പൂർത്തിയായി! നമുക്ക് ഒരുമിച്ച് ജയിക്കാം!');
    setTimeout(() => navigate('/map'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 sm:p-6 text-white overflow-y-auto relative select-none">
      {/* Background decorations */}
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
        {/* --- STEP 1: PARENTAL CONSENT GATE (DPDP ACT 2023 / KERALA CYBER SAFETY) --- */}
        {step === 1 && (
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-white/20 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <ShieldCheck size={28} />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  DPDP Act 2023 & Cyber Safety
                </span>
                <h2 className="text-2xl font-black text-white font-chembakam mt-1">
                  രക്ഷിതാവിന്റെ അനുമതി (Parental Registration)
                </h2>
              </div>
            </div>

            {/* Cyber Safety Warning Callout */}
            <div className="bg-amber-950/60 border border-amber-500/40 rounded-2xl p-4 mb-5 text-xs text-amber-200 space-y-2">
              <div className="flex items-center space-x-1.5 font-black text-amber-300">
                <Lock size={15} />
                <span>ഡിജിറ്റൽ സുരക്ഷാ മുന്നറിയിപ്പ് (Cyber Safety Notice)</span>
              </div>
              <p className="leading-relaxed">
                കേന്ദ്ര ഡിജിറ്റൽ വ്യക്തിവിവര സംരക്ഷണ നിയമം (DPDP Act, 2023 Section 9) പ്രകാരം 18 വയസ്സിന് താഴെയുള്ള കുട്ടികളുടെ വ്യക്തിവിവരങ്ങൾ ഇൻ്റർനെറ്റിൽ സൂക്ഷിക്കുവാൻ പാടില്ല.
              </p>
              <p className="leading-relaxed text-amber-300/90 font-medium">
                ഈ ആപ്പ് കുട്ടിയുടെ വിവരങ്ങൾ ക്ലൗഡിലേക്ക് അയക്കാതെ നിങ്ങളുടെ ഉപകരണത്തിൽ (Local Storage) മാത്രമേ പൂർണ്ണ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നുള്ളൂ. കുട്ടിക്കുവേണ്ടി മാതാപിതാക്കൾ രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  മാതാപിതാക്കളുടെ / രക്ഷിതാവിന്റെ പേര് (Parent/Guardian Name):
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Parent Name..."
                  className="w-full bg-slate-800 border-2 border-slate-600 focus:border-emerald-400 rounded-xl p-3.5 text-white font-bold outline-none text-base"
                  autoFocus
                />
              </div>

              <label className="flex items-start space-x-3 cursor-pointer bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 hover:border-slate-500 transition">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300 font-semibold leading-relaxed">
                  രക്ഷിതാവ് എന്ന നിലയിൽ ഞാൻ എന്റെ കുട്ടിയെ LSS Quest ആപ്പിലൂടെ പഠനത്തിനായി പങ്കെടുപ്പിക്കുവാൻ സമ്മതിക്കുന്നു. കുട്ടിയുടെ സ്വകാര്യത പൂർണ്ണമായി സംരക്ഷിക്കപ്പെടും.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* --- STEP 2: STUDENT NICKNAME --- */}
        {step === 2 && (
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-7xl mb-4">
              👋
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2 drop-shadow-md font-chembakam">
              നിന്റെ പേര് എന്താണ്?
            </h2>
            <p className="text-purple-100 font-bold mb-6 text-sm">
              (വീട്ടുപേരോ വിളിപ്പേരോ നൽകാം • Device-only Local Storage)
            </p>

            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full text-center text-3xl sm:text-4xl p-5 rounded-3xl text-slate-800 font-black outline-none border-6 border-white/50 focus:border-yellow-400 shadow-2xl placeholder:text-slate-300"
              placeholder="പേര് നൽകൂ..."
              autoFocus
            />

            <button
              onClick={() => speakText('എന്താണ് നിന്റെ പേര്?')}
              className="mt-4 inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm transition"
            >
              <Volume2 size={18} />
              <span>ശബ്ദം കേൾക്കാം</span>
            </button>
          </div>
        )}

        {/* --- STEP 3: AVATAR --- */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2 font-chembakam">കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ!</h2>
            <p className="text-purple-100 font-bold mb-6">Choose Your Hero!</p>

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
                  <div className="font-extrabold text-sm sm:text-base">{avi.name}</div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 4: DISTRICT --- */}
        {step === 4 && (
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2 font-chembakam">ജില്ല തിരഞ്ഞെടുക്കൂ!</h2>
            <p className="text-purple-100 font-bold mb-4">Select Your District</p>

            <div className="bg-white/90 rounded-3xl p-4 h-80 overflow-y-auto shadow-2xl border-4 border-white">
              {DISTRICTS.map((dist) => (
                <button
                  type="button"
                  key={dist}
                  onClick={() => {
                    setSelectedDistrict(dist);
                    playSound('click');
                  }}
                  className={`w-full text-left p-3 rounded-2xl mb-2 font-black text-lg transition-all ${
                    selectedDistrict === dist
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-purple-100'
                  }`}
                >
                  📍 {dist}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP NAVIGATION BUTTON --- */}
        <div className="mt-8 flex justify-center">
          <motion.button
            layout
            disabled={
              (step === 1 && (!parentName.trim() || !consentChecked)) ||
              (step === 2 && !studentName.trim()) ||
              (step === 3 && !selectedAvatar) ||
              (step === 4 && !selectedDistrict)
            }
            onClick={handleNext}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-black text-lg flex items-center space-x-2 shadow-[0_6px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {step === 1 ? (
              <>
                <CheckCircle2 size={22} />
                <span>അനുമതി നൽകി തുടരുക (Consent & Continue)</span>
              </>
            ) : (
              <>
                <span>അടുത്തത് (Next)</span>
                <ArrowRight size={24} />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
