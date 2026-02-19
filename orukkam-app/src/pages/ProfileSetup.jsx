import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowRight, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';

const AVATARS = [
    { id: 'tiger', name: 'Tiger', emoji: '🐯', color: 'bg-orange-400' },
    { id: 'deer', name: 'Deer', emoji: '🦌', color: 'bg-amber-400' },
    { id: 'robot', name: 'Robot', emoji: '🤖', color: 'bg-blue-400' },
    { id: 'super', name: 'Hero', emoji: '🦸', color: 'bg-red-400' },
];

const DISTRICTS = [
    'Kasaragod', 'Kannur', 'Wayanad', 'Kozhikode', 'Malappuram',
    'Palakkad', 'Thrissur', 'Ernakulam', 'Idukki', 'Kottayam',
    'Alappuzha', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram'
];

export default function ProfileSetup() {
    const navigate = useNavigate();
    const { setAvatar, setUser } = useGame();

    const [step, setStep] = useState(1); // 1: Name, 2: Avatar, 3: District
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Text to Speech Helper
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ml-IN'; // Try Malayalam, fallback to English if not available
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        // Voice prompts for each step
        if (step === 1) speak("എന്താണ് നിന്റെ പേര്? What is your name?");
        if (step === 2) speak("നിനക്ക് ഇഷ്ടപ്പെട്ട കൂട്ടുകാരനെ തിരഞ്ഞെടുക്കൂ! Choose your friend!");
        if (step === 3) speak("നീ ഏത് ജില്ലയിലാണ് പഠിക്കുന്നത്? Which district are you from?");
    }, [step]);

    const handleNext = () => {
        if (step === 1 && name) setStep(2);
        else if (step === 2 && selectedAvatar) setStep(3);
        else if (step === 3 && selectedDistrict) {
            handleFinish();
        }
    };

    const handleFinish = () => {
        // Save profile
        setUser({ name, district: selectedDistrict });
        setAvatar(selectedAvatar);

        // Celebration
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });

        // Redirect
        setTimeout(() => navigate('/map'), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 text-9xl">✨</div>
                <div className="absolute bottom-10 right-10 text-9xl">🌟</div>
            </div>

            <motion.div
                key={step}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-full max-w-lg z-10"
            >
                {/* --- STEP 1: NAME --- */}
                {step === 1 && (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="text-8xl mb-8"
                        >
                            👋
                        </motion.div>
                        <h2 className="text-4xl font-bold mb-8 drop-shadow-md">നിന്റെ പേര് എന്താണ്?</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-center text-4xl p-6 rounded-3xl text-slate-800 font-bold outline-none border-8 border-white/50 focus:border-yellow-400 shadow-2xl placeholder:text-slate-300"
                            placeholder="Type Name..."
                            autoFocus
                        />
                    </div>
                )}

                {/* --- STEP 2: AVATAR --- */}
                {step === 2 && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-8">Choose Your Hero!</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {AVATARS.map((avi) => (
                                <motion.button
                                    key={avi.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedAvatar(avi.id)}
                                    className={`p-6 rounded-3xl border-4 ${selectedAvatar === avi.id ? 'border-yellow-400 bg-white/20' : 'border-white/30 bg-white/10'} backdrop-blur-md transition-all`}
                                >
                                    <div className="text-6xl mb-2">{avi.emoji}</div>
                                    <div className="font-bold text-xl">{avi.name}</div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- STEP 3: DISTRICT --- */}
                {step === 3 && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Select District</h2>
                        <div className="bg-white/90 rounded-3xl p-4 h-96 overflow-y-auto shadow-2xl">
                            {DISTRICTS.map((dist) => (
                                <div
                                    key={dist}
                                    onClick={() => setSelectedDistrict(dist)}
                                    className={`p-4 rounded-xl mb-2 font-bold text-lg cursor-pointer transition-colors ${selectedDistrict === dist ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-purple-100'}`}
                                >
                                    {dist}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- NAVIGATION --- */}
                <div className="mt-12 flex justify-center">
                    <motion.button
                        layout
                        disabled={
                            (step === 1 && !name) ||
                            (step === 2 && !selectedAvatar) ||
                            (step === 3 && !selectedDistrict)
                        }
                        onClick={handleNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 text-purple-900 w-20 h-20 rounded-full flex items-center justify-center font-bold shadow-[0_4px_0_rgb(180,83,9)] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowRight size={40} />
                    </motion.button>
                </div>

            </motion.div>
        </div>
    );
}
