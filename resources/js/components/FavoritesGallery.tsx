import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser'; // Adjust path
import { FaHeart, FaStickyNote, FaTrashAlt } from 'react-icons/fa';


const FavoritesGallery: React.FC = () => {
    const { favorites, updateNote, removeFavorite } = useUser();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentNote, setCurrentNote] = useState('');

    const handleEditClick = (favId: string, note: string) => {
        setEditingId(favId);
        setCurrentNote(note);
    };

    const handleSave = (favId: string) => {
        updateNote(favId, currentNote);
        setEditingId(null);
    };

    if (favorites.length === 0) {
        return (
            <div className="text-center p-12 bg-gray-900/50 rounded-lg">
                <FaHeart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">No Favorites Found</h3>
                <p className="text-slate-400 mt-2">Start exploring the Timeline Map to save your favorite creatures!</p>
            </div>
        );
    }

    return (
        <section id="favorites" className="py-12 px-6">
            <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2">
                <FaHeart className="inline text-red-500 mr-2" /> My Saved Creatures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav) => (
                    <div 
                        key={fav.dinoId}
                        className="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700 hover:border-green-500 transition-shadow duration-200"
                    >
                        <h3 className="text-xl font-bold text-green-400 mb-2">{fav.dinoName}</h3>
                        
                        {/* Mock Image Placeholder */}
                        <div className="h-32 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-slate-400 italic text-sm">
                            [Image Placeholder for {fav.dinoName}]
                        </div>

                        <div className="space-y-3">
                            {/* Note Editor/Display */}
                            {editingId === fav.dinoId ? (
                                <>
                                    <textarea
                                        value={currentNote}
                                        onChange={(e) => setCurrentNote(e.target.value)}
                                        rows={3}
                                        className="w-full p-2 rounded text-sm bg-gray-900 border border-green-500 text-white"
                                    />
                                    <button 
                                        onClick={() => handleSave(fav.dinoId)} 
                                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition-colors"
                                    >
                                        <FaStickyNote className="inline mr-1" /> Save Note
                                    </button>
                                </>
                            ) : (
                                <p className="text-sm text-slate-300 italic border-l-4 border-slate-600 pl-3">
                                    "{fav.note || 'No notes yet.'}"
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex justify-between pt-2 border-t border-gray-700 mt-3">
                                <button 
                                    onClick={() => handleEditClick(fav.dinoId, fav.note)} 
                                    disabled={editingId === fav.dinoId}
                                    className="text-sm text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                                >
                                    {editingId === fav.dinoId ? 'Editing...' : 'Edit Note'}
                                </button>
                                <button 
                                    onClick={() => removeFavorite(fav.dinoId)} 
                                    className="text-sm text-red-500 hover:text-red-400"
                                >
                                    <FaTrashAlt className="inline mr-1" /> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FavoritesGallery;