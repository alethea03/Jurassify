import React from 'react';

export default function Features(){
    const features = [
        'Explore Dinosaurs',
        'View Prehistoric Timeline',
        'Add Favorites & Notes',
        'Interactive 3D Models',
    ];
    return(
        <section className="features py-16 px-8 bg-gray-900 text-white text-center">
            <h2 className="text-4xl font-bold mb-8">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
                        {f}
                    </div>
                ))}
            </div>
        </section>
    )
}