import mongoose from "mongoose";
import Contact from "../models/contact.js";

export const getAllContact = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    const allContactMessage = allContacts.map((contact) => ({
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
    }));
    res.status(200).json(allContactMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addContactMessage = async (req, res) => {
  const postMessageData = req.body;
  const postMessage = new Contact(postMessageData);
  try {
    await postMessage.save();
    res.status(200).json("Sent message successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't send a message");
  }
};

export const deleteMessage = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Message unavailable... Invalid ID");
  }

  try {
    const deletedMessage = await Contact.findByIdAndDelete(_id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found..." });
    }
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
