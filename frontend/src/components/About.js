import React from "react";
import gmahanImg from "../assets/gmahan.jpg";

const About = () => {
  return (
    <section
      id="about"
      className="container py-10 md:py-10"
      style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "2.5rem 1rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", textAlign: "center" }}>
          <img
            src={gmahanImg}
            alt="Gurumahan portrait"
            style={{
              height: "14rem",
              width: "14rem",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "18rem",
              width: "18rem",
              borderRadius: "50%",
              background: "rgba(191, 219, 254, 0.4)",
              filter: "blur(40px)",
              zIndex: -1,
              animation: "float 6s ease-in-out infinite",
            }}
          ></div>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              color: "#6b7280",
              fontStyle: "italic",
            }}
          >
            World Peace Ambassador
          </p>
        </div>
        <div>
          <div className="header-align">
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                background: "linear-gradient(to right, #93c5fd, #16a34a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              About His Holiness Gurumahan
            </h2>
            <p
              style={{ color: "#1e3a8a", fontWeight: "600", marginTop: "1rem" }}
            >
              Global Peace Ambassador of the Universal Peace Foundation
            </p>
          </div>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "1.125rem",
              lineHeight: "1.75",
              color: "#374151",
              maxWidth: "42rem",
            }}
          >
            His Holiness GuruMahan is a distinguished spiritual leader and
            visionary who has dedicated his life to fostering global harmony and
            peace. Since 1992, he has been leading transformative Peace Programs
            that have touched millions of lives across the world through the
            Universal Peace Foundation.
          </p>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "1.125rem",
              lineHeight: "1.75",
              color: "#374151",
              maxWidth: "42rem",
            }}
          >
            His profound mission centers on creating a peaceful and harmonious
            world through the timeless practices of meditation, yoga, and the
            fundamental principle of universal brotherhood. His Holiness
            believes that true peace begins within each individual soul and
            radiates outward to encompass families, communities, nations, and
            ultimately, our entire global family.
          </p>
          <figure style={{ marginTop: "1.5rem" }}>
            <blockquote
              style={{
                fontStyle: "italic",
                color: "#4b5563",
                borderLeft: "4px solid #3b82f6",
                paddingLeft: "1rem",
                fontSize: "1.125rem",
                lineHeight: "1.75",
              }}
            >
              "Peace is not merely the absence of conflict, but the presence of
              harmony in every heart."
            </blockquote>
          </figure>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          section > div {
            grid-template-columns: repeat(12, 1fr);
          }
          section > div > div:first-child {
            grid-column: span 4;
          }
          section > div > div:last-child {
            grid-column: span 8;
          }
          section > div > div:first-child {
            text-align: left;
          }
          section > div > div:first-child img {
            margin: 0;
          }
        }
        @media (min-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
          section > div > div:first-child img {
            height: 16rem !important;
            width: 16rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
