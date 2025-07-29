#!/bin/bash

echo "🚀 Starting MCP Database Analyzer Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Navigate to frontend directory
cd "frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check if backend is running
echo "🔍 Checking if backend is running..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "⚠️  Backend is not running on http://localhost:8000"
    echo "   Please start the backend first using: python main.py"
    echo "   Or run: ./start.py"
fi

echo "🌐 Starting React development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo ""
echo "📱 You can now:"
echo "   1. Connect to your database"
echo "   2. Start chatting with AI"
echo "   3. Run database analysis"
echo "   4. Generate business insights"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm start 