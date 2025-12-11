import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

type InertiaFlashProps = {
  flash: {
    success?: string;
    error?: string;
  };
};

export default function ContactSection() {
  const { props } = usePage();
  const flash = (props as unknown as InertiaFlashProps).flash || {};

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    feedback: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('contact.submit'), { onSuccess: () => reset() });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* Spline 3D Background */}
      <spline-viewer
        url="https://prod.spline.design/9DftotQNNr5rW5RR/scene.splinecode"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none', // so form inputs work
    transform: 'scale(1.2)', // zoom in slightly
    transformOrigin: 'center center',
        }}
      ></spline-viewer>

      {/* Contact Form Card on Left */}
      <div className="relative z-10 flex items-center justify-start h-full px-20">





       <div className="w-full max-w-xl bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg">

          <div className="text-left mb-6">
            <h2 className="text-4xl font-extrabold tracking-tight text-green-400">
              Contact & Feedback
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              We value your input. Send us your questions, ideas, or bug reports!
            </p>
          </div>

          {flash.success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500 p-3 rounded-lg mb-4 text-center text-white"
            >
              {flash.success}
            </motion.div>
          )}
          {flash.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500 p-3 rounded-lg mb-4 text-center text-white"
            >
              {flash.error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500"
                required
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500"
                required
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-slate-300">
                Feedback / Message
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={data.feedback}
                onChange={(e) => setData('feedback', e.target.value)}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500"
                required
              ></textarea>
              {errors.feedback && <p className="text-sm text-red-400 mt-1">{errors.feedback}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-black bg-green-400 hover:bg-green-500 transition duration-150 disabled:opacity-50"
            >
              {processing ? 'Sending...' : 'Send Feedback'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
