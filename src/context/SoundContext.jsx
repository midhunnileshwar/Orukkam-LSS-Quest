import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('orukkam_muted') === 'true');
  const [voices, setVoices] = useState([]);
  const audioCtxRef = useRef(null);

  // Load available speech synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          setVoices(available);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

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

  // Speech Helper supporting UK English and Malayalam
  const speakText = (text, lang = 'ml-IN') => {
    if (isMuted || !('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel(); // Stop pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95; // Child-friendly clear pace
      utterance.pitch = 1.05;

      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();

      if (lang.toLowerCase().includes('en')) {
        // Search for UK English voice
        const ukVoice =
          currentVoices.find(
            (v) =>
              (v.lang === 'en-GB' || v.lang === 'en_GB') &&
              (v.name.includes('UK') || v.name.includes('United Kingdom') || !v.name.includes('US'))
          ) ||
          currentVoices.find(
            (v) =>
              v.lang.includes('GB') ||
              v.name.includes('UK') ||
              v.name.includes('United Kingdom') ||
              v.name.includes('George') ||
              v.name.includes('Hazel') ||
              v.name.includes('Susan')
          ) ||
          currentVoices.find((v) => v.lang.startsWith('en'));

        if (ukVoice) utterance.voice = ukVoice;
      } else if (lang.toLowerCase().includes('ml')) {
        // Search for Malayalam voice
        const mlVoice = currentVoices.find(
          (v) => v.lang.includes('ml') || v.lang.includes('ML') || v.name.toLowerCase().includes('malayalam')
        );
        if (mlVoice) utterance.voice = mlVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS notice:', e);
    }
  };

  const speakMalayalam = (text) => speakText(text, 'ml-IN');
  const speakUKEnglish = (text) => speakText(text, 'en-GB');

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

        case 'doorOpen': {
          // Magical door opening sound (mystic sweeping chime)
          playNote(ctx, 392.0, now, 0.2, 'sine'); // G4
          playNote(ctx, 523.25, now + 0.1, 0.25, 'triangle'); // C5
          playNote(ctx, 659.25, now + 0.2, 0.3, 'sine'); // E5
          playNote(ctx, 783.99, now + 0.3, 0.45, 'triangle'); // G5
          playNote(ctx, 1046.5, now + 0.4, 0.6, 'sine'); // C6
          break;
        }

        case 'energyRecharge': {
          // Electric energetic power-up chime
          playNote(ctx, 300, now, 0.1, 'sawtooth');
          playNote(ctx, 450, now + 0.08, 0.1, 'sine');
          playNote(ctx, 600, now + 0.16, 0.15, 'triangle');
          playNote(ctx, 800, now + 0.25, 0.35, 'sine');
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
    <SoundContext.Provider value={{ isMuted, setIsMuted, playSound, speakText, speakMalayalam, speakUKEnglish }}>
      {children}
    </SoundContext.Provider>
  );
};
