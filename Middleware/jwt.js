const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  token
    ? jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json("Invalid Token");
        req.user = user;
        next();
      })
    : res.status(403).json("Unauthorized,You have no token");
};

const verifyAccessTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    req.user.isAdmin
      ? next()
      : res.status(403).json("Unauthorized,You are not allowed to do this");
  });
};

const verifyAccessTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    req.user.id == req.params.id
      ? next()
      : res.status(403).json("Unauthorized,You are not allowed to do this");
  });
};

const generateAccessToken = (user) => {
  jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

module.exports = {
  verifyToken,
  generateAccessToken,
  verifyAccessTokenAndAuth,
  verifyAccessTokenAndAdmin,
};
