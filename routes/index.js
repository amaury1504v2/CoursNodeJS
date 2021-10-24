const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "port de Socket.io" }).status(200);
});

module.exports = router;
