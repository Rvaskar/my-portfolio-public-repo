import mongoose from "mongoose";
import Certificate from "../models/certificate.js";
import { getRedisClient } from "../redis.js";

export const getAllCertificates = async (req, res) => {
  try {
    const redisClient = getRedisClient();

    const allCertificates = await Certificate.find();
    const allCertificateDetails = [];
    allCertificates.forEach((certificate) => {
        allCertificateDetails.push({
        _id: certificate._id,
        name: certificate.name,
        certificateUrl: certificate.certificateUrl,
        
      });
    });
    res.status(200).json(allCertificateDetails);
    
    if(redisClient){
      await redisClient.set("certificate", JSON.stringify(allCertificateDetails), { EX: 864000 });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCertificate = async (req, res) => {
  const postCertificateData = req.body; //this data we get from front end
  const postCertificate = new Certificate(postCertificateData);
  try {
    await postCertificate.save();
    res.status(200).json("Posted Certificate Data successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new Certificate data");
  }
};

export const deleteCertificate = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Message unavailable... Invalid ID");
  }

  try {
    const deletedMessage = await Certificate.findByIdAndDelete(_id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Certificate not found..." });
    }
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};