import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingUp, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Loader2,
  RefreshCw,
  Target,
  DollarSign,
  Users
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Insights = () => {
  const { isConnected, databaseType } = useDatabase();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (isConnected) {
      generateInsights();
    }
  }, [isConnected]);

  const generateInsights = async () => {
    if (!isConnected) {
      toast.error('Please connect to a database first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/insights/generate');
      
      if (response.data.status === 'success') {
        setInsights(response.data);
        setLastUpdated(new Date());
        toast.success('Insights generated successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to generate insights');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to generate insights';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'revenue': return <DollarSign className="w-5 h-5" />;
      case 'performance': return <Zap className="w-5 h-5" />;
      case 'trends': return <TrendingUp className="w-5 h-5" />;
      case 'quality': return <CheckCircle className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'revenue': return 'bg-success-100 text-success-700 border-success-200';
      case 'performance': return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'trends': return 'bg-primary-100 text-primary-700 border-primary-200';
      case 'quality': return 'bg-success-100 text-success-700 border-success-200';
      case 'users': return 'bg-primary-100 text-primary-700 border-primary-200';
      default: return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Business Insights</h1>
          <p className="text-secondary-600">
            AI-powered insights and recommendations for your database
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateInsights}
          disabled={!isConnected || loading}
          className="btn-primary flex items-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Insights</span>
            </>
          )}
        </motion.button>
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
                Please connect to a database first to generate insights
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <div className="flex items-center space-x-2 text-sm text-secondary-600">
          <Clock className="w-4 h-4" />
          <span>Last updated: {formatDate(lastUpdated)}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            Generating Insights
          </h3>
          <p className="text-secondary-600">
            Analyzing your database and generating business insights...
          </p>
        </div>
      )}

      {/* Insights Content */}
      {!loading && insights && (
        <div className="space-y-8">
          {/* Executive Summary */}
          {insights.executive_summary && (
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Executive Summary</h2>
              <div className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200">
                <p className="text-primary-900 leading-relaxed">{insights.executive_summary}</p>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          {insights.key_metrics && (
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(insights.key_metrics).map(([metric, value]) => (
                  <div key={metric} className="p-4 bg-white border border-secondary-200 rounded-lg">
                    <p className="text-sm font-medium text-secondary-600 capitalize">
                      {metric.replace(/_/g, ' ')}
                    </p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Insights */}
          {insights.business_insights && (
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Business Insights</h2>
              <div className="space-y-4">
                {insights.business_insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{insight.title}</h3>
                        <p className="mb-3 opacity-90">{insight.description}</p>
                        {insight.impact && (
                          <div className="text-sm opacity-80">
                            <strong>Impact:</strong> {insight.impact}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Trends Analysis */}
          {insights.trends && (
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Trends Analysis</h2>
              <div className="space-y-4">
                {insights.trends.map((trend, index) => (
                  <div key={index} className="p-4 bg-white border border-secondary-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      <h3 className="font-semibold text-secondary-900">{trend.title}</h3>
                    </div>
                    <p className="text-secondary-600 mb-2">{trend.description}</p>
                    {trend.direction && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-secondary-600">Direction:</span>
                        <span className={`text-sm font-medium ${
                          trend.direction === 'up' ? 'text-success-600' : 
                          trend.direction === 'down' ? 'text-error-600' : 'text-secondary-600'
                        }`}>
                          {trend.direction === 'up' ? '↗ Increasing' : 
                           trend.direction === 'down' ? '↘ Decreasing' : '→ Stable'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {insights.recommendations && (
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {insights.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-warning-50 rounded-lg border border-warning-200">
                    <Target className="w-5 h-5 text-warning-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-warning-900 mb-1">{rec.title}</p>
                      <p className="text-sm text-warning-700">{rec.description}</p>
                      {rec.priority && (
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                            rec.priority === 'high' ? 'bg-error-100 text-error-700' :
                            rec.priority === 'medium' ? 'bg-warning-100 text-warning-700' :
                            'bg-success-100 text-success-700'
                          }`}>
                            {rec.priority} priority
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Quality Insights */}
          {insights.data_quality_insights && (
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Data Quality Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(insights.data_quality_insights).map(([metric, value]) => (
                  <div key={metric} className="p-4 bg-white border border-secondary-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-secondary-900 capitalize">
                        {metric.replace(/_/g, ' ')}
                      </span>
                      <CheckCircle className="w-5 h-5 text-success-600" />
                    </div>
                    <p className="text-2xl font-bold text-success-600">
                      {typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Insights State */}
      {!loading && !insights && isConnected && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-10 h-10 text-secondary-600" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            No Insights Available
          </h3>
          <p className="text-secondary-600 mb-6">
            Click "Refresh Insights" to generate AI-powered business insights from your database
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateInsights}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Generate Insights</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Insights; 