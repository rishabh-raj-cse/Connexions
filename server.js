const express = require("express");

const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profiles");

const app = express();
// body parser middleware

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
//DB CONFIGUR

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello worls"));

//Passport middleware
app.use(passport.initialize());

//passport Config

require("./config/passport")(passport);

// use routes

app.use("/api/users", users);
app.use("/api/profile", profiles);
app.use("/api/posts", posts);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
