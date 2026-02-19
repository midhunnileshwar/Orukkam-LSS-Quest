import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMap from './pages/HomeMap';
import LandView from './pages/LandView';
import QuizGame from './pages/QuizGame';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import ProfileSetup from './pages/ProfileSetup';
import TeacherDashboard from './pages/TeacherDashboard';

import { GameProvider } from './context/GameContext';

import { SoundProvider } from './context/SoundContext';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <GameProvider>
      <SoundProvider>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-orukkam-green/10 text-slate-900 font-sans">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/setup" element={<ProfileSetup />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/map" element={<HomeMap />} />
                <Route path="/land/:landId" element={<LandView />} />
                <Route path="/quiz/:landId/:levelId" element={<QuizGame />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </Router>
        </ErrorBoundary>
      </SoundProvider>
    </GameProvider>
  );
}

export default App;
