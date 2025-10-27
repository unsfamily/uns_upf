import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Milestones from "../components/Milestones";
import PledgeQuote from "../components/PledgeQuote";
import PledgeForm from "../components/PledgeForm";
import CertificatePreview from "../components/CertificatePreview";
import CertificateGenerator from "../components/CertificateGenerator";
import Footer from "../components/Footer";

const HomePage = () => {
  const [pledgeData, setPledgeData] = useState(null);
  const [previewName, setPreviewName] = useState({
    firstName: "",
    lastName: "",
  });

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

  const handleFormChange = (firstName, lastName) => {
    setPreviewName({ firstName, lastName });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ffffff, #eff6ff, #ffffff)",
        color: "#1f2937",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <Header />
      <Hero />
      <About />
      <Milestones />
      <PledgeQuote />
      <PledgeForm onPledgeSubmit={handlePledgeSubmit} />
      <CertificatePreview
        firstName={pledgeData?.firstName || previewName.firstName}
        lastName={pledgeData?.lastName || previewName.lastName}
      />
      {pledgeData && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          <CertificateGenerator pledgeData={pledgeData} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
