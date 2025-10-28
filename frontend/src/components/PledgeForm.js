import React, { useState } from "react";
import axios from "axios";
import SignaturePad from "./SignaturePad";
import bg1Img from "../assets/bg1.png";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "North Korea",
  "South Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const PledgeForm = ({ onPledgeSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    country: "",
    address: "",
  });
  const [signature, setSignature] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clearSignature, setClearSignature] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignatureChange = (signatureData) => {
    setSignature(signatureData);
    setClearSignature(false);
  };

  const validateForm = () => {
    const { firstName, lastName, email, country } = formData;

    if (!firstName || !lastName || !email || !country) {
      setMessage({
        text: "Please fill in all required fields.",
        type: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }

    if (!signature) {
      setMessage({
        text: "Please provide your digital signature.",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        signature,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/pledge`,
        submitData
      );

      if (response.data.success) {
        setMessage({
          text: "Thank you for pledging for Global Peace! Your certificate is ready for download.",
          type: "success",
        });

        // Pass data to parent component for certificate generation
        if (onPledgeSubmit) {
          onPledgeSubmit(submitData);
        }

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          country: "",
          address: "",
        });
        setClearSignature(true);
      } else {
        setMessage({
          text: response.data.message || "An error occurred.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      let errorMessage =
        "Sorry, there was a connection error. Please check your internet connection and try again.";

      if (error.message.includes("Network Error")) {
        errorMessage =
          "Cannot connect to server. Please check if the server is running and try again.";
      } else if (error.response) {
        errorMessage =
          error.response.data.message ||
          "Server error occurred. Please try again.";
      }

      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="pledge"
      style={{
        marginBottom: "4rem",
        padding: "2.5rem 1rem",
        position: "relative",
      }}
    >
      <div className="bg_mask">
        <img src={bg1Img} alt="" />
      </div>
      <div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          borderRadius: "0.75rem",
          border: "1px solid #bfdbfe",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "0.75rem 0.75rem 0 0",
            background: "linear-gradient(to right, #3b82f6, #1e3a8a)",
            padding: "2rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <div
            style={{
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <h1 style={{ fontSize: "1.875rem", fontWeight: "700" }}>
              Sign Your Peace Pledge
            </h1>
          </div>
          <p style={{ fontSize: "1.125rem", color: "#bfdbfe" }}>
            Add your voice to the global movement for peace
          </p>
        </div>

        {/* Card Body */}
        <div style={{ padding: "2rem" }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Name Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="firstName"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  First Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="lastName"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Last Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            {/* Mobile Number (Optional) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="mobile"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Mobile Number{" "}
                <span style={{ color: "#6b7280", fontWeight: "400" }}>
                  (Optional)
                </span>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Email */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="email"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Email Address <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Country */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="country"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Country <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Address (Optional) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="address"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Address{" "}
                <span style={{ color: "#6b7280", fontWeight: "400" }}>
                  (Optional)
                </span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your address"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Signature Pad */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Your Digital Signature{" "}
                <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <SignaturePad
                onSignatureChange={handleSignatureChange}
                clearTrigger={clearSignature}
              />
            </div>

            {/* Submit */}
            <div style={{ paddingTop: "0.5rem" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "white",
                  background: isSubmitting
                    ? "#9ca3af"
                    : "linear-gradient(to right, #3b82f6, #1e3a8a)",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit My Peace Pledge"}
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  textAlign: "center",
                  backgroundColor:
                    message.type === "success" ? "#f0fdf4" : "#fef2f2",
                  color: message.type === "success" ? "#166534" : "#991b1b",
                  border: `1px solid ${
                    message.type === "success" ? "#bbf7d0" : "#fecaca"
                  }`,
                }}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          form > div:first-child {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 640px) {
          section > div > div:last-child {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PledgeForm;
