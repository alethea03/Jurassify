import React from 'react';

export default function Timeline(){
    const dinosaurs = [
        { name: 'T-Rex', era: 'Cretaceous', description: 'Ferocious predator', image: 'https://via.placeholder.com/150' },
        { name: 'Triceratops', era: 'Cretaceous', description: 'Three-horned herbivore', image: 'https://via.placeholder.com/150' },
        { name: 'Stegosaurus', era: 'Jurassic', description: 'Plated herbivore', image: 'https://via.placeholder.com/150' },
    ];

    return(
        <section className="timeline py-16 px-8 bg-gray-800 text-white text-center">
            <h2 className="text-4xl font-bold mb-8">Prehistoric Timeline</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {dinosaurs.map((dino, index) => (
                    <div key={index} className="bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
                        <img src={dino.image} alt={dino.name} className="mx-auto mb-4 rounded" />
                        <h3 className="text-2xl font-bold">{dino.name}</h3>
                        <p className="italic">{dino.era}</p>
                        <p>{dino.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}