import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { ArrowRight, Volume2 } from 'lucide-react';
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
  const { saveProfile, user, name: currentName } = useGame();
  const { speakText, playSound } = useSound();

  const [step, setStep] = useState(1); // 1: Name, 2: Avatar, 3: District
  const [name, setName] = useState(user?.displayName || currentName || '');
  const [selectedAvatar, setSelectedAvatar] = useState('tiger');
  const [selectedDistrict, setSelectedDistrict] = useState('Kannur');

  useEffect(() => {
    if (step === 1) speakText('എന്താണ് നിന്റെ പേര്? What is your name?');
    if (step === 2) speakText('നിനക്ക് ഇഷ്ടപ്പെട്ട കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ! Choose your hero!');
    if (step === 3) speakText('നീ ഏത് ജില്ലയിലാണ് പഠിക്കുന്നത്? Which district are you from?');
  }, [step]);

  const handleNext = () => {
    playSound('pop');
    if (step === 1 && name.trim()) setStep(2);
    else if (step === 2 && selectedAvatar) setStep(3);
    else if (step === 3 && selectedDistrict) {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    playSound('correct');
    await saveProfile({
      name: name.trim() || 'കുട്ടി',
      district: selectedDistrict,
      avatar: selectedAvatar,
      isNew: false,
    });

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });

    speakText('നമുക്ക് ഒരുമിച്ച് ജയിക്കാം! Let us go!');
    setTimeout(() => navigate('/map'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative select-none">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl">✨</div>
        <div className="absolute bottom-10 right-10 text-9xl">🌟</div>
      </div>

      <motion.div
        key={step}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        className="w-full max-w-lg z-10"
      >
        {/* --- STEP 1: NAME --- */}
        {step === 1 && (
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">
              👋
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black mb-3 drop-shadow-md font-chembakam">
              നിന്റെ പേര് എന്താണ്?
            </h2>
            <p className="text-purple-100 font-bold mb-6">What is your name?</p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

        {/* --- STEP 2: AVATAR --- */}
        {step === 2 && (
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

        {/* --- STEP 3: DISTRICT --- */}
        {step === 3 && (
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

        {/* --- NAVIGATION --- */}
        <div className="mt-8 flex justify-center">
          <motion.button
            layout
            disabled={
              (step === 1 && !name.trim()) ||
              (step === 2 && !selectedAvatar) ||
              (step === 3 && !selectedDistrict)
            }
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-yellow-400 text-purple-900 w-20 h-20 rounded-full flex items-center justify-center font-bold shadow-[0_6px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ArrowRight size={40} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
