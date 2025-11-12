import React from 'react';

export default function PitchIntroSection() {

    const pitchText = "JURASSIFY is an unprecedented, immersive experience of prehistoric life. This is a virtual time machine that will allow you to explore the timelines of the Triassic, Jurassic, and Cretaceous periods, witness the Age of Giants firsthand, and stand face-to-face with the creatures that ruled the planet.";

    const BACKGROUND_COLOR = 'bg-[#1B1B1B]';
    const TEXT_COLOR = 'text-[#F0F0F0]';

    return(
        <section className={`min-h-screen ${BACKGROUND_COLOR} ${TEXT_COLOR} flex items-center justify-center relative overflow-hidden p-8`}>
            
            {/* Optional: Subtle Background Detail (E.g., faint geological lines or dinosaur eyes) */}
            <div 
                className="absolute inset-0 opacity-5" 
                style={{
                    backgroundImage: "url('/images/geologic-pattern.svg')", 
                    backgroundSize: 'cover'
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* The Main Pitch Paragraph */}
                <p className="text-4xl md:text-2xl font-light leading-snug italic">
                    {pitchText}
                </p>

                {/* Optional: The ARK COLLECTIVE signature line */}
                <div className="mt-12 text-right text-base font-semibold uppercase text-gray-500">
                    — From The Ark Collective
                </div>
                
            </div>
        </section>
    );
}