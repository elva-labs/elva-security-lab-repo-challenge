import express from 'express'
import { getAnalyticsData } from '../services/analytics'

export const analyticsRouter = express.Router()

analyticsRouter.get('/', async (req, res) => {
  try {
    const data = await getAnalyticsData()
    res.json(data)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ error: 'Failed to fetch analytics data' })
  }
})

analyticsRouter.get('/report', async (req, res) => {
  try {
    const reportType = req.query.type as string || 'daily'
    const report = await getAnalyticsData(reportType)
    res.json({ report, generated: new Date().toISOString() })
  } catch (error) {
    console.error('Error generating report:', error)
    res.status(500).json({ error: 'Failed to generate report' })
  }
})