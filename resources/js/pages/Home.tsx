import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import FeaturesSection from '@/components/FeaturesSection';
import HeroSection from '@/components/HeroSection';
import ImgBreakSection from '@/components/ImgBreakSection';
import PitchIntroSection from '@/components/PitchIntroSection';
import TimelineSection from '@/components/TimelineSection';
import VideoSplash from '@/components/VideoSplash';

interface HomeProps {
    auth: { user: any | null };
    canLogin: boolean;
    canRegister: boolean;
    creatures: any[];
}

export default function Home({
    auth,
    canLogin,
    canRegister,
    creatures,
}: HomeProps) {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showSplash, setShowSplash] = useState(true); //video splash control for visibility

    // Function to hide the splash screen and reveal the Hero Section
    const handleVideoEnd = () => {
        setShowSplash(false);
    };

    // Control the welcome portal visibility (shown on first load)
    const [showPortal, setShowPortal] = useState(true);
    const handleClosePortal = () => setShowPortal(false);

    // Optional ref for the timeline section (kept if you need measurements)
    const timelineRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-white antialiased">
            <Head title="Jurassify" />

            {/* 1. VIDEO SPLASH SCREEN (Renders first if showSplash is true) */}
            {showSplash && <VideoSplash onVideoEnd={handleVideoEnd} />}

            {/* We apply a transition here to fade the content in dramatically */}
            <div
                className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}
            >
<<<<<<< HEAD
                <HeroSection /> 
=======
                <HeroSection />
>>>>>>> d8c667517bca39244065bc334b1c0f0988a76b5c
                <PitchIntroSection />
                <FeaturesSection />
                <ImgBreakSection />

                <div ref={timelineRef}>
                    <TimelineSection
                        creatures={creatures}
                        showPortal={showPortal}
                        onClosePortal={handleClosePortal}
                    />
                </div>
            </div>
        </div>
    );
}
