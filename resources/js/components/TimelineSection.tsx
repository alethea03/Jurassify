import React, { useEffect, useState } from "react";
import TimelineMap from "./TimelineMap";
import { motion, AnimatePresence } from "framer-motion";
import DinoCard from "./DinoCards";
import { UserFavorite } from "@/hooks/useUser";

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
  creatures: any[];
  showPortal: boolean;
  onClosePortal: () => void;
  isLoggedIn: boolean;
  username?: string;
  toggleFavorite: (dinoId: string, dinoName: string, dinoImage: string) => void;
  addOrUpdateNote: (dinoFavorite: UserFavorite) => void;
  favorites: UserFavorite[];
  darkMode?: boolean;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  creatures,
  showPortal,
  onClosePortal,
  isLoggedIn,
  username,
  toggleFavorite,
  addOrUpdateNote,
  favorites,
  darkMode: darkModeProp = true,
}) => {
  const [dinos, setDinos] = useState<Dino[]>([]);
  const [selectedDino, setSelectedDino] = useState<Dino | null>(null);
  const [selectedEra, setSelectedEra] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [darkMode, setDarkMode] = useState(darkModeProp);

  // Sync prop with local state
  useEffect(() => {
    setDarkMode(darkModeProp);
  }, [darkModeProp]);

  // Sync with localStorage / global HTML class
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme");
      setDarkMode(theme !== "light");
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const eras = ["All", "Triassic", "Jurassic", "Cretaceous"];
  const categories = ["ALL", "DINOSAURS", "PTEROSAURS", "CROCODILIANS", "TURTLES AND TORTOISES"];
  const placeholderImage = "/images/dinos/placeholder.jpg";

  useEffect(() => {
    fetch("/data/dinosaurs.json")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((d: any) => {
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
    const matchCategory = selectedCategory === "ALL" || dinoCategory === selectedCategory;
    const matchEra = selectedEra.toLowerCase() === "all" || dinoEra.includes(selectedEra.toLowerCase());
    return matchCategory && matchEra;
  });

  // Sidebar dark mode toggle
  const toggleSidebarDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    window.dispatchEvent(new Event("themeChange"));
  };

  return (
    <section
      className={`flex min-h-screen p-6 gap-x-6 transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      id="timeline"
    >
      <aside className="w-1/4 space-y-8 p-4 rounded-2xl transition-colors duration-500 bg-gray-100 dark:bg-gray-800">
        
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Filter by Era</h3>
          <div className="flex flex-col gap-3">
            {eras.map((era) => {
              const isSelected = selectedEra === era;
              const baseClass = "py-3 px-6 rounded-2xl font-bold text-left shadow-sm transition-all";
              const finalClass = isSelected
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white";
              return (
                <motion.button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  whileHover={{ x: 5 }}
                  className={`${baseClass} ${finalClass}`}
                >
                  {era}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Filter by Category</h3>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const baseClass = "py-3 px-6 rounded-2xl font-bold text-left shadow-sm transition-all";
              const finalClass = isSelected
                ? "bg-yellow-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white";
              return (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ x: 5 }}
                  className={`${baseClass} ${finalClass}`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Timeline */}
      <div className="flex-1 relative">
        <div className="rounded-[2rem] shadow-2xl border-4 overflow-hidden h-[85vh] relative z-0 transition-colors duration-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <TimelineMap
            dinos={filteredDinos}
            onMarkerClick={(dino) => setSelectedDino(dino)}
            darkMode={darkMode}
          />
        </div>

        <AnimatePresence>
          {selectedDino && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6"
            >
              <DinoCard
                dino={selectedDino}
                onClose={() => setSelectedDino(null)}
                isLoggedIn={isLoggedIn}
                username={username}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                addOrUpdateNote={addOrUpdateNote}
                darkMode={darkMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TimelineSection;
