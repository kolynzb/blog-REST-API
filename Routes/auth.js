const route = require("express").Router();
const { login, register } = require("../controllers/authController");

//register & login
route.post("/register", register);
route.post("/login", login);

module.exports = route;
