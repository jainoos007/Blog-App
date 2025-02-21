import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = 7000;

//connecting Database
mongoose
  .connect(
    "mongodb+srv://admin007:admin@321@cluster0.kcgo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(PORT, () => {
    console.log("Server is running at port: " + PORT);
  })
  .then((e) => console.log("MongoDB coneected"));

app.get("/", (req, res) => {
  console.log("Hello from server");
});
