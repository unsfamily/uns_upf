import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Milestones from "../components/Milestones";
import PledgeQuote from "../components/PledgeQuote";
import PledgeForm from "../components/PledgeForm";
import CertificatePreview from "../components/CertificatePreview";
import CertificateGenerator from "../components/CertificateGenerator";
import AboutFoundation from "../components/AboutFoundation";
import Footer from "../components/Footer";

const HomePage = () => {
  const [pledgeData, setPledgeData] = useState(null);

  const handlePledgeSubmit = (data) => {
    setPledgeData(data);
    // Scroll to certificate buttons
    setTimeout(() => {
      const certificateButtons = document.getElementById("certificateButtons");
      if (certificateButtons) {
        certificateButtons.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  return (
    <div
      className="min-h-screen text-gray-800 font-sans bg-gradient-to-b from-white via-blue-50 to-white"
    >
      <Header />
      <Hero />
      <About />
      <Milestones />
      <PledgeQuote />
      <PledgeForm onPledgeSubmit={handlePledgeSubmit} />
      <CertificatePreview
        firstName={pledgeData?.firstName || ""}
        lastName={pledgeData?.lastName || ""}
      />
      {pledgeData && (
        <div
          id="certificateButtons"
          className="text-center mt-8 mb-12"
        >
          <CertificateGenerator pledgeData={pledgeData} />
        </div>
      )}
      <AboutFoundation />
      <Footer />
    </div>
  );
};

export default HomePage;
