import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DatabaseContext = createContext();

const initialState = {
  isConnected: false,
  connectionInfo: null,
  databaseType: null,
  collections: [],
  schema: null,
  loading: false,
  error: null,
};

const databaseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        isConnected: true,
        connectionInfo: action.payload.connection_info,
        databaseType: action.payload.connection_info?.type,
        loading: false,
        error: null,
      };
    
    case 'DISCONNECT':
      return {
        ...state,
        isConnected: false,
        connectionInfo: null,
        databaseType: null,
        collections: [],
        schema: null,
        error: null,
      };
    
    case 'SET_COLLECTIONS':
      return { ...state, collections: action.payload };
    
    case 'SET_SCHEMA':
      return { ...state, schema: action.payload };
    
    default:
      return state;
  }
};

export const DatabaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(databaseReducer, initialState);

  const connectToDatabase = async (connectionData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await axios.post('/connect', connectionData);
      
      if (response.data.status === 'success') {
        // Ensure we have valid data before dispatching
        const payload = {
          ...response.data,
          connection_info: response.data.connection_info || {}
        };
        
        dispatch({ type: 'CONNECT_SUCCESS', payload });
        toast.success(`Connected to ${connectionData.db_type} database successfully!`);
        
        // Fetch collections and schema
        await fetchCollections();
        await fetchSchema();
        
        return true;
      } else {
        const errorMsg = response.data.message || 'Connection failed';
        throw new Error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
      }
    } catch (error) {
      let errorMessage = 'Connection failed';
      
      if (error.response?.data?.detail) {
        errorMessage = typeof error.response.data.detail === 'string' 
          ? error.response.data.detail 
          : JSON.stringify(error.response.data.detail);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  };

  const disconnectFromDatabase = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Note: The backend doesn't have a disconnect endpoint, so we just clear local state
      dispatch({ type: 'DISCONNECT' });
      toast.success('Disconnected from database');
    } catch (error) {
      toast.error('Error disconnecting from database');
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get('/collections');
      if (response.data.status === 'success') {
        const collections = response.data.collections || [];
        dispatch({ type: 'SET_COLLECTIONS', payload: collections });
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
      dispatch({ type: 'SET_COLLECTIONS', payload: [] });
    }
  };

  const fetchSchema = async () => {
    try {
      const response = await axios.get('/schema');
      if (response.data.status === 'success') {
        const schema = response.data.schema || {};
        dispatch({ type: 'SET_SCHEMA', payload: schema });
      }
    } catch (error) {
      console.error('Error fetching schema:', error);
      dispatch({ type: 'SET_SCHEMA', payload: null });
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return null;
    }
  };

  const value = {
    ...state,
    connectToDatabase,
    disconnectFromDatabase,
    fetchCollections,
    fetchSchema,
    checkHealth,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}; 