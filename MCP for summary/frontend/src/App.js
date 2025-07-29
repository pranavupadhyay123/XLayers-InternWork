import React, { useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';

const ROLE_OPTIONS = [
  { value: 'summarizer', label: 'Summarizer' },
  { value: 'explainer', label: 'Explainer' },
  { value: 'qa', label: 'Q&A' },
];

function App() {
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [summary, setSummary] = useState('');
  const [note, setNote] = useState('');
  const [role, setRole] = useState('summarizer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState('');
  const [qnaLoading, setQnaLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  // Upload document and start session
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSummary('');
    setError('');
    setSessionId(null);
    setMetadata(null);
    setChatHistory([]);
    setSearchResult('');
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to upload document.');
      }
      const data = await response.json();
      setSessionId(data.session_id);
      setMetadata(data.metadata);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Summarize document
  const handleSummarize = async () => {
    if (!sessionId) {
      setError('No session. Please upload a document first.');
      return;
    }
    setLoading(true);
    setError('');
    setSummary('');
    setChatHistory([]);
    setSearchResult('');
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('note', note);
    formData.append('role', role);
    try {
      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to summarize document.');
      }
      const data = await response.json();
      setSummary(data.summary);
      // Fetch chat history
      fetchSession(data.session_id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch session data (metadata, chat history)
  const fetchSession = async (sid) => {
    try {
      const response = await fetch(`http://localhost:8000/session/${sid}`);
      if (!response.ok) return;
      const data = await response.json();
      setMetadata(data.metadata);
      setChatHistory(data.chat_history || []);
      setSummary(data.summary || '');
    } catch {}
  };

  // Q&A follow-up
  const handleAsk = async () => {
    if (!sessionId || !question.trim()) return;
    setQnaLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('question', question);
    formData.append('role', 'qa');
    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to get answer.');
      }
      const data = await response.json();
      setChatHistory(data.chat_history || []);
      setQuestion('');
    } catch (err) {
      setError(err.message);
    } finally {
      setQnaLoading(false);
    }
  };

  // Semantic search
  const handleSearch = async () => {
    if (!sessionId || !searchQuery.trim()) return;
    setError('');
    setSearchResult('');
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('query', searchQuery);
    try {
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to search.');
      }
      const data = await response.json();
      setSearchResult(data.result);
    } catch (err) {
      setError(err.message);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format upload time
  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts * 1000);
    return d.toLocaleString();
  };

  // Get file icon
  const getFileIcon = (filename) => {
    const ext = filename?.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'txt': return '📄';
      default: return '📁';
    }
  };

  // Chat bubble rendering
  const renderChat = () => (
    <div className="chat-history">
      {chatHistory.map((msg, idx) => (
        <div key={idx} className={`chat-bubble ${msg.role}`}> 
          <div className="chat-role">{msg.role === 'user' ? 'You' : 'AI'}</div>
          <div className="chat-content">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1>DocuSum</h1>
          </div>
          <p className="tagline">AI-Powered Document Summarization &amp; Q&A</p>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          {/* Upload Section */}
          <div className="upload-section">
            <div className="upload-card">
              <div className="upload-header">
                <h2>Upload Document</h2>
                <p>Select a document to get an AI-generated summary and chat about it</p>
              </div>
              <div className="file-upload-area">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  id="file-input"
                  className="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">
                    <span className="primary-text">Choose a file</span>
                    <span className="secondary-text">or drag and drop</span>
                  </div>
                  <div className="supported-formats">
                    PDF, DOCX, TXT up to 10MB
                  </div>
                </label>
              </div>
              {/* File Preview & Metadata */}
              {metadata && (
                <div className="file-preview">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(metadata.filename)}</span>
                    <div className="file-details">
                      <div className="file-name">{metadata.filename}</div>
                      <div className="file-size">{formatFileSize(metadata.size)}</div>
                      <div className="file-meta">Type: {metadata.type}</div>
                      <div className="file-meta">Words: {metadata.word_count}, Chars: {metadata.char_count}</div>
                      <div className="file-meta">Uploaded: {formatTime(metadata.upload_time)}</div>
                    </div>
                  </div>
                </div>
              )}
              {/* Note & Role Selection */}
              <div className="note-section">
                <label htmlFor="note-input" className="note-label">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  id="note-input"
                  className="note-input"
                  placeholder="Add specific instructions for summarization, e.g., 'Focus on key findings' or 'Include technical details'"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                />
                <div className="role-select-row">
                  <label htmlFor="role-select" className="role-label">Role:</label>
                  <select
                    id="role-select"
                    className="role-select"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    {ROLE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSummarize}
                disabled={loading || !sessionId}
                className="upload-button"
              >
                {loading ? (
                  <div className="button-content">
                    <div className="spinner"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="button-content">
                    <span>📊</span>
                    <span>Generate Summary</span>
                  </div>
                )}
              </button>
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}
            </div>
          </div>
          {/* Chat/Q&A Section */}
          {summary && (
            <div className="summary-section">
              <div className="summary-card">
                <div className="summary-header">
                  <h3>📋 Document Summary</h3>
                  <div className="summary-actions">
                    <button
                      className="action-button"
                      onClick={() => navigator.clipboard.writeText(summary)}
                    >
                      📋 Copy
                    </button>
                    <button
                      className="action-button"
                      onClick={() => {
                        const blob = new Blob([summary], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'summary.txt';
                        a.click();
                      }}
                    >
                      💾 Download
                    </button>
                  </div>
                </div>
                <div className="summary-content">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              </div>
              {/* Chat History */}
              {chatHistory.length > 0 && (
                <div className="chat-section">
                  <h4 className="chat-title">💬 Q&A / Conversation</h4>
                  {renderChat()}
                </div>
              )}
              {/* Q&A Input */}
              <div className="qna-input-row">
                <input
                  type="text"
                  className="qna-input"
                  placeholder="Ask a follow-up question about the document..."
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk()}
                  disabled={qnaLoading}
                />
                <button
                  className="qna-button"
                  onClick={handleAsk}
                  disabled={qnaLoading || !question.trim()}
                >
                  {qnaLoading ? '...' : 'Ask'}
                </button>
              </div>
              {/* Semantic Search */}
              <div className="search-section">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Semantic search: Find a topic or phrase in the document..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                <button
                  className="search-button"
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                >
                  Search
                </button>
              </div>
              {searchResult && (
                <div className="search-result">
                  <h5>🔍 Search Result</h5>
                  <div className="search-chunk">
                    <ReactMarkdown>{searchResult}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>DocuSum</h4>
            <p>AI-powered document summarization, Q&A, and semantic search</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>PDF, DOCX, TXT support</li>
              <li>AI-powered summaries</li>
              <li>Custom instructions & roles</li>
              <li>Multi-turn Q&A</li>
              <li>Semantic search</li>
              <li>Markdown formatting</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Powered by</h4>
            <p>Groq AI • Llama 4 Scout</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 DocuSum. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
