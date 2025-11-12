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
        title: "Interactive Geological Timeline", 
        description: "An engaging, scrollable timeline that dynamically highlights the Triassic, Jurassic, and Cretaceous periods, transitioning the main content or background visuals as the user scrolls.",
        icon: "⏳"
    },
    { 
        title: "3D Creature Modeling", 
        description: "A placeholder feature that promises highly detailed, scientifically accurate 3D models of select creatures, allowing users to rotate and zoom for deep study.",
        icon: "🌀"
    },
    { 
        title: "Personal Research Dashboard", 
        description: "A private, dedicated user area accessible only after sign-up/login where users can manage their personal content.",
        icon: "👤"
    },
    { 
        title: "Creature Favorites List", 
        description: "Allows authenticated users to click a star or heart icon on any creature profile to save it to their dashboard for quick access.",
        icon: "⭐"
    },
    { 
        title: "Private Research Notes", 
        description: "The ability for users to write, modify, save, and delete personal notes about any dinosaur they are studying, saved privately to their profile.",
        icon: "📝"
    },
    { 
        title: "Taxonomy and Filter Engine", 
        description: "The advanced filtering system allowing users to quickly sort creatures by era, diet, size, and custom categories (Pterosaurs, Crocodilians, etc.).",
        icon: "🔬"
    },
    { 
        title: "Global Discovery Map", 
        description: "An interactive map that pinpoints the real-world discovery sites of the creatures you are showcasing.",
        icon: "🌎"
    },
    { 
        title: "High-Contrast Dark Mode", 
        description: "A feature allowing users to seamlessly switch the entire UI to a preferred theme for optimal viewing in different environments.",
        icon: "🌙"
    },
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