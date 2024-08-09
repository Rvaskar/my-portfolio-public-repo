import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String] },
});

export default mongoose.model("Course", courseSchema);
