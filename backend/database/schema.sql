-- ============================================================================
-- Peace Pledge Database Schema
-- ============================================================================
-- Version: 1.1
-- Description: Complete database schema for the Peace Pledge application
-- Last Updated: October 27, 2025
-- ============================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS peace_pledge;

USE peace_pledge;

-- ============================================================================
-- Table: pledges
-- Description: Stores all peace pledge submissions with user information
-- ============================================================================
CREATE TABLE IF NOT EXISTS pledges (
  -- Primary Key
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- User Information (Required)
  first_name VARCHAR(100) NOT NULL COMMENT 'User first name',
  last_name VARCHAR(100) NOT NULL COMMENT 'User last name',
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'User email (unique identifier)',
  country VARCHAR(100) NOT NULL COMMENT 'User country',
  
  -- User Information (Optional)
  mobile VARCHAR(20) DEFAULT NULL COMMENT 'User mobile number (optional)',
  address TEXT DEFAULT NULL COMMENT 'User address (optional)',
  
  -- Signature Data
  signature LONGTEXT NOT NULL COMMENT 'Base64 encoded signature image',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Pledge submission date',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update date',
  
  -- Indexes for performance
  INDEX idx_email (email),
  INDEX idx_country (country),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Peace pledge submissions';

-- ============================================================================
-- View: pledge_statistics
-- Description: Provides aggregated statistics on pledges by date
-- ============================================================================
CREATE OR REPLACE VIEW pledge_statistics AS
SELECT 
  COUNT(*) as total_pledges,
  COUNT(DISTINCT country) as countries_represented,
  DATE(created_at) as pledge_date,
  COUNT(*) as daily_count
FROM pledges
GROUP BY DATE(created_at)
ORDER BY pledge_date DESC;

-- ============================================================================
-- Useful Queries for Analytics
-- ============================================================================

-- Get total pledge count
-- SELECT COUNT(*) as total_pledges FROM pledges;

-- Get country-wise statistics
-- SELECT country, COUNT(*) as count FROM pledges GROUP BY country ORDER BY count DESC;

-- Get daily statistics
-- SELECT DATE(created_at) as date, COUNT(*) as count FROM pledges GROUP BY DATE(created_at) ORDER BY date DESC;

-- Get recent pledges
-- SELECT id, first_name, last_name, country, created_at FROM pledges ORDER BY created_at DESC LIMIT 10;

-- Search pledges by email
-- SELECT * FROM pledges WHERE email = 'user@example.com';

-- ============================================================================
-- End of Schema
-- ============================================================================
