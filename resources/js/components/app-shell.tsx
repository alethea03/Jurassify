import React, { useState } from 'react';
import AppShell from './app-shell';
import { AppContent } from './app-content';
import StickyHeader from '@/components/StickyHeader';
import SignupModal from '@/components/SignupModal';
import HeroSection from '@/components/HeroSection';

export default function MainPage() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  
  // --- Theme state ---
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AppShell variant="header" className={theme === 'dark' ? 'dark' : ''}>
      {/* Sticky Header */}
      <StickyHeader
        isLoggedIn={isLoggedIn}
        username={username}
        onMainAction={() => setSignupOpen(true)}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        theme={theme}            // Pass theme to header
        toggleTheme={toggleTheme} // Pass toggle function to header/sidebar
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        theme={theme} // optional if modal needs theme
      />

      {/* Page Content */}
      <AppContent className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <HeroSection />
        {/* other sections */}
      </AppContent>
    </AppShell>
  );
}
