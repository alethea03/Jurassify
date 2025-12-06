import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for the note editor
import { FaHeart, FaRegHeart, FaPencilAlt, FaGripHorizontal, FaTimes, FaAngleDown, FaAngleUp, FaCheck, FaBan } from 'react-icons/fa';
import { useUser, UserFavorite } from '@/hooks/useUser'; 

// Strongly type the dino objects so TypeScript knows their shape
interface Dino {
    _id: string;
   // id?: string | number; // some APIs use `id` instead of `_id`
    name: string;
    image: string;
    period: string;
    diet: string;
    description: string;
    type: string;
}

interface DinoCardProps {
    dino: Dino;
    onClose: () => void;
}
const CHAR_LIMIT = 200;

const DinoCard: React.FC<DinoCardProps> = ({ dino, onClose }) => {
    const { isLoggedIn, toggleFavorite, addOrUpdateNote, isDinoFavorited, favorites } = useUser();
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
    //expand the short description
    const [isExpanded, setIsExpanded] = useState(false);
    // State for note editing UI visibility
    const [isEditingNote, setIsEditingNote] = useState(false);
    // Check if the current dino is favorited
    const isFavorited = isDinoFavorited(dino._id);
    
    // Find any existing note for this dino
    const existingFavorite = favorites.find(fav => fav.dinoId === dino._id);
    const existingNote = existingFavorite?.note || '';
    const [currentNote, setCurrentNote] = useState(existingNote);

    const isLongDescription = dino.description.length > CHAR_LIMIT;
    const shortDescription = dino.description.substring(0, CHAR_LIMIT) + (isLongDescription ? '...' : '');
    const visibleDescription = isExpanded ? dino.description : shortDescription;

    //toggle for description expansion
    const toggleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    {/* HANDLERS */}

    const handleImageClick = () => {
        setIsImageFullscreen(true);
    };

    const handleLoginCheck = (action: string) => {
        console.warn(`[Login Required] User attempted to ${action}. Please implement a custom modal for login prompt.`);
        // Note: The UI relies on the button being disabled if not logged in.
    };

    // Handler for the simple "Add/Remove from Favorites" button
    const handleToggleFavorite = () => {
        if (!isLoggedIn) {
            alert("Please log in to manage your favorites.");
            return;
        }
        
        // Pass the required properties to the toggle function
        toggleFavorite(dino._id, dino.name, dino.image);
    };

    // Handler to show/hide the note editor (replaces initial prompt check)
    const handleToggleNotesEditor = () => {
        if (!isLoggedIn) {
            handleLoginCheck("add notes");
            return;
        }
        // Sync the state with the latest note when opening
        setCurrentNote(existingNote);
        setIsEditingNote(p => !p);
    };

    // Handler for saving the note (replaces prompt() input logic)
    const handleSaveNote = () => {
        if (!isLoggedIn) return; // Should be guarded by button disabled state

        const favoriteWithNote: UserFavorite = {
            dinoId: dino._id,
            dinoName: dino.name,
            image: dino.image,
            note: currentNote.trim(), // Save the trimmed note
        };
        
        addOrUpdateNote(favoriteWithNote); 
        
        // Close the editor and provide feedback
        setIsEditingNote(false);
        console.log(`Note saved and ${dino.name} added/updated in gallery!`);
    };

    const dragRef = useRef(null);

    useEffect(() => {
    const updateConstraints = () => {
      const padding = 32; // keep some space from edges
      setConstraints({
        top: -(window.innerHeight - padding - 300),   // 300 ≈ card height; adjust
        bottom: padding,
        left: -(window.innerWidth - padding - 400),   // 400 ≈ card width; adjust
        right: padding,
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

return (
    <>
    {/* 1. DRAGGABLE CARD CONTENT (Main Modal Body) */}
     <motion.div
            drag // Enable dragging
            dragConstraints={constraints} // Use the ref passed from the modal for constraints
            dragElastic={0.2}
            dragMomentum={false}
            dragHandle=".drag-handle" // <-- KEY: Only allow dragging from the element with this class
            initial={{ x: 0, y: 0 }} // Start at initial position
            className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4 text-white w-full" 
            onClick={(e) => e.stopPropagation()}
        >
            <AnimatePresence>
                <div 
                    className="flex justify-center -mt-4 mb-2 text-gray-500 hover:text-gray-300 transition duration-150 drag-handle cursor-grab active:cursor-grabbing"
                >
                    <FaGripHorizontal className="w-8 h-1.5 opacity-80" />
                </div>
            </AnimatePresence>
                
            <div className="flex justify-between items-start">
                {/* Close button uses FaTimes for consistency */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold transition-transform hover:scale-110 shadow-lg"
                    aria-label="Close card"
                >
                    <FaTimes />
                </button>
                <h3 className="text-3xl font-extrabold text-green-400">{dino.name}</h3>
            </div>

                    {/* Note: The main close button is now in the parent DinoModal.tsx for better positioning */}
            <div 
                className="relative overflow-hidden rounded-xl"
            >
                <img 
                    src={dino.image} 
                    alt={dino.name} 
                    className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer"
                    onClick={handleImageClick} 
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x192/065F46/FFFFFF?text=Image+Unavailable";
                    }}
                />
                    <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                    <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                </div>
            
            <div className="space-y-4">
                {/* Expansion Logic applied here */}
                <div className="text-sm text-gray-300">
                    <p className="leading-relaxed whitespace-pre-wrap">{visibleDescription}</p>
                    
                    {isLongDescription && (
                        <motion.button
                            onClick={toggleExpansion}
                            whileHover={{ opacity: 0.8 }}
                            className="mt-2 text-green-400 text-sm font-semibold flex items-center space-x-1 transition-colors"
                        >
                            <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                            {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                        </motion.button>
                    )}
                </div>

            {/* Note Editor (New UI to replace prompt()) */}
                <AnimatePresence>
                    
                    {isEditingNote && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 bg-gray-700/50 rounded-lg space-y-2 overflow-hidden"
                        >
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Type your notes here..."
                                rows={3}
                                className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                            />
                            <div className="flex justify-end space-x-2">
                                <motion.button
                                    onClick={() => setIsEditingNote(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-700 text-white rounded-full text-xs hover:bg-red-800 transition"
                                >
                                    <FaBan /> Cancel
                                </motion.button>
                                <motion.button
                                    onClick={handleSaveNote}
                                    disabled={!currentNote.trim()}
                                    whileHover={!currentNote.trim() ? {} : { scale: 1.05 }}
                                    whileTap={!currentNote.trim() ? {} : { scale: 0.95 }}
                                    className="flex items-center gap-1 px-3 py-1 bg-yellow-600 text-black rounded-full text-xs hover:bg-yellow-700 transition disabled:opacity-50"
                                >
                                    <FaCheck /> Save Note
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            
                {/* Display the current note if one exists and not editing */}
                {existingNote && !isEditingNote && (
                    <blockquote className="text-xs italic text-yellow-400 border-l-4 border-yellow-400 pl-3 pt-2">
                        "{existingNote}"
                    </blockquote>
                )}
                
                <div className="flex justify-between gap-4 pt-2">
                    
                    {/* 1. Add/Remove from Favorites Button */}
                    <motion.button
                        onClick={handleToggleFavorite}
                        disabled={!isLoggedIn}
                        whileHover={!isLoggedIn ? {} : { scale: 1.05 }}
                        whileTap={!isLoggedIn ? {} : { scale: 0.95 }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors 
                                    ${isFavorited 
                                        ? 'bg-red-600 text-white hover:bg-red-700' 
                                        : 'bg-green-700 text-white hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-400'}`}
                    >
                        {isFavorited ? <FaHeart /> : <FaRegHeart />}
                        {isFavorited ? 'Remove Favorite' : 'Add to Favorites'}
                    </motion.button>

                    {/* 2. Add Notes Button (Toggle Editor) */}
                    <motion.button
                        onClick={handleToggleNotesEditor}
                        disabled={!isLoggedIn}
                        whileHover={!isLoggedIn ? {} : { scale: 1.05 }}
                        whileTap={!isLoggedIn ? {} : { scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-yellow-600 text-black hover:bg-yellow-700 transition-colors disabled:bg-gray-700 disabled:text-gray-400"
                    >
                        <FaPencilAlt />
                        {isEditingNote ? 'Close Editor' : existingNote ? 'Edit Note' : 'Add Note'}
                    </motion.button>
                </div>
            </div>
            </div>
            </motion.div>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {isImageFullscreen && (
                    <motion.div
                        key="fullscreen-image-backdrop"
                        // Z-index increased to ensure it covers the main modal (z-50 in DinoModal)
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageFullscreen(false)} // clicking outside closes
                    >
                        <motion.div
                            key="fullscreen-image"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative max-w-full max-h-full"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the image
                        >
                            <img 
                                src={dino.image} 
                                alt={dino.name} 
                                className="object-contain max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://placehold.co/800x600/065F46/FFFFFF?text=Image+Unavailable";
                                }}
                            />
                            
                            {/* Close button for the fullscreen view */}
                            <button
                                onClick={() => setIsImageFullscreen(false)}
                                className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold transition-transform hover:scale-110 shadow-lg"
                                aria-label="Close full-screen image"
                            >
                                <FaTimes />
                                
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DinoCard;