const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const { sendThankYouEmail } = require("./services/emailService");
const { generateCertificate } = require("./services/certificateGenerator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Increased limit for signature images
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "peace_pledge",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promisify pool for async/await
const promisePool = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
  connection.release();
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Get all pledges (optional - for admin/statistics)
app.get("/api/pledges", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT id, first_name, last_name, email, country, address, created_at FROM pledges ORDER BY created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching pledges:", error);
    res.status(500).json({ success: false, message: "Error fetching pledges" });
  }
});

// Get pledge count
app.get("/api/pledges/count", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT COUNT(*) as count FROM pledges"
    );
    res.json({ success: true, count: rows[0].count });
  } catch (error) {
    console.error("Error getting pledge count:", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting pledge count" });
  }
});

// Submit pledge
app.post(
  "/api/pledge",
  [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("country").trim().notEmpty().withMessage("Country is required"),
    body("address").optional().trim(),
    body("signature").notEmpty().withMessage("Signature is required"),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, country, address, signature } =
      req.body;

    try {
      // Check if email already exists
      const [existingPledges] = await promisePool.query(
        "SELECT id FROM pledges WHERE email = ?",
        [email]
      );

      if (existingPledges.length > 0) {
        return res.status(400).json({
          success: false,
          message: "This email has already signed the peace pledge.",
        });
      }

      // Insert pledge into database
      const [result] = await promisePool.query(
        "INSERT INTO pledges (first_name, last_name, email, country, address, signature, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
        [firstName, lastName, email, country, address || null, signature]
      );

      console.log(
        `✅ New pledge submitted: ${firstName} ${lastName} (${email}) from ${country}`
      );

      // Generate certificate and send email
      try {
        const certificateBuffer = await generateCertificate({
          firstName,
          lastName,
          signature,
        });

        await sendThankYouEmail(
          email,
          `${firstName} ${lastName}`,
          certificateBuffer
        );
        console.log(`✅ Thank you email sent to ${email}`);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail the request if email fails, just log it
      }

      res.json({
        success: true,
        message: "Thank you for pledging for Global Peace!",
        pledgeId: result.insertId,
      });
    } catch (error) {
      console.error("Error submitting pledge:", error);
      res.status(500).json({
        success: false,
        message:
          "An error occurred while submitting your pledge. Please try again.",
      });
    }
  }
);

// Get pledge by ID
app.get("/api/pledge/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await promisePool.query(
      "SELECT id, first_name, last_name, email, country, address, created_at FROM pledges WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Pledge not found" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error fetching pledge:", error);
    res.status(500).json({ success: false, message: "Error fetching pledge" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  pool.end(() => {
    console.log("MySQL pool closed");
  });
});
