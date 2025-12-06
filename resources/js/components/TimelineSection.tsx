import React, { useEffect, useState } from "react";
import TimelineMap from "./TimelineMap";
import { motion } from "framer-motion";
import DinoCard from "./DinoCards"; 

interface Dino {
  _id: string;
  name: string;
  period: string;
  type: string;
  diet: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

interface TimelineSectionProps {
    creatures: Dino[]; // Assuming 'creatures' is the list of all dinos passed from Home.tsx
    showPortal: boolean;
    onClosePortal: () => void;
}


const TimelineSection: React.FC<TimelineSectionProps> = ({ creatures, showPortal, onClosePortal }) => {
  const [dinos, setDinos] = useState<Dino[]>([]);
  const [selectedDino, setSelectedDino] = useState<Dino | null>(null);
  const [selectedEra, setSelectedEra] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const eras = ["All", "Triassic", "Jurassic", "Cretaceous"];
  const categories = ["ALL", "DINOSAURS", "PTEROSAURS", "CROCODILIANS", "TURTLES AND TORTOISES"];
  const placeholderImage = "/images/dinos/placeholder.jpg";

  useEffect(() => {
    fetch("/data/dinosaurs.json")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((d: any) => {
          // Normalize image paths
          let filename =
            d.id <= 30
              ? `${d.id === 1 ? "trex" : d.name.toLowerCase().replace(/\s+/g, "")}.jpg`
              : d.image;

          if (!filename.startsWith("/")) filename = `/images/dinos/${filename}`;

          return {
            _id: d.id.toString(),
            name: d.name,
            period: d.period,
            type: d.type,
            diet: d.diet,
            description: d.description,
            image: filename || placeholderImage,
            lat: d.lat || 0,
            lng: d.lng || 0,
          };
        });
        setDinos(mapped);
      })
      .catch((err) => console.error("Failed to load dinos:", err));
  }, []);

  const mapTypeToCategory = (type: string) => {
    if (!type) return "DINOSAURS";
    const t = type.toLowerCase();
    if (t.includes("pterosaur")) return "PTEROSAURS";
    if (t.includes("croc")) return "CROCODILIANS";
    if (t.includes("turtle") || t.includes("tortoise")) return "TURTLES AND TORTOISES";
    return "DINOSAURS";
  };

  const filteredDinos = dinos.filter((dino) => {
    const dinoCategory = mapTypeToCategory(dino.type);
    const dinoEra = (dino.period || "").toLowerCase();

    const matchCategory =
      selectedCategory.toUpperCase() === "ALL" || dinoCategory === selectedCategory.toUpperCase();
    const matchEra = selectedEra.toLowerCase() === "all" || dinoEra.includes(selectedEra.toLowerCase());

    return matchCategory && matchEra;
  });

  return (
    <section className="flex min-h-screen bg-gray-900 text-white p-6 gap-x-6" id="timeline">
      <aside className="w-1/4 space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Filter by Era</h3>
          <div className="flex flex-col gap-3">
            {eras.map((era) => (
              <motion.button
                key={era}
                onClick={() => setSelectedEra(era)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`py-3 px-6 rounded-full font-semibold text-white shadow-md
                  ${
                    selectedEra === era
                      ? "bg-gradient-to-r from-green-400 to-green-600 shadow-lg"
                      : "bg-gray-700 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:shadow-xl"
                  }`}
              >
                {era}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Filter by Category</h3>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`py-3 px-6 rounded-full font-semibold text-white shadow-md
                  ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg"
                      : "bg-gray-700 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:shadow-xl"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 relative">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border-4 border-gradient-to-r from-green-400 to-blue-500 overflow-hidden h-[80vh] relative z-0">
          <TimelineMap dinos={filteredDinos} onMarkerClick={(dino) => setSelectedDino(dino)} />
        </div>

        {selectedDino && (
          <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-11/12 md:w-1/3"
                    >
                      <DinoCard 
                            dino={selectedDino} 
                            onClose={() => setSelectedDino(null)} // Passes the function to close the card
                        />
                    </motion.div>
        )}
      </div>
    </section>
  );
};

export default TimelineSection;
