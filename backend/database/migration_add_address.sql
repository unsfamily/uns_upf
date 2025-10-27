-- Migration: Add address column to pledges table
-- Run this migration if you already have an existing database

USE peace_pledge;

-- Add address column (optional field)
ALTER TABLE pledges 
ADD COLUMN address TEXT AFTER country;

-- Verify the change
DESCRIBE pledges;

-- Optional: Check if the column was added successfully
SELECT 'Address column added successfully!' as Status;
