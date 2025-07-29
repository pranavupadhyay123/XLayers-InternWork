import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  MessageSquare, 
  BarChart3, 
  Lightbulb, 
  Activity,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import { useChat } from '../context/ChatContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { isConnected, databaseType, collections, schema } = useDatabase();
  const { messages } = useChat();
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await axios.get('/health');
      setHealthStatus(response.data);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const stats = [
    {
      title: 'Database Status',
      value: isConnected ? 'Connected' : 'Disconnected',
      icon: Database,
      color: isConnected ? 'success' : 'error',
      description: typeof databaseType === 'string' ? databaseType : 'No database'
    },
    {
      title: 'Collections',
      value: collections.length,
      icon: BarChart3,
      color: 'primary',
      description: 'Available collections'
    },
    {
      title: 'Total Documents',
      value: schema?.total_documents ? schema.total_documents.toLocaleString() : '0',
      icon: Activity,
      color: 'warning',
      description: 'Documents in database'
    },
    {
      title: 'Chat Messages',
      value: messages.length,
      icon: MessageSquare,
      color: 'primary',
      description: 'Conversation history'
    }
  ];

  const quickActions = [
    {
      title: 'Start Chat',
      description: 'Ask questions about your database',
      icon: MessageSquare,
      href: '/chat',
      color: 'primary'
    },
    {
      title: 'Run Analysis',
      description: 'Analyze schema and performance',
      icon: BarChart3,
      href: '/analysis',
      color: 'warning'
    },
    {
      title: 'Get Insights',
      description: 'Generate business insights',
      icon: Lightbulb,
      href: '/insights',
      color: 'success'
    },
    {
      title: 'Connect Database',
      description: 'Link a new database',
      icon: Database,
      href: '/connect',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-100 text-primary-700 border-primary-200',
      success: 'bg-success-100 text-success-700 border-success-200',
      warning: 'bg-warning-100 text-warning-700 border-warning-200',
      error: 'bg-error-100 text-error-700 border-error-200',
    };
    return colors[color] || colors.primary;
  };

  const getStatusIcon = (color) => {
    switch (color) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <AlertTriangle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient mb-4">Database Intelligence Dashboard</h1>
        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
          Welcome to your MCP Database Analyzer. Connect to your non-relational database and start exploring with AI-powered insights.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-secondary-900">{String(stat.value)}</p>
                  <p className="text-sm text-secondary-500">{String(stat.description)}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  {getStatusIcon(stat.color)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={action.href} className="block">
                  <div className={`card-hover h-full ${getColorClasses(action.color)}`}>
                    <div className="flex items-start space-x-4">
                      <Icon className="w-8 h-8 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{action.title}</h3>
                        <p className="text-sm opacity-80 mb-3">{action.description}</p>
                        <div className="flex items-center text-sm font-medium">
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* System Status */}
      {healthStatus && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">System Status</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">API Status</h3>
                <p className="text-sm text-secondary-600">All systems operational</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">Performance</h3>
                <p className="text-sm text-secondary-600">Response time: {typeof healthStatus.response_time === 'number' ? healthStatus.response_time : 'N/A'}ms</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-warning-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">Active Sessions</h3>
                <p className="text-sm text-secondary-600">{typeof healthStatus.active_sessions === 'number' ? healthStatus.active_sessions : 0} sessions</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Getting Started */}
      {!isConnected && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Getting Started</h2>
          <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Connect Your First Database
                </h3>
                <p className="text-primary-700 mb-4">
                  Start by connecting to your MongoDB, Redis, Cassandra, or Elasticsearch database to unlock the full potential of AI-powered analysis.
                </p>
                <Link to="/connect" className="btn-primary inline-flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Connect Database</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {isConnected && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Recent Activity</h2>
          <div className="card">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600" />
                <div>
                  <p className="font-medium text-secondary-900">Database Connected</p>
                  <p className="text-sm text-secondary-600">Successfully connected to {typeof databaseType === 'string' ? databaseType : 'database'}</p>
                </div>
              </div>
              
              {collections.length > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-medium text-secondary-900">Collections Loaded</p>
                    <p className="text-sm text-secondary-600">{collections.length} collections available</p>
                  </div>
                </div>
              )}
              
              {messages.length > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-warning-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-warning-600" />
                  <div>
                    <p className="font-medium text-secondary-900">Chat Active</p>
                    <p className="text-sm text-secondary-600">{messages.length} messages exchanged</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 