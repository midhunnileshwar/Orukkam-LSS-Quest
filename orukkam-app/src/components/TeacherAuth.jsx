import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Delete } from 'lucide-react';

export default function TeacherAuth({ isOpen, onClose, onSuccess }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleNumClick = (num) => {
        if (pin.length < 4) {
            setPin(prev => prev + num);
            setError(false);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (pin === '1234') { // Hardcoded demo PIN
            onSuccess();
            setPin('');
        } else {
            setError(true);
            setPin('');
            // Shake effect handled by Framer Motion via key prop or state
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-700"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-300">Teacher Access</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        {/* PIN Display */}
                        <div className={`flex justify-center space-x-4 mb-8 ${error ? 'animate-shake' : ''}`}>
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full border-2 ${i < pin.length ? 'bg-white border-white' : 'border-slate-600'
                                        } ${error ? 'border-red-500 bg-red-500' : ''}`}
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-400 text-center text-sm -mt-6 mb-6">Incorrect PIN</p>}

                        {/* Keypad */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleNumClick(num)}
                                    className="h-16 rounded-2xl bg-slate-800 hover:bg-slate-700 text-2xl font-bold transition-colors shadow-lg active:translate-y-1"
                                >
                                    {num}
                                </button>
                            ))}
                            <div className="h-16"></div>
                            <button
                                onClick={() => handleNumClick(0)}
                                className="h-16 rounded-2xl bg-slate-800 hover:bg-slate-700 text-2xl font-bold transition-colors shadow-lg active:translate-y-1"
                            >
                                0
                            </button>
                            <button
                                onClick={handleDelete}
                                className="h-16 rounded-2xl bg-slate-800/50 hover:bg-red-900/50 text-red-300 flex items-center justify-center transition-colors"
                            >
                                <Delete size={24} />
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={pin.length !== 4}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Enter Dashboard
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
