import React from 'react';

// Define the interface again (ensure it matches DinosaurService data)
interface Creature {
    id: number;
    name: string;
    era: string;
    diet: string;
    description_short: string;
    category: string;
    location_map_coord: { lat: number; lng: number };
    image_url: string;
}
interface ShowcaseProps {
    creatures: Creature[];
    //Prop to tell the component when to show the portal
    showPortal: boolean;
    // Prop to handle the user clicking "Got It"
    onClosePortal: () => void;
}

const TimelineSection: React.FC<ShowcaseProps> = ({
    creatures,
    showPortal,
    onClosePortal,
}) => {
    // --- STATE MANAGEMENT ---
    const [mapOpacity, setMapOpacity] = React.useState('opacity-0');

    // Placeholder for filter and selected creature state
    React.useEffect(() => {
        // If showPortal is FALSE, it means the parent component (Home.tsx)
        // has received the "Got It" signal.
        if (!showPortal) {
            // Add a small delay for the modal fade-out transition (500ms)
            const timer = setTimeout(() => {
                setMapOpacity('opacity-100'); // Fully reveal the map content
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [showPortal]); // Run this effect when showPortal state changes

    // Placeholder for filter and selected creature state
    const filterCategories = [
        'DINOSAURS',
        'PTEROSAURS',
        'CROCODILIANS',
        'TURTLES AND TORTOISES',
        // ... rest of categories
    ];
    const [selectedCategory, setSelectedCategory] =
        React.useState('PTEROSAURS');
    const [selectedCreature, setSelectedCreature] = React.useState(
        creatures.find((c) => c.category === selectedCategory) || creatures[0],
    );

    // Keep selectedCreature in sync when the selectedCategory or creatures list changes
    React.useEffect(() => {
        const found = creatures.find((c) => c.category === selectedCategory);
        setSelectedCreature(found || creatures[0] || (null as any));
    }, [selectedCategory, creatures]);

    // --- RENDER ---
    return (
        // The parent section MUST have 'relative' positioning for the overlay to work correctly.
        <section className="relative min-h-screen bg-gray-900 text-white">
            {/* 1. WELCOME OVERLAY MODAL */}
            {showPortal && (
                <div
                    // CRITICAL FIX: Change 'fixed' to 'absolute'.
                    // This confines the overlay to the boundaries of the parent 'relative' section.
                    className={`absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${showPortal ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="max-w-3xl rounded-xl border-4 border-green-500 bg-gray-800/90 p-10 text-center shadow-2xl">
                        <p className="text-2xl font-light leading-relaxed text-gray-200">
                            You have successfully transported to the Mesozoic
                            Era. <br />
                            Brace yourself as you explore the ancient world and
                            exit the portal with newly found knowledge and
                            virtual experience.
                        </p>

                        <button
                            onClick={onClosePortal}
                            className="mt-8 transform rounded-lg bg-yellow-500 px-10 py-3 text-xl font-bold transition duration-300 hover:scale-105 hover:bg-yellow-600"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}

            {/* 2. MAIN SHOWCASE CONTENT (Map/Sidebar) */}
            <div
                className={`flex transition-opacity duration-1000 ${mapOpacity}`}
            >
                {/* Left Sidebar (Filters/Navigation) */}
                {/* ... */}

                {/* Right Content Area (Map and Detail Card) */}
                {/* ... */}
            </div>
        </section>
    );
};

export default TimelineSection;
