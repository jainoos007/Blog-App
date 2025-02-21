const express = require("express");

const app = express();

const PORT = 7000;

app.get("/", (req, res) => {
  console.log("Hello from server");
});

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
