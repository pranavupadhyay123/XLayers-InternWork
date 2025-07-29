from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
import uvicorn
import asyncio
import json
import os
from dotenv import load_dotenv

from database_connectors import DatabaseConnector
from database_analyzer import DatabaseAnalyzer
from insight_generator import InsightGenerator
from chat_interface import ChatInterface

load_dotenv()

app = FastAPI(
    title="MCP Non-Relational Database Analyzer",
    description="Model Context Protocol for analyzing non-relational databases and providing insights",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instances
db_connector = DatabaseConnector()
db_analyzer = DatabaseAnalyzer()
db_analyzer.set_connector(db_connector)  # Set the connector
insight_generator = InsightGenerator()
insight_generator.set_connector(db_connector)  # Set the connector
chat_interface = ChatInterface()
chat_interface.set_connector(db_connector)  # Set the connector

class DatabaseConnectionRequest(BaseModel):
    db_type: str  # mongodb, redis, cassandra, elasticsearch
    connection_string: str
    database_name: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    additional_params: Optional[Dict[str, Any]] = None

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class AnalysisRequest(BaseModel):
    analysis_type: str  # "schema", "data_quality", "performance", "business_insights"
    filters: Optional[Dict[str, Any]] = None

@app.get("/")
async def root():
    return {
        "message": "MCP Non-Relational Database Analyzer",
        "version": "1.0.0",
        "endpoints": {
            "/connect": "Connect to a non-relational database",
            "/analyze": "Analyze database structure and content",
            "/insights": "Generate business insights",
            "/chat": "Chat with the database",
            "/health": "Health check"
        }
    }

@app.post("/connect")
async def connect_database(request: DatabaseConnectionRequest):
    """Connect to a non-relational database"""
    try:
        connection_result = await db_connector.connect(
            db_type=request.db_type,
            connection_string=request.connection_string,
            database_name=request.database_name,
            username=request.username,
            password=request.password,
            additional_params=request.additional_params
        )
        
        return {
            "status": "success",
            "message": f"Successfully connected to {request.db_type} database",
            "connection_info": connection_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze_database(request: AnalysisRequest):
    """Analyze the connected database"""
    try:
        if not db_connector.is_connected():
            raise HTTPException(status_code=400, detail="No database connected")
        
        analysis_result = await db_analyzer.analyze(
            analysis_type=request.analysis_type,
            filters=request.filters
        )
        
        return {
            "status": "success",
            "analysis_type": request.analysis_type,
            "results": analysis_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/insights")
async def generate_insights():
    """Generate business insights from the database"""
    try:
        if not db_connector.is_connected():
            raise HTTPException(status_code=400, detail="No database connected")
        
        insights = await insight_generator.generate_insights()
        
        return {
            "status": "success",
            "insights": insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat_with_database(request: ChatRequest):
    """Chat with the database using natural language"""
    try:
        if not db_connector.is_connected():
            raise HTTPException(status_code=400, detail="No database connected")
        
        response = await chat_interface.chat(
            message=request.message,
            session_id=request.session_id
        )
        
        return {
            "status": "success",
            "response": response,
            "session_id": response.get("session_id")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "database_connected": db_connector.is_connected(),
        "database_type": db_connector.get_connection_info().get("type") if db_connector.is_connected() else None
    }

@app.get("/schema")
async def get_schema():
    """Get database schema information"""
    try:
        if not db_connector.is_connected():
            raise HTTPException(status_code=400, detail="No database connected")
        
        schema = await db_analyzer.get_schema()
        
        return {
            "status": "success",
            "schema": schema
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/collections")
async def get_collections():
    """Get list of collections/tables"""
    try:
        if not db_connector.is_connected():
            raise HTTPException(status_code=400, detail="No database connected")
        
        collections = await db_analyzer.get_collections()
        
        return {
            "status": "success",
            "collections": collections
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 