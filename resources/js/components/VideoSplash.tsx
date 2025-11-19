import { useEffect, useRef, useState } from 'react';

interface VideoSplashProps {
    onVideoEnd: () => void;
}

export default function VideoSplash({ onVideoEnd }: VideoSplashProps) {
    const VIDEO_PATH = '/dinosaur intro.mp4';
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    // --- Autoplay and End Logic ---
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // 1. Force playback on mount (will work because it's initially muted)
            video.play().catch((error) => {
                console.error('Autoplay blocked until user interacts.', error);
                // Fallback: Immediately call onVideoEnd if playback fails (e.g., mobile)
            });

            // 2. Set listener for when the video naturally ends
            video.onended = onVideoEnd;
        }
    }, [onVideoEnd]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMuted(videoRef.current.muted);
        }
    };

    // --- Manual Skip Handler ---
    const handleSkip = () => {
        if (videoRef.current) {
            videoRef.current.pause(); // Pause video
        }
        onVideoEnd(); // Immediately hide the splash screen
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            {/* Video Element */}
            <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline // Recommended for mobile
                autoPlay
                muted={muted}
            >
                <source src={VIDEO_PATH} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Control Bar (Always visible) */}
            <div className="absolute bottom-8 right-8 z-10 flex space-x-4">
                {/* Mute Button */}
                <button
                    onClick={toggleMute}
                    className="rounded-full bg-gray-900/70 p-3 text-white transition hover:bg-gray-700"
                    title={muted ? 'Unmute Audio' : 'Mute Audio'}
                >
                    {muted ? '🔇 Unmute' : '🔊 Mute'}
                </button>

                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    className="rounded-full bg-yellow-500/90 p-3 font-bold text-gray-900 transition hover:bg-yellow-400"
                >
                    Skip Intro
                </button>
            </div>
        </div>
    );
}
