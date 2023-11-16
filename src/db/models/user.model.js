import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  origin: {
    type: String,
    required: true,
    enum: ['GOOGLE', 'GITHUB', 'NONE'],
    default: 'NONE',
  },
});

export const userModel = mongoose.model('Users', userSchema);
