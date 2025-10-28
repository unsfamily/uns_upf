# Quick Start Guide

## Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

## Installation

### 1. Run Setup Script

**macOS/Linux:**

```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**

```cmd
setup.bat
```

### 2. Configure Database

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source backend/database/schema.sql
```

### 3. Install System Fonts (IMPORTANT!)

For certificate generation to work properly:

```bash
cd backend
./install-fonts.sh
cd ..
```

Or manually:

- **Ubuntu/Debian**: `sudo apt-get install -y fonts-dejavu`
- **macOS**: Fonts usually pre-installed
- **Windows**: Fonts usually pre-installed

### 4. Update Environment Variables

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=peace_pledge
PORT=5000
```

### 5. Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

### 6. Access the Application

Open your browser and go to: `http://localhost:3000`

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

- Frontend: Update port in `frontend/package.json` proxy setting
- Backend: Update PORT in `backend/.env`

### Database Connection Error

- Verify MySQL is running
- Check credentials in `backend/.env`
- Ensure database `peace_pledge` exists

### Certificate Shows Boxes Instead of Text

- Run font installation: `cd backend && ./install-fonts.sh`
- Restart the backend server
- See DEPLOYMENT.md for more details

### Module Not Found

```bash
# Reinstall dependencies
cd backend && npm install
cd ../frontend && npm install
```

## Features to Test

1. ✅ Navigate through all sections
2. ✅ Fill out the pledge form
3. ✅ Draw or upload signature
4. ✅ Submit the form
5. ✅ Download PDF certificate
6. ✅ Download image certificate

## Need Help?

Check the full README.md for detailed documentation.
