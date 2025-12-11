// resources/js/components/DinoGallery.tsx
import React, { useState } from "react";
import DinoCard from "./DinoCards"; // FIXED: Correct import path (singular)

const sampleDino = {
    _id: "1",
    name: "Tyrannosaurus Rex",
    image: "https://placehold.co/400x192/065F46/FFFFFF?text=T-Rex",
    period: "Cretaceous",
    diet: "Carnivore",
    description: "The Tyrannosaurus rex was one of the largest land carnivores of all time...",
    type: "Theropod"
};

const DinoGallery: React.FC = () => {
    const [showCard, setShowCard] = useState(true);

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            {showCard && (
                <DinoCard 
                    dino={sampleDino} 
                    onClose={() => setShowCard(false)} 
                />
            )}
        </div>
    );
};

export default DinoGallery;
