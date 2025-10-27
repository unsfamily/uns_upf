import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur bg-white/70"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div
        className="container flex items-center justify-between py-4"
        style={{
          maxWidth: "80rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <a
          href="#"
          className="flex items-center gap-3"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <img src={logo} alt="UPF Logo" style={{ width: "60%" }} />
        </a>
        <nav
          className="hidden md:flex items-center gap-8 text-sm"
          style={{ display: "none", gap: "2rem", fontSize: "0.875rem" }}
        >
          <a
            className="hover:text-blue-900"
            href="#about"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            About
          </a>
          <a
            className="hover:text-blue-900"
            href="#milestones"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Milestones
          </a>
          <a
            className="hover:text-blue-900"
            href="#pledge"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Pledge
          </a>
        </nav>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          nav {
            display: flex !important;
            align-items: center;
          }
        }
        a:hover {
          color: #1e3a8a;
        }
      `}</style>
    </header>
  );
};

export default Header;
