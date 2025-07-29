import asyncio
import json
import pandas as pd
import numpy as np
from typing import Dict, List, Any, Optional, Union
import logging
from datetime import datetime, timedelta
import re

from database_analyzer import DatabaseAnalyzer

logger = logging.getLogger(__name__)

class InsightGenerator:
    """Generates business insights from database analysis"""
    
    def __init__(self):
        self.db_connector = None
        self.db_analyzer = None
        self.insights_cache = {}
    
    def set_connector(self, connector):
        """Set the database connector"""
        self.db_connector = connector
    
    def set_analyzer(self, analyzer):
        """Set the database analyzer"""
        self.db_analyzer = analyzer
    
    async def generate_insights(self, insight_type: Optional[str] = None) -> Dict[str, Any]:
        """Generate insights from the database"""
        
        if not self.db_connector or not self.db_connector.is_connected():
            raise RuntimeError("No database connected")
        
        if not self.db_analyzer:
            self.db_analyzer = DatabaseAnalyzer()
            self.db_analyzer.set_connector(self.db_connector)
        
        # Perform comprehensive analysis first
        analysis = await self.db_analyzer.comprehensive_analysis()
        
        # Generate insights based on analysis
        insights = {
            "summary": await self._generate_summary_insights(analysis),
            "business_insights": await self._generate_business_insights(analysis),
            "performance_insights": await self._generate_performance_insights(analysis),
            "data_quality_insights": await self._generate_data_quality_insights(analysis),
            "recommendations": await self._generate_recommendations(analysis),
            "trends": await self._generate_trend_insights(analysis),
            "anomalies": await self._generate_anomaly_insights(analysis),
            "timestamp": datetime.now().isoformat()
        }
        
        if insight_type:
            return {insight_type: insights.get(insight_type, {})}
        
        return insights
    
    async def _generate_summary_insights(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate summary insights"""
        try:
            summary = {
                "database_overview": {},
                "key_metrics": {},
                "highlights": []
            }
            
            # Database overview
            if "schema" in analysis and not analysis["schema"].get("error"):
                schema = analysis["schema"]
                summary["database_overview"] = {
                    "total_collections": schema.get("total_collections", 0),
                    "total_documents": schema.get("total_documents", 0),
                    "database_name": schema.get("database_name", "Unknown")
                }
            
            # Key metrics
            if "business_insights" in analysis and not analysis["business_insights"].get("error"):
                business = analysis["business_insights"]
                
                if "hotel_insights" in business:
                    summary["key_metrics"]["average_hotel_rating"] = business["hotel_insights"].get("average_rating", 0)
                    summary["key_metrics"]["total_hotels"] = business["hotel_insights"].get("total_hotels", 0)
                
                if "revenue_insights" in business:
                    summary["key_metrics"]["total_revenue"] = business["revenue_insights"].get("total_revenue", 0)
                    summary["key_metrics"]["average_booking_amount"] = business["revenue_insights"].get("average_booking_amount", 0)
            
            # Data quality score
            if "data_quality" in analysis and not analysis["data_quality"].get("error"):
                quality = analysis["data_quality"]
                summary["key_metrics"]["data_quality_score"] = quality.get("overall_score", 0)
            
            # Generate highlights
            if summary["key_metrics"].get("data_quality_score", 100) < 80:
                summary["highlights"].append("Data quality needs improvement")
            
            if summary["key_metrics"].get("average_hotel_rating", 5) < 4.0:
                summary["highlights"].append("Hotel ratings are below industry average")
            
            if summary["key_metrics"].get("total_revenue", 0) > 0:
                summary["highlights"].append("Revenue generation is active")
            
            return summary
            
        except Exception as e:
            logger.error(f"Summary insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    async def _generate_business_insights(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate business insights"""
        try:
            business_insights = {
                "revenue_analysis": {},
                "customer_analysis": {},
                "operational_analysis": {},
                "market_analysis": {},
                "growth_opportunities": []
            }
            
            if "business_insights" in analysis and not analysis["business_insights"].get("error"):
                business = analysis["business_insights"]
                
                # Revenue analysis
                if "revenue_insights" in business:
                    revenue = business["revenue_insights"]
                    business_insights["revenue_analysis"] = {
                        "total_revenue": revenue.get("total_revenue", 0),
                        "average_booking_value": revenue.get("average_booking_amount", 0),
                        "revenue_trend": "stable"  # Placeholder
                    }
                
                # Customer analysis
                if "booking_insights" in business:
                    bookings = business["booking_insights"]
                    status_dist = bookings.get("status_distribution", {})
                    
                    total_bookings = sum(status_dist.values())
                    confirmed_bookings = status_dist.get("confirmed", 0)
                    cancelled_bookings = status_dist.get("cancelled", 0)
                    
                    business_insights["customer_analysis"] = {
                        "total_bookings": total_bookings,
                        "confirmation_rate": (confirmed_bookings / max(total_bookings, 1)) * 100,
                        "cancellation_rate": (cancelled_bookings / max(total_bookings, 1)) * 100
                    }
                
                # Operational analysis
                if "hotel_insights" in business:
                    hotels = business["hotel_insights"]
                    business_insights["operational_analysis"] = {
                        "total_hotels": hotels.get("total_hotels", 0),
                        "average_rating": hotels.get("average_rating", 0),
                        "price_range": hotels.get("price_range", {})
                    }
                
                # Growth opportunities
                if business_insights["customer_analysis"].get("cancellation_rate", 0) > 10:
                    business_insights["growth_opportunities"].append(
                        "Reduce cancellation rate to improve revenue"
                    )
                
                if business_insights["operational_analysis"].get("average_rating", 5) < 4.0:
                    business_insights["growth_opportunities"].append(
                        "Improve hotel ratings to attract more customers"
                    )
            
            return business_insights
            
        except Exception as e:
            logger.error(f"Business insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    async def _generate_performance_insights(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate performance insights"""
        try:
            performance_insights = {
                "database_performance": {},
                "query_performance": {},
                "storage_analysis": {},
                "optimization_opportunities": []
            }
            
            if "performance" in analysis and not analysis["performance"].get("error"):
                perf = analysis["performance"]
                
                # Database performance
                if "database_stats" in perf:
                    stats = perf["database_stats"]
                    performance_insights["database_performance"] = {
                        "total_collections": stats.get("collections", 0),
                        "data_size_mb": round(stats.get("data_size", 0) / (1024 * 1024), 2),
                        "storage_size_mb": round(stats.get("storage_size", 0) / (1024 * 1024), 2),
                        "index_count": stats.get("indexes", 0)
                    }
                
                # Storage analysis
                data_size = performance_insights["database_performance"].get("data_size_mb", 0)
                storage_size = performance_insights["database_performance"].get("storage_size_mb", 0)
                
                if storage_size > 0:
                    efficiency = (data_size / storage_size) * 100
                    performance_insights["storage_analysis"]["storage_efficiency"] = round(efficiency, 2)
                
                # Optimization opportunities
                if performance_insights["database_performance"].get("index_count", 0) == 0:
                    performance_insights["optimization_opportunities"].append(
                        "Add indexes to improve query performance"
                    )
                
                if performance_insights["storage_analysis"].get("storage_efficiency", 100) < 70:
                    performance_insights["optimization_opportunities"].append(
                        "Consider data compression or cleanup to improve storage efficiency"
                    )
            
            return performance_insights
            
        except Exception as e:
            logger.error(f"Performance insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    async def _generate_data_quality_insights(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate data quality insights"""
        try:
            quality_insights = {
                "overall_quality_score": 0,
                "quality_issues": [],
                "data_completeness": {},
                "data_consistency": {},
                "improvement_suggestions": []
            }
            
            if "data_quality" in analysis and not analysis["data_quality"].get("error"):
                quality = analysis["data_quality"]
                
                quality_insights["overall_quality_score"] = quality.get("overall_score", 0)
                
                # Analyze collections
                for collection_name, collection_data in quality.get("collections", {}).items():
                    issues = collection_data.get("issues", [])
                    quality_insights["quality_issues"].extend(issues)
                    
                    # Data completeness
                    total_docs = collection_data.get("total_documents", 0)
                    null_values = collection_data.get("null_values", 0)
                    
                    if total_docs > 0:
                        completeness = ((total_docs - null_values) / total_docs) * 100
                        quality_insights["data_completeness"][collection_name] = round(completeness, 2)
                
                # Improvement suggestions
                if quality_insights["overall_quality_score"] < 80:
                    quality_insights["improvement_suggestions"].append(
                        "Implement data validation rules"
                    )
                
                if quality_insights["quality_issues"]:
                    quality_insights["improvement_suggestions"].append(
                        "Address data quality issues in affected collections"
                    )
            
            return quality_insights
            
        except Exception as e:
            logger.error(f"Data quality insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    async def _generate_recommendations(self, analysis: Dict[str, Any]) -> List[str]:
        """Generate actionable recommendations"""
        try:
            recommendations = []
            
            # Data quality recommendations
            if "data_quality" in analysis and not analysis["data_quality"].get("error"):
                quality = analysis["data_quality"]
                if quality.get("overall_score", 100) < 80:
                    recommendations.append("Implement data validation and cleaning procedures")
            
            # Performance recommendations
            if "performance" in analysis and not analysis["performance"].get("error"):
                perf = analysis["performance"]
                if perf.get("database_stats", {}).get("indexes", 0) == 0:
                    recommendations.append("Add database indexes for frequently queried fields")
            
            # Business recommendations
            if "business_insights" in analysis and not analysis["business_insights"].get("error"):
                business = analysis["business_insights"]
                
                if business.get("hotel_insights", {}).get("average_rating", 5) < 4.0:
                    recommendations.append("Focus on improving hotel service quality and ratings")
                
                booking_status = business.get("booking_insights", {}).get("status_distribution", {})
                if booking_status.get("cancelled", 0) > booking_status.get("confirmed", 0) * 0.1:
                    recommendations.append("Review and improve booking policies to reduce cancellations")
            
            # General recommendations
            recommendations.extend([
                "Regularly monitor database performance and optimize queries",
                "Implement automated data quality checks",
                "Set up alerts for critical business metrics",
                "Consider implementing data archiving for old records"
            ])
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Recommendations generation failed: {str(e)}")
            return ["Error generating recommendations"]
    
    async def _generate_trend_insights(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate trend insights"""
        try:
            trend_insights = {
                "revenue_trends": {},
                "booking_trends": {},
                "customer_trends": {},
                "performance_trends": {}
            }
            
            # This would typically involve historical data analysis
            # For now, we'll provide placeholder insights
            
            trend_insights["revenue_trends"] = {
                "trend": "stable",
                "growth_rate": "0%",
                "seasonality": "not detected"
            }
            
            trend_insights["booking_trends"] = {
                "trend": "stable",
                "peak_seasons": "not identified",
                "booking_patterns": "consistent"
            }
            
            return trend_insights
            
        except Exception as e:
            logger.error(f"Trend insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    async def _generate_anomaly_insights(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate anomaly insights"""
        try:
            anomaly_insights = {
                "data_anomalies": [],
                "performance_anomalies": [],
                "business_anomalies": [],
                "security_concerns": []
            }
            
            # Check for data quality anomalies
            if "data_quality" in analysis and not analysis["data_quality"].get("error"):
                quality = analysis["data_quality"]
                
                for collection_name, collection_data in quality.get("collections", {}).items():
                    null_ratio = collection_data.get("null_values", 0) / max(collection_data.get("total_documents", 1), 1)
                    
                    if null_ratio > 0.5:
                        anomaly_insights["data_anomalies"].append(
                            f"High null value ratio ({null_ratio:.1%}) in collection {collection_name}"
                        )
            
            # Check for business anomalies
            if "business_insights" in analysis and not analysis["business_insights"].get("error"):
                business = analysis["business_insights"]
                
                if business.get("hotel_insights", {}).get("average_rating", 5) < 2.0:
                    anomaly_insights["business_anomalies"].append(
                        "Extremely low hotel ratings detected"
                    )
                
                booking_status = business.get("booking_insights", {}).get("status_distribution", {})
                if booking_status.get("cancelled", 0) > booking_status.get("confirmed", 0):
                    anomaly_insights["business_anomalies"].append(
                        "Cancellation rate exceeds confirmation rate"
                    )
            
            return anomaly_insights
            
        except Exception as e:
            logger.error(f"Anomaly insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    async def generate_hotel_specific_insights(self) -> Dict[str, Any]:
        """Generate hotel management specific insights"""
        try:
            if not self.db_connector or not self.db_connector.is_connected():
                raise RuntimeError("No database connected")
            
            # Get hotel-specific analysis
            analysis = await self.db_analyzer.analyze("business_insights")
            
            hotel_insights = {
                "occupancy_analysis": {},
                "revenue_optimization": {},
                "customer_satisfaction": {},
                "operational_efficiency": {},
                "competitive_analysis": {},
                "strategic_recommendations": []
            }
            
            if "hotel_insights" in analysis:
                hotels = analysis["hotel_insights"]
                
                # Occupancy analysis
                hotel_insights["occupancy_analysis"] = {
                    "total_hotels": hotels.get("total_hotels", 0),
                    "average_rating": hotels.get("average_rating", 0),
                    "price_range": hotels.get("price_range", {})
                }
            
            if "booking_insights" in analysis:
                bookings = analysis["booking_insights"]
                
                # Revenue optimization
                hotel_insights["revenue_optimization"] = {
                    "booking_status": bookings.get("status_distribution", {}),
                    "confirmation_rate": self._calculate_confirmation_rate(bookings.get("status_distribution", {}))
                }
            
            # Strategic recommendations
            if hotel_insights["occupancy_analysis"].get("average_rating", 5) < 4.0:
                hotel_insights["strategic_recommendations"].append(
                    "Implement guest satisfaction improvement programs"
                )
            
            if hotel_insights["revenue_optimization"].get("confirmation_rate", 100) < 80:
                hotel_insights["strategic_recommendations"].append(
                    "Review booking policies and improve customer service"
                )
            
            return hotel_insights
            
        except Exception as e:
            logger.error(f"Hotel-specific insights generation failed: {str(e)}")
            return {"error": str(e)}
    
    def _calculate_confirmation_rate(self, status_distribution: Dict[str, int]) -> float:
        """Calculate booking confirmation rate"""
        total = sum(status_distribution.values())
        confirmed = status_distribution.get("confirmed", 0)
        
        if total == 0:
            return 0.0
        
        return (confirmed / total) * 100 