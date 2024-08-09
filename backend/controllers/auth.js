import jwt from 'jsonwebtoken'; // Importing JWT for creating tokens
import dotenv from "dotenv"; // Importing dotenv to load environment variables
import bcrypt from 'bcryptjs'; // Importing bcryptjs for hashing passwords
import users from '../models/user.js'; // Importing the User model

dotenv.config(); // Loading environment variables from .env file

// Signup controller to handle user registration
export const signup = async(req,res)=>{
    const {name, email, password} = req.body; // Destructuring name, email, and password from request body
    try {
        // Check if a user with the given email already exists
        const existinguser = await users.findOne({email});

        if(existinguser){
            return res.status(404).json({message: "User already exists."}); // Return error if user already exists
        }

        // Hashing the user's password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Creating a new user with the provided details and hashed password
        const newUser = await users.create({name,email, password: hashedPassword});
        
        // Generating a JWT token with user's email and id as payload, valid for 1 hour
        const token = jwt.sign({email: newUser.email, id:newUser._id}, process.env.JWT_SECRET , {expiresIn:'1h'});
        
        // Sending response with the newly created user and token
        res.status(200).json({result:newUser, token});

    } catch (error) {
        // Catching any errors and sending a generic error response
        res.status(500).json('Something went wrong...');
    }
}

// Login controller to handle user authentication
export const login = async(req,res)=>{
    const { email, password} = req.body; // Destructuring email and password from request body
    try {
        // Check if a user with the given email exists
        const existinguser = await users.findOne({email});
        if(!existinguser){
            return res.status(404).json({message: "User doesn't exist."}); // Return error if user doesn't exist
        }
        
        // Comparing provided password with the hashed password in the database
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid credentials"}); // Return error if password doesn't match
        }
        
        // Generating a JWT token with user's email and id as payload, valid for 1 hour
        const token = jwt.sign({email: existinguser.email, id:existinguser._id}, process.env.JWT_SECRET , {expiresIn:'1h'});
        
        // Sending response with the user and token
        res.status(200).json({result:existinguser, token});
        
    } catch (error) {
        // Catching any errors and sending a generic error response
        res.status(500).json('Something went wrong...');
    }

}
