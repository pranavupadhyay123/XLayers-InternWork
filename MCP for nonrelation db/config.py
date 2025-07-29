import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration class for the MCP application"""
    
    # Server configuration
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    
    # Database configuration
    DEFAULT_DB_TYPE = os.getenv("DEFAULT_DB_TYPE", "mongodb")
    DEFAULT_CONNECTION_STRING = os.getenv("DEFAULT_CONNECTION_STRING", "")
    DEFAULT_DATABASE_NAME = os.getenv("DEFAULT_DATABASE_NAME", "")
    
    # AI/ML configuration
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
    
    # Logging configuration
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # Analysis configuration
    MAX_SAMPLE_SIZE = int(os.getenv("MAX_SAMPLE_SIZE", 1000))
    ANALYSIS_CACHE_TTL = int(os.getenv("ANALYSIS_CACHE_TTL", 3600))  # 1 hour
    
    # Chat configuration
    MAX_SESSION_DURATION = int(os.getenv("MAX_SESSION_DURATION", 86400))  # 24 hours
    MAX_MESSAGES_PER_SESSION = int(os.getenv("MAX_MESSAGES_PER_SESSION", 100))
    
    # Hotel management specific configuration
    HOTEL_FIELDS = [
        "name", "address", "city", "country", "rating", "price", 
        "amenities", "description", "contact_info"
    ]
    
    BOOKING_FIELDS = [
        "hotel_id", "guest_name", "check_in", "check_out", 
        "room_type", "total_amount", "status", "booking_date"
    ]
    
    CUSTOMER_FIELDS = [
        "name", "email", "phone", "address", "preferences", 
        "total_bookings", "loyalty_points"
    ]
    
    @classmethod
    def get_database_config(cls, db_type: str) -> Dict[str, Any]:
        """Get database-specific configuration"""
        configs = {
            "mongodb": {
                "default_port": 27017,
                "connection_format": "mongodb://host:port/database",
                "required_fields": ["connection_string", "database_name"]
            },
            "redis": {
                "default_port": 6379,
                "connection_format": "redis://host:port",
                "required_fields": ["connection_string"]
            },
            "cassandra": {
                "default_port": 9042,
                "connection_format": "host:port",
                "required_fields": ["connection_string", "keyspace"]
            },
            "elasticsearch": {
                "default_port": 9200,
                "connection_format": "http://host:port",
                "required_fields": ["connection_string"]
            }
        }
        
        return configs.get(db_type.lower(), {})
    
    @classmethod
    def validate_config(cls) -> bool:
        """Validate the configuration"""
        required_vars = [
            "HOST",
            "PORT"
        ]
        
        for var in required_vars:
            if not getattr(cls, var):
                print(f"Warning: {var} is not set")
        
        return True
    
    @classmethod
    def get_analysis_types(cls) -> Dict[str, str]:
        """Get available analysis types"""
        return {
            "schema": "Database schema and structure analysis",
            "data_quality": "Data quality assessment and validation",
            "performance": "Database performance and optimization analysis",
            "business_insights": "Business intelligence and insights",
            "comprehensive": "Complete analysis including all types"
        }
    
    @classmethod
    def get_supported_databases(cls) -> Dict[str, str]:
        """Get supported database types"""
        return {
            "mongodb": "MongoDB - Document database",
            "redis": "Redis - In-memory data structure store",
            "cassandra": "Apache Cassandra - Distributed NoSQL database",
            "elasticsearch": "Elasticsearch - Search and analytics engine"
        } 