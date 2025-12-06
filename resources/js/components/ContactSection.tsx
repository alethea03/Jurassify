import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

// Define the shape of the success/error messages passed via Inertia props
type InertiaFlashProps = {
    flash: {
        success?: string;
        error?: string;
    };
};

export default function ContactSection() {
    // Access flash messages from the Inertia page props
    const { props } = usePage();
    const flash = (props as unknown as InertiaFlashProps).flash || {};

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        feedback: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Use Inertia's post method to submit the form to the Laravel route
        post(route('contact.submit'), {
            onSuccess: () => {
                // Clear the form fields upon successful submission
                reset();
            },
        });
    };

    return (
        <section id="contact" className="bg-slate-800 text-white py-16 px-6 border-t border-slate-700">
            <div className="mx-auto max-w-xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight text-green-400">
                        Contact & Feedback
                    </h2>
                    <p className="mt-3 text-lg text-slate-300">
                        We value your input. Send us your questions, ideas, or bug reports!
                    </p>
                </div>

                {/* Display Flash Messages */}
                {flash.success && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-500 p-4 rounded-lg mb-6 text-center">
                        {flash.success}
                    </motion.div>
                )}
                {flash.error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500 p-4 rounded-lg mb-6 text-center">
                        {flash.error}
                    </motion.div>
                )}

                {/* Feedback Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">Your Name</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-green-500 focus:border-green-500"
                            required
                        />
                        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-green-500 focus:border-green-500"
                            required
                        />
                        {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-slate-300">Feedback / Message</label>
                        <textarea
                            id="feedback"
                            rows={4}
                            value={data.feedback}
                            onChange={(e) => setData('feedback', e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-green-500 focus:border-green-500"
                            required
                        ></textarea>
                        {errors.feedback && <p className="text-sm text-red-400 mt-1">{errors.feedback}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-green-400 hover:bg-green-500 transition duration-150 disabled:opacity-50"
                    >
                        {processing ? 'Sending...' : 'Send Feedback'}
                    </button>
                </form>
            </div>
        </section>
    );
}