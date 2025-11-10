// resources/js/Pages/Home.jsx

import React from 'react';
// Use the modern Inertia hooks (Head and Link)
import { Head, Link } from '@inertiajs/react';
// Import all necessary section components
import HeroSection from '@/Components/HeroSection';
import FeaturesSection from '@/Components/FeaturesSection'; // Assuming you named it FeaturesSection.jsx
import TimelineCreatureShowcase from '@/Components/TimelineCreatureShowcase'; // Corrected name for clarity
import ResourcesSection from '@/Components/ResourcesSection'; 
import WebsiteDashboardLink from '@/Components/WebsiteDashboardLink'; // Link to /dashboard
import ContactUsSection from '@/Components/ContactUsSection'; 
// NOTE: Log In/Sign Up will typically be handled by Breeze components/links


export default function Home({ auth, canLogin, canRegister }) {
    
    // Determine if the user is logged in to show the correct navigation
    const isLoggedIn = auth?.user != null; 

    return (
        // The main container for your entire single-page website.
        // Tailwind class for dark mode background
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
            <Head title="The Eon: Jurassify" />

            {/* Optional Top Navigation/Login Links */}
            <header className="absolute top-0 w-full z-20 p-6 flex justify-end space-x-4">
                {isLoggedIn ? (
                    <Link href={route('dashboard')} className="text-sm font-semibold text-green-400 hover:text-green-500 transition">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        {canLogin && (
                            <Link href={route('login')} className="text-sm font-semibold text-gray-300 hover:text-white transition">
                                Log in
                            </Link>
                        )}
                        {canRegister && (
                            <Link href={route('register')} className="text-sm font-semibold bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                                Sign up
                            </Link>
                        )}
                    </>
                )}
            </header>

            {/* ======================================================= */}
            {/* 1. HERO SECTION (The First Fold)                        */}
            {/* ======================================================= */}
            <HeroSection />

            {/* ======================================================= */}
            {/* 2. FEATURES SECTION (Value Proposition)                 */}
            {/* ======================================================= */}
            <FeaturesSection />

            {/* ======================================================= */}
            {/* 3. EXPLORE TIMELINE / CREATURE SHOWCASE (Core Content)  */}
            {/* This must have the ID that the Hero button links to  */}
            {/* ======================================================= */}
            <TimelineCreatureShowcase /> 
            
            {/* NOTE: The Admin CRUD panel will either be hidden within 
            TimelineCreatureShowcase or be a separate component accessible via a protected link.
            We will assume it is placed within the Timeline component for now.
            */}

            {/* ======================================================= */}
            {/* 4. WEBSITE SECTION (Launch the Dashboard)               */}
            {/* ======================================================= */}
            {/* Only display this section if the user is not currently logged in, 
               or if you want to explicitly show the link to the dashboard. */}
            <WebsiteDashboardLink isLoggedIn={isLoggedIn} />

            {/* ======================================================= */}
            {/* 5. FOOTER SECTIONS                                      */}
            {/* ======================================================= */}
            <div className="bg-gray-800 border-t border-gray-700">
                <ResourcesSection />
                <ContactUsSection />
                {/* You may want to wrap these in a single Footer component later */}
            </div>

        </div>
    );
}