import React from 'react';

/*
Background: #1B1B1B or #212121
Text: #F0F0F0 or #CCCCCC
Sub-headers/Boxes: #5C4C3D (Sepia) or #485F49 (Olive)
CTAs/Links: #20B2AA (Light Sea Green) or #F5B041 (Amber)
*/
const AMBER_COLOR = 'bg-[#F5B041] hover:bg-[#D4983A]';

export default function HeroSection() {

    const groupName = "THE ARK COLLECTIVE";
    const title = "JURASSIFY";
    const tagline = "Your Virtual Time Machine to Prehistoric Life.";
    const signupbtn = "Sign Up";
    const cta = "Become a Time Traveler"; //this basically just skips the whole scroll down features to the timeline section
    const teamNames = "Alethea, Reo, Kristel";

    return (
        //tailwind: min-h-screen to ensure the section takes full viewport height
        <header className="min-h-screen bg-gray-900 text-white text-center flex items-center justify-center relative overflow-hidden ">

            {/* 1. Background Image Container */}

            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30" 
                style={{
                    // Use a placeholder image path here. You need to place an image 
                    // (e.g., a dinosaur silhouette or prehistoric landscape) 
                    // at 'public/images/hero-bg.jpg'.
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    // This ensures the image covers the entire container space.
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                }} 
            />
                
            {/* 2. Top Navigation Layer (For Corner Elements) */}
            <nav className="absolute top-0 inset-x-0 p-8 z-20">
                <div className="flex justify-between items-center">
                    
                    {/* Top Left: Group Name (THE ARK COLLECTIVE) */}
                    <div className="text-left text-xl tracking-[0.3em] font-semibold text-gray-400 uppercase">
                        <span>{groupName}</span>
                        <br />
                        <span className="text-base tracking-widest">{teamNames}</span>
                    </div>

                    {/* Top Right: Sign Up Button */}
                    <button className={`px-5 py-2 text-lg rounded-xl font-bold transition duration-300 shadow-lg ${AMBER_COLOR} text-gray-900`}>
                        {signupbtn}
                    </button>
                </div>
            </nav>

                {/* 3. Central Content (Main Hero Text) */}
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                
                {/* Primary Title (JURASSIFY) */}
                <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-extrabold tracking-tighter leading-none text-green-500/90 drop-shadow-lg"
                    style={{ textShadow: '0 0 15px rgba(34, 197, 94, 0.5)' }} 
                >
                    {title}
                </h1>
                
                {/* Secondary Headline / Catchphrase */}
                <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-red-500 mb-16 uppercase">
                    {tagline}
                </h2>

                {/* Main CTA Button - Become a Time Traveler Now */}
                <div className="flex justify-center space-x-6">
                    <button className="px-10 py-4 text-xl bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105">
                        {cta}
                    </button>
                </div>

            </div>
        </header>
    );
}