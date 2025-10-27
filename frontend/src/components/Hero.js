import React from "react";
import heroImage from "../assets/meditation.png";

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
            padding: "4rem 1rem",
            color: "white",
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
            <div>
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  marginBottom: "1.5rem",
                }}
              >
                Join the Global Movement for Peace
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.75",
                  color: "rgba(255, 255, 255, 0.9)",
                  marginBottom: "2rem",
                  maxWidth: "36rem",
                }}
              >
                Led by His Holiness GuruMahan, the Universal Peace Foundation
                invites you to be part of a worldwide pledge for harmony, unity,
                and lasting peace.
              </p>
              <a
                href="#pledge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "3rem",
                  padding: "0 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "white",
                  background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Sign the Peace Pledge
              </a>
            </div>
            <div
              className="relative mesh"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={heroImage}
                alt="Peace"
                className="shadimg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  boxShadow: "4px 4px 49px 0 #090353",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          .container > div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          h1 {
            font-size: 3rem !important;
          }
          .container {
            padding: 6rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
