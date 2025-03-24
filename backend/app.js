import express from "express";
import mongoose from "mongoose";
import userRrouter from "./Routes/user-routes.js";
import blogRouter from "./Routes/blog-routes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

const PORT = 7000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user routes
app.use("/api/user", userRrouter); //http://localhost:7000/api/user....

//blog routes
app.use("/api/blog", blogRouter); //http://localhost:7000/api/blog....

//mongodb connection
mongoose
  .connect(
    "mongodb+srv://admin007:admin1234@cluster0.kcgo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((e) => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("error connecting to MongoDB: " + err));

//server connection
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
