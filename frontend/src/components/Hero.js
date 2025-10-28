import React from "react";
import heroImage from "../assets/gmahan.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-violet-600">
        <div className="grid lg:grid-cols-2 gap-10 items-center container max-w-7xl py-16 md:py-24 lg:py-10 text-white">
          <div>
            <p className="uppercase tracking-widest text-white/100 text-xs md:text-sm">
              November 11, 2025 • Pondicherry, India
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              Pledge for{" "}
              <span className="inline bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
                Global Peace
              </span>
            </h1>
            <p className="mt-4 text-md md:text-xl uppercase text-white/90 max-w-xl">
              Join Millions in a Sacred Pledge for Peace
            </p>
            <p className="mt-4 text-md md:text-lg text-white/90 max-w-xl">
              On this Global Peace Day, we invite hearts and minds from every
              corner of our world to unite in purpose. Your digital signature
              represents more than support—it embodies hope, compassion, and the
              collective power of humanity working toward a more peaceful
              tomorrow. Together, we can transform our shared vision of peace
              into reality.
            </p>

            <div className="mt-6 flex items-center gap-2 text-md text-white/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-10 w-10 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>Millions united for peace</span>
            </div>
          </div>

          <div className="relative lg:justify-self-end mesh">
            <img
                src={heroImage}
                alt="Guru Mahan"
                className="w-full max-w-xl aspect-[4/3] object-cover ring-1 ring-white/30"
              />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

