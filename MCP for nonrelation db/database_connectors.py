import asyncio
import json
from typing import Dict, Any, Optional, Union
import logging
from abc import ABC, abstractmethod

# Database drivers
try:
    import pymongo
    from pymongo import MongoClient
    MONGODB_AVAILABLE = True
except ImportError:
    MONGODB_AVAILABLE = False

try:
    import redis
    import redis.asyncio as redis_async
    REDIS_AVAILABLE = True
except ImportError:
    REDIS_AVAILABLE = False

try:
    from cassandra.cluster import Cluster
    from cassandra.auth import PlainTextAuthProvider
    CASSANDRA_AVAILABLE = True
except ImportError:
    CASSANDRA_AVAILABLE = False

try:
    from elasticsearch import AsyncElasticsearch
    ELASTICSEARCH_AVAILABLE = True
except ImportError:
    ELASTICSEARCH_AVAILABLE = False

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BaseConnector(ABC):
    """Abstract base class for database connectors"""
    
    @abstractmethod
    async def connect(self, **kwargs) -> Dict[str, Any]:
        """Connect to the database"""
        pass
    
    @abstractmethod
    async def disconnect(self):
        """Disconnect from the database"""
        pass
    
    @abstractmethod
    async def test_connection(self) -> bool:
        """Test the database connection"""
        pass
    
    @abstractmethod
    async def get_info(self) -> Dict[str, Any]:
        """Get database information"""
        pass

class MongoDBConnector(BaseConnector):
    """MongoDB connector"""
    
    def __init__(self):
        self.client = None
        self.database = None
        self.connection_info = {}
    
    async def connect(self, connection_string: str, database_name: str, 
                     username: Optional[str] = None, password: Optional[str] = None,
                     **kwargs) -> Dict[str, Any]:
        try:
            if not MONGODB_AVAILABLE:
                raise ImportError("pymongo is not installed")
            
            # Use the connection string as provided (it already includes auth if needed)
            # Handle SSL parameter separately
            mongo_kwargs = {}
            if 'ssl' in kwargs:
                mongo_kwargs['ssl'] = kwargs['ssl']
            if 'auth_source' in kwargs:
                mongo_kwargs['authSource'] = kwargs['auth_source']
            
            self.client = MongoClient(connection_string, **mongo_kwargs)
            self.database = self.client[database_name]
            
            # Test connection
            await self.test_connection()
            
            self.connection_info = {
                "type": "mongodb",
                "connection_string": connection_string,
                "database_name": database_name,
                "collections": await self.get_collections(),
                "stats": await self.get_database_stats()
            }
            
            return self.connection_info
            
        except Exception as e:
            logger.error(f"MongoDB connection failed: {str(e)}")
            raise
    
    async def disconnect(self):
        if self.client:
            self.client.close()
            self.client = None
            self.database = None
            self.connection_info = {}
    
    async def test_connection(self) -> bool:
        try:
            # Ping the database
            self.client.admin.command('ping')
            return True
        except Exception as e:
            logger.error(f"MongoDB connection test failed: {str(e)}")
            return False
    
    async def get_info(self) -> Dict[str, Any]:
        return self.connection_info
    
    async def get_collections(self) -> list:
        """Get list of collections"""
        try:
            return await asyncio.get_event_loop().run_in_executor(
                None, lambda: self.database.list_collection_names()
            )
        except Exception as e:
            logger.error(f"Failed to get collections: {str(e)}")
            return []
    
    async def get_database_stats(self) -> Dict[str, Any]:
        """Get database statistics"""
        try:
            return await asyncio.get_event_loop().run_in_executor(
                None, lambda: self.database.command("dbStats")
            )
        except Exception as e:
            logger.error(f"Failed to get database stats: {str(e)}")
            return {}

