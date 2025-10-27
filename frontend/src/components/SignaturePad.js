import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const SignaturePad = ({ onSignatureChange, clearTrigger }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (clearTrigger) {
      clearSignature();
    }
  }, [clearTrigger]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#2563eb";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const getEventPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    setHasSignature(true);
    const ctx = canvasRef.current.getContext("2d");
    const pos = getEventPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getEventPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (hasSignature) {
      const signatureData = canvasRef.current.toDataURL("image/png");
      onSignatureChange(signatureData);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          const rect = canvas.getBoundingClientRect();

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Calculate dimensions to maintain aspect ratio
          // Use 80% of canvas to leave some padding
          const maxWidth = rect.width * 0.8;
          const maxHeight = rect.height * 0.8;
          const imgAspectRatio = img.width / img.height;

          let drawWidth = maxWidth;
          let drawHeight = maxWidth / imgAspectRatio;

          if (drawHeight > maxHeight) {
            drawHeight = maxHeight;
            drawWidth = maxHeight * imgAspectRatio;
          }

          // Center the image on canvas
          const x = (rect.width - drawWidth) / 2;
          const y = (rect.height - drawHeight) / 2;

          ctx.drawImage(img, x, y, drawWidth, drawHeight);

          setHasSignature(true);
          const signatureData = canvas.toDataURL("image/png");
          onSignatureChange(signatureData);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          className="signature-pad"
          style={{
            width: "100%",
            height: "200px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            background: "white",
            cursor: "crosshair",
            touchAction: "none",
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              color: "#9ca3af",
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            Sign here or upload signature
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={clearSignature}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            color: "#dc2626",
            border: "1px solid #dc2626",
            borderRadius: "0.375rem",
            background: "white",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#dc2626";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "#dc2626";
          }}
        >
          Clear Signature
        </button>
        <label
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            color: "#2563eb",
            border: "1px solid #2563eb",
            borderRadius: "0.375rem",
            background: "white",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#2563eb";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "#2563eb";
          }}
        >
          Upload Signature
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default SignaturePad;
