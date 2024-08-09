import mongoose from "mongoose";
import Course from "../models/course.js";
import { getRedisClient } from "../redis.js";

// Controller to retrieve all courses from the database
export const getAllCourse = async (req, res) => {
  try {
    const redisClient = getRedisClient(); // Getting the Redis client instance

    // Fetching all courses from the database
    const allCourses = await Course.find();

    // Creating an array to store formatted course details
    const allCourseDetails = [];
    allCourses.forEach((course) => {
      allCourseDetails.push({
        _id: course._id,
        name: course.name,
        description: course.description,
        tags: course.tags,
      });
    });

    // Sending the array of course details in the response
    res.status(200).json(allCourseDetails);

    // If Redis client is available, cache the course data in Redis with an expiration time of 10 days
    if (redisClient) {
      await redisClient.set("course", JSON.stringify(allCourseDetails), { EX: 864000 });
    }
  } catch (error) {
    // Catching any errors and sending an error response with the error message
    res.status(404).json({ message: error.message });
  }
};

// Controller to add a new course to the database
export const addCourse = async (req, res) => {
  const postCourseData = req.body; // Getting the course data from the request body
  const postCourse = new Course(postCourseData); // Creating a new Course instance with the received data
  
  try {
    // Saving the new course to the database
    await postCourse.save();
    res.status(200).json("Posted course successfully"); // Sending a success response
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(409).json("Couldn't post a new Course"); // Sending an error response
  }
};

// Controller to delete a course from the database
export const deleteCourse = async (req, res) => {
  const { id: _id } = req.params; // Getting the course ID from request parameters

  // Checking if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Message unavailable... Invalid ID"); // Returning an error if the ID is invalid
  }

  try {
    // Finding the course by ID and deleting it from the database
    const deletedMessage = await Course.findByIdAndDelete(_id);
    
    // If the course was not found, return an error response
    if (!deletedMessage) {
      return res.status(404).json({ message: "Course not found..." });
    }
    
    // Sending a success response if the course was deleted
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error); // Logging the error to the console
    res.status(404).json({ message: error.message }); // Sending an error response
  }
};

// Controller to update an existing course in the database
export const updateCourse = async (req, res) => {
  const { id: _id } = req.params; // Getting the course ID from request parameters
  const { name, description, tags } = req.body; // Getting the updated data from the request body

  // Checking if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Course unavailable....'); // Returning an error if the ID is invalid
  }

  try {
    // Finding the course by ID and updating its details in the database
    const UpdatedCourse = await Course.findByIdAndUpdate(
      _id, 
      { $set: { 'name': name, 'description': description, 'tags': tags } }, 
      { new: true } // Ensures the updated course is returned
    );
    
    // Sending a success response with the updated course details
    res.status(200).json(UpdatedCourse);
  } catch (error) {
    // Catching any errors and sending an error response with the error message
    res.status(405).json({ message: error.message });
  }
};
