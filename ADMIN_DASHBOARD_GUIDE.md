# Admin Dashboard Guide

## Overview

The admin dashboard allows administrators to view all Peace Pledge form submissions and export them to Excel format.

## Features

1. **Secure Login**: JWT-based authentication
2. **View All Submissions**: See all pledge submissions in a table format
3. **Export to Excel**: Download all submissions as an XLSX file

## Setup

### Backend Setup

1. Make sure you have installed the required packages:

   ```bash
   cd backend
   npm install
   ```

2. Set admin credentials in your `.env` file (optional):

   ```
   ADMIN_USER=admin
   ADMIN_PASS=your_secure_password
   JWT_SECRET=your_jwt_secret_key
   ```

   Default credentials if not set:

   - Username: `admin`
   - Password: `password`

### Frontend Setup

The admin pages are already integrated into the React app.

## Access URLs

- **Admin Login**: `http://localhost:3001/admin/login`
- **Admin Dashboard**: `http://localhost:3001/admin/dashboard` (requires login)

## How to Use

### 1. Login

1. Navigate to `http://localhost:3001/admin/login`
2. Enter your admin credentials:
   - Username: `admin` (default)
   - Password: `password` (default)
3. Click "Login"

### 2. View Submissions

After logging in, you'll be redirected to the dashboard where you can see:

- ID
- First Name
- Last Name
- Email
- Country
- Address
- Created At (timestamp)

### 3. Download Excel File

1. Click the "Download Excel" button at the top of the dashboard
2. An XLSX file will be downloaded with all submission data
3. The filename format: `peace_pledges_[timestamp].xlsx`

### 4. Logout

Click the "Logout" button to end your session and return to the login page.

## API Endpoints

### Authentication

- **POST** `/api/admin/login`
  - Body: `{ "username": "admin", "password": "password" }`
  - Response: `{ "success": true, "token": "jwt_token" }`

### Protected Routes (Require Bearer Token)

- **GET** `/api/admin/pledges`

  - Returns: Array of all pledge submissions
  - Headers: `Authorization: Bearer <token>`

- **GET** `/api/admin/pledges/export`
  - Returns: XLSX file download
  - Headers: `Authorization: Bearer <token>`

## Security Notes

1. **Change Default Credentials**: Always change the default admin username and password in production
2. **Use Strong JWT Secret**: Set a strong JWT secret in your `.env` file
3. **HTTPS in Production**: Always use HTTPS in production environments
4. **Token Expiration**: JWT tokens expire after 2 hours for security
5. **Environment Variables**: Never commit `.env` files to version control

## Troubleshooting

### "Invalid credentials" error

- Double-check your username and password
- Make sure the backend server is running
- Check the `.env` file for correct credentials

### "No token provided" error

- Your session has expired or token is invalid
- Log in again to get a new token

### Cannot download Excel file

- Ensure you're logged in with a valid token
- Check browser console for errors
- Verify the backend server is running

## Mobile Responsive

The admin dashboard is fully responsive and works on mobile devices, tablets, and desktops.
