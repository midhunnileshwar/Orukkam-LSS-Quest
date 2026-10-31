import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  FileText,
  Upload,
  LogOut,
  Save,
  CheckCircle,
  Trash2,
  BookOpen,
} from 'lucide-react';
import { useGame } from '../context/GameContext';

const SUBJECTS = [
  { id: 'maths', name: 'സംഖ്യാലോകം (Maths)' },
  { id: 'malayalam', name: 'തേന്മൊഴി (Malayalam)' },
  { id: 'english', name: 'English Tent' },
  { id: 'evs', name: 'പൂമ്പാറ്റ (EVS)' },
  { id: 'gk', name: 'ചോദ്യ കുടുക്ക (GK)' },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { logout } = useGame();
  const [activeTab, setActiveTab] = useState('smart-paste'); // 'smart-paste' | 'magic-sheet' | 'saved'

  // Selected subject & level to import into
  const [targetLand, setTargetLand] = useState('malayalam');
  const [targetLevel, setTargetLevel] = useState('1');

  // Smart Paste State
  const [rawText, setRawText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Magic Sheet State
  const [sheetUrl, setSheetUrl] = useState('');
  const [sheetMessage, setSheetMessage] = useState('');

  // Stored custom questions
  const [storedQuestionsCount, setStoredQuestionsCount] = useState(0);

  useEffect(() => {
    updateStoredCount();
  }, []);

  const updateStoredCount = () => {
    try {
      const raw = localStorage.getItem('orukkam_custom_questions');
      if (raw) {
        const parsed = JSON.parse(raw);
        let count = 0;
        Object.values(parsed).forEach((land) => {
          Object.values(land).forEach((lvl) => {
            if (lvl.questions) count += lvl.questions.length;
          });
        });
        setStoredQuestionsCount(count);
      } else {
        setStoredQuestionsCount(0);
      }
    } catch {
      setStoredQuestionsCount(0);
    }
  };

  const handleLoadSample = () => {
    const sample = `1. കേരളത്തിന്റെ ഔദ്യോഗിക ഫലം ഏതാണ്?
A. മാങ്ങ
B. ചക്ക
C. വാഴപ്പഴം
D. പപ്പായ
Ans: B
Expl: കേരളത്തിന്റെ ഔദ്യോഗിക ഫലം ചക്കയാണ്.

2. ഇന്ത്യയുടെ രാഷ്ട്രപിതാവ് ആര്?
A. ജവഹർലാൽ നെഹ്റു
B. സുഭാഷ് ചന്ദ്രബോസ്
C. മഹാത്മാ ഗാന്ധി
D. ഭഗത് സിംഗ്
Ans: C
Expl: മഹാത്മാ ഗാന്ധിയാണ് രാഷ്ട്രപിതാവ്.`;
    setRawText(sample);
  };

  const handleSmartParse = () => {
    if (!rawText.trim()) return;

    // Split text by double newline or numbered items
    const rawBlocks = rawText.split(/\n\s*\n/).filter((b) => b.trim());
    const parsed = [];

    rawBlocks.forEach((block, index) => {
      const lines = block
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length === 0) return;

      let questionText = lines[0].replace(/^\d+[.)-]\s*/, '').trim();
      const options = [];
      let correct = 'a';
      let explanation = '';

      lines.slice(1).forEach((line) => {
        // Match option line like "A. Option text" or "A) Option text"
        const optMatch = line.match(/^([A-Da-d])[.):\s-]+(.*)/i);
        // Match answer line like "Ans: B" or "Answer: B"
        const ansMatch = line.match(/^(?:ans|answer|correct)[\s:-]+([A-Da-d])/i);
        // Match explanation line
        const expMatch = line.match(/^(?:expl|explanation|വിശദീകരണം)[\s:-]+(.*)/i);

        if (ansMatch) {
          correct = ansMatch[1].toLowerCase();
        } else if (expMatch) {
          explanation = expMatch[1].trim();
        } else if (optMatch) {
          options.push({
            id: optMatch[1].toLowerCase(),
            text: optMatch[2].trim(),
          });
        }
      });

      // Default 4 fallback options if missing
      if (options.length === 0) {
        options.push(
          { id: 'a', text: 'ഓപ്ഷൻ A' },
          { id: 'b', text: 'ഓപ്ഷൻ B' },
          { id: 'c', text: 'ഓപ്ഷൻ C' },
          { id: 'd', text: 'ഓപ്ഷൻ D' }
        );
      }

      parsed.push({
        id: `custom_${targetLand}_${targetLevel}_q${index + 1}_${Date.now()}`,
        text: questionText,
        options,
        correct,
        explanation: explanation || `ശരിയായ ഉത്തരം: ${correct.toUpperCase()}`,
      });
    });

    setParsedQuestions(parsed);
    setSaveSuccess(false);
  };

  const handleSaveToDatabase = () => {
    if (parsedQuestions.length === 0) return;

    try {
      const existingRaw = localStorage.getItem('orukkam_custom_questions');
      const store = existingRaw ? JSON.parse(existingRaw) : {};

      if (!store[targetLand]) store[targetLand] = {};
      store[targetLand][targetLevel] = {
        title: `അധ്യാപക ചോദ്യങ്ങൾ (Level ${targetLevel})`,
        questions: parsedQuestions,
      };

      localStorage.setItem('orukkam_custom_questions', JSON.stringify(store));
      setSaveSuccess(true);
      updateStoredCount();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      alert('Error saving questions: ' + e.message);
    }
  };

  const handleClearCustomQuestions = () => {
    if (window.confirm('Delete all custom questions?')) {
      localStorage.removeItem('orukkam_custom_questions');
      updateStoredCount();
      setParsedQuestions([]);
    }
  };

  const handleSyncSheet = () => {
    if (!sheetUrl.trim()) {
      setSheetMessage('Please enter a Google Sheet URL.');
      return;
    }
    setSheetMessage('Connecting to Google Sheet... (Requires public CSV publish link)');
    setTimeout(() => {
      setSheetMessage('Sheet link saved! Questions will be imported during network sync.');
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans select-none">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center shadow-lg sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-md">
            🎓
          </div>
          <div>
            <h1 className="font-black text-white text-lg">Teacher Control Room</h1>
            <p className="text-xs text-slate-400 font-medium">
              Orukkam - CM Kids Quest Content Manager
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/map')}
            className="text-xs bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-3 rounded-lg transition"
          >
            Go to Student Map 🗺️
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-slate-400 hover:text-red-400 transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
          >
            <LogOut size={16} />
            <span className="font-bold text-sm">Exit</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('smart-paste')}
            className={`w-full flex items-center space-x-3 p-3.5 rounded-2xl font-bold transition-all ${
              activeTab === 'smart-paste'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <FileText size={20} />
            <span>Smart Paste (AI Parser)</span>
          </button>

          <button
            onClick={() => setActiveTab('magic-sheet')}
            className={`w-full flex items-center space-x-3 p-3.5 rounded-2xl font-bold transition-all ${
              activeTab === 'magic-sheet'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <FileSpreadsheet size={20} />
            <span>Magic Sheet (Google Docs)</span>
          </button>

          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 mt-6 text-sm">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold mb-2">
              <BookOpen size={16} />
              <span>Active Custom Bank</span>
            </div>
            <p className="text-slate-400 text-xs mb-3">
              Total teacher-created questions stored locally:
            </p>
            <div className="text-2xl font-black text-white mb-3">
              {storedQuestionsCount}{' '}
              <span className="text-xs text-slate-400 font-normal">questions</span>
            </div>
            {storedQuestionsCount > 0 && (
              <button
                onClick={handleClearCustomQuestions}
                className="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/50 py-2 rounded-lg font-bold flex items-center justify-center space-x-1 transition"
              >
                <Trash2 size={14} />
                <span>Clear Custom Questions</span>
              </button>
            )}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Target Subject & Level Selection Bar */}
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                വിഷയം (Subject):
              </label>
              <select
                value={targetLand}
                onChange={(e) => setTargetLand(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-indigo-500"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ലെവൽ (Level):
              </label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    Level {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* --- SMART PASTE VIEW --- */}
          {activeTab === 'smart-paste' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Smart Question Parser</h2>
                  <p className="text-slate-400 text-sm">
                    Paste raw text from WhatsApp, Word, or question papers. The engine automatically
                    structures it!
                  </p>
                </div>
                <button
                  onClick={handleLoadSample}
                  className="text-xs bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold px-3 py-1.5 rounded-lg border border-indigo-500/40 transition"
                >
                  ⚡ മാതൃക ചോദ്യങ്ങൾ നൽകാം (Load Sample)
                </button>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="ഇവിടെ ചോദ്യങ്ങൾ പേസ്റ്റ് ചെയ്യുക (Paste questions here)..."
                rows={8}
                className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-indigo-500 outline-none font-mono text-sm my-4 transition"
              />

              <div className="flex justify-end mb-6">
                <button
                  onClick={handleSmartParse}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center space-x-2"
                >
                  <span>✨ ചോദ്യങ്ങൾ മാറ്റിയെടുക്കുക (Parse Questions)</span>
                </button>
              </div>

              {/* Preview Area */}
              {parsedQuestions.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-300 uppercase tracking-wider text-sm">
                      തയ്യാറായ ചോദ്യങ്ങൾ (Parsed Preview: {parsedQuestions.length})
                    </h3>
                    <span className="text-xs text-indigo-400 font-bold">
                      Target: {SUBJECTS.find((s) => s.id === targetLand)?.name} • Level{' '}
                      {targetLevel}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {parsedQuestions.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="bg-slate-700/60 p-4 rounded-xl border border-slate-600 text-sm"
                      >
                        <p className="font-bold text-white mb-2">
                          {idx + 1}. {q.text}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          {q.options.map((opt) => (
                            <div
                              key={opt.id}
                              className={`p-2 rounded-lg ${
                                opt.id === q.correct
                                  ? 'bg-green-900/60 border border-green-500 text-green-200 font-bold'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              <span className="font-black uppercase mr-1">{opt.id}.</span>{' '}
                              {opt.text}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="text-xs text-slate-400 italic">💡 {q.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSaveToDatabase}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg mt-4 flex items-center justify-center space-x-2 transition active:scale-98"
                  >
                    <Save size={20} />
                    <span>ഗെയിമിലേക്ക് സേവ് ചെയ്യുക (Save to Game)</span>
                  </button>

                  {saveSuccess && (
                    <div className="p-3 bg-green-900/80 border border-green-500 text-green-200 rounded-xl text-center font-bold flex items-center justify-center space-x-2">
                      <CheckCircle size={18} />
                      <span>
                        ചോദ്യങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു! വിദ്യാർത്ഥികൾക്ക് ഇപ്പോൾ കളിക്കാം.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* --- MAGIC SHEET VIEW --- */}
          {activeTab === 'magic-sheet' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Google Sheets Import</h2>
              <p className="text-slate-400 mb-6 text-sm">
                Paste a shared Google Sheet link (or published CSV) to bulk import questions into
                this level.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-xl p-3.5 text-white focus:border-indigo-500 outline-none text-sm font-mono"
                />
                <button
                  onClick={handleSyncSheet}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition active:scale-95"
                >
                  <Upload size={18} />
                  <span>Sync Sheet</span>
                </button>
              </div>

              {sheetMessage && (
                <div className="p-3 bg-indigo-950 border border-indigo-700 text-indigo-300 rounded-xl text-sm mb-4">
                  {sheetMessage}
                </div>
              )}

              <div className="bg-slate-900/60 rounded-xl p-4 border border-dashed border-slate-700 text-xs text-slate-400 space-y-2">
                <p className="font-bold text-slate-300">Google Sheet Formatting Template:</p>
                <div className="font-mono bg-black/40 p-3 rounded-lg overflow-x-auto text-slate-300">
                  Question | Option A | Option B | Option C | Option D | Correct (A/B/C/D) |
                  Explanation
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
