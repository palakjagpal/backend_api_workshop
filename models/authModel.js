import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    createdAt: {type:Date, default: Date.now}
})

const User_Model = mongoose.model("User_Model", UserSchema)

export default User_Model;