class RedisConnector(BaseConnector):
    """Redis connector"""
    
    def __init__(self):
        self.client = None
        self.connection_info = {}
    
    async def connect(self, connection_string: str, **kwargs) -> Dict[str, Any]:
        try:
            if not REDIS_AVAILABLE:
                raise ImportError("redis is not installed")
            
            # Parse connection string
            if connection_string.startswith("redis://"):
                self.client = redis_async.from_url(connection_string, **kwargs)
            else:
                # Assume it's a host:port format
                host, port = connection_string.split(":")
                self.client = redis_async.Redis(host=host, port=int(port), **kwargs)
            
            # Test connection
            await self.test_connection()
            
            self.connection_info = {
                "type": "redis",
                "connection_string": connection_string,
                "keys": await self.get_keys(),
                "info": await self.get_redis_info()
            }
            
            return self.connection_info
            
        except Exception as e:
            logger.error(f"Redis connection failed: {str(e)}")
            raise
    
    async def disconnect(self):
        if self.client:
            await self.client.close()
            self.client = None
            self.connection_info = {}
    
    async def test_connection(self) -> bool:
        try:
            await self.client.ping()
            return True
        except Exception as e:
            logger.error(f"Redis connection test failed: {str(e)}")
            return False
    
    async def get_info(self) -> Dict[str, Any]:
        return self.connection_info
    
    async def get_keys(self) -> list:
        """Get all keys"""
        try:
            return await self.client.keys("*")
        except Exception as e:
            logger.error(f"Failed to get keys: {str(e)}")
            return []
    
    async def get_redis_info(self) -> Dict[str, Any]:
        """Get Redis server information"""
        try:
            info = await self.client.info()
            return {
                "version": info.get("redis_version"),
                "connected_clients": info.get("connected_clients"),
                "used_memory": info.get("used_memory_human"),
                "total_commands_processed": info.get("total_commands_processed")
            }
        except Exception as e:
            logger.error(f"Failed to get Redis info: {str(e)}")
            return {}

class CassandraConnector(BaseConnector):
    """Cassandra connector"""
    
    def __init__(self):
        self.cluster = None
        self.session = None
        self.keyspace = None
        self.connection_info = {}
    
    async def connect(self, connection_string: str, keyspace: str,
                     username: Optional[str] = None, password: Optional[str] = None,
                     **kwargs) -> Dict[str, Any]:
        try:
            if not CASSANDRA_AVAILABLE:
                raise ImportError("cassandra-driver is not installed")
            
            # Parse connection string (host:port format)
            hosts = connection_string.split(",")
            
            # Create auth provider if credentials provided
            auth_provider = None
            if username and password:
                auth_provider = PlainTextAuthProvider(username=username, password=password)
            
            self.cluster = Cluster(contact_points=hosts, auth_provider=auth_provider, **kwargs)
            self.session = await asyncio.get_event_loop().run_in_executor(
                None, self.cluster.connect, keyspace
            )
            self.keyspace = keyspace
            
            # Test connection
            await self.test_connection()
            
            self.connection_info = {
                "type": "cassandra",
                "connection_string": connection_string,
                "keyspace": keyspace,
                "tables": await self.get_tables(),
                "cluster_info": await self.get_cluster_info()
            }
            
            return self.connection_info
            
        except Exception as e:
            logger.error(f"Cassandra connection failed: {str(e)}")
            raise
    
    async def disconnect(self):
        if self.session:
            await asyncio.get_event_loop().run_in_executor(None, self.session.shutdown)
        if self.cluster:
            await asyncio.get_event_loop().run_in_executor(None, self.cluster.shutdown)
        self.session = None
        self.cluster = None
        self.connection_info = {}
    
    async def test_connection(self) -> bool:
        try:
            await asyncio.get_event_loop().run_in_executor(
                None, lambda: self.session.execute("SELECT release_version FROM system.local")
            )
            return True
        except Exception as e:
            logger.error(f"Cassandra connection test failed: {str(e)}")
            return False
    
    async def get_info(self) -> Dict[str, Any]:
        return self.connection_info
    
    async def get_tables(self) -> list:
        """Get list of tables"""
        try:
            result = await asyncio.get_event_loop().run_in_executor(
                None, lambda: self.session.execute(
                    "SELECT table_name FROM system_schema.tables WHERE keyspace_name = %s",
                    (self.keyspace,)
                )
            )
            return [row.table_name for row in result]
        except Exception as e:
            logger.error(f"Failed to get tables: {str(e)}")
            return []
    
    async def get_cluster_info(self) -> Dict[str, Any]:
        """Get cluster information"""
        try:
            result = await asyncio.get_event_loop().run_in_executor(
                None, lambda: self.session.execute("SELECT release_version FROM system.local")
            )
            return {
                "version": result.one().release_version if result.one() else "Unknown"
            }
        except Exception as e:
            logger.error(f"Failed to get cluster info: {str(e)}")
            return {}

