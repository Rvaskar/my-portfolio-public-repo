import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Middleware function to authenticate requests
const auth = (req, res, next) => {
  try {
    // Retrieve the token from the 'Authorization' header and split it from the 'Bearer' prefix
    const token = req.headers.authorization.split(" ")[1];
    
    // If no token is provided, return an unauthorized error response
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token using the JWT secret from environment variables
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user ID to the request object for use in subsequent middleware or routes
    req.userId = decodedData?.id;

    // If the token is invalid or does not contain a user ID, return an unauthorized error response
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Proceed to the next middleware or route handler if authentication is successful
    next();
  } catch (error) {
    // Log the authentication error to the console
    console.log("Authentication error: ", error);
    
    // Return an unauthorized error response if token verification fails
    res.status(401).json({ message: "Authentication failed" });
  }
};

// Export the auth middleware to be used in other parts of the application
export default auth;
