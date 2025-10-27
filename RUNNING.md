# Running Backend with Absolute Path

## Issue Resolved

Port 5000 was occupied by macOS Control Center, so the backend is now configured to run on **port 5001**.

## Backend Server

### Start Command (Absolute Path)

```bash
cd /Users/apple/Projects/UPF/latest_src_repo/uns_upf/backend && /usr/local/bin/node /Users/apple/Projects/UPF/latest_src_repo/uns_upf/backend/server.js
```

### Current Configuration

- **Port:** 5001 (changed from 5000)
- **Database:** peace_pledge
- **Database User:** root
- **Database Password:** admin@123
- **API URL:** http://localhost:5001/api

## Frontend Configuration

The frontend proxy has been updated to point to port 5001 in `frontend/package.json`.

## Quick Start Commands

### Backend (with absolute path)

```bash
cd /Users/apple/Projects/UPF/latest_src_repo/uns_upf/backend && \
/usr/local/bin/node /Users/apple/Projects/UPF/latest_src_repo/uns_upf/backend/server.js
```

### Frontend

```bash
cd /Users/apple/Projects/UPF/latest_src_repo/uns_upf/frontend && npm start
```

## Status

✅ Backend running on http://localhost:5001  
✅ Database connected  
✅ API available at http://localhost:5001/api

## Next Steps

1. Start the frontend: `cd frontend && npm start`
2. Access the application at http://localhost:3000
3. Test the pledge form and certificate generation

## Notes

- macOS Control Center uses port 5000 by default
- All configuration files have been updated to use port 5001
- The .env file has been created from .env.example with your database credentials
