import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud } from 'lucide-react';

export default function Background({ children }) {
  // Parallax Mouse Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-200 font-sans selection:bg-pink-300">
      {/* --- Parallax Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Sun */}
        <motion.div
          className="absolute top-10 right-10 text-yellow-400"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <Sun size={120} fill="currentColor" className="opacity-80" />
        </motion.div>

        {/* Clouds */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/60"
            initial={{ x: -200, y: Math.random() * 300 }}
            animate={{ x: window.innerWidth + 200 }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 5,
            }}
            style={{ top: `${10 + Math.random() * 30}%` }}
          >
            <Cloud size={60 + Math.random() * 60} fill="currentColor" />
          </motion.div>
        ))}

        {/* Hills (CSS Shapes) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 bg-green-400 rounded-t-[50%] scale-150 translate-y-20"
          style={{ x: mousePosition.x * -0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-green-500 rounded-t-[60%] scale-125 translate-y-10"
          style={{ x: mousePosition.x * -1 }}
        />
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
