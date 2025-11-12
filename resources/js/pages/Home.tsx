import React, { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';

import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PitchIntroSection from '@/components/PitchIntroSection';
import ImgBreakSection from '@/components/ImgBreakSection';
import TimelineSection from '@/components/TimelineSection';
import { Pi } from 'lucide-react';

interface HomeProps {
    auth: { user: any | null };
    canLogin: boolean;
    canRegister: boolean;
    creatures: any[];
}

export default function Home({ auth, canLogin, canRegister, creatures }: HomeProps) {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Control the welcome portal visibility (shown on first load)
    const [showPortal, setShowPortal] = useState(true);
    const handleClosePortal = () => setShowPortal(false);

    // Optional ref for the timeline section (kept if you need measurements)
    const timelineRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
            <Head title="Jurassify" />

            {/* 1. HERO */}
            <HeroSection />

            {/* 2. PITCH INTRO */}
            <PitchIntroSection />

            {/* 3. FEATURES */}
            <FeaturesSection />

            {/* 4. VISUAL BREAK */}
            <ImgBreakSection />

            {/* 5. TIMELINE */}
            <div ref={timelineRef}>
                <TimelineSection
                    creatures={creatures}
                    showPortal={showPortal}
                    onClosePortal={handleClosePortal}
                />
            </div>
        </div>
    );
}

