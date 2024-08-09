import express from "express";
import { signup, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/createAdmin", signup);
router.post("/signin", login);

export default router;
