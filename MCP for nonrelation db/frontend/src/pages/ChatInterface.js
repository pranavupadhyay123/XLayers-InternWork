import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Trash2, 
  Bot, 
  User, 
  Database,
  Lightbulb,
  BarChart3,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useDatabase } from '../context/DatabaseContext';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatInterface = () => {
  const { 
    messages, 
    sendMessage, 
    clearChat, 
    isTyping, 
    suggestions,
    messagesEndRef 
  } = useChat();
  
  const { isConnected } = useDatabase();
  const [inputMessage, setInputMessage] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;
    
    if (!isConnected) {
      toast.error('Please connect to a database first');
      return;
    }

    await sendMessage(message);
    setInputMessage('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageIcon = (role, type) => {
    if (role === 'user') return <User className="w-5 h-5" />;
    
    switch (type) {
      case 'schema': return <Database className="w-5 h-5" />;
      case 'business_insights': return <Lightbulb className="w-5 h-5" />;
      case 'analysis': return <BarChart3 className="w-5 h-5" />;
      case 'error': return <Database className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getMessageColor = (role, type) => {
    if (role === 'user') return 'bg-primary-600 text-white';
    if (type === 'error') return 'bg-error-100 text-error-900 border-error-200';
    return 'bg-secondary-100 text-secondary-900 border-secondary-200';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Chat with Your Database</h1>
          <p className="text-secondary-600">
            Ask questions about your data in natural language
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearChat}
          className="btn-secondary flex items-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Chat</span>
        </motion.button>
      </div>

      {/* Connection Warning */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-warning-600" />
            <div>
              <p className="font-medium text-warning-900">Database Not Connected</p>
              <p className="text-sm text-warning-700">
                Please connect to a database first to start chatting
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Start a Conversation
            </h3>
            <p className="text-secondary-600 mb-6">
              Ask questions about your database, request analysis, or get insights
            </p>
            
            {/* Quick Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {suggestions.slice(0, 4).map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSendMessage(suggestion)}
                  className="p-3 text-left bg-white border border-secondary-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                >
                  <p className="text-sm font-medium text-secondary-900">{suggestion}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-secondary-200 text-secondary-700'
                  }`}>
                    {getMessageIcon(message.role, message.type)}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-4 rounded-2xl border max-w-full ${getMessageColor(message.role, message.type)}`}>
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '');
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={tomorrow}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                    
                    {/* Message Actions */}
                    <div className={`flex items-center space-x-2 mt-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-secondary-500">
                        {formatTimestamp(message.timestamp)}
                      </span>
                      
                      {message.role === 'assistant' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors"
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </motion.button>
                      )}
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSendMessage(suggestion)}
                            className="px-3 py-1 text-xs bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary-200 text-secondary-700 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-secondary-100 border border-secondary-200 rounded-2xl p-4">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-xl border border-secondary-200 p-4 shadow-sm">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Ask about your database..." : "Connect to a database first..."}
              disabled={!isConnected}
              className="w-full resize-none border-0 focus:ring-0 focus:outline-none text-secondary-900 placeholder-secondary-500"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || !isConnected}
            className={`p-3 rounded-lg transition-all duration-200 ${
              inputMessage.trim() && isConnected
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-glow'
                : 'bg-secondary-200 text-secondary-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 