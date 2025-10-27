import React from "react";
import gmahanImg from "../assets/ggmahan.png";

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
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        <div
          className="about-image"
          style={{ position: "relative", textAlign: "center" }}
        >
          <img
            src={gmahanImg}
            alt="Gurumahan portrait"
            style={{
              height: "auto",
              width: "100%",
              maxWidth: "350px",
              borderRadius: "20px",
              objectFit: "cover",
              margin: "0 auto",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "20rem",
              width: "20rem",
              borderRadius: "50%",
              background: "rgba(191, 219, 254, 0.4)",
              filter: "blur(40px)",
              zIndex: -1,
              animation: "float 6s ease-in-out infinite",
            }}
          ></div>
          <p
            style={{
              marginTop: "1rem",
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
              Founder & Spiritual Leader of the Universal Peace Foundation
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
              love, understanding, and compassion in every heart. When we unite
              in the spirit of universal brotherhood, we become instruments of
              divine harmony."
              <footer
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                  color: "#6b7280",
                }}
              >
                — His Holiness Gurumahan
              </footer>
            </blockquote>
          </figure>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
          .about-image img {
            max-width: 400px !important;
          }
        }
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 380px 1fr !important;
            gap: 4rem !important;
            align-items: start !important;
          }
          .about-image {
            text-align: left !important;
            position: sticky !important;
            top: 100px !important;
          }
          .about-image img {
            margin: 0 !important;
          }
          .header-align {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
