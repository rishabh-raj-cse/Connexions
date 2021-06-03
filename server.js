const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profilez = require("./routes/api/profiles");
const app = express();
//DB CONFIGUR

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("hello worls"));

// use routes

app.use("/api/users", users);
app.use("/api/profile", profilez);
app.use("/api/posts", posts);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
