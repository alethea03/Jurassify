import React, { useState } from 'react';
import { AppShell } from './app-shell';
import { AppContent } from './app-content';
import StickyHeader from '@/components/StickyHeader';
import SignupModal from '@/components/SignupModal';
import HeroSection from '@/components/HeroSection';

export default function MainPage() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  return (
    <AppShell variant="header">
      {/* Sticky Header */}
      <StickyHeader
        isLoggedIn={isLoggedIn}
        username={username}
        onMainAction={() => setSignupOpen(true)} // Open modal
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
      />

      {/* Page Content */}
      <AppContent>
        <HeroSection />
        {/* other sections */}
      </AppContent>
    </AppShell>
  );
}
