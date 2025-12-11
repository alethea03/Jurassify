// App.jsx
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".story-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Inline styles
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "100px",
    padding: "50px 100px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f5f5f5",
  };

  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "50px",
    opacity: 0,
    transform: "translateY(50px)",
    transition: "all 0.8s ease-out",
  };

  const textStyle = {
    flex: 1,
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#333",
  };

  const titleStyle = {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#1e3a8a",
  };

  const imageBoxStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  };

  const imageStyle = {
    maxWidth: "100%",
    borderRadius: "12px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
    transition: "transform 0.5s ease, box-shadow 0.5s ease",
  };

  const imageHoverStyle = {
    transform: "scale(1.05) rotate(1deg)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  };

  return (
    <div style={containerStyle}>
      <div
        className="story-section"
        style={sectionStyle}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.querySelector("img").style, imageHoverStyle)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.querySelector("img").style, imageStyle)
        }
      >
        <div style={textStyle}>
          <h2 style={titleStyle}>Section 1 – A Peaceful World</h2>
          <p>
            Millions of years ago, the Earth was a kingdom ruled by dinosaurs.
            <br />
            Giant Brachiosaurus grazed the lush forests, while Tyrannosaurus Rex
            roamed the plains, hunting with unmatched strength.
            <br />
            Rivers sparkled under the golden sun, and the skies were filled with
            the wings of Pterosaurs.
          </p>
        </div>
        <div style={imageBoxStyle}>
          <img src="/section1.png" alt="Peaceful Dinosaurs" style={imageStyle} />
        </div>
      </div>
    </div>
  );
}

export default App;
