import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  MessageSquare, 
  BarChart3, 
  Lightbulb, 
  Settings,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

const Sidebar = () => {
  const { isConnected, databaseType, collections, schema } = useDatabase();

  const quickActions = [
    {
      icon: Database,
      label: 'Connect Database',
      description: 'Link your non-relational database',
      color: 'primary',
      href: '/connect'
    },
    {
      icon: MessageSquare,
      label: 'Start Chat',
      description: 'Ask questions about your data',
      color: 'success',
      href: '/chat'
    },
    {
      icon: BarChart3,
      label: 'Run Analysis',
      description: 'Analyze schema and performance',
      color: 'warning',
      href: '/analysis'
    },
    {
      icon: Lightbulb,
      label: 'Get Insights',
      description: 'Generate business insights',
      color: 'primary',
      href: '/insights'
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

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-white/80 backdrop-blur-md border-r border-secondary-200 min-h-screen p-6"
    >
      {/* Database Status */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Database Status</h2>
        
        <div className={`p-4 rounded-lg border ${isConnected ? 'bg-success-50 border-success-200' : 'bg-secondary-50 border-secondary-200'}`}>
          <div className="flex items-center space-x-3">
            {isConnected ? (
              <CheckCircle className="w-6 h-6 text-success-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-secondary-500" />
            )}
            <div>
              <p className="font-medium text-secondary-900">
                {isConnected ? 'Connected' : 'Not Connected'}
              </p>
              <p className="text-sm text-secondary-600">
                {isConnected ? databaseType : 'No database linked'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.label}
                href={action.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getColorClasses(action.color)}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="font-medium">{action.label}</p>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Database Info */}
      {isConnected && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Database Info</h2>
          
          <div className="space-y-4">
            {/* Collections */}
            <div className="p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="w-4 h-4 text-secondary-600" />
                <span className="font-medium text-secondary-900">Collections</span>
              </div>
              <p className="text-2xl font-bold text-secondary-900">
                {collections.length}
              </p>
              <p className="text-sm text-secondary-600">
                {collections.length > 0 ? collections.slice(0, 3).map(c => typeof c === 'string' ? c : JSON.stringify(c)).join(', ') + (collections.length > 3 ? '...' : '') : 'No collections found'}
              </p>
            </div>

            {/* Schema Info */}
            {schema && (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-secondary-600" />
                  <span className="font-medium text-secondary-900">Schema</span>
                </div>
                              <p className="text-2xl font-bold text-secondary-900">
                {schema.total_documents ? schema.total_documents.toLocaleString() : 'N/A'}
              </p>
                <p className="text-sm text-secondary-600">
                  Total documents
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
            <Clock className="w-4 h-4 text-secondary-500" />
            <div>
              <p className="text-sm font-medium text-secondary-900">System Ready</p>
              <p className="text-xs text-secondary-600">Ready to analyze your database</p>
            </div>
          </div>
          
          {isConnected && (
            <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <div>
                <p className="text-sm font-medium text-secondary-900">Connected</p>
                <p className="text-xs text-secondary-600">Database connection established</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <p className="font-medium text-primary-900 mb-1">Pro Tip</p>
            <p className="text-sm text-primary-700">
              Try asking "Show me the database schema" to get started with your analysis.
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar; 