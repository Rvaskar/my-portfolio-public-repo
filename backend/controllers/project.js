import mongoose from "mongoose";
import Project from "../models/Projects.js";
import { getRedisClient } from "../redis.js";

// Controller to retrieve all projects from the database
export const getAllProjects = async (req, res) => {
  try {
    const redisClient = getRedisClient(); // Getting the Redis client instance

    // Fetching all projects from the database
    const allProjects = await Project.find();

    // Creating an array to store formatted project details
    const allProjectsDetails = [];
    allProjects.forEach((projects) => {
      allProjectsDetails.push({
        _id: projects._id,
        name: projects.name,
        description: projects.description,
        technology: projects.technology,
        details: projects.details,
        coverImage: projects.coverImage,
        url: projects.url,
        outputImage: projects.outputImage,
        tags: projects.tags,
      });
    });

    // Sending the array of project details in the response
    res.status(200).json(allProjectsDetails);

    // If Redis client is available, cache the project data in Redis with an expiration time of 10 days
    if (redisClient) {
      await redisClient.set("project", JSON.stringify(allProjectsDetails), { EX: 864000 });
    }

  } catch (error) {
    // Catching any errors and sending an error response with the error message
    res.status(404).json({ message: error.message });
  }
};

// Controller to update an existing project in the database
export const updateProject = async (req, res) => {
  const { id: _id } = req.params; // Getting the project ID from request parameters
  const { name, description, tags } = req.body; // Getting the updated data from the request body

  // Checking if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Project unavailable...."); // Returning an error if the ID is invalid
  }

  try {
    // Finding the project by ID and updating its details in the database
    const UpdateProject = await Project.findByIdAndUpdate(
      _id,
      { $set: { name: name, description: description, tags: tags } },
      { new: true } // Ensures the updated project is returned
    );
    
    // Sending a success response with the updated project details
    res.status(200).json(UpdateProject);
  } catch (error) {
    // Catching any errors and sending an error response with the error message
    res.status(405).json({ message: error.message });
  }
};

// Controller to add a new project to the database
export const addProject = async (req, res) => {
  const postProjectData = req.body; // Getting the project data from the request body
  const postProject = new Project(postProjectData); // Creating a new Project instance with the received data
  
  try {
    // Saving the new project to the database
    await postProject.save();
    res.status(200).json("Posted Project successfully"); // Sending a success response
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(409).json("Couldn't post a new Project"); // Sending an error response
  }
};

// Controller to delete a project from the database
export const deleteProject = async (req, res) => {
  const { id: _id } = req.params; // Getting the project ID from request parameters

  // Checking if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Project unavailable... Invalid ID"); // Returning an error if the ID is invalid
  }

  try {
    // Finding the project by ID and deleting it from the database
    const deletedMessage = await Project.findByIdAndDelete(_id);
    
    // If the project was not found, return an error response
    if (!deletedMessage) {
      return res.status(404).json({ message: "Project not found..." });
    }

    // Sending a success response if the project was deleted
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(404).json({ message: error.message }); // Sending an error response
  }
};
