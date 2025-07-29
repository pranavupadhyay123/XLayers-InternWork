import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Loader2,
  Lightbulb
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Analysis = () => {
  const { isConnected, databaseType } = useDatabase();
  const [analysisType, setAnalysisType] = useState('schema');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const analysisTypes = [
    {
      id: 'schema',
      name: 'Schema Analysis',
      description: 'Analyze database structure and document patterns',
      icon: Database,
      color: 'primary'
    },
    {
      id: 'quality',
      name: 'Data Quality',
      description: 'Check data consistency and completeness',
      icon: CheckCircle,
      color: 'success'
    },
    {
      id: 'performance',
      name: 'Performance Analysis',
      description: 'Analyze query performance and optimization',
      icon: Zap,
      color: 'warning'
    },
    {
      id: 'business',
      name: 'Business Insights',
      description: 'Generate business-focused analysis',
      icon: TrendingUp,
      color: 'primary'
    }
  ];

  const runAnalysis = async () => {
    if (!isConnected) {
      toast.error('Please connect to a database first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/analyze', {
        analysis_type: analysisType
      });

      if (response.data.status === 'success') {
        setResults(response.data);
        toast.success('Analysis completed successfully!');
      } else {
        throw new Error(response.data.message || 'Analysis failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Analysis failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient mb-2">Database Analysis</h1>
        <p className="text-secondary-600">
          Analyze your database schema, data quality, performance, and generate insights
        </p>
      </div>

      {/* Connection Warning */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-warning-50 border border-warning-200 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-warning-600" />
            <div>
              <p className="font-medium text-warning-900">Database Not Connected</p>
              <p className="text-sm text-warning-700">
                Please connect to a database first to run analysis
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analysis Types */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Analysis Types</h2>
            
            <div className="space-y-3">
              {analysisTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAnalysisType(type.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      analysisType === type.id
                        ? 'bg-primary-50 border-primary-300 text-primary-900'
                        : 'bg-white border-secondary-200 text-secondary-700 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6" />
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className="text-sm opacity-80">{type.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runAnalysis}
                disabled={!isConnected || loading}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running Analysis...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    <span>Run Analysis</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Analysis Results</h2>
            
            {!results ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-10 h-10 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  No Analysis Results
                </h3>
                <p className="text-secondary-600">
                  Select an analysis type and click "Run Analysis" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary */}
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h3 className="font-semibold text-secondary-900 mb-2">Analysis Summary</h3>
                  <p className="text-secondary-600">{results.summary}</p>
                </div>

                {/* Schema Analysis Results */}
                {analysisType === 'schema' && results.schema_analysis && (
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Schema Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-secondary-200 rounded-lg">
                        <p className="text-sm font-medium text-secondary-600">Total Collections</p>
                        <p className="text-2xl font-bold text-secondary-900">
                          {results.schema_analysis.total_collections}
                        </p>
                      </div>
                      <div className="p-4 bg-white border border-secondary-200 rounded-lg">
                        <p className="text-sm font-medium text-secondary-600">Total Documents</p>
                        <p className="text-2xl font-bold text-secondary-900">
                          {results.schema_analysis.total_documents?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Quality Results */}
                {analysisType === 'quality' && results.data_quality && (
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Data Quality Metrics</h3>
                    <div className="space-y-3">
                      {Object.entries(results.data_quality).map(([metric, value]) => (
                        <div key={metric} className="flex items-center justify-between p-3 bg-white border border-secondary-200 rounded-lg">
                          <span className="font-medium text-secondary-900 capitalize">
                            {metric.replace(/_/g, ' ')}
                          </span>
                          <span className="text-lg font-semibold text-primary-600">
                            {typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Results */}
                {analysisType === 'performance' && results.performance_analysis && (
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Performance Analysis</h3>
                    <div className="space-y-3">
                      {Object.entries(results.performance_analysis).map(([metric, value]) => (
                        <div key={metric} className="flex items-center justify-between p-3 bg-white border border-secondary-200 rounded-lg">
                          <span className="font-medium text-secondary-900 capitalize">
                            {metric.replace(/_/g, ' ')}
                          </span>
                          <span className="text-lg font-semibold text-warning-600">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Business Insights */}
                {analysisType === 'business' && results.business_insights && (
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Business Insights</h3>
                    <div className="space-y-4">
                      {results.business_insights.map((insight, index) => (
                        <div key={index} className="p-4 bg-white border border-secondary-200 rounded-lg">
                          <h4 className="font-medium text-secondary-900 mb-2">{insight.title}</h4>
                          <p className="text-secondary-600 mb-2">{insight.description}</p>
                          {insight.recommendation && (
                            <div className="mt-2 p-2 bg-primary-50 rounded">
                              <p className="text-sm font-medium text-primary-900">Recommendation:</p>
                              <p className="text-sm text-primary-700">{insight.recommendation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {results.recommendations && (
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Recommendations</h3>
                    <div className="space-y-2">
                      {results.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-warning-50 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-warning-600 mt-0.5" />
                          <p className="text-sm text-warning-900">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 