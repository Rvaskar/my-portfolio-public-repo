import express from "express";
// import { signup, login } from "../controllers/auth.js";
import { getAllProjects, updateProject, addProject, deleteProject } from "../controllers/project.js";
import {projectRedis} from '../middleware/redisMiddleware.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addProject",auth, addProject);
// router.post("/login", login);

router.get("/getAllProject", projectRedis, getAllProjects);
router.delete("/deleteProject/:id", auth, deleteProject);
router.patch("/update/:id",  updateProject);

export default router;
