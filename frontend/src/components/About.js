import React from "react";
import gmahanImg from "../assets/ggmahan.png";

const About = () => {
  return (


<section id="about" className="container max-w-7xl py-10 md:py-10">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-4 mx-auto relative">
          <img
            src={gmahanImg}
            alt="Gurumahan portrait"
            className="h-56 w-56 md:h-64 md:w-64 rounded-full object-cover mx-auto lg:mx-0"
          />
          <div class="absolute -z-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-200/40 blur-2xl animate-float z-10"></div>
          <p className="lg:text-center mt-3 text-sm text-gray-500 italic">
            World Peace Ambassador
          </p>
        </div>

        <div className="lg:col-span-8 my-4">
          <h2 className="text-3xl md:text-4xl font-bold inline bg-gradient-to-r from-blue-300 to-green-600 bg-clip-text text-transparent my-4">
            About His Holiness Gurumahan
          </h2>

          <p className="text-blue-900 font-semibold mt-4">
            Global Peace Ambassador of the Universal Peace Foundation
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-700 max-w-2xl">
            His Holiness GuruMahan is a distinguished spiritual leader and visionary who has dedicated his life to fostering global harmony and peace. Since 1992, he has been leading transformative Peace Programs that have touched millions of lives across the world through the Universal Peace Foundation.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-700 max-w-2xl">
            His profound mission centers on creating a peaceful and harmonious world through the timeless practices of meditation, yoga, and the fundamental principle of universal brotherhood. His Holiness believes that true peace begins within each individual soul and radiates outward to encompass families, communities, nations, and ultimately, our entire global family.
          </p>

          <figure className="mt-6">
            <blockquote className="text-xl italic text-gray-800">
              “Peace is not merely the absence of conflict, but the presence of love, understanding, and compassion in every heart. When we unite in the spirit of universal brotherhood, we become instruments of divine harmony.”
            </blockquote>
            <figcaption className="mt-2 text-blue-900 font-semibold">
              — His Holiness Gurumahan
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default About;
