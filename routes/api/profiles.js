const express = require("express");

const router = express.Router();
// @route    POST api/profiles/test
// @desc     Test profile route
// @access   Public

router.get("/test", (req, res) =>
  res.json({
    msg: "user works",
  })
);

module.exports = router;
