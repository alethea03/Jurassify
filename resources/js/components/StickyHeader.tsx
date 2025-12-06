// resources/js/components/StickyHeader.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { GiDinosaurBones } from "react-icons/gi";
import axios from 'axios';

interface StickyHeaderProps {
    isLoggedIn: boolean;
    username: string | undefined;
    onMainAction: () => void; // Handles Sign Up or Go to Hub click
    onLogoClick: () => void; // Optional: Function to scroll to top or main page
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ 
    isLoggedIn, 
    username, 
    onMainAction, 
    onLogoClick 
}) => {
    const handleMockLogin = async () => {
        try {
            const response = await axios.post('/mock-login', {
                email: 'test@example.com' // mock email
            });

            console.log('Success:', response.data);
            alert("Logged in as: " + response.data.user.name);

        } catch (error: any) {
            console.error(error.response?.data);
            alert(error.response?.data?.error || "Login failed");
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-xl p-4 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                {/* Branding / Logo */}
                <motion.div
                    onClick={onLogoClick}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    {/* Placeholder for your logo/icon */}
                    <GiDinosaurBones className="w-10 h-10 text-green-500" />
                    <span className="text-2xl font-black text-white tracking-wider" >Jurassify</span>
                </motion.div>
                
                {/* Sign Up / Go to Hub Button */}
                <motion.button
                    onClick={handleMockLogin}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-colors duration-300
                        ${isLoggedIn
                            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                >
                    {isLoggedIn ? `Go to Hub, ${username?.split(' ')[0]}` : 'Sign Up'}
                </motion.button>
            </div>  
        </header>
    );
};

export default StickyHeader;