export default function VisualBreakSection() {
    // public/ is served at the site root by Vite/Laravel — reference with a leading slash
    const IMAGE_PATH = '/visualbreaksection.jpg';

    return (
        <section
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900"
            // We use the style prop for direct background image control
            style={{
                backgroundImage: `url('${IMAGE_PATH}')`,
                backgroundSize: 'cover', // Ensures the image covers the entire area
                backgroundPosition: 'center', // Centers the image
                backgroundAttachment: 'fixed', // Optional: Creates a parallax-like scrolling effect
            }}
        >
            <div className="z-10 rounded-lg bg-black/30 p-10 text-center text-white">
                {/* Optional: Placeholder for text that promotes the Timeline/Showcase */}
            </div>
        </section>
    );
}
