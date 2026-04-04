import User_Model from "../models/User_Model.js";
import bcrypt from "bcrypt";
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
        res.status(201).json({message: "User created successfully"})
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
        return res.status(200).json({message: "User logged in successfully", token})
    }
    catch(error){
        console.error("Error during user signin:", error)
        return res.status(500).json({message: "Something went wrong"}) 
    }
}

//Protecting routes ( verifying JWT token )
export const protectedRoute = (req,res) =>{
    res.json({message: `Hello ${req.user.email}, you accessed a protected route`})
    console.log("Accessing protected route for user:", req.user)
}

//Public route ( accessible without authentication )
export const publicRoute = (req,res) => {
    res.json({message: "This is a public route, accessible to everyone"})
    console.log("Accessing public route")

}