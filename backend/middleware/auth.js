import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;

    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.log("Authentication error: ", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;
