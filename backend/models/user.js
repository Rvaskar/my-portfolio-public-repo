import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,

  },
  password: {
    type: String,
    required: true,
  },
  joinedOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
