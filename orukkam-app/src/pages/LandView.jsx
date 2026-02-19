import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LevelNode from '../components/LevelNode';
import { useGame } from '../context/GameContext';

export default function LandView() {
    const { landId } = useParams();
    const navigate = useNavigate();
    const { getLevelStatus } = useGame();

    const levels = Array.from({ length: 10 }, (_, i) => {
        const levelId = i + 1;
        return { id: levelId, status: getLevelStatus(landId, levelId) };
    });

    const theme = {
        maths: { bg: 'bg-amber-100', accent: 'text-amber-600', title: 'സംഖ്യാലോകം', pattern: 'radial-gradient(circle, #fbbf24 4px, transparent 4px)' },
        malayalam: { bg: 'bg-lime-100', accent: 'text-lime-600', title: 'തേന്മൊഴി', pattern: 'radial-gradient(circle, #84cc16 4px, transparent 4px)' },
        english: { bg: 'bg-indigo-100', accent: 'text-indigo-600', title: 'English Koodaram', pattern: 'radial-gradient(circle, #6366f1 4px, transparent 4px)' },
        evs: { bg: 'bg-emerald-100', accent: 'text-emerald-600', title: 'പൂമ്പാറ്റ', pattern: 'radial-gradient(circle, #10b981 4px, transparent 4px)' },
        gk: { bg: 'bg-rose-100', accent: 'text-rose-600', title: 'ചോദ്യ കുടുക്ക', pattern: 'radial-gradient(circle, #f43f5e 4px, transparent 4px)' },
    }[landId];

    if (!theme) {
        return <div className="text-center mt-20">Land Not Found</div>;
    }

    const handlePlay = (levelId) => {
        navigate(`/quiz/${landId}/${levelId}`);
    };

    return (
        <div className={`min-h-screen ${theme.bg} flex flex-col`}>
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/90 glass-panel m-4 px-4 py-3 shadow-cartoon flex items-center rounded-full border-4 border-white">
                <button onClick={() => navigate('/map')} className="p-2 bg-slate-100 rounded-full mr-4 hover:bg-slate-200 transition">
                    <ArrowLeft size={28} className="text-slate-700" />
                </button>
                <h1 className={`font-black font-chembakam ${theme.accent} ${landId === 'maths' ? 'text-xl' : 'text-2xl'}`}>{theme.title}</h1>
            </div>

            {/* The Scrollable Path */}
            <div
                className="flex-1 p-4 overflow-y-auto relative"
                style={{ backgroundImage: theme.pattern, backgroundSize: '32px 32px' }}
            >
                {/* Path Line (SVG) */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 1200" preserveAspectRatio="none">
                    <path d="M 200 100 Q 300 200, 200 300 T 200 500 T 200 700 T 200 900" stroke="white" strokeWidth="10" fill="none" strokeDasharray="20,20" />
                </svg>

                <div className="flex flex-col items-center space-y-16 pb-32 pt-10 relative z-10">
                    {levels.map((level, index) => {
                        const align = index % 2 === 0 ? '-translate-x-16' : 'translate-x-16';

                        return (
                            <div key={level.id} className={`transform ${align} transition-all`}>
                                <LevelNode
                                    level={level.id}
                                    status={level.status}
                                    onPlay={handlePlay}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
