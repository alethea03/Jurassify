import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DinoModal from "./DinoModal"; // <-- PASTE THIS AT THE TOP

export default function DinoCards() {
    const [dinos, setDinos] = useState([]);

    // <-- PASTE THIS BELOW YOUR dinos STATE
    const [selectedDino, setSelectedDino] = useState(null);

    useEffect(() => {
        fetch("https://dinoapi.brunosouzadev.com/api/dinosaurs")
            .then(res => res.json())
            .then(data => setDinos(data.dinosaurs))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            {/* Dino Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {dinos.map((dino, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer border border-gray-200"

                        // <-- THIS IS WHERE YOU PASTE THE onClick
                        onClick={() => setSelectedDino(dino)}
                    >
                        <img
                            src={dino.image}
                            alt={dino.name}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-bold">{dino.name}</h2>
                            <p className="text-gray-600">{dino.period}</p>
                            <p className="text-sm text-gray-500">{dino.diet}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal CALL */}
            {selectedDino && (
                <DinoModal
                    dino={selectedDino}
                    onClose={() => setSelectedDino(null)}
                />
            )}
        </>
    );
}
