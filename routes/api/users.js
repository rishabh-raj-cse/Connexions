const express = require("express");
const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const passport = require("passport");

const router = express.Router();
//Load User Model

const User = require("../../models/User");

// @route    POST api/users/test
// @desc     Test users route
// @access   Public

router.get("/test", (req, res) =>
  res.json({
    msg: "user works",
  })
);

// @route    POST api/users/register
// @desc     Register user
// @access   Public

router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //sizes
        r: "r", //rating
        d: "mm", // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route    POST api/users/login
// @desc    Login user/ returning JWT Token
// @access   Public Public

router.post("/login", (req, res) => {
  const emaila = req.body.email;
  const password = req.body.password;

  //Find the user by email
  User.findOne({ email: emaila }).then((user) => {
    //Check for user

    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    //Check for password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched

        //making JWT payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "bearer" + token,
            });
          }
        );
      } else {
        return res.status(404).json({ password: "password mismatch" });
      }
    });
  });
});

module.exports = router;
