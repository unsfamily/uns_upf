import React from "react";
import logoImg from "../assets/logo_img.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "3rem 1rem",
        textAlign: "center",
        background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <img
            src={logoImg}
            alt="Universal Peace Foundation"
            style={{
              height: "60px",
              margin: "0 auto 1rem",
              display: "block",
            }}
          />
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#1e3a8a",
              marginBottom: "0.5rem",
            }}
          >
            UNIVERSAL PEACE FOUNDATION
          </h3>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "1rem",
            }}
          >
            Additional Links
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#about"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1e3a8a")}
              onMouseOut={(e) => (e.target.style.color = "#6b7280")}
            >
              About
            </a>
            <a
              href="#milestones"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1e3a8a")}
              onMouseOut={(e) => (e.target.style.color = "#6b7280")}
            >
              Milestones
            </a>
            <a
              href="#pledge"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1e3a8a")}
              onMouseOut={(e) => (e.target.style.color = "#6b7280")}
            >
              Pledge
            </a>
          </div>
        </div>

        <div
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            paddingTop: "2rem",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          © {currentYear} Global Peace Pledge
        </div>
      </div>
    </footer>
  );
};

export default Footer;
