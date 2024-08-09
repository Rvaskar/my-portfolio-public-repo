import express from "express";
// import { signup, login } from "../controllers/auth.js";
import { getAllCourse, addCourse, deleteCourse, updateCourse } from "../controllers/course.js";
import auth from "../middleware/auth.js";
import {courseRedis} from '../middleware/redisMiddleware.js'

const router = express.Router();

router.post("/addCourse", auth, addCourse);

router.get("/getAllCourse", courseRedis, getAllCourse);
router.delete("/deleteCourse/:id", auth, deleteCourse);
router.put("/updateCourse/:id", auth, updateCourse);

export default router;
