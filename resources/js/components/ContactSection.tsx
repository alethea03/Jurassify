import React, { useRef, useState } from 'react';

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);

  // Modal state
  const [modal, setModal] = useState({ show: false, title: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const form = formRef.current;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mkgqlngy', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setModal({ show: true, title: '✅ Message Sent!', message: "Thank you for contacting us. We'll get back to you soon." });
        form.reset();
      } else {
        setModal({ show: true, title: '❌ Oops!', message: 'There was a problem sending your message. Please try again later.' });
      }
    } catch (error) {
      setModal({ show: true, title: '⚠️ Network Error', message: 'Please check your connection and try again.' });
    }
  };

  return (
    <section id="contact-section" className="relative w-full h-screen overflow-hidden bg-black text-white">

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
          pointerEvents: 'none',
          transform: 'scale(1.2)',
          transformOrigin: 'center center',
        }}
      ></spline-viewer>

      {/* Contact Form Card */}
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

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Your Name</label>
              <input type="text" name="name" placeholder="Your Name" required
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
              <input type="email" name="_replyto" placeholder="Your Email" required
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-slate-300">Feedback / Message</label>
              <textarea name="message" placeholder="Your Message" rows={4} required
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-black bg-green-400 hover:bg-green-500 transition duration-150">
              Send Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-96 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">{modal.title}</h3>
            <p className="mb-4">{modal.message}</p>
            <button className="px-4 py-2 bg-green-400 rounded hover:bg-green-500" onClick={() => setModal({ ...modal, show: false })}>
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
