import React from 'react'

const AMBER_COLOR = 'bg-[#F5B041] hover:bg-[#D4983A]';

export default function HeroSection() {

    const groupName = "THE ARK COLLECTIVE";
    const title = "JURASSIFY";
    const tagline = "Your Virtual Time Machine to Prehistoric Life.";
    const signupbtn = "Sign Up";
    const cta = "Become a Time Traveler";
    const teamNames = "Alethea • Reo • Kristel";

    return (
        <header className="min-h-screen bg-gray-900 text-white text-center flex items-center justify-center relative overflow-hidden">

            {/* 1. Background Image Container */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30" 
                style={{
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                }} 
            />

            {/* 2. Top Navigation Layer */}
            <nav className="absolute top-0 inset-x-0 p-8 z-20">
                <div className="flex justify-between items-center">

                    {/* 🔥 TOP LEFT: Group Name + Team Members */}
                    <div className="text-left">
                        <span 
                          className="block text-2xl font-extrabold tracking-[0.25em] uppercase bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-transparent bg-clip-text drop-shadow-[0_2px_5px_rgba(255,200,0,0.6)] animate-pulse-slow"
                        >
                          {groupName}
                        </span>

                        <span 
                          className="block text-sm mt-1 tracking-[0.2em] text-gray-300 italic opacity-90"
                          style={{
                            textShadow: '0 0 10px rgba(255,255,255,0.2)',
                            letterSpacing: '0.2em',
                          }}
                        >
                          {teamNames}
                        </span>
                    </div>

                   {/* 🔘 TOP RIGHT: Sign Up Button */}
<button className={`
    px-6 py-3 text-lg font-bold rounded-xl
    bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500
    text-gray-900
    shadow-lg shadow-yellow-500/50
    transform transition duration-300
    hover:scale-105 hover:shadow-2xl hover:from-amber-300 hover:to-yellow-400
    active:scale-95 active:shadow-inner
`}>
    {signupbtn}
</button>
                </div>
            </nav>

            {/* 3. CENTRAL CONTENT */}
            <div className="max-w-6xl mx-auto px-4 relative z-10">

                {/* 🦖 MAIN TITLE */}
                <h1
                    className="text-8xl md:text-[10rem] lg:text-[12rem] tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] animate-dinoRoar"
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
                <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-red-500 mb-16 uppercase">
                    {tagline}
                </h2>

                {/* 🕰 CTA Button */}
                <div className="flex justify-center space-x-6">
                <button className={`
    px-12 py-4 text-xl font-semibold rounded-full
    bg-gradient-to-r from-green-400 to-teal-400
    text-gray-900
    shadow-lg shadow-teal-400/40
    transform transition duration-300
    hover:scale-105 hover:shadow-2xl hover:from-green-300 hover:to-teal-300
    active:scale-95 active:shadow-inner
`}>
    {cta}
</button>
                </div>
            </div>
        </header>
    );
}
