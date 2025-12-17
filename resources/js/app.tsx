import '../css/app.css';
import "./bootstrap";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/ThemeProvider'; // ADDED

const appName = import.meta.env.VITE_APP_NAME || 'Jurassify';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) { 
        const appElement = (
            <ThemeProvider> {/* ADDED */}
                <App {...props} />
            </ThemeProvider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, appElement);
            return;
        }

        createRoot(el).render(appElement);
    },
    progress: {
        color: '#4B5563',
    },
});
