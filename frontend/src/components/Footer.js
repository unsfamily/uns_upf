import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "2.5rem 0",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#6b7280",
      }}
    >
      © {currentYear} Global Peace Pledge
    </footer>
  );
};

export default Footer;
