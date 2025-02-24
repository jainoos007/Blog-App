import express from "express";
import mongoose from "mongoose";
import router from "./Routes/User.js";

const app = express();

const PORT = 7000;

//middlewares
app.use(express.json());

app.use("/api/user", router); //http://localhost:7000/api/user....

//mongodb connection
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then((e) => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("error connecting to MongoDB: " + err));

//server connection
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
