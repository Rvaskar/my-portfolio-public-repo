import mongoose from "mongoose";
import Course from "../models/course.js";
import { getRedisClient } from "../redis.js";

export const getAllCourse = async (req, res) => {
  try {
    const redisClient = getRedisClient();

    const allCourses = await Course.find();
    const allCourseDetails = [];
    allCourses.forEach((course) => {
      allCourseDetails.push({
        _id: course._id,
        name: course.name,
        description: course.description,
        tags: course.tags,
      });
    });
    res.status(200).json(allCourseDetails);

    if(redisClient){
      await redisClient.set("course", JSON.stringify(allCourseDetails), { EX: 864000 });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCourse = async (req, res) => {
  const postCourseData = req.body; //this data we get from front end
  const postCourse = new Course(postCourseData);
  try {
    await postCourse.save();
    res.status(200).json("Posted course successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new Course");
  }
};

export const deleteCourse = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Message unavailable... Invalid ID");
  }

  try {
    const deletedMessage = await Course.findByIdAndDelete(_id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Course not found..." });
    }
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateCourse = async(req,res)=>{
  const {id:_id} = req.params;
  const {name, description, tags} = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).send('Course unavailable....')
  }

  try {
      const UpdatedCourse = await Course.findByIdAndUpdate( _id, {$set:{'name':name, 'description':description, 'tags': tags}}, {new: true});
      res.status(200).json(UpdatedCourse)
  } catch (error) {
      res.status(405).json({message: error.message})
  }
}