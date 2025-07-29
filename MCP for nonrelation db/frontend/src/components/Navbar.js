import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, 
  MessageSquare, 
  BarChart3, 
  Lightbulb, 
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

const Navbar = () => {
  const location = useLocation();
  const { isConnected, databaseType, disconnectFromDatabase } = useDatabase();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/connect', label: 'Connect', icon: Database },
    { path: '/analysis', label: 'Analysis', icon: BarChart3 },
    { path: '/insights', label: 'Insights', icon: Lightbulb },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-md border-b border-secondary-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Database className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gradient">MCP Analyzer</h1>
              <p className="text-xs text-secondary-500">Database Intelligence</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Connection Status & Actions */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              {isConnected ? (
                              <div className="flex items-center space-x-2 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                <Wifi className="w-4 h-4" />
                <span>{typeof databaseType === 'string' ? databaseType : 'Connected'}</span>
              </div>
              ) : (
                <div className="flex items-center space-x-2 px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm font-medium">
                  <WifiOff className="w-4 h-4" />
                  <span>Disconnected</span>
                </div>
              )}
            </div>

            {/* Disconnect Button */}
            {isConnected && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={disconnectFromDatabase}
                className="btn-error text-sm"
              >
                Disconnect
              </motion.button>
            )}

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-secondary-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-secondary-600 hover:text-primary-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 