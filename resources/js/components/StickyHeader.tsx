import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiDinosaurBones } from "react-icons/gi";

interface StickyHeaderProps {
    onMainAction: () => void; // For Go to Hub
    onLogoClick: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
    onMainAction,
    onLogoClick
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [welcomeName, setWelcomeName] = useState('');
    const [usernameInput, setUsernameInput] = useState(''); // for register
    const [usernameLogin, setUsernameLogin] = useState(''); // for login
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUpClick = () => {
        if (!isLoggedIn) setShowAuthModal(true);
        else onMainAction();
    };

    const handleMockAuth = () => {
        if (!password || (isRegistering && !usernameInput) || (!isRegistering && !usernameLogin)) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        let mockName: string;

        if (isRegistering) {
            mockName = usernameInput;
        } else {
            mockName = usernameLogin;
        }

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
        setShowWelcomeModal(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-xl p-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        onClick={onLogoClick}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <GiDinosaurBones className="w-10 h-10 text-green-500" />
                        <span className="text-2xl font-black text-white tracking-wider">Jurassify</span>
                    </motion.div>

                    <div className="flex gap-3">
                        {isLoggedIn ? (
                            <>
                                <motion.button
                                    onClick={onMainAction}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-full font-bold text-sm shadow-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors duration-300"
                                >
                                    Go to Hub
                                </motion.button>
                                <motion.button
                                    onClick={handleLogout}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-full font-bold text-sm shadow-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                                >
                                    Logout
                                </motion.button>
                            </>
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
                            className="bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw] text-white shadow-2xl"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">
                                {isRegistering ? 'Register' : 'Log In'} to Jurassify
                            </h3>
                            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

                            <div className="flex flex-col gap-3 mb-4">
                                {isRegistering && (
                                    <input
                                        type="text"
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        placeholder="Username"
                                        className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-white"
                                    />
                                )}
                                {!isRegistering && (
                                    <input
                                        type="text"
                                        value={usernameLogin}
                                        onChange={(e) => setUsernameLogin(e.target.value)}
                                        placeholder="Username"
                                        className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-white"
                                    />
                                )}
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 text-white"
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
                            className="bg-gray-800 rounded-xl p-8 w-[600px] max-w-[95vw] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                                    Welcome, traveler {welcomeName}!
                                </h2>
                                <p className="text-gray-300 mb-6 text-lg">
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
