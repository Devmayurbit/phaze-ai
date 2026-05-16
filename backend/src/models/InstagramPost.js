import mongoose from 'mongoose';

const instagramPostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
    },
    instagramProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InstagramProfile',
      required: true,
    },
    caption: String,
    hashtags: [String],
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    timestamp: Date,
    mediaUrl: String,
    mediaType: {
      type: String,
      enum: ['image', 'video', 'carousel', 'reel'],
      default: 'image',
    },
    engagementRate: {
      type: Number,
      default: 0,
    },
    shortCode: String,
    rawData: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

instagramPostSchema.index({ username: 1, timestamp: -1 });
instagramPostSchema.index({ instagramProfileId: 1 });

export default mongoose.model('InstagramPost', instagramPostSchema);
