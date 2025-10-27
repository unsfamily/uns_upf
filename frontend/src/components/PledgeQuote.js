import React from "react";
import peaceImg from "../assets/peace.png";

const PledgeQuote = () => {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "4rem 1.5rem",
        minHeight: "400px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url(${peaceImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(239, 246, 255, 0.85), rgba(240, 253, 244, 0.85), rgba(239, 246, 255, 0.85))",
        }}
      />
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "52rem",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "2.5rem 2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h3
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#374151",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          The Global Peace Pledge
        </h3>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.25rem",
            textAlign: "center",
            color: "#374151",
            lineHeight: "1.8",
          }}
        >
          I add my voice and my signature to the global call for{" "}
          <span
            style={{
              color: "#1e3a8a",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            World Peace
          </span>
          .
        </p>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.125rem",
            color: "#374151",
            lineHeight: "1.8",
          }}
        >
          I believe a{" "}
          <span style={{ color: "#1e3a8a", fontWeight: "700" }}>BETTER</span>,
          more{" "}
          <span style={{ color: "#1e3a8a", fontWeight: "700" }}>PEACEFUL</span>{" "}
          world is possible, and it starts with{" "}
          <span style={{ color: "#1e3a8a", fontWeight: "700" }}>ME</span>.
        </p>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.95rem",
            color: "#6b7280",
            fontStyle: "italic",
          }}
        >
          Read this pledge with your heart before signing below
        </p>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          h3 {
            font-size: 2.75rem;
          }
          p:first-of-type {
            font-size: 1.375rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PledgeQuote;
