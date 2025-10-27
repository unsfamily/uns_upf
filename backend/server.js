const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const { sendThankYouEmail } = require("./services/emailService");
const { generateCertificate } = require("./services/certificateGenerator");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const ExcelJS = require("exceljs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Increased limit for signature images
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Admin login route and middleware
const fs = require("fs");
const path = require("path");

// Admin credentials management
const adminCredentialsPath = path.join(__dirname, "admin-credentials.json");

function getAdminCredentials() {
  try {
    if (fs.existsSync(adminCredentialsPath)) {
      const data = fs.readFileSync(adminCredentialsPath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading admin credentials:", error);
  }
  // Return default credentials from env or fallback
  return {
    username: process.env.ADMIN_USER || "admin",
    password: process.env.ADMIN_PASS || "password",
  };
}

function saveAdminCredentials(username, password) {
  try {
    fs.writeFileSync(
      adminCredentialsPath,
      JSON.stringify({ username, password }, null, 2)
    );
    return true;
  } catch (error) {
    console.error("Error saving admin credentials:", error);
    return false;
  }
}

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const credentials = getAdminCredentials();

  if (username === credentials.username && password === credentials.password) {
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", {
      expiresIn: process.env.JWT_EXPIRE || "2h",
    });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

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

// Get all pledges (protected route for admin)
app.get("/api/admin/pledges", adminAuth, async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT id, first_name, last_name, mobile, email, country, address, created_at FROM pledges ORDER BY created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching pledges:", error);
    res.status(500).json({ success: false, message: "Error fetching pledges" });
  }
});

// Get pledge count (protected route for admin)
app.get("/api/admin/pledges/count", adminAuth, async (req, res) => {
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

// Change admin password (protected route)
app.post(
  "/api/admin/change-password",
  adminAuth,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { currentPassword, newPassword } = req.body;
    const credentials = getAdminCredentials();

    // Verify current password
    if (currentPassword !== credentials.password) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Save new password
    const saved = saveAdminCredentials(credentials.username, newPassword);
    if (saved) {
      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to save new password",
      });
    }
  }
);

// Export pledges as XLSX (protected route for admin)
app.get("/api/admin/pledges/export", adminAuth, async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT id, first_name, last_name, mobile, email, country, address, created_at FROM pledges ORDER BY created_at DESC"
    );

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Peace Pledges");

    // Define columns
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "First Name", key: "first_name", width: 20 },
      { header: "Last Name", key: "last_name", width: 20 },
      { header: "Mobile", key: "mobile", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Country", key: "country", width: 20 },
      { header: "Address", key: "address", width: 40 },
      { header: "Created At", key: "created_at", width: 20 },
    ];

    // Add rows
    rows.forEach((row) => {
      worksheet.addRow({
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        mobile: row.mobile || "",
        email: row.email,
        country: row.country,
        address: row.address || "",
        created_at: row.created_at,
      });
    });

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=peace_pledges_${Date.now()}.xlsx`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting pledges:", error);
    res
      .status(500)
      .json({ success: false, message: "Error exporting pledges" });
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
    body("mobile").optional().trim(),
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

    const { firstName, lastName, mobile, email, country, address, signature } =
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
        "INSERT INTO pledges (first_name, last_name, mobile, email, country, address, signature, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
        [
          firstName,
          lastName,
          mobile || null,
          email,
          country,
          address || null,
          signature,
        ]
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
      "SELECT id, first_name, last_name, mobile, email, country, address, created_at FROM pledges WHERE id = ?",
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
