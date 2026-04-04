import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/authmodel.js';

dotenv.config();

 export const signup = async(req,res)=>
 {   
    try
    {
        const{name,email,password}=req.body;
        const exist=await User.findOne({email})
       if (exist) {
           return res.status(400).json({ msg: "User already registered" });
}
        const hashed=await bcrypt.hash(password,10);
        const data= new User({name,email,password:hashed});
        console.log("data is saved");
        await data.save();
        console.log("Saving user:", data);
        // res.status(200).json({msg:"data saved" });
        res.json({
          msg: "data saved",
         user: { name, email }
            });
    }

  catch (error) {
  console.error(error); // This will print the real error in your terminal
  res.status(500).json({ msg: "cant signup", error: error.message });
}

}

export const  login= async(req,res)=>
    
    {
        try{
      const{email,password}=req.body;
      const user=await User.findOne({email});
      if(!user) return res.status(401).json({msg:"not correct email"});
      const valid =await bcrypt.compare(password,user.password)
      if(!valid) return res.status(401).json({msg:"wrong password"});

      const token= jwt.sign({id:user._id,email:user.email,name: user.name},process.env.JWT_SECRET,{expiresIn:"1h" });

    res.status(200).json({
            msg: "user login successfully",
            token,
            user: {
                name: user.name,
                email: user.email
                      }
                    });
        }
        catch(error)
        {
             res.status(400).json({msg:"cant login"});
        }
    }
    




