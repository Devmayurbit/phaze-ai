import express from 'express';
import {
  fetchInstagramProfile,
  getInstagramProfile,
  getInstagramAnalytics,
  searchInstagramUsers,
  getAllStoredProfiles,
} from '../controllers/instagramController.js';

const router = express.Router();

// POST - Fetch fresh Instagram profile and posts
router.post('/fetch', fetchInstagramProfile);

// GET - Retrieve stored profile data
router.get('/:username', getInstagramProfile);

// GET - Get analytics for a profile
router.get('/:username/analytics', getInstagramAnalytics);

// POST - Search Instagram users
router.post('/search', searchInstagramUsers);

// GET - Get all stored profiles
router.get('/', getAllStoredProfiles);

export default router;
