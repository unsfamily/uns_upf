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
      className="bg-gradient-to-b from-white via-blue-50/50 to-white py-12 md:py-20"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-700 text-center">
          A Journey of Peace Milestones & Recognition
        </h3>
        <p className="text-center text-gray-600 mt-2">
          Throughout his remarkable journey, His Holiness Gurumahan has received
          international recognition for his unwavering commitment to world peace
          and spiritual enlightenment.
        </p>

        <div className="relative mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* 1994 */}
            <div className="relative pt-10">
              <span className="absolute -top-2 left-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white px-3 py-1 text-xs w-48">
                1994
              </span>
              <h4 className="text-xl font-bold text-blue-900">
                Foundation For Global Peace
              </h4>
              <p className="text-gray-700 mt-1">
                Initiated the Peace Program and established the Universal Peace
                Foundation.
              </p>
            </div>

            {/* 2011 */}
            <div className="relative pt-10">
              <span className="absolute -top-2 left-0 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-800 text-white px-3 py-1 text-xs w-48">
                2011
              </span>
              <h4 className="text-xl font-bold text-amber-900">
                Ambassador for Peace
              </h4>
              <p className="text-gray-700 mt-1">
                Recognized for outstanding contributions to global peace
                initiatives.
              </p>
            </div>

            {/* International */}
            <div className="relative pt-10">
              <span className="absolute -top-2 left-0 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-800 text-white px-3 py-1 text-xs w-48">
                International
              </span>
              <h4 className="text-xl font-bold text-purple-900">
                Global Recognition
              </h4>
              <p className="text-gray-700 mt-1">
                Honored abroad for fostering unity among diverse communities.
              </p>
            </div>

            {/* 2025 */}
            <div className="relative pt-10">
              <span className="absolute -top-2 left-0 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-800 text-white px-3 py-1 text-xs w-48">
                2025
              </span>
              <h4 className="text-xl font-bold text-green-900">
                Guardian of Global Peace
              </h4>
              <p className="text-gray-700 mt-1">
                Leading the Global Peace Day celebration in Pondicherry on Nov
                11, 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
