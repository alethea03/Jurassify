import { useEffect, useRef, useState } from 'react';
import { FaUserPlus, FaArrowRight } from 'react-icons/fa';

const AMBER_COLOR = 'bg-[#F5B041] hover:bg-[#D4983A]';

const VIDEO_PATH = 'dinosaur intro.mp4';

interface HeroSectionProps {
    isLoggedIn: boolean;
    username: string | undefined;
    onMainAction: () => void;
}

export default function HeroSection({ isLoggedIn, username, onMainAction }: HeroSectionProps) {
    const groupName = 'THE ARK COLLECTIVE';
    const title = 'JURASSIFY';
    const tagline = 'Your Virtual Time Machine to Prehistoric Life.';
    const teamNames = 'Alethea • Reo • Kristel';
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    // --- Autoplay and Loop Logic ---
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Attempt to play on mount (must be muted for autoplay to work in browsers)
            video.play().catch((error) => {
                console.error('Video background playback failed:', error);
                // No fallback needed; if it fails, the section just shows the static background/text.
            });
        }
    }, []);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMuted(videoRef.current.muted);
        }
    };

    return (
        <header className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 text-center text-white">
            {/* 1. VIDEO BACKGROUND LAYER (Absolute & Behind) */}
            <video
                ref={videoRef}
                className="absolute inset-0 z-0 h-full w-full object-cover"
                muted={muted}
                loop // CRITICAL: This makes the video repeat continuously
                autoPlay
                playsInline
            >
                <source src={VIDEO_PATH} type="video/mp4" />
            </video>

            {/* 2. OVERLAY TO DARKEN VIDEO (Enhances text readability) */}
            <div className="absolute inset-0 z-10 bg-black/60"></div>

            {/* 4. MUTE/UNMUTE CONTROL (Placed on top of content) */}
            <div className="absolute bottom-8 right-8 z-30">
                <button
                    onClick={toggleMute}
                    className="rounded-full bg-gray-900/70 p-3 text-white transition hover:bg-gray-700"
                    title={muted ? 'Unmute Audio' : 'Mute Audio'}
                >
                    {muted ? '🔇' : '🔊'}
                </button>
            </div>

            {/* 2. Top Navigation Layer */}
            <nav className="absolute inset-x-0 top-0 z-20 p-8">
                <div className="flex items-center justify-between">
                    <div className="text-left">
                        <span className="animate-pulse-slow block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 bg-clip-text text-2xl font-extrabold uppercase tracking-[0.25em] text-transparent drop-shadow-[0_2px_5px_rgba(255,200,0,0.6)]">
                            {groupName}
                        </span>

                        <span
                            className="mt-1 block text-sm italic tracking-[0.2em] text-gray-300 opacity-90"
                            style={{
                                textShadow: '0 0 10px rgba(255,255,255,0.2)',
                                letterSpacing: '0.2em',
                            }}
                        >
                            {teamNames}
                        </span>
                    </div>
                </div>
            </nav>

            {/* 3. CENTRAL CONTENT */}
            <div className="relative z-10 mx-auto max-w-6xl px-4">
                {/* 🦖 MAIN TITLE */}
                <h1
                    className="animate-dinoRoar text-8xl leading-none tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] md:text-[10rem] lg:text-[12rem]"
                    style={{
                        fontFamily: 'DinoHorn',
                        color: '#39FF14',
                        textShadow: `
                            2px 2px 0 #000,
                            4px 4px 0 #2E8B57,
                            6px 6px 15px rgba(0,0,0,0.8)
                        `,
                    }}
                >
                    {title}
                </h1>

                {/* 🧭 TAGLINE */}
                <h2 className="mb-16 text-3xl font-bold uppercase tracking-wide text-red-500 sm:text-4xl">
                    {tagline}
                </h2>

                {/* 🕰 CTA Button */}
                <div className="flex justify-center space-x-6">
                    <button
                        className={`transform rounded-full bg-gradient-to-r from-green-400 to-teal-400 px-12 py-4 text-xl font-semibold text-gray-900 shadow-lg shadow-teal-400/40 transition duration-300 hover:scale-105 hover:from-green-300 hover:to-teal-300 hover:shadow-2xl active:scale-95 active:shadow-inner`}
                    onClick={onMainAction}
                >
                    {isLoggedIn ? 'Go to Hub' : 'Become a Time Traveler'} 
                    </button>
                </div>
            </div>
        </header>
    );
}
