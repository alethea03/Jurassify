import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCog, FaSignOutAlt, FaTimes, FaStickyNote, FaTrashAlt } from 'react-icons/fa';
import { useUser, UserFavorite } from '@/hooks/useUser'; // Must import UserFavorite type

// --- CONTENT VIEWS: Note Editor ---

// Sub-component for displaying/editing a single note
const NoteEditor: React.FC<{ favorite: UserFavorite, setView: (view: string) => void }> = ({ favorite, setView }) => {
    const { updateNote, removeFavorite } = useUser();
    const [note, setNote] = useState(favorite.note);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        updateNote(favorite.dinoId, note);
        setIsEditing(false);
    };
    
    const handleRemove = () => {
        if(confirm(`Are you sure you want to remove ${favorite.dinoName} from your favorites?`)) {
            removeFavorite(favorite.dinoId);
            setView('Favorites'); // Go back to the list
        }
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-inner">
            <h4 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2 mb-4">Edit Note for {favorite.dinoName}</h4>
            
            <div className="mb-4">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    readOnly={!isEditing}
                    rows={5}
                    className={`w-full p-2 rounded text-sm bg-gray-900 border text-white ${isEditing ? 'border-green-500' : 'border-gray-700'}`}
                />
            </div>
            
            <div className="flex justify-between gap-2">
                <button 
                    onClick={handleRemove} 
                    className="p-2 text-sm bg-red-600 hover:bg-red-700 rounded transition-colors text-white flex items-center"
                >
                    <FaTrashAlt className="inline mr-1" /> Remove
                </button>
                
                {isEditing ? (
                    <>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            className="p-2 text-sm bg-slate-600 hover:bg-slate-700 rounded transition-colors text-white"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave} 
                            className="p-2 text-sm bg-green-600 hover:bg-green-700 rounded transition-colors text-white flex items-center"
                        >
                            <FaStickyNote className="inline mr-1" /> Save
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="p-2 text-sm bg-yellow-600 hover:bg-yellow-700 rounded transition-colors text-white flex items-center"
                    >
                        <FaCog className="inline mr-1" /> Edit Note
                    </button>
                )}
            </div>
        </div>
    );
}

// --- CONTENT VIEWS: Favorites List ---

const FavoritesView: React.FC<{ favorites: UserFavorite[] }> = ({ favorites }) => {
    // State to hold which favorite is currently being edited
    const [selectedFavorite, setSelectedFavorite] = useState<UserFavorite | null>(null);

    if (selectedFavorite) {
        // If a favorite is selected, render the editor
        return <NoteEditor 
            favorite={selectedFavorite} 
            setView={() => setSelectedFavorite(null)} // Function to return to the list
        />;
    }

    return (
        <div className="space-y-3">
            <h4 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">Your Saved Creatures</h4>
            {favorites.length === 0 ? (
                <p className="text-slate-400 italic p-4 text-center">You have no favorites yet. Explore the map!</p>
            ) : (
                favorites.map(fav => (
                    <div 
                        key={fav.dinoId}
                        className="flex justify-between items-center p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => setSelectedFavorite(fav)}
                    >
                        <span className="text-white font-medium">{fav.dinoName}</span>
                        <button className="text-sm text-green-400 hover:text-green-300">
                            {fav.note ? 'Edit Note' : 'Add Note'} <FaStickyNote className="inline ml-1" />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};


// --- MAIN SIDEBAR COMPONENT (The Pop-up) ---

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    setViewMode: (mode: 'public' | 'dashboard') => void;
    onLogout?: () => void;
}

export default function DashboardSidebar({ isOpen, onClose, setViewMode, onLogout }: DashboardSidebarProps) {
    const { user, logout, favorites } = useUser();
    
    // State to manage the active content view (Favorites, Settings)
    const [activeView, setActiveView] = useState('Favorites');

    const renderContent = () => {
        switch (activeView) {
            case 'Favorites':
                return <FavoritesView favorites={favorites} />;
            case 'Settings':
                return <p className="p-4 text-slate-300">User settings and profile management coming soon!</p>;
            default:
                return <p className="p-4 text-slate-300">Welcome, {user?.username}.</p>;
        }
    };
    
    // Reset view when sidebar is closed
    React.useEffect(() => {
        if (!isOpen) {
            setActiveView('Favorites');
        }
    }, [isOpen]);

    // Handle logout action
    const handleLogout = () => {
        // Prefer parent-provided handler if available (keeps parent state in sync)
        if (onLogout) {
            onLogout();
        } else {
            logout(); // Fallback to hook logout
        }
        onClose(); // Explicitly closes the sidebar overlay
        setViewMode('public');
        // The Home.tsx useEffect automatically switches the viewMode back to 'public'
    }
    

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    // Full-screen semi-transparent overlay
                    className="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* The Sidebar Panel */}
                    <motion.div
                        className="fixed top-0 left-0 h-full w-full max-w-sm bg-gray-900 shadow-2xl flex"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sidebar Menu (Fixed Width) */}
                        <div className="w-20 bg-gray-950 flex flex-col justify-between border-r border-gray-700">
                            
                            <nav className="p-2 space-y-2">
                                {/* Menu Items */}
                                {[{ name: 'Favorites', icon: FaHeart }, { name: 'Settings', icon: FaCog }].map(({ name, icon: Icon }) => (
                                    <button
                                        key={name}
                                        onClick={() => setActiveView(name)}
                                        className={`w-full p-2 rounded-lg transition-colors text-center ${activeView === name ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-gray-800 hover:text-white'}`}
                                    >
                                        <Icon className="w-6 h-6 mx-auto" />
                                        <span className="text-xs">{name}</span>
                                    </button>
                                ))}
                            </nav>
                            
                            <div className="p-2">
                                <button
                                    onClick={handleLogout} 
                                    className="w-full p-2 rounded-lg text-red-400 hover:bg-red-900 transition-colors"
                                >
                                    <FaSignOutAlt className="w-6 h-6 mx-auto" />
                                    <span className="text-xs">Logout</span>
                                </button>
                            </div>
                        </div>

                        {/* Content Area (Displays user data) */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="flex justify-between items-start mb-6 border-b border-gray-700 pb-3">
                                <h3 className="text-3xl font-extrabold text-white">
                                    {activeView}
                                </h3>
                                <button 
                                    onClick={onClose}
                                    className="text-slate-400 hover:text-white transition-colors text-2xl"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            
                            <div className="py-2">
                                {renderContent()}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}