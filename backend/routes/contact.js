import express from "express";
import {
  getAllContact,
  addContactMessage,
  deleteMessage,
} from "../controllers/contact.js";

const router = express.Router();

// Route to add a contact message
router.post("/addMessage", addContactMessage);

// Route to get all contact messages
router.get("/getAllMessages", getAllContact);
router.delete("/deleteMessage/:id", deleteMessage);

export default router;
