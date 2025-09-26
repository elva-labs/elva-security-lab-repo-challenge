import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { analyticsRouter } from './routes/analytics'
import { thirdPartyService } from './services/thirdParty'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/analytics', analyticsRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Analytics API available at http://localhost:${PORT}/api/analytics`)

  thirdPartyService.initialize()
    .then(() => console.log('✅ Third-party services initialized'))
    .catch(err => console.error('❌ Failed to initialize services:', err))
})