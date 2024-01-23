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
    default: null,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user', 'premium'],
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Carts',
  },
});

export default mongoose.model('Users', userSchema);
