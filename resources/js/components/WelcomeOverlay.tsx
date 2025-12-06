import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeOverlayProps {
    username: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function WelcomeOverlay({ username, isOpen, onClose }: WelcomeOverlayProps) {
    
    // Auto-close the overlay after 3 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 3 seconds display time

            return () => clearTimeout(timer); // Cleanup timer on unmount/close
        }
    }, [isOpen, onClose]);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    // Full-screen transparent container
                    className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        // The actual welcome box
                        className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center border-4 border-green-500 transform scale-105 pointer-events-auto"
                        initial={{ y: -50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <h2 className="text-4xl font-extrabold text-green-400 mb-2">
                            Welcome Back, {username}!
                        </h2>
                        <p className="text-xl text-slate-200">
                            Accessing Time Traveler Hub...
                        </p>
                        <p className="text-sm text-slate-400 mt-4 italic">
                            (This message will disappear shortly)
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}