import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/hooks/useUser';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (username: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
    const { register, login } = useUser();
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleToggleMode = () => {
        setError('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setIsRegistering(!isRegistering);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!username.trim()) {
            setError('Username is required');
            setLoading(false);
            return;
        }
        // Username must be alphanumeric, dash or underscore, 3-30 chars
        const usernameValid = /^[a-zA-Z0-9_-]{3,30}$/.test(username);
        if (!usernameValid) {
            setError('Username must be 3-30 characters: letters, numbers, - or _');
            setLoading(false);
            return;
        }

        if (!password) {
            setError('Password is required');
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        // Attempt registration
        const success = register(username, password);
        setLoading(false);

        if (success) {
            alert('Registration successful! Please log in.');
            setIsRegistering(false);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setError('Username already exists. Please choose another.');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!username.trim()) {
            setError('Username is required');
            setLoading(false);
            return;
        }
        const usernameValid = /^[a-zA-Z0-9_-]{3,30}$/.test(username);
        if (!usernameValid) {
            setError('Invalid username format');
            setLoading(false);
            return;
        }
        if (!password) {
            setError('Password is required');
            setLoading(false);
            return;
        }
        if (password.length < 3) {
            setError('Password must be at least 3 characters');
            setLoading(false);
            return;
        }

        // Attempt login
        const success = login(username, password);
        setLoading(false);

        if (success) {
            try {
                onLoginSuccess(username);
            } catch (err) {
                console.error('Error during onLoginSuccess handler:', err);
            }
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            onClose();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border-2 border-yellow-500"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-extrabold text-yellow-400 mb-6 text-center">
                            {isRegistering ? 'Register to Jurassify' : 'Log In to Jurassify'}
                        </h2>

                        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                            {/* Username */}
                            <div>
                                <label className="block text-white mb-2 text-sm">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 outline-none transition"
                                    disabled={loading}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-white mb-2 text-sm">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 outline-none transition"
                                    disabled={loading}
                                />
                            </div>

                            {/* Confirm Password (Registration only) */}
                            {isRegistering && (
                                <div>
                                    <label className="block text-white mb-2 text-sm">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 outline-none transition"
                                        disabled={loading}
                                    />
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-900 border border-red-500 rounded-lg text-red-200 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-full transition-colors text-lg"
                            >
                                {loading ? 'Loading...' : isRegistering ? 'Register' : 'Log In'}
                            </motion.button>

                            {/* Toggle Mode Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handleToggleMode}
                                disabled={loading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-semibold py-3 rounded-full transition-colors"
                            >
                                {isRegistering ? 'Have an account? Log In' : "Don't have an account? Register"}
                            </motion.button>

                            {/* Cancel Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-full transition-colors"
                            >
                                Cancel
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
