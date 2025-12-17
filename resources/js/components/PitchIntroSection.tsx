import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";

export default function PitchIntroSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const pitchText =
    "JURASSIFY is an unprecedented, immersive experience of prehistoric life. Explore the timelines of the Triassic, Jurassic, and Cretaceous periods, witness the Age of Giants firsthand, and stand face-to-face with the creatures that ruled the planet.";

  const sections = [
    {
      title: "A Peaceful World",
      text: "Millions of years ago, the Earth was ruled by dinosaurs. Giant Brachiosaurus grazed the forests, while Tyrannosaurus Rex roamed the plains. Rivers sparkled under the golden sun, and the skies were filled with Pterosaurs.",
      img: "/section1.png",
    },
    {
      title: "Signs of Change",
      text: "The world was about to change. Volcanoes rumbled, spilling ash. The air grew thick, the earth trembled, and storms swept the lands. Even the strongest dinosaurs felt unease.",
      img: "/section2.png",
    },
    {
      title: "The Cataclysm",
      text: "A blazing meteor struck the Earth, igniting fires, creating dust clouds that blocked the sun. Plants withered, rivers dried, and temperatures dropped. Dinosaurs struggled to survive.",
      img: "/section3.png",
    },
    {
      title: "The Silent World",
      text: "Weeks turned to months. The vibrant world grew quiet. The roars of T-Rex, the flutter of Pterosaurs, and the footsteps of Brachiosaurus all faded. A new world awaited, but their story lived on.",
      img: "/section4.png",
    },
    {
      title: "Epilogue",
      text: "Though vanished, dinosaurs shaped the Earth forever. Scientists would uncover their secrets, and their memory would inspire awe for millions of years to come.",
      img: "/section5.png",
    },
  ];

  useEffect(() => {
    if (!showStory) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.2 } // 20% of element visible triggers animation
    );

    const sections = document.querySelectorAll(".fade-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [showStory]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimateOpen(true), 10);
    } else {
      document.body.style.overflow = "auto";
      setAnimateOpen(false);
    }
  }, [selectedImage]);

  const handleCloseStory = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowStory(false);
      setFadeOut(false);
    }, 500);
  };

  return (
    <>
      <section className="relative min-h-screen p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500">
        {/* PITCH + NPC CONTAINER */}
        {!showStory && (
          <div className="relative z-20 flex flex-col md:flex-row items-center bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-600 rounded-3xl shadow-2xl p-6 max-w-6xl">
            {/* TEXT */}
            <div className="flex-1 text-gray-900 dark:text-gray-100 text-sm md:text-base space-y-4">
              <p className="italic font-medium leading-snug">{pitchText}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                — From The Ark Collective
              </div>
              <p className="text-sm md:text-base">
                Before you embark on this prehistoric adventure, I highly recommend you read the story below:<br />
                <em>"Echoes of a Lost Age"</em>.
              </p>
              <button
                className="mt-3 px-6 py-2 bg-green-500 dark:bg-green-400 text-white dark:text-gray-900 font-bold rounded-2xl shadow-lg hover:bg-green-600 dark:hover:bg-green-500 transition text-sm md:text-base"
                onClick={() => setShowStory(true)}
              >
                Read the Story
              </button>
            </div>
            {/* NPC IMAGE (full body, bigger) */}
            <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex justify-center items-end">
              <img
                src="/npc.png"
                alt="NPC"
                className="w-64 md:w-96 h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* STORY SECTION */}
        {showStory && (
          <section
            className={`relative flex flex-col items-center justify-start overflow-hidden transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative z-20 w-full max-w-5xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-600 rounded-3xl shadow-2xl p-6 space-y-16 overflow-hidden mt-16">
              {/* STORY BACKGROUND */}
              <div className="absolute inset-0 z-0 rounded-3xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/long.png')", filter: "contrast(1.1)" }}
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

             {/* CINEMATIC HEADER */}
<div className="relative z-10 text-center mt-6 mb-6">
  <h1
    className="tracking-[0.35em] text-2xl md:text-3xl font-bold text-white"
    style={{ fontFamily: "'Playfair Display', serif", textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
  >
    ECHOES&nbsp; OF&nbsp; A&nbsp; LOST&nbsp;AGE
  </h1>
  <p className="mt-2 text-sm md:text-base text-white italic">
    An ancient world on the edge of extinction…
  </p>
</div>

              {/* STORY SECTIONS */}
{sections.map((s, index) => (
  <div
    key={index}
    className="fade-section opacity-0 translate-y-12 transition-all duration-[1200ms] relative z-10"
  >
    <div
      className={`flex flex-col md:flex-row items-center gap-8 ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
          {s.title}
        </h2>
        {/* FIXED LIGHT TEXT */}
        <p className="text-lg text-white leading-relaxed whitespace-pre-line">
          {s.text}
        </p>
      </div>
      <div className="flex-1 max-w-xs md:max-w-sm">
        <img
          src={s.img}
          className="rounded-xl shadow-2xl w-full cursor-pointer transition-transform duration-500 hover:scale-110 hover:-rotate-1"
          onClick={() => setSelectedImage(s.img)}
        />
      </div>
    </div>
  </div>
))}


              {/* CLOSE STORY BUTTON */}
              <div className="relative z-10 flex justify-center mt-8">
                <button
                  className="px-6 py-2 bg-red-500 dark:bg-red-400 text-white dark:text-gray-900 font-bold rounded-2xl shadow-lg hover:bg-red-600 dark:hover:bg-red-500 transition text-sm md:text-base"
                  onClick={handleCloseStory}
                >
                  Close Story
                </button>
              </div>
            </div>
          </section>
        )}

        {/* IMAGE MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] transition-opacity duration-300"
            onClick={() => setSelectedImage(null)}
            style={{ opacity: animateOpen ? 1 : 0 }}
          >
            <img
              src={selectedImage}
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-transform duration-300"
              style={{ transform: animateOpen ? "scale(1)" : "scale(0.7)" }}
            />
          </div>
        )}
      </section>

      <style jsx>{`
        .fade-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
}
