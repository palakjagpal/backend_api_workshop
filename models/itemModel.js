import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    // createdby: {type: mongoose.Schema.Types.ObjectId, ref: "User_Model", required: true},
    createdAt: {type: Date, default: Date.now}

})

const Item_Model = mongoose.model("Item_Model", ItemSchema)

export default Item_Model;
