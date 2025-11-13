import React from 'react';
import { Hourglass, Orbit, User, Star, Notebook, Microscope, Globe2, Moon } from "lucide-react"; // ✅ imported icons

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const featureItems: Feature[] = [
  { 
    title: "Interactive Geological Timeline", 
    description: "An engaging, scrollable timeline that dynamically highlights the Triassic, Jurassic, and Cretaceous periods, transitioning visuals as the user scrolls.",
    icon: <Hourglass className="text-amber-400 drop-shadow-[0_2px_6px_rgba(255,200,0,0.8)] transform scale-110" />
  },
  { 
    title: "3D Creature Modeling", 
    description: "Highly detailed, scientifically accurate 3D models of select creatures—rotate, zoom, and explore in full prehistoric realism.",
    icon: <Orbit className="text-cyan-400 drop-shadow-[0_2px_8px_rgba(0,255,255,0.7)] transform scale-110" />
  },
  { 
    title: "Personal Research Dashboard", 
    description: "A private, user-only area for managing saved dinosaurs, favorites, and personal notes.",
    icon: <User className="text-lime-400 drop-shadow-[0_2px_8px_rgba(50,255,100,0.7)] transform scale-110" />
  },
  { 
    title: "Creature Favorites List", 
    description: "Save your favorite species and revisit their pages easily using quick-access bookmarks.",
    icon: <Star className="text-yellow-400 drop-shadow-[0_2px_8px_rgba(255,255,0,0.7)] transform scale-110" />
  },
  { 
    title: "Private Research Notes", 
    description: "Take detailed notes about each dinosaur. Edit, save, and keep them privately in your account.",
    icon: <Notebook className="text-pink-400 drop-shadow-[0_2px_8px_rgba(255,100,150,0.7)] transform scale-110" />
  },
  { 
    title: "Taxonomy and Filter Engine", 
    description: "Easily filter dinosaurs by era, diet, size, or category with the smart sorting system.",
    icon: <Microscope className="text-purple-400 drop-shadow-[0_2px_8px_rgba(200,150,255,0.7)] transform scale-110" />
  },
  { 
    title: "Global Discovery Map", 
    description: "An interactive world map showing real fossil discovery sites and excavation data.",
    icon: <Globe2 className="text-green-400 drop-shadow-[0_2px_8px_rgba(50,255,100,0.7)] transform scale-110" />
  },
  { 
    title: "High-Contrast Dark Mode", 
    description: "Switch between light and dark themes for optimal viewing in different environments.",
    icon: <Moon className="text-blue-400 drop-shadow-[0_2px_8px_rgba(100,200,255,0.7)] transform scale-110" />
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features-section" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-extrabold mb-8 tracking-tight text-amber-400 drop-shadow-[0_3px_10px_rgba(255,200,0,0.6)]">
          Why Choose The Eon?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((item, index) => (
            <div 
              key={index}
              className="p-8 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700 hover:border-amber-400 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-700 rounded-full shadow-inner transform hover:rotate-6 transition duration-300">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-amber-300 mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
