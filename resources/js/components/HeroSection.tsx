const AMBER_COLOR = 'bg-[#F5B041] hover:bg-[#D4983A]';

export default function HeroSection() {
    const groupName = 'THE ARK COLLECTIVE';
    const title = 'JURASSIFY';
    const tagline = 'Your Virtual Time Machine to Prehistoric Life.';
    const signupbtn = 'Sign Up';
    const cta = 'Become a Time Traveler';
    const teamNames = 'Alethea • Reo • Kristel';

    return (
        <header className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 text-center text-white">
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
            <nav className="absolute inset-x-0 top-0 z-20 p-8">
                <div className="flex items-center justify-between">
                    {/* 🔥 TOP LEFT: Group Name + Team Members */}
                    <div className="text-left">
                        <span className="animate-pulse-slow block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 bg-clip-text text-2xl font-extrabold uppercase tracking-[0.25em] text-transparent drop-shadow-[0_2px_5px_rgba(255,200,0,0.6)]">
                            {groupName}
                        </span>

                        <span
                            className="mt-1 block text-sm italic tracking-[0.2em] text-gray-300 opacity-90"
                            style={{
                                textShadow: '0 0 10px rgba(255,255,255,0.2)',
                                letterSpacing: '0.2em',
                            }}
                        >
                            {teamNames}
                        </span>
                    </div>

                    {/* 🔘 TOP RIGHT: Sign Up Button */}
                    <button
                        className={`transform rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 px-6 py-3 text-lg font-bold text-gray-900 shadow-lg shadow-yellow-500/50 transition duration-300 hover:scale-105 hover:from-amber-300 hover:to-yellow-400 hover:shadow-2xl active:scale-95 active:shadow-inner`}
                    >
                        {signupbtn}
                    </button>
                </div>
            </nav>

            {/* 3. CENTRAL CONTENT */}
            <div className="relative z-10 mx-auto max-w-6xl px-4">
                {/* 🦖 MAIN TITLE */}
                <h1
                    className="animate-dinoRoar text-8xl leading-none tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] md:text-[10rem] lg:text-[12rem]"
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
                <h2 className="mb-16 text-3xl font-bold uppercase tracking-wide text-red-500 sm:text-4xl">
                    {tagline}
                </h2>

                {/* 🕰 CTA Button */}
                <div className="flex justify-center space-x-6">
                    <button
                        className={`transform rounded-full bg-gradient-to-r from-green-400 to-teal-400 px-12 py-4 text-xl font-semibold text-gray-900 shadow-lg shadow-teal-400/40 transition duration-300 hover:scale-105 hover:from-green-300 hover:to-teal-300 hover:shadow-2xl active:scale-95 active:shadow-inner`}
                    >
                        {cta}
                    </button>
                </div>
            </div>
        </header>
    );
}
