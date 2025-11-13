export default function PitchIntroSection() {
    const pitchText =
        'JURASSIFY is an unprecedented, immersive experience of prehistoric life. This is a virtual time machine that will allow you to explore the timelines of the Triassic, Jurassic, and Cretaceous periods, witness the Age of Giants firsthand, and stand face-to-face with the creatures that ruled the planet.';

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1B1B1B] p-8">
            {/* Optional subtle animated background */}
            <div
                className="absolute inset-0 animate-pulse bg-cover bg-center opacity-20"
                style={{
                    backgroundImage: "url('/images/geologic-pattern.svg')",
                }}
            />

            {/* Glassmorphism container */}
            <div className="animate-fadeIn relative z-10 mx-auto max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
                {/* Main Pitch Text */}
                <p
                    className="text-lg font-bold italic leading-relaxed tracking-wide text-white md:text-xl lg:text-2xl"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                    {pitchText}
                </p>

                {/* Signature line */}
                <div className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-300 md:text-base">
                    — From The Ark Collective
                </div>
            </div>

            {/* Optional floating animated accent shapes */}
            <div className="animate-bounce-slow absolute left-10 top-10 h-12 w-12 rounded-full bg-green-500 opacity-40"></div>
            <div className="animate-spin-slow absolute bottom-20 right-20 h-16 w-16 rounded-full bg-amber-400 opacity-30"></div>
        </section>
    );
}
