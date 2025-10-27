import React from "react";
import peaceImg from "../assets/peace.png";

const PledgeQuote = () => {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "3.5rem 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(to right, #eff6ff, #f0fdf4)",
          }}
        >
          <img
            src={peaceImg}
            alt="Peace"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
            }}
          />
        </div>
      </div>
      <div
        className="container"
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <h3
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#374151",
            textAlign: "center",
          }}
        >
          The Global Peace Pledge
        </h3>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.125rem",
            textAlign: "center",
            color: "#374151",
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
            marginTop: "0.75rem",
            fontSize: "1rem",
            color: "#374151",
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
            marginTop: "1rem",
            fontSize: "0.875rem",
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
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PledgeQuote;
