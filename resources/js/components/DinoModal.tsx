import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
}

const DinoModal: React.FC<Props> = ({ dino, onClose }) => {
  if (!dino) return null;

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
          initial={{ scale: 0.9, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold"
          >
            ×
          </button>

          <img
            src={dino.image}
            alt={dino.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{dino.name}</h2>
          <p className="text-gray-300 mb-2">{dino.diet} | {dino.type}</p>
          <p className="text-gray-200">{dino.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DinoModal;
