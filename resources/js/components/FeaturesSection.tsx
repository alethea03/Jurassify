import React from 'react';

// Define the content using TypeScript interface
interface Feature {
    title: string;
    description: string;
    icon: string;
}

const featureItems: Feature[] = [
    // Ensure you have at least one item here
    { 
        title: "3D Interactive Models", 
        description: "Engage with accurate, rotating models.",
        icon: "🦕"
    },
    // ... rest of your feature items ...
];

const FeaturesSection: React.FC = () => {
    return (
        <section id="features-section" className="py-20 bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
                    Why Choose The Eon?
                </h2>
                
                {/* Grid for Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="p-6 bg-gray-700 rounded-xl shadow-lg"
                        >
                            <span className="text-5xl block mb-2">{item.icon}</span>
                            <h3 className="text-2xl font-semibold text-green-400">{item.title}</h3>
                            <p className="text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;