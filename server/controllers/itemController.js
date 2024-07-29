import Item  from'../models/itemModel.js';
import mongoose from 'mongoose';

// Create a new item
const createItem = async (req, res) => {
  
try{
    const newItem = new Item(req.body);
    const item = await newItem.save();
    res.status(201).json(item);
    }catch (err) {
                  res.status(400).json({ error: err.message });
                 }
};

// Read all the items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    console.log('this is the array of iteeeeeeeeems!',items);
    if(items.length===0) {
      // If there are no items, return a message indicating that the database is empty
      return res.status(200).json({ message: 'No items found' });
    }
    
   console.log('itemController.js getItems, _.,·-^¨·-.,_.,·-^¨·-.,_.,·-^¨·-.,_item --> ',items);

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
      
};

// Read a specific item
const getItemById = async (req, res) => {
  
  try{
    const itemId = req.params.id;
    // To make sure that the ip provided its valid
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).send({ message: 'Invalid ID' });
  }
    const item = await Item.findById(itemId);
    if(!item){
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }

};

// Update a existing item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};