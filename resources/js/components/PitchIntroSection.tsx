import React from 'react';

export default function PitchIntroSection() {
    const pitchText = "JURASSIFY is an unprecedented, immersive experience of prehistoric life. This is a virtual time machine that will allow you to explore the timelines of the Triassic, Jurassic, and Cretaceous periods, witness the Age of Giants firsthand, and stand face-to-face with the creatures that ruled the planet.";

    return (
        <section className="min-h-screen relative flex items-center justify-center bg-[#1B1B1B] overflow-hidden p-8">

            {/* Optional subtle animated background */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 animate-pulse" 
                style={{ backgroundImage: "url('/images/geologic-pattern.svg')" }}
            />

            {/* Glassmorphism container */}
            <div className="relative z-10 max-w-3xl mx-auto p-10 rounded-3xl
                            bg-white/10 backdrop-blur-md border border-white/20
                            shadow-2xl text-center animate-fadeIn
                            hover:scale-[1.02] transition-transform duration-500">

                {/* Main Pitch Text */}
                <p className="text-lg md:text-xl lg:text-2xl font-bold italic text-white leading-relaxed
                              tracking-wide" 
                   style={{ fontFamily: "'Roboto', sans-serif" }}>
                    {pitchText}
                </p>

                {/* Signature line */}
                <div className="mt-8 text-sm md:text-base font-semibold text-gray-300 uppercase tracking-wider">
                    — From The Ark Collective
                </div>

            </div>

            {/* Optional floating animated accent shapes */}
            <div className="absolute top-10 left-10 w-12 h-12 bg-green-500 rounded-full opacity-40 animate-bounce-slow"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-amber-400 rounded-full opacity-30 animate-spin-slow"></div>

        </section>
    );
}
