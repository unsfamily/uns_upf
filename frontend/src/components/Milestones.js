import React from "react";

const milestones = [
  {
    year: "1994",
    title: "Foundation For Global Peace",
    description:
      "Initiated the Peace Program and established the Universal Peace Foundation.",
  },
  {
    year: "2011",
    title: "Ambassador For Peace",
    description:
      "Recognized for outstanding contributions to global peace initiatives.",
  },
  {
    year: "International",
    title: "Global Recognition",
    description:
      "Honored abroad for fostering unity among diverse communities.",
  },
  {
    year: "2025",
    title: "Guardian Of Global Peace",
    description:
      "Leading the Global Peace Day celebration in Pondicherry on Nov 11, 2025.",
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
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <h3
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#374151",
            textAlign: "center",
            marginBottom: "0.75rem",
          }}
        >
          A Journey of Peace Milestones & Recognition
        </h3>
        <p
          style={{
            textAlign: "center",
            color: "#4b5563",
            fontSize: "1rem",
            lineHeight: "1.75",
            maxWidth: "48rem",
            margin: "0 auto",
            marginBottom: "3rem",
          }}
        >
          Throughout his remarkable journey, His Holiness Gurumahan has received
          international recognition for his unwavering commitment to world peace
          and spiritual enlightenment.
        </p>

        <div style={{ position: "relative", marginTop: "3rem" }}>
          <div
            className="timeline-line"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "1.5rem",
              height: "2px",
              background:
                "linear-gradient(to right, transparent, #93c5fd, #3b82f6, #93c5fd, transparent)",
              display: "none",
            }}
          ></div>
          <div
            className="milestones-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
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
                    top: "-1.25rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: "3.5rem",
                    height: "3.5rem",
                    padding: "0 1rem",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3b82f6, #10b981)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.75rem",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                    border: "3px solid white",
                  }}
                >
                  {milestone.year}
                </div>
                <h4
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#1f2937",
                  }}
                >
                  {milestone.title}
                </h4>
                <p
                  style={{
                    marginTop: "0.75rem",
                    color: "#6b7280",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
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
        @media (min-width: 640px) {
          .milestones-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem !important;
          }
        }
        @media (min-width: 768px) {
          h3 {
            font-size: 2.75rem;
          }
        }
        @media (min-width: 1024px) {
          .milestones-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 2rem !important;
          }
          .timeline-line {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Milestones;
