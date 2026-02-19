import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => localStorage.getItem('orukkam_muted') === 'true');
    const audioCtxRef = useRef(null);

    // Initialize Audio Context on first user interaction
    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    useEffect(() => {
        localStorage.setItem('orukkam_muted', isMuted);
    }, [isMuted]);

    // Simple Synth Engine for Game SFX
    const playSound = (type) => {
        if (isMuted) return;
        initAudio(); // Ensure context is ready

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'click':
                // Short high blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'pop':
                // Bubble pop sound
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.1);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;

            case 'correct':
                // Pleasant rising chime (Major Triad)
                playNote(ctx, 523.25, now, 0.1, 'sine'); // C5
                playNote(ctx, 659.25, now + 0.1, 0.1, 'sine'); // E5
                playNote(ctx, 783.99, now + 0.2, 0.2, 'sine'); // G5
                break;

            case 'wrong':
                // Low buzzing/falling slide
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'levelUp':
                // Fanfare
                playNote(ctx, 523.25, now, 0.1, 'square'); // C5
                playNote(ctx, 523.25, now + 0.1, 0.1, 'square'); // C5
                playNote(ctx, 523.25, now + 0.2, 0.1, 'square'); // C5
                playNote(ctx, 783.99, now + 0.3, 0.4, 'square'); // G5
                break;

            default:
                break;
        }
    };

    // Helper for chords/sequences
    const playNote = (ctx, freq, time, duration, type = 'sine') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        osc.start(time);
        osc.stop(time + duration);
    };

    return (
        <SoundContext.Provider value={{ isMuted, setIsMuted, playSound }}>
            {children}
            {/* Optional BGM Player - Hidden */}
            {!isMuted && (
                <audio autoPlay loop hidden>
                    <source src="/bgm.mp3" type="audio/mp3" />
                </audio>
            )}
        </SoundContext.Provider>
    );
};
