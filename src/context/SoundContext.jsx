import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('orukkam_muted') === 'true');
  const audioCtxRef = useRef(null);

  // Initialize Audio Context on user interaction
  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioCtxRef.current = new AudioContext();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn('Audio Context init warning', e);
    }
  };

  useEffect(() => {
    localStorage.setItem('orukkam_muted', isMuted);
    if (isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [isMuted]);

  // Web Speech API Malayalam TTS Helper
  const speakText = (text, lang = 'ml-IN') => {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95; // Slightly slower, child-friendly pace
      utterance.pitch = 1.1; // Friendly warm pitch

      // Attempt Malayalam voice selection if available
      const voices = window.speechSynthesis.getVoices();
      const mlVoice = voices.find((v) => v.lang.includes('ml') || v.lang.includes('ML'));
      if (mlVoice) utterance.voice = mlVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS notice:', e);
    }
  };

  // Helper for chords/sequences
  const playNote = (ctx, freq, time, duration, type = 'sine') => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Audio fallback
    }
  };

  // Synth Engine for Game SFX
  const playSound = (type) => {
    if (isMuted) return;
    initAudio();

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      switch (type) {
        case 'click': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        }

        case 'pop': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.linearRampToValueAtTime(650, now + 0.12);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
          break;
        }

        case 'correct': {
          // Cheerful rising major chime
          playNote(ctx, 523.25, now, 0.1, 'sine'); // C5
          playNote(ctx, 659.25, now + 0.08, 0.1, 'sine'); // E5
          playNote(ctx, 783.99, now + 0.16, 0.25, 'sine'); // G5
          break;
        }

        case 'wrong': {
          // Low gentle buzz (non-punishing)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.linearRampToValueAtTime(110, now + 0.25);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
        }

        case 'levelUp': {
          // Victory Fanfare
          playNote(ctx, 523.25, now, 0.12, 'square'); // C5
          playNote(ctx, 659.25, now + 0.12, 0.12, 'square'); // E5
          playNote(ctx, 783.99, now + 0.24, 0.15, 'square'); // G5
          playNote(ctx, 1046.5, now + 0.38, 0.45, 'triangle'); // C6
          break;
        }

        default:
          break;
      }
    } catch (e) {
      console.warn('Sound play error', e);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, setIsMuted, playSound, speakText }}>
      {children}
    </SoundContext.Provider>
  );
};
