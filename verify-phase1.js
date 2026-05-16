#!/usr/bin/env node

/**
 * Phase 1 System Verification Script
 * Tests Instagram scraping, API connections, and content generation
 */

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const BACKEND_URL = process.env.VITE_API_URL || 'http://localhost:5000/api'
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY

console.log(`
╔══════════════════════════════════════════════════════════════╗
║   🚀 Phaze AI - Phase 1 System Verification                 ║
╚══════════════════════════════════════════════════════════════╝
`)

// ============ TESTS ============

async function testEnvironment() {
  console.log('\n📋 1. Checking Environment Variables...')
  
  let hasErrors = false
  
  if (!RAPIDAPI_KEY) {
    console.log('   ❌ RAPIDAPI_KEY not found in .env')
    hasErrors = true
  } else {
    console.log('   ✅ RAPIDAPI_KEY found')
  }
  
  if (!HUGGINGFACE_API_KEY) {
    console.log('   ❌ HUGGINGFACE_API_KEY not found in .env')
    hasErrors = true
  } else {
    console.log('   ✅ HUGGINGFACE_API_KEY found')
  }
  
  console.log(`   Backend URL: ${BACKEND_URL}`)
  
  return !hasErrors
}

async function testRapidAPIConnection() {
  console.log('\n🔌 2. Testing RapidAPI Instagram Connection...')
  
  if (!RAPIDAPI_KEY) {
    console.log('   ⚠️  Skipped (no API key)')
    return false
  }
  
  try {
    const response = await axios.get(
      'https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=instagram',
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
        },
        timeout: 5000
      }
    )
    
    if (response.data?.user) {
      console.log('   ✅ RapidAPI connection successful')
      console.log(`      - Can fetch real Instagram data`)
      return true
    } else {
      console.log('   ⚠️  Connected but unexpected response format')
      return false
    }
  } catch (error) {
    console.log(`   ❌ RapidAPI connection failed`)
    console.log(`      - Error: ${error.response?.status || error.message}`)
    if (error.response?.status === 429) {
      console.log(`      - Reason: API quota exceeded or rate limited`)
    } else if (error.response?.status === 401) {
      console.log(`      - Reason: Invalid or expired API key`)
    }
    return false
  }
}

async function testHuggingFaceConnection() {
  console.log('\n🤖 3. Testing HuggingFace AI Connection...')
  
  if (!HUGGINGFACE_API_KEY) {
    console.log('   ⚠️  Skipped (no API key)')
    return false
  }
  
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf',
      {
        inputs: 'Write a short Instagram hook about AI',
        parameters: { max_new_tokens: 50 }
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    )
    
    console.log('   ✅ HuggingFace connection successful')
    console.log(`      - Can generate AI content`)
    return true
  } catch (error) {
    console.log(`   ❌ HuggingFace connection failed`)
    console.log(`      - Error: ${error.message}`)
    if (error.response?.status === 401) {
      console.log(`      - Reason: Invalid or expired API key`)
    } else if (error.response?.status === 503) {
      console.log(`      - Reason: Model is loading (first request), try again in 30s`)
    }
    return false
  }
}

async function testBackendServer() {
  console.log('\n🖥️  4. Testing Backend Server...')
  
  try {
    const response = await axios.get(`${BACKEND_URL.replace('/api', '')}/health`, {
      timeout: 5000
    })
    console.log('   ✅ Backend server is running')
    return true
  } catch (error) {
    console.log(`   ❌ Cannot connect to backend`)
    console.log(`      - URL: ${BACKEND_URL}`)
    console.log(`      - Error: ${error.message}`)
    console.log(`      - Make sure: npm start or node src/server.js is running`)
    return false
  }
}

async function testFullPipeline() {
  console.log('\n🔄 5. Testing Full Pipeline (Mock Profile)...')
  
  try {
    const response = await axios.post(`${BACKEND_URL}/influencer/submit`, {
      url: 'https://www.instagram.com/instagram',
      platform: 'instagram',
      niche: 'Tech & Innovation'
    }, {
      timeout: 10000
    })
    
    if (response.data?.id && response.data?.status === 'processing') {
      console.log('   ✅ Pipeline initiated successfully')
      console.log(`      - Request ID: ${response.data.id}`)
      console.log(`      - Status: ${response.data.status}`)
      console.log(`      - Wait ${response.data.estimatedTime}`)
      return response.data.id
    }
  } catch (error) {
    console.log(`   ❌ Pipeline test failed`)
    console.log(`      - Error: ${error.message}`)
  }
  
  return null
}

async function testUserProfile() {
  console.log('\n👤 6. Testing User Profile Scrape...')
  
  try {
    const response = await axios.post(`${BACKEND_URL}/influencer/scrape`, {
      url: 'https://www.instagram.com/dainikrajeevtimes.mp'
    }, {
      timeout: 10000
    })
    
    const data = response.data
    console.log('   ✅ Profile scraped successfully')
    console.log(`      - Username: @${data.username}`)
    console.log(`      - Followers: ${data.followers?.toLocaleString()}`)
    console.log(`      - Data Source: ${data.source} (${data.apiMethod || 'default'})`)
    
    if (data.source === 'real') {
      console.log(`      - 🎯 REAL Instagram data!`)
    } else if (data.source === 'generated') {
      console.log(`      - 📊 Generated fallback data`)
    }
    
    return true
  } catch (error) {
    console.log(`   ⚠️  Profile scrape failed`)
    console.log(`      - Error: ${error.message}`)
    return false
  }
}

// ============ MAIN EXECUTION ============

async function runTests() {
  const results = {
    environment: await testEnvironment(),
    rapidapi: await testRapidAPIConnection(),
    huggingface: await testHuggingFaceConnection(),
    backend: await testBackendServer(),
    pipeline: await testFullPipeline(),
    profile: await testUserProfile()
  }
  
  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║   📊 Summary                                                 ║
╚══════════════════════════════════════════════════════════════╝
`)
  
  const passed = Object.values(results).filter(r => r).length
  const total = Object.values(results).filter(r => r !== null).length
  
  console.log(`✅ Tests Passed: ${passed}/${total}`)
  
  if (results.rapidapi && results.huggingface && results.backend) {
    console.log(`\n🚀 Phase 1 is ready to use!`)
    console.log(`
Next Steps:
1. Start Frontend: npm run dev (in frontend folder)
2. Visit http://localhost:3000
3. Enter Instagram URL
4. Generate content with AI
    `)
  } else {
    console.log(`\n⚠️  Some components need attention:`)
    if (!results.rapidapi) console.log(`   - Fix RapidAPI connection`)
    if (!results.huggingface) console.log(`   - Fix HuggingFace API`)
    if (!results.backend) console.log(`   - Start backend server`)
    console.log(`\nSee PHASE_1_SETUP_GUIDE.md for troubleshooting`)
  }
}

runTests().catch(console.error)
