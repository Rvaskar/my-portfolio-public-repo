import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import projectRoutes from "./routes/project.js";
import courseRoutes from "./routes/course.js";
import certificateRoutes from "./routes/certificate.js";
import contactRoutes from "./routes/contact.js";
import adminRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { initializeRedisClient } from "./redis.js";

const app = express(); // Initialize the Express app
initializeRedisClient(); // Initialize the Redis client
dotenv.config(); // Load environment variables from a .env file

app.use(helmet()); // Secure the app by setting various HTTP headers using Helmet

// Middleware to parse incoming JSON and URL-encoded data, with a size limit of 30MB
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Define a basic route to test the API is working
app.get("/", (req, res) => {
  res.send("This is task management system API");
});

// Route handlers for different parts of the application
app.use("/admin", adminRoutes); // Routes related to admin authentication
app.use("/project", projectRoutes); // Routes related to projects
app.use("/course", courseRoutes); // Routes related to courses
app.use("/certificate", certificateRoutes); // Routes related to certificates
app.use("/contact", contactRoutes); // Routes related to contact messages

// MongoDB connection URL from environment variables
const DATABASE_URL = process.env.CONNECTION_URL;

// Define the port number, using an environment variable if available
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using Mongoose, then start the server
mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // Log a message when the server starts
    })
  )
  .catch((err) => console.log(err.message)); // Log any errors during the connection process
