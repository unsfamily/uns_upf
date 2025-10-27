import React from "react";
import heroImage from "../assets/gmahan.jpg";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          background:
            "linear-gradient(to bottom right, #312e81, #1e40af, #7c3aed)",
        }}
      >
        <div
          className="container py-16 md:py-24 lg:py-10 text-white"
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "3rem 1.5rem",
            color: "white",
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div className="hero-content">
              <div
                style={{
                  marginBottom: "1rem",
                  fontSize: "0.875rem",
                  opacity: "0.9",
                  letterSpacing: "0.05em",
                }}
              >
                NOVEMBER 11, 2025 • PONDICHERRY, INDIA
              </div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  marginBottom: "1.5rem",
                }}
              >
                Pledge for Global Peace
              </h1>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  marginBottom: "1.5rem",
                  opacity: "0.95",
                }}
              >
                JOIN MILLIONS IN A SACRED PLEDGE FOR PEACE
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.75",
                  color: "rgba(255, 255, 255, 0.9)",
                  marginBottom: "2rem",
                }}
              >
                On this Global Peace Day, we invite hearts and minds from every
                corner of our world to unite in purpose. Your digital signature
                represents more than support—it embodies hope, compassion, and
                the collective power of humanity working toward a more peaceful
                tomorrow. Together, we can transform our shared vision of peace
                into reality.
              </p>
            </div>

            <div className="hero-image" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  marginBottom: "0.75rem",
                  opacity: "0.9",
                }}
              >
                Millions united for peace
              </div>
              <img
                src={heroImage}
                alt="Guru Mahan"
                className="shadimg"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                  margin: "0 auto",
                }}
              />
              <div
                style={{
                  fontSize: "0.875rem",
                  marginTop: "0.75rem",
                  opacity: "0.9",
                }}
              >
                World Peace Ambassador
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          h1 {
            font-size: 3rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          .container {
            padding: 5rem 2rem !important;
          }
          .hero-image img {
            width: 250px !important;
            height: 250px !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 400px !important;
            gap: 4rem !important;
          }
          h1 {
            font-size: 3.5rem !important;
          }
          h2 {
            font-size: 1.875rem !important;
          }
          .hero-image {
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
