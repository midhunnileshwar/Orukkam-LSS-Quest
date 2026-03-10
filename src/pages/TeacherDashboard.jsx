import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSpreadsheet, FileText, Upload, LogOut, Save } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { logout } = useGame();
  const [activeTab, setActiveTab] = useState('magic-sheet'); // 'magic-sheet' | 'smart-paste'

  // Magic Sheet State
  const [sheetUrl, setSheetUrl] = useState('');

  // Smart Paste State
  const [rawText, setRawText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);

  const handleSmartParse = () => {
    // Simple regex-based parser mock
    // Expecting format: "Question? A. Opt1 B. Opt2 C. Opt3 D. Opt4 Ans: A"
    const chunks = rawText.split('\n\n');
    const parsed = chunks.map((chunk, idx) => ({
      id: idx,
      text: chunk.split('?')[0] + '?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'], // Mock parsing
      correct: 'A',
    }));
    setParsedQuestions(parsed);
  };

  const handleLogout = () => {
    logout(); // Optional: Clear teacher session if you had one
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">
            T
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Control Room</h1>
            <p className="text-xs text-slate-400">Orukkam - CM Kids Quest Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-bold text-sm">Exit</span>
        </button>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('magic-sheet')}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${activeTab === 'magic-sheet'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'hover:bg-slate-800 text-slate-400'
              }`}
          >
            <FileSpreadsheet size={20} />
            <span className="font-bold">Magic Sheet</span>
          </button>
          <button
            onClick={() => setActiveTab('smart-paste')}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${activeTab === 'smart-paste'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'hover:bg-slate-800 text-slate-400'
              }`}
          >
            <FileText size={20} />
            <span className="font-bold">Smart Paste</span>
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* --- MAGIC SHEET VIEW --- */}
          {activeTab === 'magic-sheet' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Import from Google Sheets</h2>
              <p className="text-slate-400 mb-6">
                Paste a shared Google Sheet URL to bulk import questions.
              </p>

              <div className="flex space-x-4 mb-6">
                <input
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 rounded-xl flex items-center space-x-2 shadow-lg transition-transform active:scale-95">
                  <Upload size={20} />
                  <span>Sync</span>
                </button>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-dashed border-slate-700 text-center">
                <p className="text-sm text-slate-500">
                  Supported columns: Question, Option A, Option B, Correct, Explanation
                </p>
              </div>
            </motion.div>
          )}

          {/* --- SMART PASTE VIEW --- */}
          {activeTab === 'smart-paste' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Smart Paste (AI Parser)</h2>
              <p className="text-slate-400 mb-6">Copy text from Word/WhatsApp and paste it here.</p>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={`Example:\n1. Kerala mapil ethra jilla undu?\nA. 13\nB. 14\nAns: B`}
                className="w-full h-48 bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:border-indigo-500 outline-none font-mono text-sm mb-4"
              />

              <div className="flex justify-end mb-8">
                <button
                  onClick={handleSmartParse}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center space-x-2"
                >
                  <span>✨ Parse Questions</span>
                </button>
              </div>

              {/* Preview Area (Stub) */}
              {parsedQuestions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-300 uppercase tracking-wider text-sm">
                    Preview ({parsedQuestions.length})
                  </h3>
                  {parsedQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 flex justify-between items-start"
                    >
                      <div>
                        <p className="font-bold text-white mb-1">{q.text}</p>
                        <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                          Ans: {q.correct}
                        </span>
                      </div>
                      <button className="text-slate-400 hover:text-white p-2">Edit</button>
                    </div>
                  ))}
                  <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg mt-4 flex items-center justify-center space-x-2">
                    <Save size={20} />
                    <span>Save to Database</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
