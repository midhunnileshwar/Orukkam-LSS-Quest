import React, { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMap from './pages/HomeMap';
import LandView from './pages/LandView';
import QuizGame from './pages/QuizGame';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import ProfileSetup from './pages/ProfileSetup';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherRouteGuard from './components/TeacherRouteGuard';
import { initContentProtection } from './utils/security';

import { GameProvider } from './context/GameContext';
import { SoundProvider } from './context/SoundContext';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  // Initialize client content protection (anti-scrape, inspect-mode lock)
  useEffect(() => {
    initContentProtection();
  }, []);

  // Clear any existing URL hashes or query strings so page addresses are never exposed or shared
  useEffect(() => {
    try {
      if (window.location.hash || window.location.search) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <Router initialEntries={['/']}>
      <div className="min-h-screen bg-orukkam-green/10 text-slate-900 font-sans select-none">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/setup" element={<ProfileSetup />} />
          <Route
            path="/teacher-dashboard"
            element={
              <TeacherRouteGuard>
                <TeacherDashboard />
              </TeacherRouteGuard>
            }
          />
          <Route path="/map" element={<HomeMap />} />
          <Route path="/land/:landId" element={<LandView />} />
          <Route path="/quiz/:landId/:levelId" element={<QuizGame />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <GameProvider>
      <SoundProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </SoundProvider>
    </GameProvider>
  );
}

export default App;
