import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isTeacherSessionActive } from '../utils/security';

/**
 * Route guard for Teacher Control Room (/teacher-dashboard)
 * Strictly verifies teacher authentication session in memory/sessionStorage.
 * Unauthenticated users are immediately redirected to the Welcome screen.
 */
export default function TeacherRouteGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isTeacherSessionActive());

  useEffect(() => {
    const verified = isTeacherSessionActive();
    setIsAuthenticated(verified);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
