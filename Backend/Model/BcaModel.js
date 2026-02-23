 import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  name: String,
  description: String,
  topic: String,
  url:String,
  filename:String,
  courses:String,

 role: {
    type: String,
    default: "admin", 
  },
  
});

export default mongoose.model("UserFile", NotesSchema);