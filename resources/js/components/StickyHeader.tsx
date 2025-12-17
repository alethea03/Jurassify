import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiDinosaurBones } from "react-icons/gi";
import { FaStar, FaStickyNote, FaUserCog, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

interface StickyHeaderProps {
    onMainAction: () => void;
    onLogoClick: () => void;
}

interface NavItem {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ onMainAction, onLogoClick }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>('user@example.com');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [welcomeName, setWelcomeName] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true); // default dark mode

    // Load theme from localStorage
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle theme correctly using functional state update
    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    const handleSignUpClick = () => {
        if (!isLoggedIn) setShowAuthModal(true);
        else setShowSidebar(true);
    };

    const handleMockAuth = () => {
        if (!password || (isRegistering && !usernameInput) || (!isRegistering && !usernameLogin)) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        const mockName = isRegistering ? usernameInput : usernameLogin;

        setShowAuthModal(false);
        setUsernameInput('');
        setUsernameLogin('');
        setPassword('');
        setErrorMessage('');
        setIsRegistering(false);

        setWelcomeName(mockName);
        setShowWelcomeModal(true);

        setUsername(mockName);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername(undefined);
        setShowSidebar(false);
        setShowWelcomeModal(false);
    };

    const navItems: NavItem[] = [
        { title: 'Favorites', icon: <FaStar />, onClick: () => alert('Favorites clicked') },
        { title: 'Notes', icon: <FaStickyNote />, onClick: () => alert('Notes clicked') },
        { title: 'Profile / Settings', icon: <FaUserCog />, onClick: () => alert('Profile clicked') },
        { title: 'Logout', icon: <FaSignOutAlt />, onClick: handleLogout },
    ];

    return (
        <>
            {/* Sticky Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl p-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        onClick={onLogoClick}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <GiDinosaurBones className="w-10 h-10 text-green-500" />
                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-wider">Jurassify</span>
                    </motion.div>

                    <div className="flex gap-3 items-center">
                        {isLoggedIn ? (
                            <motion.button
                                onClick={() => setShowSidebar(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-full font-bold text-sm shadow-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors duration-300"
                            >
                                Menu
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={handleSignUpClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-full font-bold text-sm shadow-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                            >
                                Sign Up
                            </motion.button>
                        )}
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <AnimatePresence>
                {showSidebar && (
                    <motion.div
                        className="fixed inset-0 z-50 flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black/50"
                            onClick={() => setShowSidebar(false)}
                        />

                        {/* Sidebar panel */}
                        <motion.div
                            className="relative w-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl flex flex-col p-6"
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'tween' }}
                        >
                            {/* User Info */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-3xl font-bold">
                                    {username ? username.charAt(0).toUpperCase() : '?'}
                                </div>
                                <h2 className="mt-2 font-bold text-lg">{username || 'Guest'}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-4 flex-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.title}
                                        onClick={item.onClick}
                                        className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Theme Switch */}
                            <div className="mt-4">
                                <button
                                    onClick={toggleTheme}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {isDarkMode ? <FaSun /> : <FaMoon />}
                                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auth Modal */}
            <AnimatePresence>
                {showAuthModal && (
                    <motion.div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAuthModal(false)}
                    >
                        <motion.div
                            className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 w-96 max-w-[90vw] text-gray-900 dark:text-white shadow-2xl"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-yellow-400 mb-4 dark:text-yellow-500">
                                {isRegistering ? 'Register' : 'Log In'} to Jurassify
                            </h3>
                            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

                            <div className="flex flex-col gap-3 mb-4">
                                {isRegistering ? (
                                    <input
                                        type="text"
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        placeholder="Username"
                                        className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 dark:text-white"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={usernameLogin}
                                        onChange={(e) => setUsernameLogin(e.target.value)}
                                        placeholder="Username"
                                        className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 dark:text-white"
                                    />
                                )}
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleMockAuth}
                                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold"
                                >
                                    {isRegistering ? 'Register' : 'Log In'}
                                </button>
                                <button
                                    onClick={() => setIsRegistering(!isRegistering)}
                                    className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-gray-900 font-semibold"
                                >
                                    {isRegistering ? 'Have an account? Log In' : "Don't have an account? Register"}
                                </button>
                                <button
                                    onClick={() => setShowAuthModal(false)}
                                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Welcome Modal */}
            <AnimatePresence>
                {showWelcomeModal && (
                    <motion.div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowWelcomeModal(false)}
                    >
                        <motion.div
                            className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 w-[600px] max-w-[95vw] text-gray-900 dark:text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4 dark:text-yellow-500">
                                    Welcome, traveler {welcomeName}!
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                                    Your journey into the prehistoric world of Jurassify begins now. 
                                    Explore, discover, and make unforgettable memories!
                                </p>
                                <button
                                    onClick={() => setShowWelcomeModal(false)}
                                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold text-lg"
                                >
                                    Continue
                                </button>
                            </div>
                            <div className="flex-shrink-0">
                                <img 
                                    src="/npc.png" 
                                    alt="NPC" 
                                    className="w-64 h-auto md:w-72 md:h-auto object-contain" 
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default StickyHeader;
