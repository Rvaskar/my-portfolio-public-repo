import express from "express";
import {
  getAllProjects,
  updateProject,
  addProject,
  deleteProject,
} from "../controllers/project.js";
import { projectRedis } from "../middleware/redisMiddleware.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addProject", auth, addProject);

router.get("/getAllProject", projectRedis, getAllProjects);
router.delete("/deleteProject/:id", auth, deleteProject);
router.patch("/update/:id", updateProject);

export default router;
