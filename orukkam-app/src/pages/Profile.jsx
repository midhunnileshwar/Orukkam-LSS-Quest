import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Check, LogOut } from 'lucide-react';
import { useGame } from '../context/GameContext';

// Mock Avatars - Exported for reuse if needed, or just defined here
export const AVATARS = {
    boy: { id: 'boy', name: 'Raju', emoji: '👦', color: 'bg-blue-100' },
    girl: { id: 'girl', name: 'Meena', emoji: '👧', color: 'bg-pink-100' },
    robot: { id: 'robot', name: 'Robo', emoji: '🤖', color: 'bg-slate-100' },
    hero: { id: 'hero', name: 'Super', emoji: '🦸', color: 'bg-yellow-100' },
};

export default function Profile() {
    const navigate = useNavigate();
    const { xp, avatar, setAvatar } = useGame();

    const selectedAvatar = avatar;
    const setSelectedAvatar = setAvatar;

    const avatarsList = Object.values(AVATARS);

    return (
        <div className="min-h-screen bg-candy-purple/10 flex flex-col p-6 overflow-y-auto">
            <div className="w-full flex justify-between items-center mb-8">
                <button onClick={() => navigate('/map')} className="p-3 bg-white rounded-full shadow-cartoon hover:scale-105 border-2 border-slate-100">
                    <ArrowLeft size={28} className="text-slate-700" />
                </button>
                <h1 className="text-3xl font-black text-candy-purple">My Profile</h1>
                <div className="w-12 h-12"></div> {/* Spacer */}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-cartoon-lg mb-8 border-4 border-white flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-candy-blue/20 to-transparent"></div>

                <div className="w-32 h-32 rounded-full bg-candy-blue border-[6px] border-white shadow-lg flex items-center justify-center text-7xl mb-4 relative z-10">
                    {AVATARS[selectedAvatar]?.emoji}
                </div>

                <h2 className="text-4xl font-black text-slate-800 mb-1">Midhun</h2>
                <span className="text-slate-500 font-bold text-lg bg-slate-100 px-4 py-1 rounded-full">Class 4A • GHSS Taliparamba</span>

                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    <div className="bg-candy-yellow/10 p-4 rounded-2xl flex flex-col items-center border-2 border-candy-yellow/30">
                        <span className="text-3xl font-black text-candy-yellow">{xp}</span>
                        <span className="text-xs font-bold text-candy-yellow/80 uppercase">Total XP</span>
                    </div>
                    <div className="bg-candy-green/10 p-4 rounded-2xl flex flex-col items-center border-2 border-candy-green/30">
                        <span className="text-3xl font-black text-candy-green">Beginner</span>
                        <span className="text-xs font-bold text-candy-green/80 uppercase">Rank</span>
                    </div>
                </div>
            </div>

            {/* Avatar Selection */}
            <h3 className="text-xl font-black text-slate-700 mb-4 ml-2">Choose Your Avatar</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
                {avatarsList.map(avatarItem => (
                    <button
                        key={avatarItem.id}
                        onClick={() => setSelectedAvatar(avatarItem.id)}
                        className={`
                        p-4 rounded-3xl flex items-center space-x-4 border-4 transition-all
                        ${selectedAvatar === avatarItem.id
                                ? 'bg-white border-candy-green shadow-cartoon scale-105 ring-4 ring-green-100'
                                : 'bg-white/60 border-transparent hover:bg-white'}
                    `}
                    >
                        <div className={`w-16 h-16 rounded-2xl ${avatarItem.color} flex items-center justify-center text-4xl`}>
                            {avatarItem.emoji}
                        </div>
                        <div className="flex-1 text-left">
                            <span className="block font-bold text-slate-700">{avatarItem.name}</span>
                            {selectedAvatar === avatarItem.id && (
                                <span className="text-xs font-black text-candy-green flex items-center">
                                    <Check size={12} className="mr-1" /> Selected
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={() => navigate('/')}
                className="w-full bg-candy-red text-white font-black py-4 rounded-3xl shadow-cartoon flex items-center justify-center space-x-2 border-4 border-white active:scale-95 transition-transform mb-8"
            >
                <LogOut size={24} />
                <span className="text-xl">Log Out</span>
            </button>
        </div>
    );
}
