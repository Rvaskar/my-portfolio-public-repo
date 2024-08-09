import mongoose from "mongoose"; // Importing mongoose for database operations
import Certificate from "../models/certificate.js"; // Importing the Certificate model
import { getRedisClient } from "../redis.js"; // Importing a function to get a Redis client

// Controller to get all certificates from the database
export const getAllCertificates = async (req, res) => {
  try {
    const redisClient = getRedisClient(); // Getting the Redis client instance

    // Fetching all certificates from the database
    const allCertificates = await Certificate.find();
    
    // Creating an array to store formatted certificate details
    const allCertificateDetails = [];
    allCertificates.forEach((certificate) => {
        allCertificateDetails.push({
        _id: certificate._id,
        name: certificate.name,
        certificateUrl: certificate.certificateUrl,
      });
    });

    // Sending a response with the certificate details
    res.status(200).json(allCertificateDetails);
    
    // If Redis client is available, cache the certificate data in Redis with an expiration time of 10 days
    if(redisClient){
      await redisClient.set("certificate", JSON.stringify(allCertificateDetails), { EX: 864000 });
    }
  } catch (error) {
    // Catching any errors and sending a response with an error message
    res.status(404).json({ message: error.message });
  }
};

// Controller to add a new certificate to the database
export const addCertificate = async (req, res) => {
  const postCertificateData = req.body; // Getting certificate data from the request body
  const postCertificate = new Certificate(postCertificateData); // Creating a new Certificate instance with the received data
  
  try {
    // Saving the new certificate to the database
    await postCertificate.save();
    res.status(200).json("Posted Certificate Data successfully"); // Sending a success response
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(409).json("Couldn't post a new Certificate data"); // Sending an error response
  }
};

// Controller to delete a certificate from the database
export const deleteCertificate = async (req, res) => {
  const { id: _id } = req.params; // Getting the certificate ID from request parameters

  // Checking if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Message unavailable... Invalid ID"); // Returning an error if the ID is invalid
  }

  try {
    // Finding the certificate by ID and deleting it from the database
    const deletedMessage = await Certificate.findByIdAndDelete(_id);
    
    // If the certificate was not found, return an error response
    if (!deletedMessage) {
      return res.status(404).json({ message: "Certificate not found..." });
    }
    
    // Sending a success response if the certificate was deleted
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(404).json({ message: error.message }); // Sending an error response
  }
};
