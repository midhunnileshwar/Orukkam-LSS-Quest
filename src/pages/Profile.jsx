import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, LogOut, Award, BookOpen } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useSound } from '../context/SoundContext';
import { AVATAR_LIST, AVATAR_MAP, getAvatarName } from '../data/avatars';

export default function Profile() {
  const navigate = useNavigate();
  const { xp, avatar, saveProfile, name, medium, logout } = useGame();
  const { playSound, speakMalayalam, speakUKEnglish } = useSound();

  const isEnglish = medium === 'english';
  const currentAvatar = AVATAR_MAP[avatar] || AVATAR_LIST[0];

  const handleSelectAvatar = (id) => {
    playSound('pop');
    saveProfile({ avatar: id });
  };

  const handleToggleMedium = (newMedium) => {
    playSound('pop');
    saveProfile({ medium: newMedium });
    if (newMedium === 'english') {
      speakUKEnglish('English medium selected.');
    } else {
      speakMalayalam('മലയാളം മീഡിയം തിരഞ്ഞെടുത്തു.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRank = (xpPoints) => {
    if (isEnglish) {
      if (xpPoints >= 500) return 'Star Champion';
      if (xpPoints >= 250) return 'Smart Learner';
      if (xpPoints >= 100) return 'Explorer';
      return 'Beginner';
    }
    if (xpPoints >= 500) return 'താരം (Star Champion)';
    if (xpPoints >= 250) return 'മിടുക്കൻ (Smart Learner)';
    if (xpPoints >= 100) return 'സാഹസികൻ (Explorer)';
    return 'തുടക്കക്കാരൻ (Beginner)';
  };

  return (
    <div className="min-h-screen bg-candy-purple/10 flex flex-col p-4 sm:p-6 overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/map')}
          className="p-3 bg-white rounded-full shadow-cartoon hover:scale-105 active:scale-95 border-2 border-slate-100 transition"
          title={isEnglish ? 'Back to Map' : 'മാപ്പിലേക്ക്'}
        >
          <ArrowLeft size={28} className="text-slate-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-candy-purple">
          {isEnglish ? 'My Profile' : 'എന്റെ പ്രൊഫൈൽ (Profile)'}
        </h1>
        <div className="w-12 h-12" />
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-cartoon-lg mb-6 border-4 border-white flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-candy-blue/20 to-transparent"></div>

        <div className="w-32 h-32 rounded-full bg-candy-blue border-[6px] border-white shadow-lg flex items-center justify-center text-7xl mb-4 relative z-10">
          {currentAvatar.emoji}
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
          {name || (isEnglish ? 'Learner' : 'കൂട്ടുകാരൻ')}
        </h2>

        <div className="flex items-center space-x-2 text-slate-600 font-bold text-sm sm:text-base bg-slate-100 px-4 py-1.5 rounded-full mb-6">
          <Award size={16} className="text-candy-green" />
          <span>CM Kids Quest • LSS Scholar</span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-candy-yellow/15 p-4 rounded-2xl flex flex-col items-center border-2 border-candy-yellow/40">
            <div className="flex items-center space-x-1 text-candy-yellow mb-1">
              <Award size={20} />
              <span className="text-3xl font-black">{xp}</span>
            </div>
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
              Total XP
            </span>
          </div>

          <div className="bg-candy-green/15 p-4 rounded-2xl flex flex-col items-center border-2 border-candy-green/40">
            <span className="text-lg sm:text-xl font-black text-candy-green text-center line-clamp-1">
              {getRank(xp)}
            </span>
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider mt-1">
              Rank
            </span>
          </div>
        </div>
      </div>

      {/* Medium of Learning Selection */}
      <div className="bg-white rounded-[2rem] p-6 shadow-cartoon mb-6 border-4 border-white">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="text-indigo-600" size={24} />
          <h3 className="text-xl font-black text-slate-800">
            {isEnglish ? 'Medium of Learning' : 'പഠന മാധ്യമം (Medium of Learning)'}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleToggleMedium('english')}
            className={`p-4 rounded-2xl border-4 font-black text-sm flex flex-col items-center transition-all ${
              medium === 'english'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-md ring-4 ring-indigo-100'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-3xl mb-1">🇬🇧</span>
            <span>English Medium</span>
            {medium === 'english' && (
              <span className="text-xs font-bold text-indigo-600 mt-1 flex items-center">
                <Check size={14} className="mr-0.5" /> Selected
              </span>
            )}
          </button>

          <button
            onClick={() => handleToggleMedium('malayalam')}
            className={`p-4 rounded-2xl border-4 font-black text-sm flex flex-col items-center transition-all ${
              medium !== 'english'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-4 ring-emerald-100'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-3xl mb-1">🌴</span>
            <span>മലയാളം മീഡിയം</span>
            {medium !== 'english' && (
              <span className="text-xs font-bold text-emerald-600 mt-1 flex items-center">
                <Check size={14} className="mr-0.5" /> Selected
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Avatar Selection */}
      <h3 className="text-xl font-black text-slate-700 mb-4 ml-2">
        {isEnglish ? 'Change Hero Companion' : 'കൂട്ടുകാരനെ മാറ്റാം (Change Avatar)'}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {AVATAR_LIST.map((avatarItem) => {
          const isSelected = avatar === avatarItem.id;
          return (
            <button
              key={avatarItem.id}
              onClick={() => handleSelectAvatar(avatarItem.id)}
              className={`p-4 rounded-3xl flex items-center space-x-3 border-4 transition-all ${
                isSelected
                  ? 'bg-white border-candy-green shadow-cartoon scale-105 ring-4 ring-green-100'
                  : 'bg-white/70 border-transparent hover:bg-white'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${avatarItem.color} flex items-center justify-center text-3xl`}
              >
                {avatarItem.emoji}
              </div>
              <div className="flex-1 text-left">
                <span className="block font-black text-slate-800 text-sm">
                  {getAvatarName(avatarItem.id, isEnglish)}
                </span>
                {isSelected && (
                  <span className="text-xs font-black text-candy-green flex items-center">
                    <Check size={14} className="mr-0.5" /> Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-candy-red hover:bg-candy-red/90 text-white font-black py-4 rounded-2xl shadow-cartoon flex items-center justify-center space-x-2 border-4 border-white active:translate-y-1 transition-all mb-8"
      >
        <LogOut size={22} />
        <span className="text-lg">{isEnglish ? 'Log Out' : 'പുറത്തുകടക്കുക (Log Out)'}</span>
      </button>
    </div>
  );
}
