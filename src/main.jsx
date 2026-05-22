import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import AuditNew from './pages/AuditNew'
import AuditResult from './pages/AuditResult'
import History from './pages/History'

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', color: '#f87171', background: '#0a0a0f', 
          minHeight: '100vh', fontFamily: 'monospace', whiteSpace: 'pre-wrap'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#fbbf24' }}>⚠️ Render Error</h1>
          <div style={{ background: '#1a1a2e', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
            <strong>Error:</strong> {this.state.error?.message || 'Unknown error'}
          </div>
          <div style={{ background: '#1a1a2e', padding: '20px', borderRadius: '8px', fontSize: '12px' }}>
            {this.state.error?.stack}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="audit" element={<AuditNew />} />
            <Route path="audit/result" element={<AuditResult />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