class ElasticsearchConnector(BaseConnector):
    """Elasticsearch connector"""
    
    def __init__(self):
        self.client = None
        self.connection_info = {}
    
    async def connect(self, connection_string: str, **kwargs) -> Dict[str, Any]:
        try:
            if not ELASTICSEARCH_AVAILABLE:
                raise ImportError("elasticsearch is not installed")
            
            self.client = AsyncElasticsearch([connection_string], **kwargs)
            
            # Test connection
            await self.test_connection()
            
            self.connection_info = {
                "type": "elasticsearch",
                "connection_string": connection_string,
                "indices": await self.get_indices(),
                "cluster_info": await self.get_cluster_info()
            }
            
            return self.connection_info
            
        except Exception as e:
            logger.error(f"Elasticsearch connection failed: {str(e)}")
            raise
    
    async def disconnect(self):
        if self.client:
            await self.client.close()
            self.client = None
            self.connection_info = {}
    
    async def test_connection(self) -> bool:
        try:
            await self.client.ping()
            return True
        except Exception as e:
            logger.error(f"Elasticsearch connection test failed: {str(e)}")
            return False
    
    async def get_info(self) -> Dict[str, Any]:
        return self.connection_info
    
    async def get_indices(self) -> list:
        """Get list of indices"""
        try:
            indices = await self.client.cat.indices(format="json")
            return [index["index"] for index in indices]
        except Exception as e:
            logger.error(f"Failed to get indices: {str(e)}")
            return []
    
    async def get_cluster_info(self) -> Dict[str, Any]:
        """Get cluster information"""
        try:
            info = await self.client.info()
            return {
                "version": info.get("version", {}).get("number"),
                "cluster_name": info.get("cluster_name"),
                "name": info.get("name")
            }
        except Exception as e:
            logger.error(f"Failed to get cluster info: {str(e)}")
            return {}

class DatabaseConnector:
    """Main database connector class that manages different database types"""
    
    def __init__(self):
        self.connector = None
        self.connection_info = {}
    
    async def connect(self, db_type: str, connection_string: str, 
                     database_name: Optional[str] = None, keyspace: Optional[str] = None,
                     username: Optional[str] = None, password: Optional[str] = None,
                     additional_params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Connect to a database based on type"""
        
        # Disconnect from existing connection
        await self.disconnect()
        
        # Create appropriate connector
        if db_type.lower() == "mongodb":
            self.connector = MongoDBConnector()
            connection_result = await self.connector.connect(
                connection_string=connection_string,
                database_name=database_name,
                username=username,
                password=password,
                **(additional_params or {})
            )
        elif db_type.lower() == "redis":
            self.connector = RedisConnector()
            connection_result = await self.connector.connect(
                connection_string=connection_string,
                username=username,
                password=password,
                **(additional_params or {})
            )
        elif db_type.lower() == "cassandra":
            self.connector = CassandraConnector()
            connection_result = await self.connector.connect(
                connection_string=connection_string,
                keyspace=keyspace or database_name,
                username=username,
                password=password,
                **(additional_params or {})
            )
        elif db_type.lower() == "elasticsearch":
            self.connector = ElasticsearchConnector()
            connection_result = await self.connector.connect(
                connection_string=connection_string,
                **(additional_params or {})
            )
        else:
            raise ValueError(f"Unsupported database type: {db_type}")
        
        self.connection_info = connection_result
        return connection_result
    
    async def disconnect(self):
        """Disconnect from the current database"""
        if self.connector:
            await self.connector.disconnect()
            self.connector = None
            self.connection_info = {}
    
    def is_connected(self) -> bool:
        """Check if connected to a database"""
        return self.connector is not None
    
    def get_connection_info(self) -> Dict[str, Any]:
        """Get current connection information"""
        return self.connection_info
    
    async def get_client(self):
        """Get the database client"""
        if not self.is_connected():
            raise RuntimeError("No database connected")
        return self.connector
    
    async def execute_query(self, query: str, params: Optional[Dict[str, Any]] = None) -> Any:
        """Execute a query on the connected database"""
        if not self.is_connected():
            raise RuntimeError("No database connected")
        
        # This is a simplified version - actual implementation would depend on database type
        if hasattr(self.connector, 'execute_query'):
            return await self.connector.execute_query(query, params)
        else:
            raise NotImplementedError("Query execution not implemented for this database type") 