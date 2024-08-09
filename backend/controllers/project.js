import mongoose from "mongoose";
import Project from "../models/Projects.js";
import { getRedisClient } from "../redis.js";

export const getAllProjects = async (req, res) => {
  try {
    const redisClient = getRedisClient();

    const allProjects = await Project.find();
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
    res.status(200).json(allProjectsDetails);

    if(redisClient){
      await redisClient.set("project", JSON.stringify(allProjectsDetails), { EX: 864000 });
    }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id: _id } = req.params;
  const { name, description, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Project unavailable....");
  }

  try {
    const UpdateProject = await Project.findByIdAndUpdate(
      _id,
      { $set: { name: name, description: description, tags: tags } },
      { new: true }
    );
    res.status(200).json(UpdateProject);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const addProject = async (req, res) => {
  const postProjectData = req.body; //this data we get from front end
  const postProject = new Project(postProjectData);
  try {
    await postProject.save();
    res.status(200).json("Posted Project successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new Project");
  }
};

export const deleteProject = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Project unavailable... Invalid ID");
  }

  try {
    const deletedMessage = await Project.findByIdAndDelete(_id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Project not found..." });
    }
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
