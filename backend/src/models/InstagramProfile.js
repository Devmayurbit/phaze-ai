import mongoose from 'mongoose';

const instagramProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: String,
    bio: String,
    profilePicture: String,
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    externalUrl: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lastFetched: {
      type: Date,
      default: Date.now,
    },
    rawData: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default mongoose.model('InstagramProfile', instagramProfileSchema);
