import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiDinosaurBones } from 'react-icons/gi';
import { FaStar, FaStickyNote, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '@/hooks/useUser';
import AuthModal from '@/components/AuthModal';

interface StickyHeaderProps {
    onMainAction: () => void;
    onLogoClick: () => void;
    onOpenDashboard?: (view: 'Favorites' | 'Notes' | 'Settings') => void;
    isLoggedIn?: boolean;
    username?: string;
}

interface NavItem {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
    onMainAction,
    onLogoClick,
    onOpenDashboard,
    isLoggedIn: propIsLoggedIn,
    username: propUsername,
}) => {
    const { user, isLoggedIn: hookIsLoggedIn, logout } = useUser();

    // Prefer Laravel auth if passed, otherwise fallback to hook auth
    const isLoggedIn = propIsLoggedIn ?? hookIsLoggedIn;
    const username = propUsername ?? user?.name ?? '';

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [welcomeName, setWelcomeName] = useState('');

    const handleSignUpClick = () => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
        } else {
            if (onOpenDashboard) onOpenDashboard('Favorites');
            else if ((window as any).openDashboard) (window as any).openDashboard('Favorites');
        }
    };

    const handleLoginSuccess = (name: string) => {
        setShowAuthModal(false);
        setWelcomeName(name);
        setShowWelcomeModal(true);
    };

    const handleLogout = () => {
        logout();
        setShowWelcomeModal(false);
    };

    const navItems: NavItem[] = [
        {
            title: 'Favorites',
            icon: <FaStar />,
            onClick: () => onOpenDashboard?.('Favorites'),
        },
        {
            title: 'Notes',
            icon: <FaStickyNote />,
            onClick: () => onOpenDashboard?.('Notes'),
        },
        {
            title: 'Settings',
            icon: <FaUserCog />,
            onClick: () => onOpenDashboard?.('Settings'),
        },
        {
            title: 'Logout',
            icon: <FaSignOutAlt />,
            onClick: handleLogout,
        },
    ];

    return (
        <>
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.div
                        onClick={onLogoClick}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <GiDinosaurBones className="text-green-500 w-9 h-9" />
                        <span className="text-2xl font-black tracking-wide text-white">
                            Jurassify
                        </span>
                    </motion.div>

                    <div>
                        {isLoggedIn ? (
                            <motion.button
                                onClick={() => onOpenDashboard?.('Favorites')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 rounded-full bg-yellow-500 text-black font-bold"
                            >
                                Menu
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={handleSignUpClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 rounded-full bg-green-500 text-white font-bold"
                            >
                                Sign Up
                            </motion.button>
                        )}
                    </div>
                </div>
            </header>

            {/* AUTH MODAL */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            {/* WELCOME MODAL */}
            <AnimatePresence>
                {showWelcomeModal && (
                    <motion.div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowWelcomeModal(false)}
                    >
                        <motion.div
                            className="bg-gray-900 text-white rounded-xl p-8 max-w-md w-full"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                                Welcome, {welcomeName}!
                            </h2>
                            <p className="mb-6 text-gray-300">
                                Your adventure in Jurassify begins now.
                            </p>
                            <button
                                onClick={() => setShowWelcomeModal(false)}
                                className="w-full py-3 bg-green-500 rounded-full font-bold"
                            >
                                Continue
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default StickyHeader;

