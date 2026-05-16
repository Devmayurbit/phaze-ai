import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: String,
  profile: {
    name: String,
    avatar: String,
    bio: String,
  },
  influencers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Influencer',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', userSchema)
