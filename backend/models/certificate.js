import mongoose from "mongoose";

const certificateSchema = mongoose.Schema({
  name: { type: String, required: true },
  certificateUrl: { type: String },
});

export default mongoose.model("Certificate", certificateSchema);
