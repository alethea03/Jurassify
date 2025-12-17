import React from 'react';
import { motion } from 'framer-motion';

const ReactIcon = '/resources-icons/react.png';
const PostgresIcon = '/resources-icons/postgres.png';
const PHPIcon = '/resources-icons/phplogo.png';
const LaravelIcon = 'favicon.svg';
const TailwindIcon = '/resources-icons/tailwind.png';
const InertiaIcon = '/resources-icons/inertia.png';
const FramerMotionIcon = '/resources-icons/framer-motion.svg';

export type Tool = {
    name: string;
    iconSrc: string;
    color: string;
};

const tools: Tool[] = [
    { name: 'React', iconSrc: ReactIcon, color: 'text-blue-400' },
    { name: 'PostgreSQL', iconSrc: PostgresIcon, color: 'text-blue-600' },
    { name: 'PHP', iconSrc: PHPIcon, color: 'text-purple-500' },
    { name: 'Laravel', iconSrc: LaravelIcon, color: 'text-red-500' },
    { name: 'Tailwind CSS', iconSrc: TailwindIcon, color: 'text-cyan-400' },
    { name: 'Inertia.js', iconSrc: InertiaIcon, color: 'text-indigo-600' },
    { name: 'Framer Motion', iconSrc: FramerMotionIcon, color: 'text-pink-500' },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function ResourcesSection() {
    return (
        <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6 border-t border-gray-200 dark:border-gray-800">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight text-yellow-500 dark:text-yellow-400">
                        Core Technologies & Resources
                    </h2>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        This project was built using a modern TALL stack variant (Tailwind, Alpine, Laravel, Livewire/Inertia), with React for the frontend layer.
                    </p>
                </div>

                {/* Grid Container for Tools */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {tools.map((tool) => (
                        <motion.div
                            key={tool.name}
                            className="flex flex-col items-center p-4 bg-gray-200/60 dark:bg-gray-800/60 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 w-full 
                                       hover:shadow-2xl hover:border-green-500 dark:hover:border-green-500/70 transition-all duration-200"
                            variants={itemVariants}
                        >
                            <div className="mb-2">
                                <img src={tool.iconSrc} alt={`${tool.name} icon`} className="w-12 h-12 object-contain mx-auto" />
                            </div>
                            <h3 className="text-md font-semibold text-gray-900 dark:text-white text-center">{tool.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        Map data provided by Leaflet and OpenStreetMap.
                    </p>
                </div>
            </div>
        </section>
    );
}
