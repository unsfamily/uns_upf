@echo off
echo ================================
echo Global Peace Pledge - Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo [OK] Node.js version:
node --version

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

echo [OK] npm version:
npm --version

REM Check if MySQL is installed
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MySQL is not installed. Please install MySQL before proceeding.
    echo           You can download it from: https://dev.mysql.com/downloads/
    exit /b 1
)

echo [OK] MySQL is installed
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo [WARNING] Please update backend\.env with your MySQL credentials
)

echo Installing backend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend dependencies installed successfully
) else (
    echo [ERROR] Failed to install backend dependencies
    exit /b 1
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

echo Installing frontend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend dependencies installed successfully
) else (
    echo [ERROR] Failed to install frontend dependencies
    exit /b 1
)

cd ..

echo.
echo ================================
echo [OK] Setup completed successfully!
echo.
echo Next Steps:
echo 1. Configure MySQL database:
echo    - Log in to MySQL: mysql -u root -p
echo    - Run: source backend/database/schema.sql
echo.
echo 2. Update backend\.env with your database credentials
echo.
echo 3. Start the application:
echo    - Backend:  cd backend ^&^& npm start
echo    - Frontend: cd frontend ^&^& npm start
echo.
echo 4. Access the application at http://localhost:3000
echo.
echo For more information, see README.md
echo ================================
pause
