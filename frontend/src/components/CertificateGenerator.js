import React, { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import logoImg from "../assets/logo_img.png";
import gmahanImg from "../assets/ggmahan.png";

const CertificateGenerator = ({ pledgeData, onDownloadComplete }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const createCertificateCanvas = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = 3;
      canvas.width = 800 * scale;
      canvas.height = 600 * scale;

      ctx.scale(scale, scale);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Fill background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 800, 600);

      // Draw gradient border
      const borderGradient = ctx.createLinearGradient(0, 0, 800, 0);
      borderGradient.addColorStop(0, "#60a5fa");
      borderGradient.addColorStop(0.5, "#4ade80");
      borderGradient.addColorStop(1, "#60a5fa");

      ctx.strokeStyle = borderGradient;
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, 792, 592);

      // Inner white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(20, 20, 760, 560);

      let imagesLoaded = 0;
      const totalImages = 2;

      const upfLogo = new Image();
      upfLogo.crossOrigin = "anonymous";
      upfLogo.onload = function () {
        ctx.drawImage(upfLogo, 350, 40, 100, 100);
        imagesLoaded++;
        if (imagesLoaded === totalImages) completeDrawing();
      };
      upfLogo.onerror = function () {
        console.error(
          "Failed to load UPF logo from URL, trying local fallback"
        );
        // Try local fallback
        const fallbackLogo = new Image();
        fallbackLogo.onload = function () {
          ctx.drawImage(fallbackLogo, 350, 40, 100, 100);
          imagesLoaded++;
          if (imagesLoaded === totalImages) completeDrawing();
        };
        fallbackLogo.onerror = function () {
          console.error("Failed to load local logo, continuing without logo");
          imagesLoaded++;
          if (imagesLoaded === totalImages) completeDrawing();
        };
        fallbackLogo.src = logoImg;
      };
      upfLogo.src =
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8bf2501a9_UPF.png";

      const gurumahanPhoto = new Image();
      gurumahanPhoto.crossOrigin = "anonymous";
      gurumahanPhoto.onload = function () {
        imagesLoaded++;
        if (imagesLoaded === totalImages) completeDrawing();
      };
      gurumahanPhoto.onerror = function () {
        console.error(
          "Failed to load GuruMahan photo from URL, trying local fallback"
        );
        // Try local fallback
        const fallbackPhoto = new Image();
        fallbackPhoto.onload = function () {
          imagesLoaded++;
          if (imagesLoaded === totalImages) completeDrawing();
        };
        fallbackPhoto.onerror = function () {
          console.error("Failed to load local photo, continuing without photo");
          imagesLoaded++;
          if (imagesLoaded === totalImages) completeDrawing();
        };
        fallbackPhoto.src = gmahanImg;
      };
      gurumahanPhoto.src =
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45fcfa489_image.png";

      function completeDrawing() {
        // Header text - UNIVERSAL PEACE FOUNDATION
        ctx.fillStyle = "#1e293b";
        ctx.font = "600 10px Arial";
        ctx.letterSpacing = "0.18em";
        ctx.textAlign = "center";
        ctx.fillText("UNIVERSAL PEACE FOUNDATION", 400, 155);

        // Title - CERTIFICATE OF APPRECIATION
        ctx.fillStyle = "#0f172a";
        ctx.font = "800 36px Georgia";
        ctx.letterSpacing = "0";
        ctx.fillText("CERTIFICATE OF APPRECIATION", 400, 200);

        // Decorative divider
        const dividerGradient = ctx.createLinearGradient(320, 215, 480, 215);
        dividerGradient.addColorStop(0, "#059669");
        dividerGradient.addColorStop(1, "#3b82f6");
        ctx.strokeStyle = dividerGradient;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(320, 225);
        ctx.lineTo(480, 225);
        ctx.stroke();

        // Body text - "This certificate is proudly presented to"
        ctx.fillStyle = "#475569";
        ctx.font = "16px Arial";
        ctx.fillText("This certificate is proudly presented to", 400, 260);

        // Recipient name
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 42px Georgia";
        const fullName = `${pledgeData.firstName} ${pledgeData.lastName}`;
        ctx.fillText(fullName, 400, 310);

        // Appreciation text (multi-line)
        ctx.fillStyle = "#334155";
        ctx.font = "16px Arial";
        const appreciationLine1 =
          "in sincere appreciation for joining millions worldwide in the";
        const appreciationLine2 =
          "Global Peace Pledge, demonstrating commitment to world harmony";
        const appreciationLine3 = "and universal brotherhood.";

        ctx.fillText(appreciationLine1, 400, 350);
        ctx.fillText(appreciationLine2, 400, 370);
        ctx.fillText(appreciationLine3, 400, 390);

        // User signature - left side
        if (pledgeData.signature) {
          const signatureImg = new Image();
          signatureImg.onload = function () {
            // Draw signature on left side
            ctx.drawImage(signatureImg, 100, 420, 140, 70);

            // Signature line and label for user - left side
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(110, 500);
            ctx.lineTo(230, 500);
            ctx.stroke();

            ctx.fillStyle = "#475569";
            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Your Signature", 170, 518);

            // Continue with the rest of the drawing
            drawGuruMahanAndFinish();
          };
          signatureImg.src = pledgeData.signature;
        } else {
          // No signature - draw placeholder
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(110, 500);
          ctx.lineTo(230, 500);
          ctx.stroke();

          ctx.fillStyle = "#475569";
          ctx.font = "14px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Your Signature", 170, 518);

          drawGuruMahanAndFinish();
        }

        function drawGuruMahanAndFinish() {
          // GuruMahan photo - centered
          if (gurumahanPhoto.complete && gurumahanPhoto.naturalWidth > 0) {
            const centerX = 400;
            const photoY = 465;
            const photoRadius = 50;

            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, photoY, photoRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(
              gurumahanPhoto,
              centerX - photoRadius,
              photoY - photoRadius,
              photoRadius * 2,
              photoRadius * 2
            );
            ctx.restore();

            // Border around photo
            ctx.strokeStyle = "#e5e7eb";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, photoY, photoRadius, 0, Math.PI * 2);
            ctx.stroke();
          }

          // GuruMahan name and title - centered below photo
          ctx.fillStyle = "#475569";
          ctx.font = "600 16px Arial";
          ctx.textAlign = "center";
          ctx.fillText("His Holiness GuruMahan", 400, 535);

          ctx.font = "14px Arial";
          ctx.fillStyle = "#64748b";
          ctx.fillText("Global Peace Ambassador", 400, 552);

          // Date and location info - centered
          ctx.textAlign = "center";
          ctx.font = "11px Arial";
          ctx.fillStyle = "#64748b";
          ctx.fillText("GLOBAL PEACE DAY", 400, 425);

          ctx.font = "bold 14px Arial";
          ctx.fillStyle = "#1e293b";
          ctx.fillText("November 11, 2025", 400, 442);

          ctx.font = "13px Arial";
          ctx.fillStyle = "#475569";
          ctx.fillText("Pondicherry, India", 400, 458);

          resolve(canvas);
        }
      }
    });
  };

  const downloadPDF = async () => {
    if (!pledgeData || !pledgeData.firstName) {
      alert("Please submit the pledge form first!");
      return;
    }

    try {
      setIsGenerating(true);
      const canvas = await createCertificateCanvas();

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `Peace-Pledge-Certificate-${pledgeData.firstName}-${pledgeData.lastName}.pdf`
      );

      setIsGenerating(false);
      if (onDownloadComplete) onDownloadComplete();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF certificate. Please try again.");
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!pledgeData || !pledgeData.firstName) {
      alert("Please submit the pledge form first!");
      return;
    }

    try {
      setIsGenerating(true);
      const canvas = await createCertificateCanvas();

      const link = document.createElement("a");
      link.download = `Peace-Pledge-Certificate-${pledgeData.firstName}-${pledgeData.lastName}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsGenerating(false);
      if (onDownloadComplete) onDownloadComplete();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error generating image certificate. Please try again.");
      setIsGenerating(false);
    }
  };

  if (!pledgeData || !pledgeData.firstName) {
    return null;
  }

  return (
    <div
      id="certificateButtons"
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "1.5rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <button
        onClick={downloadPDF}
        disabled={isGenerating}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "600",
          color: "white",
          background: isGenerating
            ? "#9ca3af"
            : "linear-gradient(to right, #dc2626, #991b1b)",
          border: "none",
          borderRadius: "0.5rem",
          cursor: isGenerating ? "not-allowed" : "pointer",
          transition: "all 0.3s",
        }}
      >
        {isGenerating ? "Generating..." : "📄 Download Certificate (PDF)"}
      </button>
      <button
        onClick={downloadImage}
        disabled={isGenerating}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "600",
          color: "white",
          background: isGenerating
            ? "#9ca3af"
            : "linear-gradient(to right, #2563eb, #1e3a8a)",
          border: "none",
          borderRadius: "0.5rem",
          cursor: isGenerating ? "not-allowed" : "pointer",
          transition: "all 0.3s",
        }}
      >
        {isGenerating ? "Generating..." : "🖼️ Download Certificate (Image)"}
      </button>
    </div>
  );
};

export default CertificateGenerator;
