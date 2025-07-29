import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Server, 
  Key, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import toast from 'react-hot-toast';

const DatabaseConnection = () => {
  const { connectToDatabase, loading, isConnected, databaseType } = useDatabase();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDbType, setSelectedDbType] = useState('mongodb');
  const [formData, setFormData] = useState({
    host: 'localhost',
    port: '',
    username: '',
    password: '',
    database: '',
    auth_source: 'admin',
    ssl: false,
  });

  const databaseTypes = [
    {
      id: 'mongodb',
      name: 'MongoDB',
      icon: Database,
      description: 'Document-based NoSQL database',
      defaultPort: '27017',
      fields: ['host', 'port', 'username', 'password', 'database', 'auth_source', 'ssl']
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: Server,
      description: 'In-memory data structure store',
      defaultPort: '6379',
      fields: ['host', 'port', 'password', 'database']
    },
    {
      id: 'cassandra',
      name: 'Cassandra',
      icon: Database,
      description: 'Distributed NoSQL database',
      defaultPort: '9042',
      fields: ['host', 'port', 'username', 'password', 'keyspace']
    },
    {
      id: 'elasticsearch',
      name: 'Elasticsearch',
      icon: Server,
      description: 'Search and analytics engine',
      defaultPort: '9200',
      fields: ['host', 'port', 'username', 'password', 'index']
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDbTypeChange = (dbType) => {
    setSelectedDbType(dbType);
    const dbConfig = databaseTypes.find(db => db.id === dbType);
    setFormData({
      host: 'localhost',
      port: dbConfig.defaultPort,
      username: '',
      password: '',
      database: '',
      auth_source: 'admin',
      ssl: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dbConfig = databaseTypes.find(db => db.id === selectedDbType);
    
    // Construct connection string based on database type
    let connectionString = '';
    let additionalParams = {};
    
    if (selectedDbType === 'mongodb') {
      // MongoDB connection string format: mongodb://username:password@host:port/database
      const authPart = formData.username && formData.password 
        ? `${formData.username}:${formData.password}@` 
        : '';
      
      // Build query parameters properly
      const queryParams = [];
      if (formData.auth_source) {
        queryParams.push(`authSource=${formData.auth_source}`);
      }
      
      const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
      connectionString = `mongodb://${authPart}${formData.host}:${formData.port}/${formData.database}${queryString}`;
      
      additionalParams = {
        auth_source: formData.auth_source,
        ssl: formData.ssl
      };
    } else if (selectedDbType === 'redis') {
      // Redis connection string format: redis://:password@host:port/database
      const authPart = formData.password ? `:${formData.password}@` : '';
      connectionString = `redis://${authPart}${formData.host}:${formData.port}/${formData.database || 0}`;
    } else if (selectedDbType === 'cassandra') {
      // Cassandra connection string format: cassandra://username:password@host:port/keyspace
      const authPart = formData.username && formData.password 
        ? `${formData.username}:${formData.password}@` 
        : '';
      connectionString = `cassandra://${authPart}${formData.host}:${formData.port}/${formData.keyspace}`;
    } else if (selectedDbType === 'elasticsearch') {
      // Elasticsearch connection string format: http://username:password@host:port
      const authPart = formData.username && formData.password 
        ? `${formData.username}:${formData.password}@` 
        : '';
      connectionString = `http://${authPart}${formData.host}:${formData.port}`;
      additionalParams = {
        index: formData.index
      };
    }
    
    const connectionData = {
      db_type: selectedDbType,
      connection_string: connectionString,
      database_name: formData.database || formData.keyspace || formData.index,
      username: formData.username,
      password: formData.password,
      additional_params: additionalParams
    };

    const success = await connectToDatabase(connectionData);
    if (success) {
      toast.success(`Successfully connected to ${dbConfig.name}!`);
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      database: 'Database',
      keyspace: 'Keyspace',
      index: 'Index',
      auth_source: 'Auth Source',
      ssl: 'Use SSL'
    };
    return labels[field] || field;
  };

  const getFieldType = (field) => {
    if (field === 'password') return showPassword ? 'text' : 'password';
    if (field === 'port') return 'number';
    if (field === 'ssl') return 'checkbox';
    return 'text';
  };

  const getFieldPlaceholder = (field) => {
    const placeholders = {
      host: 'localhost',
      port: '27017',
      username: 'admin',
      password: 'Enter password',
      database: 'your_database',
      keyspace: 'your_keyspace',
      index: 'your_index',
      auth_source: 'admin'
    };
    return placeholders[field] || '';
  };

  const currentDbConfig = databaseTypes.find(db => db.id === selectedDbType);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Connect to Database</h1>
        <p className="text-secondary-600">
          Connect to your non-relational database to start analyzing and chatting
        </p>
      </div>

      {/* Connection Status */}
      {isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <div>
              <p className="font-medium text-success-900">Connected to {databaseType}</p>
              <p className="text-sm text-success-700">
                You can now start analyzing your database and chatting with it
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Database Type Selection */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Database Type</h2>
            
            <div className="space-y-3">
              {databaseTypes.map((dbType) => {
                const Icon = dbType.icon;
                return (
                  <motion.button
                    key={dbType.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDbTypeChange(dbType.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      selectedDbType === dbType.id
                        ? 'bg-primary-50 border-primary-300 text-primary-900'
                        : 'bg-white border-secondary-200 text-secondary-700 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6" />
                      <div>
                        <p className="font-medium">{dbType.name}</p>
                        <p className="text-sm opacity-80">{dbType.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Connection Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              {(() => {
                const Icon = currentDbConfig.icon;
                return <Icon className="w-6 h-6 text-primary-600" />;
              })()}
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">
                  {currentDbConfig.name} Connection
                </h2>
                <p className="text-sm text-secondary-600">
                  Enter your connection details
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentDbConfig.fields.map((field) => (
                  <div key={field} className={field === 'ssl' ? 'md:col-span-2' : ''}>
                    {field === 'ssl' ? (
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData[field]}
                          onChange={(e) => handleInputChange(field, e.target.checked)}
                          className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-900">
                          {getFieldLabel(field)}
                        </span>
                      </label>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-secondary-900 mb-2">
                          {getFieldLabel(field)}
                        </label>
                        <div className="relative">
                          <input
                            type={getFieldType(field)}
                            value={formData[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            placeholder={getFieldPlaceholder(field)}
                            className="input-field pr-10"
                            required={field !== 'username' && field !== 'password' && field !== 'auth_source'}
                          />
                          {field === 'password' && (
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-secondary-200">
                <div className="text-sm text-secondary-600">
                  Make sure your database is running and accessible
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      <span>Connect</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Connection Help</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-secondary-900 mb-2">Common Issues</h4>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• Make sure your database server is running</li>
                <li>• Check if the port is correct and accessible</li>
                <li>• Verify username and password credentials</li>
                <li>• Ensure network connectivity</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-secondary-900 mb-2">Default Ports</h4>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• MongoDB: 27017</li>
                <li>• Redis: 6379</li>
                <li>• Cassandra: 9042</li>
                <li>• Elasticsearch: 9200</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConnection; 