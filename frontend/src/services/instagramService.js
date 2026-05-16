import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

const instagramAPI = axios.create({
  baseURL: `${API_BASE_URL}/instagram`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchInstagramData = async (username) => {
  try {
    const response = await instagramAPI.post('/fetch', { username });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to fetch Instagram data');
  }
};

export const getStoredProfile = async (username) => {
  try {
    const response = await instagramAPI.get(`/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to get profile');
  }
};

export const getProfileAnalytics = async (username) => {
  try {
    const response = await instagramAPI.get(`/${username}/analytics`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to get analytics');
  }
};

export const searchInstagramUsers = async (query) => {
  try {
    const response = await instagramAPI.post('/search', { query });
    return response.data.results;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to search users');
  }
};

export const getAllStoredProfiles = async () => {
  try {
    const response = await instagramAPI.get('/');
    return response.data.profiles;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to get profiles');
  }
};

export default {
  fetchInstagramData,
  getStoredProfile,
  getProfileAnalytics,
  searchInstagramUsers,
  getAllStoredProfiles,
};
