const User = require("../Models/User");
const { generateAccessToken } = require("../Middleware/jwt");
const { registerCheck, loginCheck } = require("../helpers/validate");
const { encrypt, decrypt } = require("../helpers/hashing");

const register = async (req, res) => {
  const { error } = registerCheck(req.body);
  if (error) return res.status(401).json({ message: error.message });

  const hashedpassword = encrypt(req.body.password);

  const newUser = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    profilePicture: req.body.profilePicture,
    password: hashedpassword,
  };
  if (!newUser) return res.status(400).send("User was entered ");
  try {
    const person = await new User(newUser);
    const user = await person.save();
    user && res.status(201).send("User was created successfully");
  } catch (err) {
    console.log(err);
    res.status(201).send("User was not created ");
  }
};

const login = async (req, res) => {
  const { error } = loginCheck(req.body);
  if (error) return res.status(401).json({ message: error.message });
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");
    const unhashedpassword = decrypt(user.password);
    if (unhashedpassword !== password)
      return res.status(403).send("Incorrect password");
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = generateAccessToken(payload);
    res.status(200).json({ message: "  User successfully logged in ", token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, register };
