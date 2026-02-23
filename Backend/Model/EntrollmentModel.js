import mongoose from "mongoose";

const schemaEnrollment = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: String,
    required: true
  },
   Name: {
    type: String,
    required: true
  },
   Email: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default mongoose.model("EnrollUser", schemaEnrollment);
