import React from "react";
import meditationImg from "../assets/meditation.png";

const AboutFoundation = () => {
  return (
    <section id="about" className="container max-w-7xl py-10 md:py-10">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <div className="header-center">
          <h2 className="text-3xl md:text-4xl font-bold inline bg-gradient-to-r from-blue-300 to-green-600 bg-clip-text text-transparent my-4">
            About the Universal Peace Foundation
          </h2>

          <div className="text-2xl mt-5  leading-relaxed text-blue-900 font-semibold max-w-2xl">
            Our Mission
          </div>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-gray-700 max-w-2xl">
            Under the guidance of His Holiness Gurumahan, the Universal Peace
            Foundation is dedicated to fostering global harmony through
            education, spiritual practices, dialogue, and compassionate action.
            We believe that lasting peace begins within each individual and
            expands outward to communities, nations, and the world.
          </p>
<div className="header-center">
          <div className="text-2xl mt-5  leading-relaxed text-blue-900 font-semibold max-w-2xl">
            Global Peace Day 2025
          </div>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-gray-700 max-w-2xl">
            The historic Global Peace Day celebration in Pondicherry on November
            11, 2025, represents the culmination of decades of peace work. With
            official backing from Indian state and central governments, this
            event will unite millions of hearts in prayer and pledge for world
            peace.
          </p>
        </div>

        <div className="lg:col-span-4 mx-auto relative">
          <img
            src={meditationImg}
            alt="Gurumahan portrait"
            className="h-56 w-56 md:h-80 md:w-80 object-cover mx-auto lg:mx-0 shadow-yellow-50 imgdn"
          />
          <div className="absolute -z-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-200/40 blur-2xl animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutFoundation;
