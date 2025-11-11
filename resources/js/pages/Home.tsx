import React from 'react';
import { Head } from '@inertiajs/react';

import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';

interface HomeProps {
    auth: { user: any | null };
    canLogin: boolean;
    canRegister: boolean;
    creatures: any[]; // Comment this out temporarily
}

export default function Home(props: any) {
 return (
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
            <Head title="Jurassify" />
            
            {/* 2. RENDER ONLY THE HERO SECTION */}
            <HeroSection /> 
            
            {/* 3. RENDER THE FEATURES SECTION */}
            <FeaturesSection />

            {/* 4. COMMENT OUT the other sections */}
            {/* <FeaturesSection /> */}
            {/* <TimelineCreatureShowcase creatures={props.creatures} /> */}
            
        </div>
    );
}

