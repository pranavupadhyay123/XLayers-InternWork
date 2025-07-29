import asyncio
import json
import pandas as pd
import numpy as np
from typing import Dict, List, Any, Optional, Union
import logging
from datetime import datetime, timedelta
import re

logger = logging.getLogger(__name__)

class DatabaseAnalyzer:
    """Analyzes non-relational databases and provides insights"""
    
    def __init__(self):
        self.db_connector = None
        self.analysis_cache = {}
    
    def set_connector(self, connector):
        """Set the database connector"""
        self.db_connector = connector
    
    async def analyze(self, analysis_type: str, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Perform database analysis based on type"""
        
        if not self.db_connector or not self.db_connector.is_connected():
            raise RuntimeError("No database connected")
        
        analysis_functions = {
            "schema": self.analyze_schema,
            "data_quality": self.analyze_data_quality,
            "performance": self.analyze_performance,
            "business_insights": self.analyze_business_insights,
            "comprehensive": self.comprehensive_analysis
        }
        
        if analysis_type not in analysis_functions:
            raise ValueError(f"Unsupported analysis type: {analysis_type}")
        
        return await analysis_functions[analysis_type](filters)
    
    async def analyze_schema(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze database schema"""
        try:
            db_type = self.db_connector.get_connection_info().get("type")
            
            if db_type == "mongodb":
                return await self._analyze_mongodb_schema(filters)
            elif db_type == "redis":
                return await self._analyze_redis_schema(filters)
            elif db_type == "cassandra":
                return await self._analyze_cassandra_schema(filters)
            elif db_type == "elasticsearch":
                return await self._analyze_elasticsearch_schema(filters)
            else:
                raise ValueError(f"Schema analysis not implemented for {db_type}")
                
        except Exception as e:
            logger.error(f"Schema analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def analyze_data_quality(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze data quality"""
        try:
            db_type = self.db_connector.get_connection_info().get("type")
            
            if db_type == "mongodb":
                return await self._analyze_mongodb_data_quality(filters)
            elif db_type == "redis":
                return await self._analyze_redis_data_quality(filters)
            elif db_type == "cassandra":
                return await self._analyze_cassandra_data_quality(filters)
            elif db_type == "elasticsearch":
                return await self._analyze_elasticsearch_data_quality(filters)
            else:
                raise ValueError(f"Data quality analysis not implemented for {db_type}")
                
        except Exception as e:
            logger.error(f"Data quality analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def analyze_performance(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze database performance"""
        try:
            db_type = self.db_connector.get_connection_info().get("type")
            
            if db_type == "mongodb":
                return await self._analyze_mongodb_performance(filters)
            elif db_type == "redis":
                return await self._analyze_redis_performance(filters)
            elif db_type == "cassandra":
                return await self._analyze_cassandra_performance(filters)
            elif db_type == "elasticsearch":
                return await self._analyze_elasticsearch_performance(filters)
            else:
                raise ValueError(f"Performance analysis not implemented for {db_type}")
                
        except Exception as e:
            logger.error(f"Performance analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def analyze_business_insights(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze business insights"""
        try:
            db_type = self.db_connector.get_connection_info().get("type")
            
            if db_type == "mongodb":
                return await self._analyze_mongodb_business_insights(filters)
            elif db_type == "redis":
                return await self._analyze_redis_business_insights(filters)
            elif db_type == "cassandra":
                return await self._analyze_cassandra_business_insights(filters)
            elif db_type == "elasticsearch":
                return await self._analyze_elasticsearch_business_insights(filters)
            else:
                raise ValueError(f"Business insights analysis not implemented for {db_type}")
                
        except Exception as e:
            logger.error(f"Business insights analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def comprehensive_analysis(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Perform comprehensive analysis"""
        try:
            results = {
                "schema": await self.analyze_schema(filters),
                "data_quality": await self.analyze_data_quality(filters),
                "performance": await self.analyze_performance(filters),
                "business_insights": await self.analyze_business_insights(filters),
                "timestamp": datetime.now().isoformat()
            }
            
            return results
            
        except Exception as e:
            logger.error(f"Comprehensive analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def get_schema(self) -> Dict[str, Any]:
        """Get database schema information"""
        return await self.analyze_schema()
    
    async def get_collections(self) -> List[str]:
        """Get list of collections/tables"""
        try:
            connection_info = self.db_connector.get_connection_info()
            db_type = connection_info.get("type")
            
            if db_type == "mongodb":
                return connection_info.get("collections", [])
            elif db_type == "redis":
                return connection_info.get("keys", [])
            elif db_type == "cassandra":
                return connection_info.get("tables", [])
            elif db_type == "elasticsearch":
                return connection_info.get("indices", [])
            else:
                return []
                
        except Exception as e:
            logger.error(f"Failed to get collections: {str(e)}")
            return []
    
    # MongoDB specific analysis methods
    async def _analyze_mongodb_schema(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze MongoDB schema"""
        try:
            connector = await self.db_connector.get_client()
            database = connector.database
            
            schema_analysis = {
                "database_name": database.name,
                "collections": {},
                "total_collections": 0,
                "total_documents": 0
            }
            
            collections = await asyncio.get_event_loop().run_in_executor(
                None, database.list_collection_names
            )
            
            schema_analysis["total_collections"] = len(collections)
            
            for collection_name in collections:
                collection = database[collection_name]
                
                # Get collection stats
                stats = await asyncio.get_event_loop().run_in_executor(
                    None, collection.stats
                )
                
                # Sample documents to understand schema
                sample_docs = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: list(collection.find().limit(10))
                )
                
                # Analyze field types
                field_types = self._analyze_document_fields(sample_docs)
                
                schema_analysis["collections"][collection_name] = {
                    "document_count": stats.get("count", 0),
                    "size_bytes": stats.get("size", 0),
                    "avg_document_size": stats.get("avgObjSize", 0),
                    "field_types": field_types,
                    "sample_documents": sample_docs[:3]  # First 3 docs as samples
                }
                
                schema_analysis["total_documents"] += stats.get("count", 0)
            
            return schema_analysis
            
        except Exception as e:
            logger.error(f"MongoDB schema analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def _analyze_mongodb_data_quality(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze MongoDB data quality"""
        try:
            connector = await self.db_connector.get_client()
            database = connector.database
            
            quality_analysis = {
                "collections": {},
                "overall_score": 0,
                "issues": []
            }
            
            collections = await asyncio.get_event_loop().run_in_executor(
                None, database.list_collection_names
            )
            
            total_score = 0
            collection_count = 0
            
            for collection_name in collections:
                collection = database[collection_name]
                
                # Check for null values
                null_count = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: collection.count_documents({"$or": [{"$expr": {"$eq": ["$", None]}}, {"$expr": {"$eq": ["$", ""]}}]})
                )
                
                # Check for duplicate documents
                total_docs = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: collection.count_documents({})
                )
                
                # Check for missing required fields (example for hotel data)
                missing_fields = {}
                hotel_fields = ["name", "address", "rating", "price"]
                for field in hotel_fields:
                    missing_count = await asyncio.get_event_loop().run_in_executor(
                        None, lambda f: collection.count_documents({f: {"$exists": False}}), field
                    )
                    if missing_count > 0:
                        missing_fields[field] = missing_count
                
                # Calculate quality score
                quality_score = max(0, 100 - (null_count / max(total_docs, 1)) * 100)
                if missing_fields:
                    quality_score -= len(missing_fields) * 10
                
                quality_analysis["collections"][collection_name] = {
                    "total_documents": total_docs,
                    "null_values": null_count,
                    "missing_fields": missing_fields,
                    "quality_score": quality_score,
                    "issues": []
                }
                
                if null_count > 0:
                    quality_analysis["collections"][collection_name]["issues"].append(
                        f"Found {null_count} documents with null/empty values"
                    )
                
                if missing_fields:
                    quality_analysis["collections"][collection_name]["issues"].append(
                        f"Missing required fields: {missing_fields}"
                    )
                
                total_score += quality_score
                collection_count += 1
            
            if collection_count > 0:
                quality_analysis["overall_score"] = total_score / collection_count
            
            return quality_analysis
            
        except Exception as e:
            logger.error(f"MongoDB data quality analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def _analyze_mongodb_performance(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze MongoDB performance"""
        try:
            connector = await self.db_connector.get_client()
            database = connector.database
            
            performance_analysis = {
                "database_stats": {},
                "collections": {},
                "recommendations": []
            }
            
            # Get database stats
            db_stats = await asyncio.get_event_loop().run_in_executor(
                None, database.command, "dbStats"
            )
            
            performance_analysis["database_stats"] = {
                "collections": db_stats.get("collections", 0),
                "data_size": db_stats.get("dataSize", 0),
                "storage_size": db_stats.get("storageSize", 0),
                "indexes": db_stats.get("indexes", 0),
                "index_size": db_stats.get("indexSize", 0)
            }
            
            collections = await asyncio.get_event_loop().run_in_executor(
                None, database.list_collection_names
            )
            
            for collection_name in collections:
                collection = database[collection_name]
                
                # Get collection stats
                stats = await asyncio.get_event_loop().run_in_executor(
                    None, collection.stats
                )
                
                # Get index information
                indexes = await asyncio.get_event_loop().run_in_executor(
                    None, collection.list_indexes
                )
                index_list = list(indexes)
                
                performance_analysis["collections"][collection_name] = {
                    "document_count": stats.get("count", 0),
                    "size_bytes": stats.get("size", 0),
                    "avg_document_size": stats.get("avgObjSize", 0),
                    "indexes": len(index_list),
                    "index_details": [
                        {
                            "name": idx.get("name"),
                            "keys": idx.get("key"),
                            "unique": idx.get("unique", False)
                        } for idx in index_list
                    ]
                }
            
            # Generate recommendations
            if performance_analysis["database_stats"]["indexes"] == 0:
                performance_analysis["recommendations"].append(
                    "Consider adding indexes for frequently queried fields"
                )
            
            return performance_analysis
            
        except Exception as e:
            logger.error(f"MongoDB performance analysis failed: {str(e)}")
            return {"error": str(e)}
    
    async def _analyze_mongodb_business_insights(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze MongoDB business insights (hotel management focus)"""
        try:
            connector = await self.db_connector.get_client()
            database = connector.database
            
            insights = {
                "hotel_insights": {},
                "booking_insights": {},
                "customer_insights": {},
                "revenue_insights": {},
                "recommendations": []
            }
            
            collections = await asyncio.get_event_loop().run_in_executor(
                None, database.list_collection_names
            )
            
            # Analyze hotels collection
            if "hotels" in collections:
                hotels_collection = database["hotels"]
                
                # Average rating analysis
                pipeline = [
                    {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}, "count": {"$sum": 1}}}
                ]
                rating_stats = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: list(hotels_collection.aggregate(pipeline))
                )
                
                if rating_stats:
                    insights["hotel_insights"]["average_rating"] = rating_stats[0].get("avg_rating", 0)
                    insights["hotel_insights"]["total_hotels"] = rating_stats[0].get("count", 0)
                
                # Price range analysis
                pipeline = [
                    {"$group": {"_id": None, "min_price": {"$min": "$price"}, "max_price": {"$max": "$price"}, "avg_price": {"$avg": "$price"}}}
                ]
                price_stats = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: list(hotels_collection.aggregate(pipeline))
                )
                
                if price_stats:
                    insights["hotel_insights"]["price_range"] = {
                        "min": price_stats[0].get("min_price", 0),
                        "max": price_stats[0].get("max_price", 0),
                        "average": price_stats[0].get("avg_price", 0)
                    }
            
            # Analyze bookings collection
            if "bookings" in collections:
                bookings_collection = database["bookings"]
                
                # Booking trends
                pipeline = [
                    {"$group": {"_id": "$status", "count": {"$sum": 1}}}
                ]
                booking_status = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: list(bookings_collection.aggregate(pipeline))
                )
                
                insights["booking_insights"]["status_distribution"] = {
                    status["_id"]: status["count"] for status in booking_status
                }
                
                # Revenue analysis
                pipeline = [
                    {"$match": {"status": "confirmed"}},
                    {"$group": {"_id": None, "total_revenue": {"$sum": "$total_amount"}, "avg_amount": {"$avg": "$total_amount"}}}
                ]
                revenue_stats = await asyncio.get_event_loop().run_in_executor(
                    None, lambda: list(bookings_collection.aggregate(pipeline))
                )
                
                if revenue_stats:
                    insights["revenue_insights"]["total_revenue"] = revenue_stats[0].get("total_revenue", 0)
                    insights["revenue_insights"]["average_booking_amount"] = revenue_stats[0].get("avg_amount", 0)
            
            # Generate business recommendations
            if insights["hotel_insights"].get("average_rating", 0) < 4.0:
                insights["recommendations"].append(
                    "Consider improving hotel ratings through better service and amenities"
                )
            
            if insights["booking_insights"].get("status_distribution", {}).get("cancelled", 0) > 0:
                insights["recommendations"].append(
                    "High cancellation rate detected. Review booking policies and customer service"
                )
            
            return insights
            
        except Exception as e:
            logger.error(f"MongoDB business insights analysis failed: {str(e)}")
            return {"error": str(e)}
    
    # Helper methods
    def _analyze_document_fields(self, documents: List[Dict]) -> Dict[str, List[str]]:
        """Analyze field types in documents"""
        field_types = {}
        
        for doc in documents:
            for field, value in doc.items():
                if field not in field_types:
                    field_types[field] = []
                
                value_type = type(value).__name__
                if value_type not in field_types[field]:
                    field_types[field].append(value_type)
        
        return field_types
    
    # Placeholder methods for other database types
    async def _analyze_redis_schema(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Redis schema"""
        return {"message": "Redis schema analysis not yet implemented"}
    
    async def _analyze_redis_data_quality(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Redis data quality"""
        return {"message": "Redis data quality analysis not yet implemented"}
    
    async def _analyze_redis_performance(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Redis performance"""
        return {"message": "Redis performance analysis not yet implemented"}
    
    async def _analyze_redis_business_insights(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Redis business insights"""
        return {"message": "Redis business insights analysis not yet implemented"}
    
    async def _analyze_cassandra_schema(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Cassandra schema"""
        return {"message": "Cassandra schema analysis not yet implemented"}
    
    async def _analyze_cassandra_data_quality(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Cassandra data quality"""
        return {"message": "Cassandra data quality analysis not yet implemented"}
    
    async def _analyze_cassandra_performance(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Cassandra performance"""
        return {"message": "Cassandra performance analysis not yet implemented"}
    
    async def _analyze_cassandra_business_insights(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Cassandra business insights"""
        return {"message": "Cassandra business insights analysis not yet implemented"}
    
    async def _analyze_elasticsearch_schema(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Elasticsearch schema"""
        return {"message": "Elasticsearch schema analysis not yet implemented"}
    
    async def _analyze_elasticsearch_data_quality(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Elasticsearch data quality"""
        return {"message": "Elasticsearch data quality analysis not yet implemented"}
    
    async def _analyze_elasticsearch_performance(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Elasticsearch performance"""
        return {"message": "Elasticsearch performance analysis not yet implemented"}
    
    async def _analyze_elasticsearch_business_insights(self, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Analyze Elasticsearch business insights"""
        return {"message": "Elasticsearch business insights analysis not yet implemented"} 