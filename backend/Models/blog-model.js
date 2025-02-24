import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Blog", blogSchema);
//blogs
