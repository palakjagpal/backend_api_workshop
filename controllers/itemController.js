import Item_Model from "../models/itemModel.js";

// Create a new item
export const addItem = async (req, res) => {
  try {
    const items = req.body; // should be an array of objects
    if (!Array.isArray(items)) {
           items = [items];
    }
    const savedItems = await Item_Model.insertMany(items); // save all at once
    res.status(201).json(savedItems);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// Get all items with find()
export const getAllItems = async (req, res) => {
  try {
    const items = await Item_Model.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// Get an item by ID with findById
export const getItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item_Model.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// Update an item by ID
export const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item_Model.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Item_Model.findByIdAndDelete(id);
    res.status(200).json({ msg: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
