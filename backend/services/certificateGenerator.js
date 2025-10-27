const { createCanvas, loadImage } = require("canvas");
const path = require("path");

/**
 * Generate a certificate image as a buffer
 * @param {Object} pledgeData - The pledge data containing firstName, lastName, signature
 * @returns {Promise<Buffer>} Certificate image buffer
 */
const generateCertificate = async (pledgeData) => {
  try {
    // Create canvas with high resolution
    const scale = 3;
    const width = 800 * scale;
    const height = 600 * scale;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Scale context for better quality
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 600);

    // Draw gradient border (matching the HTML preview)
    const borderGradient = ctx.createLinearGradient(0, 0, 800, 0);
    borderGradient.addColorStop(0, "#60a5fa"); // blue-400
    borderGradient.addColorStop(0.5, "#4ade80"); // green-400
    borderGradient.addColorStop(1, "#60a5fa"); // blue-400

    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, 790, 590);

    // Inner white background with padding
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(25, 25, 750, 550);

    // Try to load logo (UPF logo from URL or local)
    try {
      let logo = null;

      // First try to load from URL
      try {
        logo = await loadImage(
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8bf2501a9_UPF.png"
        );
      } catch (urlError) {
        // Fallback to local file
        const logoPath = path.join(__dirname, "../assets/logo_img.png");
        logo = await loadImage(logoPath).catch(() => null);
      }

      if (logo) {
        // Draw centered logo at top with larger size and proper width
        const logoWidth = 250;
        const logoHeight = 48;
        ctx.drawImage(logo, (800 - logoWidth) / 2, 40, logoWidth, logoHeight);
      }
    } catch (err) {
      console.log("Logo not found, continuing without it");
    }

    // Header text - UNIVERSAL PEACE FOUNDATION
    ctx.fillStyle = "#1e293b";
    ctx.font = "600 10px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.18em";
    ctx.fillText("UNIVERSAL PEACE FOUNDATION", 400, 110);

    // Title - CERTIFICATE OF APPRECIATION
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 36px Georgia, serif";
    ctx.letterSpacing = "0";
    ctx.fillText("CERTIFICATE OF APPRECIATION", 400, 165);

    // Decorative divider
    const dividerGradient = ctx.createLinearGradient(320, 180, 480, 180);
    dividerGradient.addColorStop(0, "#059669"); // green-600
    dividerGradient.addColorStop(1, "#3b82f6"); // blue-500
    ctx.strokeStyle = dividerGradient;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(320, 190);
    ctx.lineTo(480, 190);
    ctx.stroke();

    // Body text - "This certificate is proudly presented to"
    ctx.fillStyle = "#475569";
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText("This certificate is proudly presented to", 400, 230);

    // Recipient name
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 42px Georgia, serif";
    const fullName = `${pledgeData.firstName} ${pledgeData.lastName}`;
    ctx.fillText(fullName, 400, 280);

    // Appreciation text (multi-line)
    ctx.fillStyle = "#334155";
    ctx.font = "16px Arial, sans-serif";
    const appreciationLine1 =
      "in sincere appreciation for joining millions worldwide in the";
    const appreciationLine2 =
      "Global Peace Pledge, demonstrating commitment to world harmony";
    const appreciationLine3 = "and universal brotherhood.";

    ctx.fillText(appreciationLine1, 400, 320);
    ctx.fillText(appreciationLine2, 400, 340);
    ctx.fillText(appreciationLine3, 400, 360);

    // Left section - GuruMahan photo and signature
    try {
      let gurumahanPhoto = null;

      // First try to load from URL
      try {
        gurumahanPhoto = await loadImage(
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45fcfa489_image.png"
        );
      } catch (urlError) {
        // Fallback to local file
        const photoPath = path.join(__dirname, "../assets/ggmahan.png");
        gurumahanPhoto = await loadImage(photoPath).catch(() => null);
      }

      if (gurumahanPhoto) {
        // Draw circular photo - left side
        const leftX = 150;
        const photoY = 485;
        const photoRadius = 45;

        ctx.save();
        ctx.beginPath();
        ctx.arc(leftX, photoY, photoRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          gurumahanPhoto,
          leftX - photoRadius,
          photoY - photoRadius,
          photoRadius * 2,
          photoRadius * 2
        );
        ctx.restore();

        // Border around photo
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(leftX, photoY, photoRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    } catch (err) {
      console.log("GuruMahan photo not found, continuing without it");
    }

    // Signature line for GuruMahan - left side
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(95, 545);
    ctx.lineTo(205, 545);
    ctx.stroke();

    // GuruMahan name and title - left side
    ctx.fillStyle = "#475569";
    ctx.font = "600 14px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("His Holiness GuruMahan", 150, 560);

    ctx.font = "12px Arial, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Global Peace Ambassador", 150, 575);

    // Middle section - Event details
    ctx.textAlign = "center";
    ctx.font = "11px Arial, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("GLOBAL PEACE DAY", 400, 470);

    ctx.font = "bold 14px Arial, sans-serif";
    ctx.fillStyle = "#1e293b";
    ctx.fillText("November 11, 2025", 400, 490);

    ctx.font = "13px Arial, sans-serif";
    ctx.fillStyle = "#475569";
    ctx.fillText("Pondicherry, India", 400, 510);

    // Right section - User signature
    if (pledgeData.signature) {
      try {
        // Remove data URL prefix if present
        const base64Data = pledgeData.signature.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        const signatureBuffer = Buffer.from(base64Data, "base64");
        const signatureImg = await loadImage(signatureBuffer);

        // Calculate signature dimensions maintaining aspect ratio
        const maxWidth = 140;
        const maxHeight = 70;
        const imgAspectRatio = signatureImg.width / signatureImg.height;

        let drawWidth = maxWidth;
        let drawHeight = maxWidth / imgAspectRatio;

        if (drawHeight > maxHeight) {
          drawHeight = maxHeight;
          drawWidth = maxHeight * imgAspectRatio;
        }

        // Center the signature in the allocated space
        const signatureX = 650 - drawWidth / 2;
        const signatureY = 490 - drawHeight / 2;

        // Draw signature on right side with proper dimensions
        ctx.drawImage(
          signatureImg,
          signatureX,
          signatureY,
          drawWidth,
          drawHeight
        );
      } catch (err) {
        console.error("Error loading signature:", err);
      }
    }

    // Signature line and label for user - right side
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(595, 545);
    ctx.lineTo(705, 545);
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.font = "14px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Your Signature", 650, 560);

    // Convert canvas to buffer
    const buffer = canvas.toBuffer("image/png");
    return buffer;
  } catch (error) {
    console.error("Error generating certificate:", error);
    throw error;
  }
};

module.exports = {
  generateCertificate,
};
