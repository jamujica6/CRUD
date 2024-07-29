import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  quantity: {
  type: Number,
  required: true
  },
});

const Item = mongoose.model('Item', ItemSchema, 'items'); // 'items' its the name of collection in MongoDB
export default Item;
