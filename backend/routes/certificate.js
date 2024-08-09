import express from "express";
import {
  getAllCertificates,
  addCertificate,
  deleteCertificate,
} from "../controllers/certificate.js";
import { certificateRedis } from "../middleware/redisMiddleware.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addCertificate", auth, addCertificate);

router.get("/getAllCertificate", certificateRedis, getAllCertificates);
router.delete("/deleteCertificate/:id", auth, deleteCertificate);

export default router;
