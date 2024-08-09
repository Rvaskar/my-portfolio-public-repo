import mongoose from "mongoose";
import Contact from "../models/contact.js";

// Controller to retrieve all contact messages from the database
export const getAllContact = async (req, res) => {
  try {
    // Fetching all contacts from the database
    const allContacts = await Contact.find();

    // Mapping through the contacts and formatting the data
    const allContactMessage = allContacts.map((contact) => ({
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
    }));

    // Sending the formatted contact messages in the response
    res.status(200).json(allContactMessage);
  } catch (error) {
    // Catching any errors and sending an error response with the error message
    res.status(404).json({ message: error.message });
  }
};

// Controller to add a new contact message to the database
export const addContactMessage = async (req, res) => {
  const postMessageData = req.body; // Getting the message data from the request body
  const postMessage = new Contact(postMessageData); // Creating a new Contact instance with the received data
  
  try {
    // Saving the new contact message to the database
    await postMessage.save();
    res.status(200).json("Sent message successfully"); // Sending a success response
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(409).json("Couldn't send a message"); // Sending an error response
  }
};

// Controller to delete a contact message from the database
export const deleteMessage = async (req, res) => {
  const { id: _id } = req.params; // Getting the message ID from the request parameters

  // Checking if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Message unavailable... Invalid ID"); // Returning an error if the ID is invalid
  }

  try {
    // Finding the contact message by ID and deleting it from the database
    const deletedMessage = await Contact.findByIdAndDelete(_id);

    // If the message was not found, return an error response
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found..." });
    }

    // Sending a success response if the message was deleted
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(404).json({ message: error.message }); // Sending an error response
  }
};
