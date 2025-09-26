import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  revenue: number
  conversionRate: number
}

function App() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics')
        setData(response.data)
      } catch (err) {
        setError('Failed to fetch analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="loading">Loading analytics...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="App">
      <header className="header">
        <h1>Secure Analytics Platform</h1>
        <p>Real-time customer insights and data analytics</p>
      </header>

      <main className="dashboard">
        {data && (
          <>
            <div className="metric-card">
              <h3>Total Users</h3>
              <div className="metric-value">{data.totalUsers.toLocaleString()}</div>
            </div>

            <div className="metric-card">
              <h3>Active Users</h3>
              <div className="metric-value">{data.activeUsers.toLocaleString()}</div>
            </div>

            <div className="metric-card">
              <h3>Revenue</h3>
              <div className="metric-value">${data.revenue.toLocaleString()}</div>
            </div>

            <div className="metric-card">
              <h3>Conversion Rate</h3>
              <div className="metric-value">{data.conversionRate}%</div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App