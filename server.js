const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRoute = require("./Routes/user");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/users", usersRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connnected successfully"))
  .catch((err) => console.log("Error connecting to Mongo", err.message));

app.get("/", (req, res) => {
  res.send("🔥🔥Welcome to the Kolynz😎 blog API 🔥🔥");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
