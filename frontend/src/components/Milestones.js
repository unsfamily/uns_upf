import React from "react";

const milestones = [
  {
    year: "1994",
    title: "Foundation Established",
    description:
      "Universal Peace Foundation was founded to promote global harmony",
  },
  {
    year: "2005",
    title: "UN Recognition",
    description: "Received special consultative status with the United Nations",
  },
  {
    year: "2015",
    title: "Million Lives Touched",
    description: "Peace programs reached over 1 million individuals worldwide",
  },
  {
    year: "2025",
    title: "Global Peace Day",
    description: "Launching the largest peace pledge initiative on November 11",
  },
];

const Milestones = () => {
  return (
    <section
      id="milestones"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff, rgba(239, 246, 255, 0.5), #ffffff)",
        padding: "3rem 0",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}
      >
        <h3
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#374151",
            textAlign: "center",
          }}
        >
          A Journey of Peace Milestones & Recognition
        </h3>
        <p
          style={{
            textAlign: "center",
            color: "#4b5563",
            marginTop: "0.5rem",
          }}
        >
          Throughout his remarkable journey, His Holiness Gurumahan has received
          international recognition for his unwavering commitment to world peace
          and spiritual enlightenment.
        </p>

        <div style={{ position: "relative", marginTop: "3rem" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "1.5rem",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, #93c5fd, transparent)",
            }}
          ></div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
            }}
          >
            {milestones.map((milestone, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "linear-gradient(to right, #3b82f6, #10b981)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.875rem",
                  }}
                >
                  {milestone.year}
                </div>
                <h4
                  style={{
                    marginTop: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#1f2937",
                  }}
                >
                  {milestone.title}
                </h4>
                <p
                  style={{
                    marginTop: "0.5rem",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .container > div > div {
            grid-template-columns: repeat(2, 1fr);
          }
          h3 {
            font-size: 2.5rem;
          }
        }
        @media (min-width: 1024px) {
          .container > div > div {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default Milestones;
