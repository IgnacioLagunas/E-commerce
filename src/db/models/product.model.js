import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: 'No data',
  },
  category: {
    type: String,
    default: 'No category',
  },
  image: {
    type: String,
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dno%2Bimage%2Bavailable&psig=AOvVaw353-XUks7sdWbHs6uyEF6T&ust=1699055914811000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBht3CpoIDFQAAAAAdAAAAABAE',
  },
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model('products', productSchema);
