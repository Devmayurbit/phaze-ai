import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentInfluencer, setCurrentInfluencer] = useState(null)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [processingStatus, setProcessingStatus] = useState('idle') // idle | analyzing | generating | complete
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysisData, setAnalysisData] = useState(null)

  const submitInfluencer = useCallback(async (url, niche) => {
    setIsLoading(true)
    setError(null)
    setProcessingStatus('analyzing')

    try {
      const response = await fetch('/api/influencer/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform: 'instagram', niche })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit influencer')
      }

      // Start polling for results
      const requestId = data.id
      let attempts = 0
      const maxAttempts = 120 // 2 minutes max

      const pollResults = async () => {
        while (attempts < maxAttempts) {
          attempts++

          try {
            const contentResponse = await fetch(`/api/influencer/${requestId}/content`)
            const contentData = await contentResponse.json()

            if (contentData.status === 'completed') {
              setProcessingStatus('complete')
              setCurrentInfluencer({
                username: contentData.username,
                niche: contentData.niche,
                profileData: contentData.influencer,
                analysis: contentData.analysis
              })
              setGeneratedContent({
                hooks: contentData.content?.hooks || [],
                captions: contentData.content?.captions || [],
                scripts: contentData.content?.scripts || [],
                hashtags: contentData.content?.hashtags || [],
                trends: contentData.trends || []
              })
              setAnalysisData(contentData.analysis)
              setIsLoading(false)
              return
            } else if (contentData.status === 'failed') {
              throw new Error(contentData.error || 'Processing failed')
            }

            // Still processing, wait before next poll
            await new Promise(resolve => setTimeout(resolve, 2000))
          } catch (pollError) {
            console.error('Poll error:', pollError)
            if (attempts >= maxAttempts) throw pollError
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }

        throw new Error('Request timeout')
      }

      await pollResults()
    } catch (err) {
      setError(err.message)
      setProcessingStatus('idle')
      setIsLoading(false)
      console.error('Influencer submission error:', err)
    }
  }, [])

  const clearData = useCallback(() => {
    setCurrentInfluencer(null)
    setGeneratedContent(null)
    setAnalysisData(null)
    setProcessingStatus('idle')
    setError(null)
  }, [])

  const value = {
    currentInfluencer,
    generatedContent,
    processingStatus,
    isLoading,
    error,
    analysisData,
    submitInfluencer,
    clearData,
    setCurrentInfluencer,
    setGeneratedContent,
    setProcessingStatus,
    setIsLoading,
    setError
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export default AppContext
