import Item_Model from "../models/itemModel.js";

// Create a new item
export const addItem = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const data = new Item_Model({ title, description, image });
    await data.save();
    console.log("New item created:", data);
    res.status(201).json({success: true, message: "Item created successfully", data : data});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all items with find()
export const getAllItems = async (req, res) => {
  try {
    const items = await Item_Model.find();
    console.log("Items retrieved:", items);
    console.log("Total items retrieved:", items.length);
    res.status(200).json({success : true, message: "Items retrieved successfully", data : items});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get an item by ID with findById
export const getItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item_Model.findById(id);
    console.log("Item retrieved:", item);
    res.status(200).json({success : true, message: "Item retrieved successfully", data : item});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// Update an item by ID
export const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item_Model.findByIdAndUpdate(id, req.body, { new: true });
    console.log("Item updated:", item);
    res.status(200).json({success: true, message: "Item updated successfully", data: item});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Item_Model.findByIdAndDelete(id);
    console.log("Item deleted with ID:", id);
    res.status(200).json({success: true, message: "Item deleted successfully"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
