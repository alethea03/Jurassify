// resources/js/hooks/useUser.ts

import { useState, useMemo, useEffect, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
export interface User {
    username: string;
    // Added fields from mockInitialUser for completeness
    id: number;
    name: string;
    email: string;
}

// Define the shape of a User Favorite (Creature/Dinosaur)
// The original used dinoName and id: number. We need to use dinoId: string for matching.
export interface UserFavorite {
    dinoId: string; // Changed to string to match dino._id from component logic
    dinoName: string;
    note: string;
    image: string; // Image is required for the new logic
}

// --- PERSISTENCE HELPERS ---
const getInitialState = (key: string, defaultValue: any): any => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
    }
    return defaultValue;
};

// --- MAIN HOOK LOGIC ---

export const useUser = () => {
    // 1. STATE (Initialized from localStorage or default values)
    const [user, setUser] = useState<User | null>(getInitialState('jurassifyUser', null));
    const [favorites, setFavorites] = useState<UserFavorite[]>(getInitialState('jurassifyFavorites', []));

    const isLoggedIn = !!user;

    // 2. PERSISTENCE EFFECT
    useEffect(() => {
        if (user) {
            localStorage.setItem('jurassifyUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('jurassifyUser');
        }
        // Persist favorites every time they change
        localStorage.setItem('jurassifyFavorites', JSON.stringify(favorites));
    }, [user, favorites]);


    // 3. AUTHENTICATION FUNCTIONS (Mock Login)
    const login = useCallback((username: string) => {
        if (username === 'rootuser' || username === 'user1234') {
            setUser({
                id: Math.random(),
                name: username === 'rootuser' ? 'Admin User' : 'Time Traveler',
                email: `${username}@jurassify.com`,
                username: username,
            });return true;
        }
        return false;
    }, []);
    
    const logout = useCallback(() => {
        setUser(null);
    }, []);


    // 4. FAVORITES & NOTES CRUD FUNCTIONS (NEW & MERGED)

    // Check if a dino ID is present in the favorites array
    const isDinoFavorited = useCallback((dinoId: string): boolean => {
        return favorites.some(fav => fav.dinoId === dinoId);
    }, [favorites]);

    // Simple toggle function (for 'Add to Favorites' button)
    const toggleFavorite = useCallback((dinoId: string, dinoName: string, dinoImage: string) => {
        if (!isLoggedIn) return;
        
        setFavorites(prev => {
            if (prev.some(fav => fav.dinoId === dinoId)) {
                // Remove favorite
                return prev.filter(fav => fav.dinoId !== dinoId);
            } else {
                // Add new favorite (with empty note initially)
                const newFavorite: UserFavorite = { 
                    dinoId, 
                    dinoName, 
                    image: dinoImage,
                    note: '', // Default empty note
                };
                return [...prev, newFavorite];
            }
        });
    }, [isLoggedIn]);

    // Function to add or update a note (used by 'Add Notes' button)
    const addOrUpdateNote = useCallback((dinoFavorite: UserFavorite) => {
        if (!isLoggedIn) return;

        setFavorites(prev => {
            const exists = prev.find(fav => fav.dinoId === dinoFavorite.dinoId);
            
            if (exists) {
                // Update note on existing favorite
                return prev.map(fav => 
                    fav.dinoId === dinoFavorite.dinoId ? { ...fav, note: dinoFavorite.note } : fav
                );
            } else {
                // Add new favorite with the note included
                return [...prev, dinoFavorite];
            }
        });
    }, [isLoggedIn]);


    // 5. EXISTING/REQUIRED CRUD (Revised to use dinoId: string)

    // Used to update the note field on an existing favorite (e.g., from the sidebar)
    const updateNote = useCallback((dinoId: string, newNote: string) => {
        setFavorites(favs => favs.map(fav => 
            fav.dinoId === dinoId ? { ...fav, note: newNote } : fav
        ));
    }, []);

    // Used to remove the favorite entirely (e.g., from the sidebar)
    const removeFavorite = useCallback((dinoId: string) => {
        setFavorites(favs => favs.filter(fav => fav.dinoId !== dinoId));
    }, []);

    // 6. RETURN VALUE
    return useMemo(() => ({
        user,
        isLoggedIn,
        favorites,
        // New Functions
        isDinoFavorited,
        toggleFavorite,
        addOrUpdateNote,
        // Existing Functions (Revised)
        updateNote,
        removeFavorite,
        // Auth Functions
        login,
        logout,
    }), [
        user, isLoggedIn, favorites, 
        isDinoFavorited, toggleFavorite, addOrUpdateNote, 
        updateNote, removeFavorite, login, logout
    ]);
};