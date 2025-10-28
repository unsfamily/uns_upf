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
      setMessage({ text: "Please fill in all required fields.", type: "error" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return false;
    }

    if (!signature) {
      setMessage({ text: "Please provide your digital signature.", type: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) return;

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

        if (onPledgeSubmit) onPledgeSubmit(submitData);

        setFormData({ firstName: "", lastName: "", mobile: "", email: "", country: "", address: "" });
        setClearSignature(true);
      } else {
        setMessage({ text: response.data.message || "An error occurred.", type: "error" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      let errorMessage =
        "Sorry, there was a connection error. Please check your internet connection and try again.";
      if (error.message.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Please check if the server is running and try again.";
      } else if (error.response) {
        errorMessage = error.response.data.message || "Server error occurred. Please try again.";
      }
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pledge" className="relative mb-16 px-4 py-10">
      <div className="bg_mask">
        <img src={bg1Img} alt="" />
      </div>

      <div className="mx-auto max-w-3xl rounded-xl border border-blue-200 bg-white bg-opacity-50 shadow-xl relative">
        {/* Card Header */}
        <div className="flex flex-col items-center gap-2 rounded-t-xl bg-gradient-to-r from-blue-500 to-blue-900 p-8 text-center text-white">
          <div className="mb-1 flex items-center justify-center gap-3">
            <h1 className="text-3xl font-bold">Sign Your Peace Pledge</h1>
          </div>
          <p className="text-lg text-blue-200">Add your voice to the global movement for peace</p>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Mobile Number (Optional) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mobile" className="text-sm font-semibold text-gray-700">
                Mobile Number <span className="font-normal text-gray-500">(Optional)</span>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-sm font-semibold text-gray-700">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-semibold text-gray-700">
                Address <span className="font-normal text-gray-500">(Optional)</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter your address"
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Signature Pad */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Your Digital Signature <span className="text-red-600">*</span>
              </label>
              <SignaturePad onSignatureChange={handleSignatureChange} clearTrigger={clearSignature} />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  `w-full rounded-lg px-4 py-4 text-center text-base font-semibold text-white transition-all ` +
                  (isSubmitting
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-blue-500 to-blue-900 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500")
                }
              >
                {isSubmitting ? "Submitting..." : "Submit My Peace Pledge"}
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div
                role="status"
                aria-live="polite"
                className={
                  `mt-4 rounded-lg border p-4 text-center ` +
                  (message.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800")
                }
              >
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PledgeForm;
