import React from 'react';

// 1. Define the TypeScript Interface for a single Creature object
interface Creature {
    id: number;
    name: string;
    era: 'Triassic' | 'Jurassic' | 'Cretaceous' | string; // Use union type for clarity
    description_short: string;
    diet: string; // Added diet to support future filtering
    image_url: string;
}

// 2. Define the Interface for the Component's Props
interface ShowcaseProps {
    // The component expects an array of Creature objects
    creatures: Creature[];
}

// 3. Update the function signature to use the props and TypeScript
const TimelineCreatureShowcase: React.FC<ShowcaseProps> = ({ creatures }) => {
    
    // Check if the creatures array exists and has content before mapping
    if (!creatures || creatures.length === 0) {
        return (
            <section className="py-16 px-8 bg-gray-800 text-white text-center">
                <p className="text-xl text-red-400">No creature data available. Please check the Laravel controller.</p>
            </section>
        );
    }

    return (
        <section className="timeline py-16 px-8 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 text-center text-green-400">Prehistoric Timeline</h2>
                
                <p className="text-lg text-gray-400 text-center mb-10">
                    Explore the fascinating fauna from the Triassic, Jurassic, and Cretaceous periods.
                </p>

                {/* 4. Use a responsive grid (Tailwind classes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* 5. Map over the 'creatures' prop passed from Laravel */}
                    {creatures.map((dino) => (
                        <div 
                            // Use a stable ID as the key instead of the array index
                            key={dino.id} 
                            className="bg-gray-800 p-6 rounded-xl shadow-2xl hover:scale-[1.03] transition-transform duration-300"
                        >
                            <img 
                                // Use the image_url prop
                                src={dino.image_url} 
                                alt={dino.name} 
                                className="w-full h-40 object-cover mb-4 rounded-lg border-2 border-green-500/50" 
                            />
                            <h3 className="text-3xl font-bold text-green-400 mb-1">{dino.name}</h3>
                            <p className="italic text-gray-300">{dino.era} ({dino.diet})</p>
                            <p className="mt-3 text-gray-400">{dino.description_short}</p>
                            
                            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TimelineCreatureShowcase;