-- Create database
CREATE DATABASE IF NOT EXISTS peace_pledge;

USE peace_pledge;

-- Create pledges table
CREATE TABLE IF NOT EXISTS pledges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  address TEXT,
  signature LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_country (country),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create statistics view for easier querying
CREATE OR REPLACE VIEW pledge_statistics AS
SELECT 
  COUNT(*) as total_pledges,
  COUNT(DISTINCT country) as countries_represented,
  DATE(created_at) as pledge_date,
  COUNT(*) as daily_count
FROM pledges
GROUP BY DATE(created_at)
ORDER BY pledge_date DESC;

-- Sample query to get country-wise statistics
-- SELECT country, COUNT(*) as count FROM pledges GROUP BY country ORDER BY count DESC;

-- Sample query to get daily statistics
-- SELECT DATE(created_at) as date, COUNT(*) as count FROM pledges GROUP BY DATE(created_at) ORDER BY date DESC;
