import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registered successfully (demo only)");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[9999]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-[90%] max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setForm({...form, confirm_password: e.target.value})}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
          >
            Register
          </motion.button>
        </form>

        <button
          onClick={onClose}
          className="text-gray-300 mt-4 text-sm hover:underline w-full text-center"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default SignupModal;
