import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //this is referencing User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
//blogs
