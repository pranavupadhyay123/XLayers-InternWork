#!/usr/bin/env python3
"""
Simple test script for MCP Non-Relational Database Analyzer
"""

import asyncio
import json
import sys
from typing import Dict, Any

# Import our modules
try:
    from database_connectors import DatabaseConnector
    from database_analyzer import DatabaseAnalyzer
    from insight_generator import InsightGenerator
    from chat_interface import ChatInterface
    from config import Config
except ImportError as e:
    print(f"Error importing modules: {e}")
    print("Make sure all required packages are installed: pip install -r requirements.txt")
    sys.exit(1)

async def test_components():
    """Test all components of the MCP system"""
    
    print("🧪 Testing MCP Non-Relational Database Analyzer Components\n")
    
    # Test 1: Configuration
    print("1. Testing Configuration...")
    try:
        Config.validate_config()
        print("   ✅ Configuration validation passed")
    except Exception as e:
        print(f"   ❌ Configuration validation failed: {e}")
    
    # Test 2: Database Connector
    print("\n2. Testing Database Connector...")
    try:
        db_connector = DatabaseConnector()
        print("   ✅ Database connector initialized")
        
        # Test connection info
        connection_info = db_connector.get_connection_info()
        print(f"   ✅ Connection info: {connection_info}")
        
    except Exception as e:
        print(f"   ❌ Database connector test failed: {e}")
    
    # Test 3: Database Analyzer
    print("\n3. Testing Database Analyzer...")
    try:
        analyzer = DatabaseAnalyzer()
        analyzer.set_connector(db_connector)
        print("   ✅ Database analyzer initialized")
        
        # Test analysis types
        analysis_types = Config.get_analysis_types()
        print(f"   ✅ Available analysis types: {list(analysis_types.keys())}")
        
    except Exception as e:
        print(f"   ❌ Database analyzer test failed: {e}")
    
    # Test 4: Insight Generator
    print("\n4. Testing Insight Generator...")
    try:
        insight_gen = InsightGenerator()
        insight_gen.set_connector(db_connector)
        insight_gen.set_analyzer(analyzer)
        print("   ✅ Insight generator initialized")
        
    except Exception as e:
        print(f"   ❌ Insight generator test failed: {e}")
    
    # Test 5: Chat Interface
    print("\n5. Testing Chat Interface...")
    try:
        chat_interface = ChatInterface()
        chat_interface.set_connector(db_connector)
        chat_interface.set_analyzer(analyzer)
        chat_interface.set_insight_generator(insight_gen)
        print("   ✅ Chat interface initialized")
        
        # Test message processing
        test_message = "Hello"
        response = await chat_interface.chat(test_message)
        print(f"   ✅ Chat response: {response.get('type', 'unknown')}")
        
    except Exception as e:
        print(f"   ❌ Chat interface test failed: {e}")
    
    # Test 6: Supported Databases
    print("\n6. Testing Supported Databases...")
    try:
        supported_dbs = Config.get_supported_databases()
        print("   ✅ Supported databases:")
        for db_type, description in supported_dbs.items():
            print(f"      • {db_type}: {description}")
        
    except Exception as e:
        print(f"   ❌ Supported databases test failed: {e}")
    
    print("\n🎉 Component testing completed!")

async def test_mongodb_connection():
    """Test MongoDB connection (if available)"""
    
    print("\n🔗 Testing MongoDB Connection...")
    
    try:
        db_connector = DatabaseConnector()
        
        # Try to connect to a local MongoDB instance
        connection_result = await db_connector.connect(
            db_type="mongodb",
            connection_string="mongodb://localhost:27017",
            database_name="test_hotel_db"
        )
        
        print("   ✅ MongoDB connection successful!")
        print(f"   📊 Connection info: {json.dumps(connection_result, indent=2)}")
        
        # Test analyzer
        analyzer = DatabaseAnalyzer()
        analyzer.set_connector(db_connector)
        
        # Test schema analysis
        schema = await analyzer.analyze("schema")
        print(f"   📋 Schema analysis: {json.dumps(schema, indent=2)}")
        
        # Disconnect
        await db_connector.disconnect()
        print("   ✅ MongoDB connection closed")
        
    except Exception as e:
        print(f"   ❌ MongoDB connection test failed: {e}")
        print("   💡 Make sure MongoDB is running on localhost:27017")

def print_usage_examples():
    """Print usage examples"""
    
    print("\n📖 Usage Examples:")
    print("=" * 50)
    
    print("\n1. Start the server:")
    print("   python main.py")
    
    print("\n2. Connect to MongoDB:")
    print("   curl -X POST http://localhost:8000/connect \\")
    print("     -H 'Content-Type: application/json' \\")
    print("     -d '{")
    print('       "db_type": "mongodb",')
    print('       "connection_string": "mongodb://localhost:27017",')
    print('       "database_name": "hotel_management"')
    print("     }'")
    
    print("\n3. Generate insights:")
    print("   curl http://localhost:8000/insights")
    
    print("\n4. Chat with database:")
    print("   curl -X POST http://localhost:8000/chat \\")
    print("     -H 'Content-Type: application/json' \\")
    print("     -d '{")
    print('       "message": "Show me the database schema"')
    print("     }'")
    
    print("\n5. Analyze specific aspects:")
    print("   curl -X POST http://localhost:8000/analyze \\")
    print("     -H 'Content-Type: application/json' \\")
    print("     -d '{")
    print('       "analysis_type": "data_quality"')
    print("     }'")

async def main():
    """Main test function"""
    
    print("🚀 MCP Non-Relational Database Analyzer - Test Suite")
    print("=" * 60)
    
    # Test components
    await test_components()
    
    # Test MongoDB connection (optional)
    await test_mongodb_connection()
    
    # Print usage examples
    print_usage_examples()
    
    print("\n✅ Test suite completed!")
    print("\n💡 To start using the MCP system:")
    print("   1. Ensure your database is running")
    print("   2. Update the configuration in env.example")
    print("   3. Run: python main.py")
    print("   4. Use the API endpoints or chat interface")

if __name__ == "__main__":
    asyncio.run(main()) 