import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGripHorizontal } from 'react-icons/fa';

interface Dino {
  _id: string;
  name: string;
  period: string;
  type: string;
  diet: string;
  description: string;
  image: string;
}

interface Props {
  dino: Dino | null;
  onClose: () => void;
  children: React.ReactNode; 
}

const DinoModal: React.FC<Props> = ({ dino, onClose, children }) => {
  if (!dino) return null;

  const dragRef = useRef(null); 
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // clicking outside closes
      >
        <motion.div
          key="modal"
          ref={dragRef}
          initial={{ scale: 0.9, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <motion.div
            drag // Enable dragging
            dragConstraints={dragRef} // Constrain dragging to the container bounds
            dragElastic={0.2}
            // Drag handle styling for visual feedback
            className="cursor-grab active:cursor-grabbing bg-gray-800 rounded-2xl shadow-2xl w-full h-full"
            style={{
                x: '0%', // Start position for dragging
                y: '0%',
            }}
            
          >
            {/* Explicit Drag Handle Icon at the top for visibility */}
            <div className="flex justify-center pt-2 text-gray-500 hover:text-gray-300 transition duration-150">
                <FaGripHorizontal className="w-8 h-1.5 opacity-80" />
            </div>

            {children}
          

          {/* THE BUTTON IS MIGRATED IN DINOCARDS.TSX
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold"
          >
            ×
          </button>
            // THIS IS OFFICIALLY REMOVED, BUT KEPT IN CASE OF COMPLICATIONS
            <img
              src={dino.image}
              alt={dino.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{dino.name}</h2>
            <p className="text-gray-300 mb-2">{dino.diet} | {dino.type}</p>
            <p className="text-gray-200">{dino.description}</p>
            */}
            
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DinoModal;
