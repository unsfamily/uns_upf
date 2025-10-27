import React from "react";
import meditationImg from "../assets/meditation.png";

const AboutFoundation = () => {
  return (
    <section
      style={{
        padding: "3rem 1rem",
        background:
          "linear-gradient(to bottom, #ffffff, rgba(239, 246, 255, 0.5))",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        <div
          className="foundation-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          <div className="foundation-content">
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "1rem",
              }}
            >
              About the Universal Peace Foundation
            </h2>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1e3a8a",
                marginTop: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              OUR MISSION
            </h3>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "#374151",
              }}
            >
              Under the guidance of His Holiness Gurumahan, the Universal Peace
              Foundation is dedicated to fostering global harmony through
              education, spiritual practices, dialogue, and compassionate
              action. We believe that lasting peace begins within each
              individual and expands outward to communities, nations, and the
              world.
            </p>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1e3a8a",
                marginTop: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              GLOBAL PEACE DAY 2025
            </h3>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "#374151",
              }}
            >
              The historic Global Peace Day celebration in Pondicherry on
              November 11, 2025, represents the culmination of decades of peace
              work. With official backing from Indian state and central
              governments, this event will unite millions of hearts in prayer
              and pledge for world peace.
            </p>
          </div>

          <div className="foundation-image" style={{ textAlign: "center" }}>
            <img
              src={meditationImg}
              alt="Meditation for Peace"
              style={{
                width: "100%",
                maxWidth: "450px",
                height: "auto",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
        }
        @media (min-width: 1024px) {
          .foundation-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 4rem !important;
            align-items: center !important;
          }
          .foundation-image {
            order: 2;
          }
          .foundation-content {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutFoundation;
