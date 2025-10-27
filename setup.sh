#!/bin/bash

echo "🌍 Global Peace Pledge - Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null
then
    echo "⚠️  MySQL is not installed. Please install MySQL before proceeding."
    echo "   You can download it from: https://dev.mysql.com/downloads/"
    exit 1
fi

echo "✅ MySQL is installed"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your MySQL credentials"
fi

echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "======================================"
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Configure MySQL database:"
echo "   - Log in to MySQL: mysql -u root -p"
echo "   - Run: source backend/database/schema.sql"
echo ""
echo "2. Update backend/.env with your database credentials"
echo ""
echo "3. Start the application:"
echo "   - Backend:  cd backend && npm start"
echo "   - Frontend: cd frontend && npm start"
echo ""
echo "4. Access the application at http://localhost:3000"
echo ""
echo "🌟 For more information, see README.md"
echo "======================================"
