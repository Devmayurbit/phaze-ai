import axios from 'axios'

const API_BASE = '/api'

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

export const influencerAPI = {
  submit: (data) => apiClient.post('/influencer/submit', data),
  getContent: (influencerId) => apiClient.get(`/influencer/${influencerId}/content`),
  getTrends: (influencerId) => apiClient.get(`/influencer/${influencerId}/trends`),
  scrape: (data) => apiClient.post('/influencer/scrape', data),
}

export const contentAPI = {
  generateScripts: (data) => apiClient.post('/generate/scripts', data),
  generateHooks: (data) => apiClient.post('/generate/hooks', data),
  // Dynamic content analysis
  analyzeInfluencer: (data) => apiClient.post('/content/analyze', data),
  getAnalysisResults: (requestId) => apiClient.get(`/content/results/${requestId}`),
}

export const dashboardAPI = {
  getStats: () => apiClient.get('/dashboard/stats'),
  getPipelineStatus: () => apiClient.get('/dashboard/pipeline'),
}

export const analyticsAPI = {
  getAnalytics: () => apiClient.get('/analytics'),
}

export default apiClient
