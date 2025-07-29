#!/usr/bin/env python3
"""
Startup script for MCP Non-Relational Database Analyzer
"""

import os
import sys
import asyncio
import uvicorn
from pathlib import Path

def check_dependencies():
    """Check if all required dependencies are installed"""
    required_packages = [
        'fastapi',
        'uvicorn',
        'pymongo',
        'redis',
        'cassandra-driver',
        'elasticsearch',
        'pandas',
        'numpy',
        'python-dotenv',
        'pydantic'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ Missing required packages:")
        for package in missing_packages:
            print(f"   • {package}")
        print("\n💡 Install missing packages with:")
        print("   pip install -r requirements.txt")
        return False
    
    print("✅ All required packages are installed")
    return True

def check_environment():
    """Check environment configuration"""
    env_file = Path(".env")
    
    if not env_file.exists():
        print("⚠️  No .env file found")
        print("💡 Copy env.example to .env and configure your settings")
        return False
    
    print("✅ Environment file found")
    return True

def print_banner():
    """Print application banner"""
    banner = """
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║    MCP Non-Relational Database Analyzer                     ║
    ║                                                              ║
    ║    🏨 Hotel Management Focus                               ║
    ║    🔍 Intelligent Database Analysis                         ║
    ║    💬 Natural Language Chat Interface                       ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    """
    print(banner)

def print_endpoints():
    """Print available endpoints"""
    endpoints = """
    📡 Available Endpoints:
    ──────────────────────────────────────────────────────────────
    
    🔗 Connection:
       POST /connect          - Connect to database
    
    📊 Analysis:
       POST /analyze          - Analyze database
       GET  /schema           - Get schema information
       GET  /collections      - List collections
    
    💡 Insights:
       GET  /insights         - Generate business insights
    
    💬 Chat:
       POST /chat             - Chat with database
    
    🔧 System:
       GET  /health           - Health check
       GET  /                 - API documentation
    
    ──────────────────────────────────────────────────────────────
    """
    print(endpoints)

def print_examples():
    """Print usage examples"""
    examples = """
    💬 Chat Examples:
    ──────────────────────────────────────────────────────────────
    
    • "Show me the database schema"
    • "Analyze data quality"
    • "Generate business insights"
    • "What are the top performing hotels?"
    • "Show me revenue trends"
    • "How is the database performance?"
    
    ──────────────────────────────────────────────────────────────
    """
    print(examples)

async def main():
    """Main startup function"""
    
    print_banner()
    
    # Check dependencies
    print("🔍 Checking dependencies...")
    if not check_dependencies():
        sys.exit(1)
    
    # Check environment
    print("\n🔍 Checking environment...")
    check_environment()
    
    # Print endpoints and examples
    print_endpoints()
    print_examples()
    
    # Start the server
    print("🚀 Starting MCP Non-Relational Database Analyzer...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📖 API documentation: http://localhost:8000/docs")
    print("🔧 ReDoc documentation: http://localhost:8000/redoc")
    print("\n⏹️  Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        # Import and run the FastAPI app
        from main import app
        
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
        
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped by user")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main()) 