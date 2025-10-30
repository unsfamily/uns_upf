import React, { useState, useEffect } from "react";
import logoImg from "../assets/logo_img.png";
import gmahanImg from "../assets/ggmahan.png";

const CertificatePreview = ({ firstName, lastName }) => {
  const [displayName, setDisplayName] = useState("[Your Name]");

  useEffect(() => {
    if (firstName || lastName) {
      const fullName = `${firstName} ${lastName}`.trim();
      setDisplayName(fullName || "[Your Name]");
    } else {
      setDisplayName("[Your Name]");
    }
  }, [firstName, lastName]);

  return (
    <section
      style={{
        position: "relative",
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "0 1rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "2.75rem",
            fontWeight: "700",
            color: "#374151",
            textAlign: "center",
          }}
        >
          Your Certificate of Appreciation
        </h2>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1.125rem",
            color: "#475569",
            maxWidth: "48rem",
            margin: "0.75rem auto 0",
          }}
        >
          Upon signing the Global Peace Pledge, you will receive a beautifully
          designed, personalized certificate perfect for framing and display.
        </p>
      </div>

      <div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          borderRadius: "0.75rem",
          border: "1px solid #bfdbfe",
          backgroundColor: "white",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <article style={{ backgroundColor: "white" }}>
          <div
            style={{
              padding: "0.25rem",
              background:
                "linear-gradient(to right, #60a5fa, #4ade80, #60a5fa)",
            }}
          >
            <div style={{ backgroundColor: "white", padding: "2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8bf2501a9_UPF.png"
                  alt="Universal Peace Foundation"
                  style={{ height: "3rem", width: "auto" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoImg;
                  }}
                />
              </div>

              <h3
                style={{
                  marginTop: "0.75rem",
                  textAlign: "center",
                  fontWeight: "600",
                  letterSpacing: "0.18em",
                  color: "#1e293b",
                  fontSize: "0.75rem",
                }}
              >
                UNIVERSAL PEACE FOUNDATION
              </h3>
              <h1
                style={{
                  marginTop: "0.75rem",
                  textAlign: "center",
                  fontSize: "1.875rem",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                CERTIFICATE OF APPRECIATION
              </h1>

              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    height: "3px",
                    width: "10rem",
                    background: "linear-gradient(to right, #059669, #3b82f6)",
                    borderRadius: "9999px",
                  }}
                ></span>
              </div>

              <p
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "#475569",
                }}
              >
                This certificate is proudly presented to
              </p>
              <p
                style={{
                  marginTop: "0.5rem",
                  textAlign: "center",
                  fontSize: "2.25rem",
                  fontFamily: "Georgia, serif",
                  fontWeight: "700",
                  color: displayName === "[Your Name]" ? "#94a3b8" : "#0f172a",
                }}
              >
                {displayName}
              </p>
              <p
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  color: "#334155",
                  maxWidth: "32rem",
                  margin: "1rem auto 0",
                }}
              >
                in sincere appreciation for joining millions worldwide in the
                Global Peace Pledge, demonstrating commitment to world harmony
                and universal brotherhood.
              </p>

              <div
                style={{
                  marginTop: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "2rem",
                  alignItems: "end",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45fcfa489_image.png"
                    alt="His Holiness GuruMahan"
                    style={{
                      margin: "0 auto",
                      width: "6rem",
                      height: "6rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = gmahanImg;
                    }}
                  />
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    His Holiness GuruMahan
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    {/* Founder &amp; Spiritual Leader */}
                    Global Peace Ambassador
                  </p>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#64748b",
                    }}
                  >
                    Global Peace Day
                  </p>
                  <p
                    style={{
                      marginTop: "0.25rem",
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    November 11, 2025
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#334155" }}>
                    Pondicherry, India
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    With The Support of States and the Central Government of
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        style={{
          maxWidth: "48rem",
          margin: "2.5rem auto 0",
          backgroundColor: "white",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
            letterSpacing: "0.18em",
            color: "#1e293b",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          Perfect for Framing & Display
        </p>
        <p
          style={{ marginTop: "0.75rem", color: "#374151", lineHeight: "1.75" }}
        >
          This premium certificate is designed for framing and serves as a
          lasting reminder of your commitment to world peace. Display it proudly
          in your living space or office to inspire others and commemorate this
          meaningful moment.
        </p>
      </div>
      <style jsx>{`
        @media (min-width: 640px) {
          article > div > div > div:last-child {
            grid-template-columns: repeat(2, 1fr);
          }
          article > div > div > div:last-child > div:last-child {
            border-left: 1px solid #e2e8f0;
            padding: 0.5rem 0.75rem;
          }
          h1 {
            font-size: 2.25rem !important;
          }
        }
        @media (min-width: 768px) {
          h2 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CertificatePreview;
