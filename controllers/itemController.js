import Item_Model from "../models/itemModel.js";
import cloudinary from "../config/cloudinary.js";

// Create a new item
export const addItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    let imageData = {};

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "items" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const item = await Item.create({
      title,
      description,
      image: imageData,
      createdBy: req.user?.id, 
    });

    console.log("Item created:", item);
    
    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all items with find() with pagination
export const getAllItems = async (req, res) =>
   {
   try {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 items per page
    const skip_n = (page - 1) * limit;

    const items = await Item_Model.find().skip(skip_n).limit(limit);
    const total = await Item_Model.countDocuments();

    res.status(200).json({
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      items,
    });
  } catch (error) {    res.status(500).json({ msg: error.message });
  }
}

// Get all items with find()
// export const getAllItems = async (req, res) => {
//   try {
//     const items = await Item_Model.find();
//     console.log("Items retrieved:", items);
//     console.log("Total items retrieved:", items.length);
//     res.status(200).json({success : true, message: "Items retrieved successfully", data : items});

//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

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
