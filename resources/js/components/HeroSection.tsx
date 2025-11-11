import React from 'react';

export default function HeroSection() {
    return (
        <header className="py-20 bg-gray-900 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-7xl font-extrabold mb-4 tracking-tighter">
                    JURASSIFY
                </h1>
                <p className="text-3xl text-green-400 mb-8">
                    Your Virtual Time Machine to Prehistoric Life.
                </p>
                <button className="px-8 py-3 text-xl bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg">
                    Travel Time Now
                </button>
            </div>
        </header>
    );
}