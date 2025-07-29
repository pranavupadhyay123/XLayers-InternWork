# MCP Database Analyzer - React Frontend

A beautiful, modern React frontend for the MCP Non-Relational Database Analyzer. This frontend provides an intuitive interface for connecting to databases, chatting with AI, analyzing data, and generating business insights.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Real-time Chat**: Natural language interface for database queries
- **Database Connection**: Support for MongoDB, Redis, Cassandra, and Elasticsearch
- **Data Analysis**: Comprehensive database analysis tools
- **Business Insights**: AI-powered insights and recommendations
- **Interactive Dashboard**: Real-time statistics and quick actions
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code syntax highlighting

## 📦 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd "MCP for nonrelation db/frontend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

The frontend is configured to proxy API requests to the backend at `http://localhost:8000`. This is set in the `package.json` file:

```json
{
  "proxy": "http://localhost:8000"
}
```

## 📱 Pages & Features

### 🏠 Dashboard
- Overview of database status and statistics
- Quick action cards for common tasks
- System health monitoring
- Recent activity feed

### 💬 Chat Interface
- Real-time chat with AI assistant
- Natural language database queries
- Message history and suggestions
- Code syntax highlighting
- Copy-to-clipboard functionality

### 🔌 Database Connection
- Support for multiple database types:
  - MongoDB
  - Redis
  - Cassandra
  - Elasticsearch
- Connection form with validation
- Connection status indicators
- Helpful connection tips

### 📊 Analysis
- Schema analysis
- Data quality assessment
- Performance analysis
- Business insights generation
- Detailed results display

### 💡 Insights
- AI-powered business insights
- Executive summaries
- Key metrics visualization
- Trend analysis
- Actionable recommendations

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) - Main brand color
- **Success**: Green (#22c55e) - Success states
- **Warning**: Orange (#f59e0b) - Warnings and alerts
- **Error**: Red (#ef4444) - Error states
- **Secondary**: Gray scale for text and backgrounds

### Components
- **Cards**: Consistent card design with shadows and borders
- **Buttons**: Multiple button styles with hover effects
- **Forms**: Clean form inputs with focus states
- **Modals**: Overlay modals for important actions
- **Notifications**: Toast notifications for user feedback

### Animations
- **Page Transitions**: Smooth page loading animations
- **Hover Effects**: Interactive hover states
- **Loading States**: Spinner animations for async operations
- **Micro-interactions**: Small animations for better UX

## 🔄 State Management

The app uses React Context for state management:

### DatabaseContext
- Database connection status
- Connection information
- Collections and schema data
- Connection/disconnection functions

### ChatContext
- Chat messages history
- Typing indicators
- Session management
- Message suggestions

## 📡 API Integration

The frontend communicates with the backend through RESTful APIs:

- `GET /health` - Health check
- `POST /connect` - Database connection
- `GET /collections` - Get collections
- `GET /schema` - Get schema information
- `POST /chat` - Send chat message
- `POST /analyze` - Run database analysis
- `POST /insights/generate` - Generate business insights

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Serve Production Build
```bash
npx serve -s build
```

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📱 Mobile Responsiveness

The frontend is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation bar
│   └── Sidebar.js      # Sidebar navigation
├── context/            # React Context providers
│   ├── DatabaseContext.js
│   └── ChatContext.js
├── pages/              # Page components
│   ├── Dashboard.js
│   ├── ChatInterface.js
│   ├── DatabaseConnection.js
│   ├── Analysis.js
│   └── Insights.js
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Global styles
```

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.js`
4. Add new API endpoints as needed
5. Update context providers if needed

## 🐛 Troubleshooting

### Common Issues

**Frontend won't start:**
- Check if Node.js is installed
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**API calls failing:**
- Ensure backend is running on port 8000
- Check CORS settings in backend
- Verify proxy configuration in package.json

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check if PostCSS is working
- Verify CSS imports in index.css

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the backend README
- Open an issue on GitHub

---

**Happy coding! 🚀** 