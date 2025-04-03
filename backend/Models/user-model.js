import mongoose from "mongoose";
import Blog from "./blog-model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, //to hide the password from the response
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog", //refering the blog model
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Mongoose pre-hook to delete related blogs when a user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const user = await this.model.findOne(this.getFilter());
    if (user) {
      await Blog.deleteMany({ author: user._id }); //Delete all blogs creted by this user
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("User", userSchema);
//users
