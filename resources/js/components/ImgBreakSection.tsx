import React from 'react';

export default function VisualBreakSection() {

    // public/ is served at the site root by Vite/Laravel — reference with a leading slash
    const IMAGE_PATH = '/visualbreaksection.jpg';

    return (
        <section 
            className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden"
            // We use the style prop for direct background image control
            style={{
                backgroundImage: `url('${IMAGE_PATH}')`,
                backgroundSize: 'cover',        // Ensures the image covers the entire area
                backgroundPosition: 'center',   // Centers the image
                backgroundAttachment: 'fixed',  // Optional: Creates a parallax-like scrolling effect
            }}
        >
            <div className="text-white text-center z-10 p-10 bg-black/30 rounded-lg">
                 {/* Optional: Placeholder for text that promotes the Timeline/Showcase */}
            </div>
        </section>
    );
}

