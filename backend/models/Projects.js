import  mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String},
    technology: { type: [String],},
    details: {type: String, required: true},
    coverImage: {type: String},
    outputImage: { type: [String],},
    tags: { type: [String],},
   
})

export default mongoose.model("Project",projectSchema)