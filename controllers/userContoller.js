const User = require("../Models/User");
const Users = require("../Models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addUser = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { $new: true }
    );
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, getUser, deleteUser, addUser, updateUser };
