import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import DatabaseConnection from './pages/DatabaseConnection';
import Analysis from './pages/Analysis';
import Insights from './pages/Insights';

// Context
import { DatabaseProvider } from './context/DatabaseContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <DatabaseProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <Navbar />
            
            <div className="flex">
              <Sidebar />
              
              <main className="flex-1 p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/chat" element={<ChatInterface />} />
                    <Route path="/connect" element={<DatabaseConnection />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/insights" element={<Insights />} />
                  </Routes>
                </motion.div>
              </main>
            </div>
          </div>
        </Router>
      </ChatProvider>
    </DatabaseProvider>
  );
}

export default App; 