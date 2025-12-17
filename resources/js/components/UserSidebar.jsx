import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaHeart, FaStickyNote, FaSignOutAlt, FaTimes } from "react-icons/fa";

export default function UserSidebar({ isOpen, onClose, user, onLogout }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 right-0 w-72 h-full bg-slate-900 text-white z-50 shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">User Menu</h2>
              <button onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            {/* User Info */}
            <div className="p-4 flex items-center gap-3 border-b border-slate-700">
              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-lg font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <p className="font-medium">{user?.name || "Guest User"}</p>
                <p className="text-sm text-slate-400">{user?.email}</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-3">
              <button className="sidebar-btn">
                <FaUser /> Profile
              </button>

              <button className="sidebar-btn">
                <FaHeart /> Favorites
              </button>

              <button className="sidebar-btn">
                <FaStickyNote /> Notes
              </button>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-700">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
