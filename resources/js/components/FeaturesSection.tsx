import {
    Globe2,
    Hourglass,
    Microscope,
    Moon,
    Notebook,
    Orbit,
    Star,
    User,
} from 'lucide-react'; // ✅ imported icons
import React from 'react';

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const featureItems: Feature[] = [
    {
        title: 'Interactive Geological Timeline',
        description:
            'An engaging, scrollable timeline that dynamically highlights the Triassic, Jurassic, and Cretaceous periods, transitioning visuals as the user scrolls.',
        icon: (
            <Hourglass className="scale-110 transform text-amber-400 drop-shadow-[0_2px_6px_rgba(255,200,0,0.8)]" />
        ),
    },
    {
        title: '3D Creature Modeling',
        description:
            'Highly detailed, scientifically accurate 3D models of select creatures—rotate, zoom, and explore in full prehistoric realism.',
        icon: (
            <Orbit className="scale-110 transform text-cyan-400 drop-shadow-[0_2px_8px_rgba(0,255,255,0.7)]" />
        ),
    },
    {
        title: 'Personal Research Dashboard',
        description:
            'A private, user-only area for managing saved dinosaurs, favorites, and personal notes.',
        icon: (
            <User className="scale-110 transform text-lime-400 drop-shadow-[0_2px_8px_rgba(50,255,100,0.7)]" />
        ),
    },
    {
        title: 'Creature Favorites List',
        description:
            'Save your favorite species and revisit their pages easily using quick-access bookmarks.',
        icon: (
            <Star className="scale-110 transform text-yellow-400 drop-shadow-[0_2px_8px_rgba(255,255,0,0.7)]" />
        ),
    },
    {
        title: 'Private Research Notes',
        description:
            'Take detailed notes about each dinosaur. Edit, save, and keep them privately in your account.',
        icon: (
            <Notebook className="scale-110 transform text-pink-400 drop-shadow-[0_2px_8px_rgba(255,100,150,0.7)]" />
        ),
    },
    {
        title: 'Taxonomy and Filter Engine',
        description:
            'Easily filter dinosaurs by era, diet, size, or category with the smart sorting system.',
        icon: (
            <Microscope className="scale-110 transform text-purple-400 drop-shadow-[0_2px_8px_rgba(200,150,255,0.7)]" />
        ),
    },
    {
        title: 'Global Discovery Map',
        description:
            'An interactive world map showing real fossil discovery sites and excavation data.',
        icon: (
            <Globe2 className="scale-110 transform text-green-400 drop-shadow-[0_2px_8px_rgba(50,255,100,0.7)]" />
        ),
    },
    {
        title: 'High-Contrast Dark Mode',
        description:
            'Switch between light and dark themes for optimal viewing in different environments.',
        icon: (
            <Moon className="scale-110 transform text-blue-400 drop-shadow-[0_2px_8px_rgba(100,200,255,0.7)]" />
        ),
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section id="features-section" className="bg-gray-900 py-20 text-white">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-8 text-5xl font-extrabold tracking-tight text-amber-400 drop-shadow-[0_3px_10px_rgba(255,200,0,0.6)]">
                    Why Choose The Eon?
                </h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {featureItems.map((item, index) => (
                        <div
                            key={index}
                            className="transform rounded-2xl border border-gray-700 bg-gray-800/60 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-amber-400"
                        >
                            <div className="mb-4 flex justify-center">
                                <div className="transform rounded-full bg-gray-700 p-4 shadow-inner transition duration-300 hover:rotate-6">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-amber-300">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-300">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
