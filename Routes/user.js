const route = require("express").Router();
const {
  getAllUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
} = require("../controllers/userController");

const {
  verifyToken,
  verifyAccessTokenAndAuth,
  verifyAccessTokenAndAdmin,
} = require("../Middleware/jwt");
//routes
route.get("/", verifyToken, getAllUsers);
route.get("/:id", verifyToken, getUser);
route.delete("/:id", verifyAccessTokenAndAuth, deleteUser);
route.put("/:id", verifyAccessTokenAndAuth, updateUser);
route.post("/", verifyAccessTokenAndAuth, addUser);
//register & login
// route.put("/reister",)

module.exports = route;
