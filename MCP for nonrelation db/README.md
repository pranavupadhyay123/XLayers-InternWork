# MCP Non-Relational Database Analyzer

A comprehensive Model Context Protocol (MCP) implementation for analyzing non-relational databases and providing intelligent insights, with special focus on hotel management systems.

## 🚀 Features

### Core Capabilities
- **Multi-Database Support**: MongoDB, Redis, Cassandra, Elasticsearch
- **Intelligent Analysis**: Schema, data quality, performance, and business insights
- **Natural Language Chat**: Ask questions about your database in plain English
- **Hotel Management Focus**: Specialized insights for hospitality industry
- **Real-time Insights**: Live analysis and recommendations
- **RESTful API**: Easy integration with existing systems

### Analysis Types
- **Schema Analysis**: Database structure, collections, and field types
- **Data Quality Assessment**: Completeness, consistency, and validation
- **Performance Analysis**: Query optimization and storage efficiency
- **Business Intelligence**: Revenue trends, customer behavior, operational metrics
- **Anomaly Detection**: Identify unusual patterns and potential issues

## 📋 Prerequisites

- Python 3.8+
- Non-relational database (MongoDB, Redis, Cassandra, or Elasticsearch)
- Required Python packages (see requirements.txt)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "MCP for nonrelation db"
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=False

# Database Configuration (example for MongoDB)
DEFAULT_DB_TYPE=mongodb
DEFAULT_CONNECTION_STRING=mongodb://localhost:27017
DEFAULT_DATABASE_NAME=hotel_management

# AI/ML Configuration (optional)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Logging
LOG_LEVEL=INFO
```

## 🚀 Quick Start

1. **Start the server**
   ```bash
   python main.py
   ```

2. **Connect to your database**
   ```bash
   curl -X POST http://localhost:8000/connect \
     -H "Content-Type: application/json" \
     -d '{
       "db_type": "mongodb",
       "connection_string": "mongodb://localhost:27017",
       "database_name": "hotel_management"
     }'
   ```

3. **Generate insights**
   ```bash
   curl http://localhost:8000/insights
   ```

4. **Chat with your database**
   ```bash
   curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{
       "message": "Show me the database schema"
     }'
   ```

## 📚 API Reference

### Endpoints

#### `POST /connect`
Connect to a non-relational database.

**Request Body:**
```json
{
  "db_type": "mongodb|redis|cassandra|elasticsearch",
  "connection_string": "connection_string",
  "database_name": "database_name",
  "username": "username",
  "password": "password",
  "additional_params": {}
}
```

#### `POST /analyze`
Analyze the connected database.

**Request Body:**
```json
{
  "analysis_type": "schema|data_quality|performance|business_insights|comprehensive",
  "filters": {}
}
```

#### `GET /insights`
Generate business insights from the database.

#### `POST /chat`
Chat with the database using natural language.

**Request Body:**
```json
{
  "message": "Your question here",
  "session_id": "optional_session_id"
}
```

#### `GET /schema`
Get database schema information.

#### `GET /collections`
Get list of collections/tables.

#### `GET /health`
Health check endpoint.

### Example Usage

#### MongoDB Connection
```bash
curl -X POST http://localhost:8000/connect \
  -H "Content-Type: application/json" \
  -d '{
    "db_type": "mongodb",
    "connection_string": "mongodb://localhost:27017",
    "database_name": "hotel_db"
  }'
```

#### Redis Connection
```bash
curl -X POST http://localhost:8000/connect \
  -H "Content-Type: application/json" \
  -d '{
    "db_type": "redis",
    "connection_string": "redis://localhost:6379"
  }'
```

#### Cassandra Connection
```bash
curl -X POST http://localhost:8000/connect \
  -H "Content-Type: application/json" \
  -d '{
    "db_type": "cassandra",
    "connection_string": "localhost:9042",
    "keyspace": "hotel_keyspace"
  }'
```

## 💬 Chat Examples

### Schema Questions
- "Show me the database schema"
- "What collections are in the database?"
- "Describe the structure of the hotels collection"

### Data Quality Questions
- "Analyze data quality"
- "Are there any missing fields?"
- "Check for null values"

### Business Questions
- "Generate business insights"
- "What are the top performing hotels?"
- "Show me revenue trends"
- "Analyze booking patterns"

### Performance Questions
- "How is the database performance?"
- "Are there any optimization opportunities?"
- "Check database indexes"

### Hotel-Specific Questions
- "What's the average hotel rating?"
- "Show me occupancy analysis"
- "Analyze customer satisfaction"
- "What are the booking trends?"

## 🏨 Hotel Management Features

### Specialized Analysis
- **Occupancy Analysis**: Room utilization and availability patterns
- **Revenue Optimization**: Pricing strategies and revenue trends
- **Customer Satisfaction**: Guest ratings and feedback analysis
- **Operational Efficiency**: Staff performance and resource utilization
- **Competitive Analysis**: Market positioning and benchmarking

### Business Intelligence
- **Booking Patterns**: Seasonal trends and demand forecasting
- **Guest Behavior**: Preferences and loyalty analysis
- **Revenue Management**: Dynamic pricing and yield optimization
- **Operational Metrics**: Efficiency and performance indicators

## 🔧 Development

### Project Structure
```
MCP for nonrelation db/
├── main.py                 # FastAPI application entry point
├── database_connectors.py  # Database connection management
├── database_analyzer.py    # Database analysis engine
├── insight_generator.py    # Business insights generation
├── chat_interface.py       # Natural language chat interface
├── config.py              # Configuration management
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

### Adding New Database Support

1. **Extend DatabaseConnector class**
   ```python
   class NewDatabaseConnector(BaseConnector):
       async def connect(self, **kwargs):
           # Implementation
           pass
   ```

2. **Add analysis methods**
   ```python
   async def _analyze_newdb_schema(self, filters):
       # Implementation
       pass
   ```

3. **Update configuration**
   ```python
   "newdb": {
       "default_port": 1234,
       "connection_format": "newdb://host:port",
       "required_fields": ["connection_string"]
   }
   ```

### Testing

```bash
# Run tests (when implemented)
python -m pytest tests/

# Run with coverage
python -m pytest --cov=. tests/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

#### Connection Issues
- Verify database is running and accessible
- Check connection string format
- Ensure proper authentication credentials

#### Analysis Errors
- Check database permissions
- Verify data exists in collections
- Review error logs for specific issues

#### Performance Issues
- Monitor database performance
- Check for large datasets
- Consider implementing pagination

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🔮 Roadmap

### Planned Features
- [ ] Advanced NLP for query understanding
- [ ] Real-time data streaming analysis
- [ ] Machine learning-based anomaly detection
- [ ] Automated report generation
- [ ] Integration with BI tools
- [ ] Multi-tenant support
- [ ] Advanced caching mechanisms
- [ ] Web-based dashboard

### Database Support
- [ ] PostgreSQL (JSONB support)
- [ ] InfluxDB
- [ ] Neo4j
- [ ] DynamoDB
- [ ] Cosmos DB

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- MongoDB, Redis, Cassandra, and Elasticsearch communities
- Hotel management industry experts for domain knowledge
- Open source contributors and maintainers

---

**Made with ❤️ for the hotel management industry** 