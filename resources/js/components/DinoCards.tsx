import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaPencilAlt, FaGripHorizontal, FaTimes, FaAngleDown, FaAngleUp, FaCheck, FaBan } from 'react-icons/fa';
import { useUser } from '@/hooks/useUser';

interface Dino {
    _id: string;
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
    isLoggedIn: boolean;
    favorites?: { dinoId: string; note: string }[];
    addOrUpdateNote?: (fav: { dinoId: string; dinoName: string; image: string; note: string }) => void;
}

const CHAR_LIMIT = 200;

const DinoCards: React.FC<DinoCardProps> = ({ dino, onClose, isLoggedIn, favorites, addOrUpdateNote }) => {
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [currentNote, setCurrentNote] = useState("");

    const { isLoggedIn: isLoggedInHook, toggleFavorite: toggleFavoriteHook, addOrUpdateNote: addOrUpdateNoteHook, isDinoFavorited } = useUser();
    // Use hook's auth state which updates in real-time after login; fall back to prop if hook undefined
    const isLoggedInEffective = isLoggedInHook ?? isLoggedIn;
    const toggleFavFn = toggleFavoriteHook;
    const updateNoteFn = addOrUpdateNoteHook || addOrUpdateNote;

    const isFavorited = isDinoFavorited ? isDinoFavorited(dino._id) : (favorites ? favorites.some(f => f.dinoId === dino._id) : false);

    useEffect(() => {
        setCurrentNote("");
    }, [dino]);

    const isLongDescription = dino.description.length > CHAR_LIMIT;
    const shortDescription = dino.description.substring(0, CHAR_LIMIT) + (isLongDescription ? '...' : '');
    const visibleDescription = isExpanded ? dino.description : shortDescription;

    const toggleExpansion = () => setIsExpanded(prev => !prev);
    const handleImageClick = () => setIsImageFullscreen(true);

    const handleToggleFavorite = () => {
        if (!isLoggedInEffective) {
            setShowLoginModal(true);
            return;
        }
        if (toggleFavFn) toggleFavFn(dino._id, dino.name, dino.image);
    };

    const handleToggleNotesEditor = () => {
        if (!isLoggedInEffective) {
            setShowLoginModal(true);
            return;
        }
        setIsEditingNote(prev => !prev);
    };

    const handleSaveNote = () => {
        if (!isLoggedInEffective) return;
        if (updateNoteFn) {
            updateNoteFn({ dinoId: dino._id, dinoName: dino.name, image: dino.image, note: currentNote });
        }
        setIsEditingNote(false);
    };

    useEffect(() => {
        const updateConstraints = () => {
            const padding = 32;
            setConstraints({
                top: -(window.innerHeight - padding - 300),
                bottom: padding,
                left: -(window.innerWidth - padding - 400),
                right: padding,
            });
        };
        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, []);

    return (
        <>
            {/* Draggable Modal */}
            <motion.div
                drag
                dragConstraints={constraints}
                dragElastic={0.2}
                dragMomentum={false}
                dragHandle=".drag-handle"
                initial={{ x: 0, y: 0 }}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4 text-white w-full max-h-[90vh] overflow-auto"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
                <AnimatePresence>
                    <div className="flex justify-center -mt-4 mb-2 text-gray-500 hover:text-gray-300 transition duration-150 drag-handle cursor-grab active:cursor-grabbing">
                        <FaGripHorizontal className="w-8 h-1.5 opacity-80" />
                    </div>
                </AnimatePresence>

                <div className="flex justify-between items-start pointer-events-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold transition-transform hover:scale-110 shadow-lg"
                        aria-label="Close card"
                    >
                        <FaTimes />
                    </button>
                    <h3 className="text-3xl font-extrabold text-green-400">{dino.name}</h3>
                </div>

                {/* Dino Image */}
                <div className="relative overflow-hidden rounded-xl pointer-events-auto">
                    <img
                        src={dino.image}
                        alt={dino.name}
                        className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-lg cursor-pointer"
                        onClick={handleImageClick}
                        onError={(e) => { const target = e.target as HTMLImageElement; target.src = "https://placehold.co/400x400/065F46/FFFFFF?text=Image+Unavailable"; }}
                    />
                </div>

                {/* Description */}
                <div className="space-y-4 mt-2 pointer-events-auto">
                    <div className="text-sm text-gray-300">
                        <p className="leading-relaxed whitespace-pre-wrap">{visibleDescription}</p>
                        {isLongDescription && (
                            <motion.button
                                type="button"
                                onClick={toggleExpansion}
                                whileHover={{ opacity: 0.8 }}
                                className="mt-2 text-green-400 text-sm font-semibold flex items-center space-x-1 transition-colors pointer-events-auto"
                            >
                                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                                {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                            </motion.button>
                        )}
                    </div>

                    {/* Notes Editor */}
                    <AnimatePresence>
                        {isEditingNote && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 bg-gray-700/50 rounded-lg space-y-2 overflow-hidden pointer-events-auto"
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
                                        type="button"
                                        onClick={() => setIsEditingNote(false)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-1 px-3 py-1 bg-red-700 text-white rounded-full text-xs hover:bg-red-800 transition"
                                    >
                                        <FaBan /> Cancel
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={handleSaveNote}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-1 px-3 py-1 bg-yellow-600 text-black rounded-full text-xs hover:bg-yellow-700 transition"
                                    >
                                        <FaCheck /> Save Note
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {currentNote && !isEditingNote && (
                        <blockquote className="text-xs italic text-yellow-400 border-l-4 border-yellow-400 pl-3 pt-2 pointer-events-auto">
                            "{currentNote}"
                        </blockquote>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-4 pt-2 pointer-events-auto">
                        <motion.button
                            type="button"
                            onClick={handleToggleFavorite}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors 
                                ${isFavorited 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-green-700 text-white hover:bg-green-600'}`}
                        >
                            {isFavorited ? <FaHeart /> : <FaRegHeart />}
                            {isFavorited ? 'Remove Favorite' : 'Add to Favorites'}
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={handleToggleNotesEditor}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-yellow-600 text-black hover:bg-yellow-700 transition-colors"
                        >
                            <FaPencilAlt />
                            {isEditingNote ? 'Close Editor' : currentNote ? 'Edit Note' : 'Add Note'}
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Fullscreen Image */}
            <AnimatePresence>
                {isImageFullscreen && (
                    <motion.div
                        key="fullscreen-image-backdrop"
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageFullscreen(false)}
                    >
                        <motion.div
                            key="fullscreen-image"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative max-w-full max-h-full pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={dino.image}
                                alt={dino.name}
                                className="object-contain max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl"
                                onError={(e) => { const target = e.target as HTMLImageElement; target.src = "https://placehold.co/800x600/065F46/FFFFFF?text=Image+Unavailable"; }}
                            />
                            <button
                                type="button"
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

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && !isLoggedInEffective && (
                    <motion.div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLoginModal(false)}
                    >
                        <motion.div
                            className="bg-gray-800 rounded-xl p-6 w-80 max-w-[90vw] text-white shadow-2xl"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">Login Required</h3>
                            <p className="text-gray-300 mb-6">Please log in to manage your favorites or notes.</p>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(false)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DinoCards;
