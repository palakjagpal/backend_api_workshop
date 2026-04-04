import User_Model from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// User sign up ( creating a new user )
export const signup = async(req,res)=>{
    try{
        const {name, email, password} = req.body
        const exist = await User_Model.findOne({email})

        if(exist) {
            console.log("user already exists")
            return res.status(400).json({message: "User already exists"}) 
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = new User_Model({name, email, password: hashed})
        await user.save()

        console.log("New user created:", user)
        res.status(201).json({success: true, message: "User created successfully", userId : user._id})
    }
    catch(error){
        console.error("Error during user signup:", error)
        res.status(500).json({message: "Something went wrong"})
    }
}
``
//User sign in ( logging in an existing user )
export const login = async(req,res) => {
    console.log("Request body:", req.body)
    try{
        const {email, password} = req.body
        const user = await User_Model.findOne({email})

        if(!user) {
            console.log("user not found")
            return res.status(400).json({message: "User does not exist"})
        }

        const valid = await bcrypt.compare(password, user.password)
        if(!valid) {
            console.log("invalid credentials")
            return res.status(400).json({message: "Invalid credentials"})

        }

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        console.log("User logged in:", user)

        // Add return to ensure response is sent
        return res.status(200).json({message: "User logged in successfully", token, userId: user._id, name: user.name, email: user.email})
    }
    catch(error){
        console.error("Error during user signin:", error)
        return res.status(500).json({message: "Something went wrong"}) 
    }
}

//profile route ( protected route, requires authentication )
export const protectedRoute = async (req, res) => {
    try {
        const user = await User_Model.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            name: user.name,
            email: user.email,
            msg : `Hello ${req.user.email}, you accessed a protected route!`
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//Public route ( accessible without authentication )
export const publicRoute = (req,res) => {
    res.json({message: "This is a public route, accessible to everyone"})
    console.log("Accessing public route")

}