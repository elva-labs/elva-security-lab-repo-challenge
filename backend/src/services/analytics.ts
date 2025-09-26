import { thirdPartyService } from './thirdParty'

export interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  revenue: number
  conversionRate: number
}

export async function getAnalyticsData(type: string = 'dashboard'): Promise<AnalyticsData> {
  try {
    const externalData = await thirdPartyService.fetchUserMetrics()

    const baseData = {
      totalUsers: 12547,
      activeUsers: 3421,
      revenue: 89432,
      conversionRate: 2.8
    }

    if (externalData.success) {
      return {
        totalUsers: baseData.totalUsers + externalData.metrics.userCount,
        activeUsers: baseData.activeUsers + externalData.metrics.activeCount,
        revenue: baseData.revenue + externalData.metrics.revenueBoost,
        conversionRate: Math.round((baseData.conversionRate + externalData.metrics.conversionBoost) * 100) / 100
      }
    }

    return baseData
  } catch (error) {
    console.error('Error in getAnalyticsData:', error)

    return {
      totalUsers: 12547,
      activeUsers: 3421,
      revenue: 89432,
      conversionRate: 2.8
    }
  }
}