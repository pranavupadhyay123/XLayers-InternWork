import asyncio
import json
import re
from typing import Dict, List, Any, Optional, Union
import logging
from datetime import datetime
import uuid

logger = logging.getLogger(__name__)

class ChatInterface:
    """Natural language chat interface for database interactions"""
    
    def __init__(self):
        self.db_connector = None
        self.db_analyzer = None
        self.insight_generator = None
        self.sessions = {}
        self.conversation_history = {}
    
    def set_connector(self, connector):
        """Set the database connector"""
        self.db_connector = connector
    
    def set_analyzer(self, analyzer):
        """Set the database analyzer"""
        self.db_analyzer = analyzer
    
    def set_insight_generator(self, insight_generator):
        """Set the insight generator"""
        self.insight_generator = insight_generator
    
    async def chat(self, message: str, session_id: Optional[str] = None) -> Dict[str, Any]:
        """Process a chat message and return a response"""
        
        if not self.db_connector or not self.db_connector.is_connected():
            return {
                "error": "No database connected. Please connect to a database first.",
                "session_id": session_id
            }
        
        # Create or get session
        if not session_id:
            session_id = str(uuid.uuid4())
        
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "created_at": datetime.now(),
                "messages": [],
                "context": {}
            }
        
        # Add message to session
        self.sessions[session_id]["messages"].append({
            "role": "user",
            "content": message,
            "timestamp": datetime.now()
        })
        
        # Process the message
        try:
            response = await self._process_message(message, session_id)
            
            # Add response to session
            self.sessions[session_id]["messages"].append({
                "role": "assistant",
                "content": response.get("response", ""),
                "timestamp": datetime.now()
            })
            
            response["session_id"] = session_id
            return response
            
        except Exception as e:
            error_response = {
                "error": f"Error processing message: {str(e)}",
                "session_id": session_id
            }
            
            self.sessions[session_id]["messages"].append({
                "role": "assistant",
                "content": error_response["error"],
                "timestamp": datetime.now()
            })
            
            return error_response
    
    async def _process_message(self, message: str, session_id: str) -> Dict[str, Any]:
        """Process a user message and generate a response"""
        
        # Normalize message
        normalized_message = message.lower().strip()
        
        # Check for different types of queries
        if self._is_greeting(normalized_message):
            return await self._handle_greeting()
        
        elif self._is_help_request(normalized_message):
            return await self._handle_help_request()
        
        elif self._is_schema_query(normalized_message):
            return await self._handle_schema_query()
        
        elif self._is_data_quality_query(normalized_message):
            return await self._handle_data_quality_query()
        
        elif self._is_performance_query(normalized_message):
            return await self._handle_performance_query()
        
        elif self._is_business_insight_query(normalized_message):
            return await self._handle_business_insight_query()
        
        elif self._is_hotel_specific_query(normalized_message):
            return await self._handle_hotel_specific_query()
        
        elif self._is_data_query(normalized_message):
            return await self._handle_data_query(normalized_message)
        
        elif self._is_analysis_request(normalized_message):
            return await self._handle_analysis_request(normalized_message)
        
        else:
            return await self._handle_general_query(message)
    
    def _is_greeting(self, message: str) -> bool:
        """Check if message is a greeting"""
        greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"]
        return any(greeting in message for greeting in greetings)
    
    def _is_help_request(self, message: str) -> bool:
        """Check if message is asking for help"""
        help_indicators = ["help", "what can you do", "how to use", "commands", "capabilities"]
        return any(indicator in message for indicator in help_indicators)
    
    def _is_schema_query(self, message: str) -> bool:
        """Check if message is asking about schema"""
        schema_indicators = ["schema", "structure", "collections", "tables", "fields", "columns"]
        return any(indicator in message for indicator in schema_indicators)
    
    def _is_data_quality_query(self, message: str) -> bool:
        """Check if message is asking about data quality"""
        quality_indicators = ["data quality", "quality", "missing data", "null values", "duplicates"]
        return any(indicator in message for indicator in quality_indicators)
    
    def _is_performance_query(self, message: str) -> bool:
        """Check if message is asking about performance"""
        performance_indicators = ["performance", "speed", "slow", "indexes", "optimization"]
        return any(indicator in message for indicator in performance_indicators)
    
    def _is_business_insight_query(self, message: str) -> bool:
        """Check if message is asking for business insights"""
        insight_indicators = ["insights", "business", "revenue", "trends", "analysis", "metrics"]
        return any(indicator in message for indicator in insight_indicators)
    
    def _is_hotel_specific_query(self, message: str) -> bool:
        """Check if message is hotel-specific"""
        hotel_indicators = ["hotel", "booking", "guest", "room", "occupancy", "rating"]
        return any(indicator in message for indicator in hotel_indicators)
    
    def _is_data_query(self, message: str) -> bool:
        """Check if message is asking for specific data"""
        data_indicators = ["show me", "find", "get", "list", "count", "how many"]
        return any(indicator in message for indicator in data_indicators)
    
    def _is_analysis_request(self, message: str) -> bool:
        """Check if message is requesting analysis"""
        analysis_indicators = ["analyze", "compare", "summary", "overview", "report"]
        return any(indicator in message for indicator in analysis_indicators)
    
    async def _handle_greeting(self) -> Dict[str, Any]:
        """Handle greeting messages"""
        connection_info = self.db_connector.get_connection_info()
        db_type = connection_info.get("type", "database")
        
        response = f"Hello! I'm your {db_type} assistant. I can help you analyze your database, generate insights, and answer questions about your data. "
        response += "What would you like to know about your database?"
        
        return {
            "response": response,
            "type": "greeting",
            "suggestions": [
                "Show me the database schema",
                "Analyze data quality",
                "Generate business insights",
                "What can you do?"
            ]
        }
    
    async def _handle_help_request(self) -> Dict[str, Any]:
        """Handle help requests"""
        response = "I can help you with the following:\n\n"
        response += "🔍 **Database Analysis:**\n"
        response += "• Schema analysis and structure overview\n"
        response += "• Data quality assessment\n"
        response += "• Performance analysis and optimization\n\n"
        
        response += "📊 **Business Insights:**\n"
        response += "• Revenue analysis and trends\n"
        response += "• Customer behavior patterns\n"
        response += "• Operational efficiency metrics\n\n"
        
        response += "🏨 **Hotel Management (if applicable):**\n"
        response += "• Occupancy analysis\n"
        response += "• Booking patterns and trends\n"
        response += "• Guest satisfaction metrics\n\n"
        
        response += "💬 **Natural Language Queries:**\n"
        response += "• Ask questions in plain English\n"
        response += "• Get specific data insights\n"
        response += "• Request custom analysis\n\n"
        
        response += "Try asking me something like:\n"
        response += "• 'Show me the database schema'\n"
        response += "• 'Analyze data quality'\n"
        response += "• 'What are the top performing hotels?'\n"
        response += "• 'Generate business insights'"
        
        return {
            "response": response,
            "type": "help",
            "suggestions": [
                "Show me the database schema",
                "Analyze data quality",
                "Generate business insights",
                "What are the top performing hotels?"
            ]
        }
    
    async def _handle_schema_query(self) -> Dict[str, Any]:
        """Handle schema-related queries"""
        try:
            if not self.db_analyzer:
                self.db_analyzer = DatabaseAnalyzer()
                self.db_analyzer.set_connector(self.db_connector)
            
            schema = await self.db_analyzer.analyze("schema")
            
            if "error" in schema:
                return {
                    "response": f"Sorry, I couldn't analyze the schema: {schema['error']}",
                    "type": "error"
                }
            
            response = "📋 **Database Schema Overview:**\n\n"
            
            if "database_name" in schema:
                response += f"**Database:** {schema['database_name']}\n"
            
            response += f"**Total Collections:** {schema.get('total_collections', 0)}\n"
            response += f"**Total Documents:** {schema.get('total_documents', 0):,}\n\n"
            
            if "collections" in schema:
                response += "**Collections:**\n"
                for collection_name, collection_info in schema["collections"].items():
                    doc_count = collection_info.get("document_count", 0)
                    size_mb = round(collection_info.get("size_bytes", 0) / (1024 * 1024), 2)
                    response += f"• **{collection_name}:** {doc_count:,} documents ({size_mb} MB)\n"
            
            return {
                "response": response,
                "type": "schema",
                "data": schema
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while analyzing the schema: {str(e)}",
                "type": "error"
            }
    
    async def _handle_data_quality_query(self) -> Dict[str, Any]:
        """Handle data quality queries"""
        try:
            if not self.db_analyzer:
                self.db_analyzer = DatabaseAnalyzer()
                self.db_analyzer.set_connector(self.db_connector)
            
            quality = await self.db_analyzer.analyze("data_quality")
            
            if "error" in quality:
                return {
                    "response": f"Sorry, I couldn't analyze data quality: {quality['error']}",
                    "type": "error"
                }
            
            response = "🔍 **Data Quality Analysis:**\n\n"
            
            overall_score = quality.get("overall_score", 0)
            response += f"**Overall Quality Score:** {overall_score:.1f}/100\n\n"
            
            if overall_score >= 90:
                response += "✅ **Excellent data quality!**\n"
            elif overall_score >= 80:
                response += "⚠️ **Good data quality with minor issues**\n"
            elif overall_score >= 70:
                response += "⚠️ **Fair data quality - improvements needed**\n"
            else:
                response += "❌ **Poor data quality - immediate attention required**\n"
            
            response += "\n**Collection Details:**\n"
            
            for collection_name, collection_data in quality.get("collections", {}).items():
                score = collection_data.get("quality_score", 0)
                issues = collection_data.get("issues", [])
                
                response += f"\n**{collection_name}:** {score:.1f}/100\n"
                if issues:
                    for issue in issues:
                        response += f"  • {issue}\n"
            
            return {
                "response": response,
                "type": "data_quality",
                "data": quality
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while analyzing data quality: {str(e)}",
                "type": "error"
            }
    
    async def _handle_performance_query(self) -> Dict[str, Any]:
        """Handle performance queries"""
        try:
            if not self.db_analyzer:
                self.db_analyzer = DatabaseAnalyzer()
                self.db_analyzer.set_connector(self.db_connector)
            
            performance = await self.db_analyzer.analyze("performance")
            
            if "error" in performance:
                return {
                    "response": f"Sorry, I couldn't analyze performance: {performance['error']}",
                    "type": "error"
                }
            
            response = "⚡ **Database Performance Analysis:**\n\n"
            
            if "database_stats" in performance:
                stats = performance["database_stats"]
                response += f"**Total Collections:** {stats.get('collections', 0)}\n"
                response += f"**Data Size:** {round(stats.get('data_size', 0) / (1024 * 1024), 2)} MB\n"
                response += f"**Storage Size:** {round(stats.get('storage_size', 0) / (1024 * 1024), 2)} MB\n"
                response += f"**Indexes:** {stats.get('indexes', 0)}\n\n"
            
            if "recommendations" in performance:
                response += "**Recommendations:**\n"
                for rec in performance["recommendations"]:
                    response += f"• {rec}\n"
            
            return {
                "response": response,
                "type": "performance",
                "data": performance
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while analyzing performance: {str(e)}",
                "type": "error"
            }
    
    async def _handle_business_insight_query(self) -> Dict[str, Any]:
        """Handle business insight queries"""
        try:
            if not self.insight_generator:
                self.insight_generator = InsightGenerator()
                self.insight_generator.set_connector(self.db_connector)
            
            insights = await self.insight_generator.generate_insights()
            
            if "error" in insights:
                return {
                    "response": f"Sorry, I couldn't generate insights: {insights['error']}",
                    "type": "error"
                }
            
            response = "📊 **Business Insights:**\n\n"
            
            # Summary insights
            if "summary" in insights:
                summary = insights["summary"]
                if "key_metrics" in summary:
                    metrics = summary["key_metrics"]
                    response += "**Key Metrics:**\n"
                    
                    if "average_hotel_rating" in metrics:
                        response += f"• Average Hotel Rating: {metrics['average_hotel_rating']:.1f}/5\n"
                    
                    if "total_revenue" in metrics:
                        response += f"• Total Revenue: ${metrics['total_revenue']:,.2f}\n"
                    
                    if "data_quality_score" in metrics:
                        response += f"• Data Quality Score: {metrics['data_quality_score']:.1f}/100\n"
                    
                    response += "\n"
            
            # Business insights
            if "business_insights" in insights:
                business = insights["business_insights"]
                
                if "revenue_analysis" in business:
                    revenue = business["revenue_analysis"]
                    response += "**Revenue Analysis:**\n"
                    response += f"• Total Revenue: ${revenue.get('total_revenue', 0):,.2f}\n"
                    response += f"• Average Booking Value: ${revenue.get('average_booking_value', 0):,.2f}\n\n"
                
                if "customer_analysis" in business:
                    customer = business["customer_analysis"]
                    response += "**Customer Analysis:**\n"
                    response += f"• Total Bookings: {customer.get('total_bookings', 0):,}\n"
                    response += f"• Confirmation Rate: {customer.get('confirmation_rate', 0):.1f}%\n"
                    response += f"• Cancellation Rate: {customer.get('cancellation_rate', 0):.1f}%\n\n"
            
            # Recommendations
            if "recommendations" in insights:
                response += "**Recommendations:**\n"
                for i, rec in enumerate(insights["recommendations"][:5], 1):  # Top 5 recommendations
                    response += f"{i}. {rec}\n"
            
            return {
                "response": response,
                "type": "business_insights",
                "data": insights
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while generating insights: {str(e)}",
                "type": "error"
            }
    
    async def _handle_hotel_specific_query(self) -> Dict[str, Any]:
        """Handle hotel-specific queries"""
        try:
            if not self.insight_generator:
                self.insight_generator = InsightGenerator()
                self.insight_generator.set_connector(self.db_connector)
            
            hotel_insights = await self.insight_generator.generate_hotel_specific_insights()
            
            if "error" in hotel_insights:
                return {
                    "response": f"Sorry, I couldn't generate hotel insights: {hotel_insights['error']}",
                    "type": "error"
                }
            
            response = "🏨 **Hotel Management Insights:**\n\n"
            
            if "occupancy_analysis" in hotel_insights:
                occupancy = hotel_insights["occupancy_analysis"]
                response += "**Occupancy Analysis:**\n"
                response += f"• Total Hotels: {occupancy.get('total_hotels', 0)}\n"
                response += f"• Average Rating: {occupancy.get('average_rating', 0):.1f}/5\n"
                
                if "price_range" in occupancy:
                    price_range = occupancy["price_range"]
                    response += f"• Price Range: ${price_range.get('min', 0):.2f} - ${price_range.get('max', 0):.2f}\n"
                    response += f"• Average Price: ${price_range.get('average', 0):.2f}\n"
                
                response += "\n"
            
            if "revenue_optimization" in hotel_insights:
                revenue = hotel_insights["revenue_optimization"]
                response += "**Revenue Optimization:**\n"
                response += f"• Confirmation Rate: {revenue.get('confirmation_rate', 0):.1f}%\n"
                
                if "booking_status" in revenue:
                    status = revenue["booking_status"]
                    response += "• Booking Status Distribution:\n"
                    for status_type, count in status.items():
                        response += f"  - {status_type.title()}: {count}\n"
                
                response += "\n"
            
            if "strategic_recommendations" in hotel_insights:
                response += "**Strategic Recommendations:**\n"
                for i, rec in enumerate(hotel_insights["strategic_recommendations"], 1):
                    response += f"{i}. {rec}\n"
            
            return {
                "response": response,
                "type": "hotel_insights",
                "data": hotel_insights
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while generating hotel insights: {str(e)}",
                "type": "error"
            }
    
    async def _handle_data_query(self, message: str) -> Dict[str, Any]:
        """Handle specific data queries"""
        try:
            # This is a simplified implementation
            # In a real system, you'd use NLP to parse the query and generate appropriate database queries
            
            response = "I understand you're asking about specific data. Here are some examples of what I can help you with:\n\n"
            response += "• 'Show me all hotels with rating above 4.0'\n"
            response += "• 'How many bookings were made last month?'\n"
            response += "• 'What's the average booking amount?'\n"
            response += "• 'List the top 10 hotels by rating'\n\n"
            response += "For now, let me show you a general overview of your data."
            
            # Get basic schema info
            if not self.db_analyzer:
                self.db_analyzer = DatabaseAnalyzer()
                self.db_analyzer.set_connector(self.db_connector)
            
            schema = await self.db_analyzer.analyze("schema")
            
            if "collections" in schema:
                response += "\n\n**Available Collections:**\n"
                for collection_name, collection_info in schema["collections"].items():
                    doc_count = collection_info.get("document_count", 0)
                    response += f"• **{collection_name}:** {doc_count:,} documents\n"
            
            return {
                "response": response,
                "type": "data_query",
                "suggestions": [
                    "Show me all hotels with rating above 4.0",
                    "How many bookings were made last month?",
                    "What's the average booking amount?",
                    "List the top 10 hotels by rating"
                ]
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while processing your data query: {str(e)}",
                "type": "error"
            }
    
    async def _handle_analysis_request(self, message: str) -> Dict[str, Any]:
        """Handle analysis requests"""
        try:
            response = "I can perform various types of analysis on your database:\n\n"
            response += "🔍 **Available Analysis Types:**\n"
            response += "• **Schema Analysis:** Database structure and collections\n"
            response += "• **Data Quality Analysis:** Data completeness and consistency\n"
            response += "• **Performance Analysis:** Database performance and optimization\n"
            response += "• **Business Insights:** Revenue, customer, and operational analysis\n"
            response += "• **Comprehensive Analysis:** All of the above\n\n"
            response += "Let me run a comprehensive analysis for you now..."
            
            if not self.db_analyzer:
                self.db_analyzer = DatabaseAnalyzer()
                self.db_analyzer.set_connector(self.db_connector)
            
            analysis = await self.db_analyzer.comprehensive_analysis()
            
            if "error" in analysis:
                return {
                    "response": f"Sorry, I couldn't perform the analysis: {analysis['error']}",
                    "type": "error"
                }
            
            response += "\n✅ **Analysis Complete!**\n\n"
            response += "**Summary:**\n"
            
            if "schema" in analysis and not analysis["schema"].get("error"):
                schema = analysis["schema"]
                response += f"• {schema.get('total_collections', 0)} collections\n"
                response += f"• {schema.get('total_documents', 0):,} total documents\n"
            
            if "data_quality" in analysis and not analysis["data_quality"].get("error"):
                quality = analysis["data_quality"]
                response += f"• Data quality score: {quality.get('overall_score', 0):.1f}/100\n"
            
            response += "\nYou can ask me specific questions about any aspect of the analysis!"
            
            return {
                "response": response,
                "type": "analysis",
                "data": analysis,
                "suggestions": [
                    "Show me the data quality details",
                    "What are the business insights?",
                    "How is the database performance?",
                    "Generate recommendations"
                ]
            }
            
        except Exception as e:
            return {
                "response": f"Sorry, I encountered an error while performing the analysis: {str(e)}",
                "type": "error"
            }
    
    async def _handle_general_query(self, message: str) -> Dict[str, Any]:
        """Handle general queries that don't match specific patterns"""
        response = "I understand you're asking: \"" + message + "\"\n\n"
        response += "I can help you with:\n"
        response += "• Database schema and structure analysis\n"
        response += "• Data quality assessment\n"
        response += "• Performance analysis and optimization\n"
        response += "• Business insights and trends\n"
        response += "• Hotel management specific insights (if applicable)\n\n"
        response += "Could you please rephrase your question or try one of these examples:\n"
        response += "• 'Show me the database schema'\n"
        response += "• 'Analyze data quality'\n"
        response += "• 'Generate business insights'\n"
        response += "• 'What are the top performing hotels?'"
        
        return {
            "response": response,
            "type": "general",
            "suggestions": [
                "Show me the database schema",
                "Analyze data quality",
                "Generate business insights",
                "What are the top performing hotels?"
            ]
        }
    
    async def get_session_history(self, session_id: str) -> List[Dict[str, Any]]:
        """Get conversation history for a session"""
        if session_id in self.sessions:
            return self.sessions[session_id]["messages"]
        return []
    
    async def clear_session(self, session_id: str) -> bool:
        """Clear a session's history"""
        if session_id in self.sessions:
            del self.sessions[session_id]
            return True
        return False
    
    async def get_active_sessions(self) -> List[str]:
        """Get list of active session IDs"""
        return list(self.sessions.keys()) 