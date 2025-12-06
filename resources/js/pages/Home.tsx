import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

//import { useUser } from '@/hooks/useUser'; // not using anymore because we resorted to SQL database
import DashboardSidebar from '@/components/DashboardSidebar'; //separate bcz this will only show when logged in
import WelcomeOverlay from '@/components/WelcomeOverlay';

// Import all section components
import FeaturesSection from '@/components/FeaturesSection';
import HeroSection from '@/components/HeroSection';
import ImgBreakSection from '@/components/ImgBreakSection';
import PitchIntroSection from '@/components/PitchIntroSection';
import TimelineSection from '@/components/TimelineSection';
import VideoSplash from '@/components/VideoSplash';
import DevelopersSection from '@/components/DevelopersSection';
import ResourcesSection from '@/components/ResourcesSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import FavoritesGallery from '@/components/FavoritesGallery';
import StickyHeader from '@/components/StickyHeader';


interface HomeProps {
    auth: { user: any | null };
    canLogin: boolean;
    canRegister: boolean;
    creatures: any[];
}

type ViewMode = 'public' | 'dashboard';

export default function Home({
    auth,
    canLogin,
    canRegister,
    creatures,
}: HomeProps) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); //sidebar controls
    const [viewMode, setViewMode] = useState<ViewMode>('public');
    const [showWelcome, setShowWelcome] = useState(false);

    const [showSplash, setShowSplash] = useState(true);
    const [showPortal, setShowPortal] = useState(true);
    const timelineRef = useRef<HTMLDivElement>(null); // Ref for the Timeline section container

    const isLoggedIn = !!auth.user;
    const username = auth.user?.name;


    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    // Function to handle mock login logic, we resorted now to SQL database
    {/*
        const handleLogin = () => {
        const username = prompt("Enter mock username (rootuser or user1234):");
        if (username) {
            const ok = login(username);
            if (ok) {
            // after mock login, open sidebar immediately
            setIsSidebarOpen(true);
            }
        }
    };
*/}
    const mockLogin = async () => {
    try {
        const response = await axios.post('/mock-login', {
            email: 'rootuser@example.com', // CHANGE THIS TO YOUR TEST EMAIL
        });

        const user = response.data.user;

        // temporarily override Inertia's auth state using React state
        setIsSidebarOpen(true);
        alert(`Logged in as: ${user.name}`);

        // You may optionally set viewMode or other UI states:
        setViewMode('dashboard');

    } catch (error: any) {
        alert(error.response?.data?.message || 'Login failed');
    }
};


    const handleMainAction = async () => {
    if (isLoggedIn) {
        setIsSidebarOpen(true);
        return;
    }

    // run SQL mock login
    await mockLogin();
};
    //handler for logo click to scroll to top
    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Function to hide the splash screen and reveal the Hero Section
    const handleVideoEnd = () => {
        setShowSplash(false);
    };

    // Function to close the welcome portal overlay
    const handleClosePortal = () => setShowPortal(false);

    // Determines if we render the long public marketing content
    const showPublicContent = viewMode === 'public';

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-white antialiased">
        
             <Head title={showPublicContent ? "Jurassify" : "User Hub"} />
            
            {/* 1. VIDEO SPLASH SCREEN (Renders first if showSplash is true) */}
            {showSplash && <VideoSplash onVideoEnd={handleVideoEnd} />}

           <div
                className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}
            >   
            <StickyHeader 
                isLoggedIn={isLoggedIn}
                username={username}
                onMainAction={() => router.get('/dashboard')}
                onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            
                <div className="pt-20">{/* Padding to offset fixed header */}</div>

                <HeroSection 
                    isLoggedIn={isLoggedIn}
                    username={username}
                    onMainAction={handleMainAction}
                />

                {/* 2. PUBLIC SECTIONS (HIDDEN when viewMode is 'dashboard') */}
                {showPublicContent && (
                    <>

                        <PitchIntroSection />
                        <FeaturesSection />
                        <DevelopersSection />
                        <ResourcesSection />
                        <ImgBreakSection />
                    </>
                )}
                
                {/* 3. CORE SECTIONS (ALWAYS VISIBLE in both modes) */}
                
                {/* TIMELINE MAP (Always visible) */}
                <div ref={timelineRef}>
                    <TimelineSection
                        creatures={creatures}
                        // Only show the welcome portal if we are in the public view
                        showPortal={showPortal && showPublicContent} 
                        onClosePortal={handleClosePortal}
                    />
                </div>
                
                {/* 4. USER HUB SECTIONS (SHOWN only when viewMode is 'dashboard') */}
                
                {!showPublicContent && <FavoritesGallery />}

                {/* 5. FOOTER SECTIONS (Always visible) */}
                <ContactSection />
                <FooterSection />
            </div>

            {/* 6. OVERLAY SIDEBAR */}
            {isLoggedIn && (
                <DashboardSidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                    setViewMode={setViewMode}
                />
            )}
            {/* 7. WELCOME OVERLAY (Must be the highest Z-index) */}
            {isLoggedIn && auth.user && (
                <WelcomeOverlay
                    username={auth.user.username}
                    isOpen={showWelcome}
                    onClose={() => setShowWelcome(false)}
                />
            )}

        </div>
    );
}
