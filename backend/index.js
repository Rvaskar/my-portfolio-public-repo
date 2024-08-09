import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import projectRoutes from "./routes/project.js";
import courseRoutes from "./routes/course.js";
import certificateRoutes from "./routes/certificate.js";
import contactRoutes  from "./routes/contact.js";
import adminRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { initializeRedisClient } from "./redis.js";

const app = express();
initializeRedisClient()
dotenv.config();
app.use(helmet());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  res.send("This is task management system API");
});

app.use("/admin", adminRoutes);
app.use("/project", projectRoutes);
app.use("/course", courseRoutes);
app.use("/certificate", certificateRoutes);
app.use("/contact", contactRoutes );

// const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
