import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatContext = createContext();

const initialState = {
  messages: [],
  currentSessionId: null,
  isTyping: false,
  loading: false,
  error: null,
  suggestions: [
    "Show me the database schema",
    "Analyze data quality",
    "Generate business insights",
    "What are the top performing hotels?",
    "Show me revenue trends",
    "How is the database performance?"
  ],
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false, isTyping: false };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
        isTyping: false,
      };
    
    case 'UPDATE_LAST_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg, index) =>
          index === state.messages.length - 1 ? { ...msg, ...action.payload } : msg
        ),
      };
    
    case 'SET_SESSION':
      return { ...state, currentSessionId: action.payload };
    
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [], currentSessionId: null };
    
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };
    
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_TYPING', payload: true });

    try {
      const response = await axios.post('/chat', {
        message: message,
        session_id: state.currentSessionId,
      });

      if (response.data.status === 'success') {
        // Ensure response content is a string
        const content = typeof response.data.response === 'string' 
          ? response.data.response 
          : JSON.stringify(response.data.response);
        
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: content,
          type: response.data.type || 'general',
          suggestions: response.data.suggestions || [],
          timestamp: new Date().toISOString(),
        };

        dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
        
        // Update session ID if provided
        if (response.data.session_id && !state.currentSessionId) {
          dispatch({ type: 'SET_SESSION', payload: response.data.session_id });
        }

        // Update suggestions if provided
        if (response.data.suggestions) {
          dispatch({ type: 'SET_SUGGESTIONS', payload: response.data.suggestions });
        }
      } else {
        const errorMsg = response.data.message || 'Failed to send message';
        throw new Error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
      }
    } catch (error) {
      let errorMessage = 'Failed to send message';
      
      if (error.response?.data?.detail) {
        errorMessage = typeof error.response.data.detail === 'string' 
          ? error.response.data.detail 
          : JSON.stringify(error.response.data.detail);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      const errorMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        type: 'error',
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_MESSAGE', payload: errorMsg });
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    toast.success('Chat history cleared');
  };

  const getSessionHistory = async (sessionId) => {
    try {
      const response = await axios.get(`/chat/history/${sessionId}`);
      if (response.data.status === 'success') {
        return response.data.messages;
      }
    } catch (error) {
      console.error('Error fetching session history:', error);
    }
    return [];
  };

  const value = {
    ...state,
    sendMessage,
    clearChat,
    getSessionHistory,
    messagesEndRef,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 