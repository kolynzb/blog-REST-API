const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("user route is working ");
});

module.exports = route;
