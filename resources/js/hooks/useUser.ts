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

// Helper to get registered users from localStorage
const getRegisteredUsers = (): Record<string, { password: string; name: string; email: string }> => {
    return getInitialState('jurassifyRegisteredUsers', {});
};

// Helper to save registered users to localStorage
const saveRegisteredUsers = (users: Record<string, { password: string; name: string; email: string }>) => {
    localStorage.setItem('jurassifyRegisteredUsers', JSON.stringify(users));
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


    // 3. AUTHENTICATION FUNCTIONS (Register & Login)
    const register = useCallback((username: string, password: string, name?: string) => {
        const registeredUsers = getRegisteredUsers();

        // Basic validation: alphanumeric, dashes/underscores, 3-30 chars
        const usernameValid = /^[a-zA-Z0-9_-]{3,30}$/.test(username);
        if (!usernameValid) {
            console.warn('Invalid username format');
            return false;
        }

        // Password minimum length
        if (!password || password.length < 6) {
            console.warn('Password too short');
            return false;
        }

        // Check if username already exists
        if (registeredUsers[username]) {
            console.warn('Username already registered');
            return false;
        }

        // Register new user
        registeredUsers[username] = {
            password,
            name: name || username,
            email: `${username}@jurassify.com`,
        };
        saveRegisteredUsers(registeredUsers);
        console.log('User registered successfully:', username);
        return true;
    }, []);
    
    const login = useCallback((username: string, password: string) => {
        const registeredUsers = getRegisteredUsers();
        const user = registeredUsers[username];

        // Basic validation
        const usernameValid = /^[a-zA-Z0-9_-]{3,30}$/.test(username);
        if (!usernameValid) {
            console.warn('Invalid username format');
            return false;
        }
        if (!password || password.length < 3) {
            console.warn('Password too short');
            return false;
        }

        // Check if user exists and password matches
        if (!user || user.password !== password) {
            console.warn('Invalid username or password');
            return false;
        }

        // Set logged-in user
        setUser({
            id: Math.random(),
            name: user.name,
            email: user.email,
            username: username,
        });
        console.log('Login successful:', username);
        return true;
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
        register,
        login,
        logout,
    }), [
        user, isLoggedIn, favorites, 
        isDinoFavorited, toggleFavorite, addOrUpdateNote, 
        updateNote, removeFavorite, register, login, logout
    ]);
};