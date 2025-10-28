import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (


<header className="sticky top-0 z-40 backdrop-blur bg-white/70">
<div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
  <a href="#" className="flex items-center gap-3" aria-label="Home">
    <img src={logo} alt="UPF Logo" style={{ width: "50%" }} />
  {/* <span className="font-semibold tracking-tight text-blue-900">Universal Peace Foundation</span> */}
  </a>
  <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Primary">
    <a className="hover:text-blue-900 transition-colors" href="#about">
    About
    </a>
    <a className="hover:text-blue-900 transition-colors" href="#milestones">
    Milestones
    </a>
    <a className="hover:text-blue-900 transition-colors" href="#pledge">
    Pledge
    </a>
  </nav>

{/*
<a
href="#pledge"
className="hidden sm:inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
>
Sign the Pledge
</a>
*/}
</div>
</header>
  );
};

export default Header;
